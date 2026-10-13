const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {execFileSync} = require('node:child_process');
const {chromium, webkit} = require('/Users/zxcv/.hermes/cache/scratch/cleaning-regression/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const group = process.argv[2] || 'all';
// Parent owns HTML and v14. Preview applies the exact requested integration in-memory only.
const integrationPreview = process.env.ASSETS_INTEGRATION_PREVIEW === '1';
const original = file => execFileSync('git', ['show', `5c21bb9:${file}`], {cwd:root});
let baseline = false;
const replacements = ['cover','studio','live','video','cleaning'].map(name => [`assets/desktop/${name}.png`, `assets/ui-optimized/desktop/${name}.png`]);
const mime = {'.js':'text/javascript','.html':'text/html','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4'};
const server = http.createServer((req,res)=>{
  let name = decodeURIComponent(new URL(req.url,'http://local').pathname).slice(1) || 'index.html';
  try {
    let body = baseline && ['index.html','v14-project2.js','v17-dock-hotfix.js','v23-manual-layout.js'].includes(name) ? original(name) : fs.readFileSync(path.join(root,name));
    if (name==='v14-project2.js' && !baseline && integrationPreview) body=Buffer.from(body.toString().replace('img.src=`assets/desktop/${k}.png`','img.src=`assets/ui-optimized/desktop/${k}.png`'));
    if (name==='index.html' && !baseline) {
      let html=body.toString();
      if(fs.existsSync(path.join(root,'safe-storage.js')) && !html.includes('src="safe-storage.js"')) html=html.replace('<script src="script.js">','<script src="safe-storage.js"></script><script src="script.js">');
      if(group==='artwork'||group==='all') for(const [from,to] of replacements) html=html.replace(`src="${from}"`,`src="${to}"`);
      body=Buffer.from(html);
    }
    res.writeHead(200, {'Content-Type':mime[path.extname(name).toLowerCase()]||'application/octet-stream','Content-Length':body.length,'Cache-Control':'no-store'});res.end(body);
  }catch(e){res.writeHead(404);res.end('missing');}
});
async function storage(engine, mode) {
  const browser=await engine.launch(); const context=await browser.newContext();
  await context.addInitScript(mode=>{
    window.__persistedRead=Storage.prototype.getItem.bind(localStorage);
    if(mode==='getter') Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('Blocked','SecurityError');}});
    else if(mode==='getItem') Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError');};
    else {
      localStorage.setItem('bymanjuria-lang','ru'); localStorage.setItem('unrelated-saved-value','keep');
      if(mode==='quota'||mode==='locked-quota') Storage.prototype.setItem=function(){throw new DOMException('Full','QuotaExceededError');};
      if(mode==='removeItem') Storage.prototype.removeItem=function(){throw new DOMException('Blocked','SecurityError');};
    }
    window.__storageWrites=0;
    const selectedWrite=Storage.prototype.setItem;
    Storage.prototype.setItem=function(...args){window.__storageWrites++;return selectedWrite.apply(this,args);};
    if(mode==='locked-quota') Object.defineProperty(window,'localStorage',{configurable:false,value:localStorage});
  },mode);
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url); await page.waitForTimeout(1300);
  assert.equal(await page.locator('#bootScreen').evaluate(el=>el.classList.contains('is-hidden')),true,`${mode}: boot must disappear`);
  assert.deepEqual(errors,[],`${mode}: unhandled errors`);
  assert.equal(await page.evaluate(()=>window.__storageWrites),0,'Installation/startup must not probe, reset, or overwrite saved values');
  const initial=['quota','locked-quota','normal','removeItem'].includes(mode)?'RU':'EN';
  assert.equal(await page.locator('#langToggle').innerText(),initial);
  await page.locator('[data-open="studio"].desktop-icon').click();
  await page.locator('.window[data-key="studio"] .v23-studio').waitFor();
  await page.locator('#langToggle').click();
  assert.equal(await page.locator('#langToggle').innerText(),initial==='RU'?'EN':'RU');
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.window[data-key="studio"] .v23-studio').count(),1);
  await page.evaluate(()=>{localStorage.setItem('adapter-check',42);if(localStorage.getItem('adapter-check')!=='42')throw Error('write failed');localStorage.removeItem('adapter-check');if(localStorage.getItem('adapter-check')!==null)throw Error('remove failed');});
  if(['normal','quota','locked-quota','removeItem'].includes(mode)) {
    assert.equal(await page.evaluate(()=>localStorage.getItem('unrelated-saved-value')),'keep');
    assert.equal(await page.evaluate(()=>window.__persistedRead('unrelated-saved-value')),'keep','Real persisted data must be untouched');
    assert.equal(await page.evaluate(()=>window.__persistedRead('bymanjuria-lang')),['quota','locked-quota'].includes(mode)?'ru':'en','Only a successful user toggle persists; quota fallback must not overwrite the old value');
  }
  console.log(`PASS ${engine===webkit?'WebKit':'Chromium'} storage ${mode}: boot + EN/RU + windows + read/write/remove`);
  await browser.close();
}
async function media() {
  const browser=await chromium.launch();const page=await browser.newPage();const bad=[];
  page.on('response',r=>{if(r.status()===404)bad.push(r.url());});
  await page.goto(url);await page.waitForTimeout(1300);
  await page.locator('.desktop-icon[data-open="studio"]').click();await page.locator('.v23-studio').waitFor();
  await page.locator('.dock-icon[data-open="photos"]').click();await page.locator('.v23-photos').waitFor();
  const sources=await page.locator('.v23-studio img[src*="studio-photo"], .v23-photos img[src*="photo-"]').evaluateAll(els=>els.map(el=>el.getAttribute('src')));
  assert.equal(sources.length,18);assert.ok(sources.every(s=>s.endsWith('.png')),`Known PNG must be first: ${JSON.stringify(sources)}`);
  await page.locator('.v23-studio img, .v23-photos img').evaluateAll(els=>els.forEach(el=>el.loading='eager'));
  await page.waitForFunction(()=>[...document.querySelectorAll('.v23-studio img, .v23-photos img')].every(el=>el.complete&&el.naturalWidth>0));
  assert.deepEqual(bad,[],'No known fallback 404');
  await page.evaluate(()=>{const img=document.createElement('img');img.dataset.fallbacks='alternate.png|last.png';window.v23MediaError(img);if(!img.src.endsWith('/alternate.png')||img.dataset.fallbacks!=='last.png')throw Error('Fallback removed');});
  console.log('PASS media: all 18 PNG first; zero 404; optional fallback retained');await browser.close();
}
async function dockFallback() {
  baseline=false;const browser=await chromium.launch();const page=await browser.newPage();const attempted=[];
  await page.route('**/assets/ui-optimized/dock-fallback/*.png',route=>{attempted.push(route.request().url());return route.abort();});
  await page.goto(url);await page.waitForTimeout(1300);
  assert.equal(attempted.length,9,'Dock must prefer the optimized filename variants');
  const icons=await page.locator('.dock-icon > img').evaluateAll(async imgs=>{await Promise.all(imgs.map(img=>img.decode()));return imgs.map(img=>img.getAttribute('src'));});
  assert.equal(icons.length,9);assert.ok(icons.every(src=>src.startsWith('dock-fallback/')),'Missing optimized asset must fall back to the intact original');
  await browser.close();console.log('PASS Dock missing-variant fallback: 9 optimized attempts → 9 original decoded images');
}
async function startup(isBaseline, engine=chromium){
  baseline=isBaseline;const browser=await engine.launch();const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:2});const bad=[];page.on('response',r=>{if(r.status()>=400)bad.push(r.url());});
  await page.goto(url);await page.waitForTimeout(2500);
  assert.deepEqual(bad,[],'Artwork variants must exist (no startup 404)');
  const data=await page.evaluate(async()=>{
    const imgs=[...document.querySelectorAll('.desktop-folder-image,.dock-icon > img')];
    await Promise.all(imgs.map(img=>img.decode()));
    const artwork=imgs.map(img=>{const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let transparent=0;for(let n=3;n<pixels.length;n+=4)if(pixels[n]<255)transparent++;return {src:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight,display:img.getBoundingClientRect().width,transparent};});
    const resources=performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),transfer:r.transferSize,encoded:r.encodedBodySize}));
    return {artwork,resources,transfer:resources.reduce((n,r)=>n+r.transfer,0),encoded:resources.reduce((n,r)=>n+r.encoded,0)};
  });
  assert.deepEqual(bad,[]);assert.equal(data.artwork.length,14);assert.ok(data.artwork.every(img=>img.transparent>0),'alpha must survive');
  if(!isBaseline){assert.ok(data.artwork.every(img=>img.src.includes('ui-optimized/')),`all startup artwork optimized: ${JSON.stringify(data.artwork)}`);assert.ok(data.artwork.every(img=>img.width<=256&&img.width>=img.display*2),'2x-sized assets');}
  if(engine===chromium) await page.screenshot({path:`/Users/zxcv/.hermes/cache/scratch/portfolio-qa/assets-startup-${isBaseline?'before':'after'}.png`});
  await browser.close();return data;
}
function verifyOriginalAssets() {
  const tracked=execFileSync('git',['ls-tree','-r','-z','5c21bb9','--','assets','dock-fallback'],{cwd:root}).toString().split('\0').filter(Boolean).map(line=>({file:line.split('\t')[1],hash:line.split('\t')[0].split(' ')[2]})).filter(row=>!row.file.toLowerCase().endsWith('.pdf'));
  const hashes=execFileSync('git',['hash-object','--stdin-paths'],{cwd:root,input:tracked.map(row=>JSON.stringify(row.file)).join('\n')+'\n'}).toString().trim().split('\n');
  assert.equal(hashes.length,tracked.length);
  tracked.forEach((row,index)=>assert.equal(hashes[index],row.hash,`Original asset changed: ${row.file}`));
  console.log(`PASS originals: all ${tracked.length} tracked non-PDF assets byte-identical to clean HEAD 5c21bb9 (PDF owned by another worker)`);
  return tracked.length;
}
let url;
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url=`http://127.0.0.1:${server.address().port}/`;
  if(group==='storage'||group==='all')for(const engine of [chromium,webkit])for(const mode of ['getter','getItem','quota','locked-quota','removeItem','normal'])await storage(engine,mode);
  if(group==='media'||group==='all')await media();
  if(group==='dock-fallback'||group==='all')await dockFallback();
  if(group==='artwork'||group==='all'){
    const originalAssetCount=verifyOriginalAssets();
    const before=await startup(true),after=await startup(false);await startup(false,webkit);
    assert.ok(after.transfer<before.transfer*0.5,'startup transfer at least halved');
    const output={integrationPreview,originalAssetCount,before,after,savings:before.transfer-after.transfer,percent:100*(before.transfer-after.transfer)/before.transfer,replacements};
    fs.writeFileSync('/Users/zxcv/.hermes/cache/scratch/portfolio-qa/assets-regressions-metrics.json',JSON.stringify(output,null,2));
    console.log(`PASS artwork Chromium/WebKit decode + transparency: ${before.transfer} → ${after.transfer} transferred bytes (${output.percent.toFixed(2)}% saved)`);
  }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close(()=>process.exit(process.exitCode||0)));
