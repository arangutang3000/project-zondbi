/* Run: node tests/responsive-regressions.cjs [--baseline] [--case=dock|landscape|focus|motion]
 * Uses a local static server; injects the candidate CSS after existing styles until integrated.
 * No locator clicks/scrollIntoView for Dock reachability: coordinates and real touch swipes only.
 */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium, webkit} = require(process.env.PLAYWRIGHT_PATH || '/Users/zxcv/.hermes/cache/scratch/cleaning-regression/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const output = process.env.QA_OUTPUT || '/Users/zxcv/.hermes/cache/scratch/portfolio-qa/fixes-responsive';
const baseline = process.argv.includes('--baseline');
const only = process.argv.find(a => a.startsWith('--case='))?.split('=')[1];
const stage = baseline ? 'before' : 'after';
fs.mkdirSync(output, {recursive:true});
const results = [];
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.svg':'image/svg+xml'};
const server = http.createServer((req,res) => {
  let file;
  try {file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://local').pathname));} catch {res.writeHead(400).end();return;}
  if (!file.startsWith(root + path.sep) && file !== root) {res.writeHead(403).end();return;}
  if (file === root || file.endsWith(path.sep)) file = path.join(file,'index.html');
  fs.readFile(file, (err,data) => {
    if(err){res.writeHead(404).end();return;}
    if(file.endsWith('index.html')){
      let html=data.toString();
      if(baseline) html=html.replace(/<link\b[^>]*href=["']qa-responsive\.css[^"']*["'][^>]*>/g,'');
      else {
        if(fs.existsSync(path.join(root,'qa-window.css')) && !html.includes('href="qa-window.css"')) html=html.replace('</head>','<link rel="stylesheet" href="qa-window.css"></head>');
        if(!html.includes('href="qa-responsive.css"')) html=html.replace('</head>','<link rel="stylesheet" href="qa-responsive.css"></head>');
      }
      data=Buffer.from(html);
    }
    res.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  });
});
const rects = () => {
  const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
  const dock=document.querySelector('.dock');
  return {viewport:{width:innerWidth,height:innerHeight},desktop:box(document.querySelector('.desktop')),dock:{...box(dock),scrollLeft:dock.scrollLeft,scrollWidth:dock.scrollWidth,clientWidth:dock.clientWidth,overflow:getComputedStyle(dock).overflowX},icons:[...dock.querySelectorAll('.dock-icon')].map(e=>({key:e.dataset.dockKey,...box(e)})),folders:[...document.querySelectorAll('.desktop-icon')].map(e=>({key:e.dataset.open,...box(e)})),art:[...document.querySelectorAll('.desktop-folder-image')].map(e=>e.getAttribute('src')),neatmi:document.querySelector('[data-open="cleaning"] > span:last-child').textContent,soundControls:document.querySelectorAll('.sound-switch,[class$="-sound"]').length};
};
async function settled(page,url){await page.goto(url);await page.waitForFunction(()=>document.querySelector('.boot-screen').classList.contains('is-hidden'));await page.waitForTimeout(550);}
async function check(name, run){try{const measurements=await run();results.push({name,pass:true,measurements});console.log('PASS '+name);}catch(e){results.push({name,pass:false,error:e.message});console.log('FAIL '+name+': '+e.message);}}
async function swipe(page,session,x1,x2,y){
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y}]});
  for(let i=1;i<=12;i++){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/12,y}]});await page.waitForTimeout(18);}
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(450);
}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url='http://127.0.0.1:'+server.address().port+'/';
 try{
 for(const [engineName,engine] of Object.entries({chromium,webkit})){
  const browser=await engine.launch();
  try{
   if(!only || only==='dock' || only==='landscape'){
    for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[568,320],[844,390],[1024,1366],[1366,1024]]){
     if(only==='landscape' && height>480)continue;
     if(only==='dock' && height<=480)continue;
     const context=await browser.newContext({viewport:{width,height},hasTouch:true});const page=await context.newPage();
     await settled(page,url);
     const m=await page.evaluate(rects);fs.writeFileSync(path.join(output,`${stage}-${engineName}-${width}x${height}-measurements.json`),JSON.stringify(m,null,2));
     await page.screenshot({path:path.join(output,`${stage}-${engineName}-${width}x${height}.png`)});
     await check(`${engineName} ${width}x${height} viewport and Dock`,async()=>{
      assert.ok(m.desktop.height<=height+1,`desktop height ${m.desktop.height} > viewport ${height}`);
      assert.ok(m.dock.y>=0 && m.dock.bottom<=height,`Dock y=${m.dock.y}..${m.dock.bottom} outside viewport`);
      assert.ok(m.icons[0].x>=m.dock.x,`inaccessible prefix: first icon x=${m.icons[0].x}, Dock x=${m.dock.x}`);
      for(const i of m.icons)assert.ok(i.width>=44 && i.height>=44,`${i.key} target ${i.width}x${i.height} is below 44px`);
      if(m.icons.at(-1).right>m.dock.right)assert.equal(m.dock.overflow,'auto','overflowed Dock must support native horizontal scrolling');
      assert.equal(m.neatmi,'neatmi');assert.equal(m.soundControls,0);assert.equal(m.art.length,5);
      const previous=path.join(output,`before-${engineName}-${width}x${height}-measurements.json`);
      if(!baseline && width>=1024 && height>480 && fs.existsSync(previous)){
        const before=JSON.parse(fs.readFileSync(previous));
        for(const field of ['desktop','dock','folders'])assert.deepEqual(m[field],before[field],`existing desktop ${field} changed`);
        // Asset optimization changes only the directory, not the selected artwork.
        assert.deepEqual(m.art.map(src=>src.replace('assets/ui-optimized/desktop/','assets/desktop/')),before.art.map(src=>src.replace('assets/ui-optimized/desktop/','assets/desktop/')),'existing desktop artwork identity changed');
      }
      return m;
     });
     if(height<=480){
      await check(`${engineName} ${width}x${height} folder bounds`,async()=>{
       for(const f of m.folders)assert.ok(f.x>=0 && f.right<=width && f.y>=32 && f.bottom<=m.dock.y,`${f.key} bounds ${JSON.stringify(f)} overlap clipped screen/Dock`);
       return m.folders;
      });
      // Open each window by a genuine coordinate tap, without Playwright scroll rescue.
      for(const key of ['cover','studio','live','video','cleaning','photos','notes','photoshop','premiere','flstudio']){
       await page.keyboard.press('Escape');await page.waitForTimeout(100);
       await check(`${engineName} ${width}x${height} ${key} window bounds`,async()=>{
        const b=await page.locator(`[data-open="${key}"]`).first().boundingBox();assert.ok(b && b.y>=0 && b.y+b.height<=height,'launcher must be visible before tapping');
        await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);await page.waitForTimeout(180);
        const win=page.locator(`.window[data-key="${key}"]`);await win.waitFor({state:'visible',timeout:3000});
        const r=await win.boundingBox();assert.ok(r.x>=0 && r.y>=32 && r.x+r.width<=width+1 && r.y+r.height<=m.dock.y,`window ${JSON.stringify(r)} must fit above Dock ${m.dock.y}`);
        if(width>768){
          const maximize=await win.locator('.max').boundingBox();
          if(maximize){await page.touchscreen.tap(maximize.x+maximize.width/2,maximize.y+maximize.height/2);await page.waitForTimeout(100);
            const max=await win.boundingBox();assert.ok(max.x>=0 && max.y>=32 && max.x+max.width<=width+1 && max.y+max.height<=m.dock.y,`maximized window ${JSON.stringify(max)} outside workspace`);
          }
        }
        const close=await win.locator('.close').boundingBox();await page.touchscreen.tap(close.x+close.width/2,close.y+close.height/2);await page.waitForTimeout(100);return r;
       });
      }
     }
     if(engineName==='chromium' && width<=390 && (!only || only==='dock')){
      await check(`${engineName} ${width} real touch all nine Dock targets`,async()=>{
       const session=await context.newCDPSession(page);const hit=[];
       // Capture phase records genuine trusted activations and prevents contacting third parties.
       await page.evaluate(()=>{window.__dockTaps=[];document.addEventListener('click',e=>{const b=e.target.closest('.dock-icon');if(b){window.__dockTaps.push({key:b.dataset.dockKey,trusted:e.isTrusted});e.preventDefault();e.stopImmediatePropagation();}},true);});
       for(const original of m.icons){
        let b;
        for(let tries=0;tries<8;tries++){
         b=(await page.evaluate(rects)).icons.find(i=>i.key===original.key);
         const d=(await page.evaluate(rects)).dock;
         if(b.x>=d.x+2 && b.right<=d.right-2)break;
         await swipe(page,session,d.right-24,d.x+24,d.y+d.height/2);
        }
        const d=(await page.evaluate(rects)).dock;assert.ok(b.x>=d.x && b.right<=d.right,`${original.key} not touch reachable after swipe`);
        await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);hit.push(original.key);
       }
       const actual=await page.evaluate(()=>window.__dockTaps);assert.deepEqual(actual.map(x=>x.key),hit);assert.ok(actual.every(x=>x.trusted));
       await page.screenshot({path:path.join(output,`${stage}-${engineName}-${width}x${height}-touch-end.png`)});
       return {taps:actual,final:await page.evaluate(rects)};
      });
     }
     await context.close();
    }
   }
   if(!only || only==='focus'){
    const page=await browser.newPage({viewport:{width:1366,height:1024}});await settled(page,url);
    await check(`${engineName} folder keyboard focus`,async()=>{
     const states=[];
     for(let i=0;i<20 && states.length<5;i++){
      // macOS WebKit uses Option-Tab to include buttons in native sequential focus.
      await page.keyboard.press(engineName==='webkit' ? 'Alt+Tab' : 'Tab');
      const state=await page.evaluate(()=>{const e=document.activeElement;if(!e.matches('.desktop-icon'))return null;const s=getComputedStyle(e);return {key:e.dataset.open,visible:e.matches(':focus-visible'),outline:s.outlineStyle,width:parseFloat(s.outlineWidth),shadow:s.boxShadow};});
      if(state){states.push(state);if(states.length===1)await page.screenshot({path:path.join(output,`${stage}-${engineName}-focus.png`)});}
     }
     assert.equal(states.length,5);for(const s of states)assert.ok(s.visible && s.outline!=='none' && s.width>=2,`${s.key}: no clear keyboard outline ${JSON.stringify(s)}`);return states;
    });await page.close();
   }
   if(!only || only==='motion'){
    const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();await page.goto(url);
    await check(`${engineName} reduced decorative motion`,async()=>{
     const m=await page.evaluate(()=>{const s=getComputedStyle(document.querySelector('.boot-line span'));const boot=getComputedStyle(document.querySelector('.boot-screen'));return {matches:matchMedia('(prefers-reduced-motion: reduce)').matches,animation:s.animationName,bootTransition:boot.transitionDuration};});
     assert.equal(m.matches,true);assert.equal(m.animation,'none');assert.ok(m.bootTransition.split(',').every(t=>parseFloat(t)===0),`boot transition ${m.bootTransition}`);return m;
    });await settled(page,url);
    await check(`${engineName} reduced motion leaves project videos visible`,async()=>{
     const b=await page.locator('[data-open="cleaning"]').boundingBox();await page.mouse.click(b.x+b.width/2,b.y+b.height/2);await page.waitForTimeout(200);
     const m=await page.evaluate(()=>[...document.querySelectorAll('.window video')].map(e=>({display:getComputedStyle(e).display,visibility:getComputedStyle(e).visibility,controls:e.controls})));assert.ok(m.length>0);assert.ok(m.every(v=>v.display!=='none' && v.visibility==='visible'));return m;
    });await context.close();
   }
  }finally{await browser.close();}
 }
 }finally{server.close();fs.writeFileSync(path.join(output,`${stage}${only?'-'+only:''}-results.json`),JSON.stringify(results,null,2));}
 const failed=results.filter(r=>!r.pass);console.log(`${results.length-failed.length}/${results.length} passed; ${failed.length} failed`);process.exitCode=failed.length?1:0;
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
