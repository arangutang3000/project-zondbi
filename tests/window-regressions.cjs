// NODE_PATH=<playwright node_modules> node tests/window-regressions.cjs
// CASE=D01 (etc) narrows the red/green loop. ENGINE=webkit is also supported.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const playwright = require('playwright');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
  fs.readFile(file, (error, bytes) => {
    if (error) return res.writeHead(404).end();
    // Before integration, exercise candidate styles; otherwise serve the actual index unchanged.
    if (file.endsWith('/index.html') && fs.existsSync(path.join(root, 'qa-window.css')) && !bytes.toString().includes('href="qa-window.css"')) {
      const responsive = process.env.INTEGRATED_CSS ? '<link rel="stylesheet" href="qa-responsive.css">' : '';
      bytes = Buffer.from(bytes.toString().replace('</head>', '<link rel="stylesheet" href="qa-window.css">' + responsive + '</head>'));
    }
    res.writeHead(200, {'Content-Type': ({'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mp4':'video/mp4', '.MP4':'video/mp4'})[path.extname(file)] || 'application/octet-stream'}).end(bytes);
  });
});
const cases = {};
cases.D01 = async ({page, open, win}) => {
  await open('notes');
  await win('notes').locator('[data-note="contacts"]').click();
  await win('notes').evaluate(w => { w.__retained = true; });
  await win('notes').locator('.min').click();
  await open('notes', false);
  assert.equal(await win('notes').count(), 1, 'one launcher activation restores minimized window');
  assert.equal(await win('notes').evaluate(w => w.__retained && !w.classList.contains('minimized')), true, 'restore retains the same DOM');
  assert.equal(await win('notes').locator('.note-item.active').getAttribute('data-note'), 'contacts');
  await open('notes', false);
  assert.equal(await win('notes').count(), 0, 'visible launcher activation still toggles closed');
};
cases.D02 = async ({page, open, win}) => {
  for (const key of ['live', 'cleaning']) {
    await open(key);
    const video = win(key).locator('video').first();
    await video.evaluate(async v => { await v.play(); v.muted = false; window.__media = v; });
    await win(key).locator('.min').click();
    await page.waitForTimeout(150);
    assert.equal(await video.evaluate(v => v.paused), true, `${key}: hidden media pauses`);
    const time = await video.evaluate(v => v.currentTime);
    await open(key);
    assert.equal(await video.evaluate(v => v.muted), true, 'restore never enables audio');
    assert.equal(await video.evaluate(v => v.paused), false, 'previously playing media resumes silently');
    assert.ok(await video.evaluate((v, t) => v.currentTime >= t, time), 'retains playback position');
    await video.evaluate(v => v.pause());
    await win(key).locator('.min').click();
    await open(key);
    assert.equal(await video.evaluate(v => v.paused), true, 'paused media stays paused on restore');
    await win(key).locator('.close').click();
    await page.waitForTimeout(220);
  }
  await open('video');
  const iframe = win('video').locator('iframe').first();
  await win('video').locator('.min').click();
  assert.equal(await iframe.getAttribute('src'), 'about:blank', 'suspend cross-origin embed by unloading its player');
  await open('video');
  const restored = new URL(await iframe.getAttribute('src'));
  assert.equal(restored.searchParams.get('autoplay'), '0');
  assert.equal(restored.searchParams.get('mute'), '1');
};
cases.D03 = async ({page, open, win}) => {
  for (const key of ['cover','studio','live','video','cleaning','photos','notes','photoshop','premiere','flstudio']) {
    await open(key);
    const before = await win(key).boundingBox();
    await win(key).locator('.max').click();
    await page.waitForTimeout(250);
    const box = await win(key).boundingBox();
    const workspace = await page.locator('#windows').boundingBox();
    const dock = await page.locator('.dock').boundingBox();
    assert.ok(box.width >= workspace.width - 24, `${key}: maximize uses workspace width, got ${box.width}`);
    assert.ok(box.y >= workspace.y && box.y + box.height <= Math.min(workspace.y + workspace.height, dock.y) + 1, `${key}: maximize clears workspace bottom and Dock`);
    await win(key).locator('.max').click();
    await page.waitForTimeout(250);
    const restored = await win(key).boundingBox();
    assert.ok(Math.abs(before.x-restored.x)<1 && Math.abs(before.y-restored.y)<1 && Math.abs(before.width-restored.width)<1 && Math.abs(before.height-restored.height)<1, `${key}: exact restore geometry`);
    await win(key).locator('.close').click();
    await page.waitForTimeout(220);
  }
};
cases.D04 = async ({page, open, win}) => {
  await open('premiere');
  const header = await win('premiere').locator('.window-header').boundingBox();
  await page.mouse.move(header.x + header.width/2, header.y + header.height/2);
  await page.mouse.down(); await page.mouse.move(1180, 790, {steps:8}); await page.mouse.up();
  async function fits(key) {
    await page.waitForTimeout(300);
    const box = await win(key).boundingBox(), dock = await page.locator('.dock').boundingBox();
    const size = page.viewportSize();
    assert.ok(box.x >= 0 && box.x + box.width <= size.width + 1 && box.y >= 31 && box.y + box.height <= Math.min(size.height,dock.y) + 1, `${key}: resized window fits and controls reachable: ${JSON.stringify(box)}`);
  }
  await page.setViewportSize({width:900,height:700}); await fits('premiere');
  await open('cover');
  await page.setViewportSize({width:810,height:460}); await fits('cover'); await fits('premiere');
  await win('cover').locator('.max').click(); await fits('cover');
  await page.setViewportSize({width:900,height:700}); await fits('cover');
  await win('cover').locator('.max').click(); await fits('cover');
  await page.setViewportSize({width:390,height:844}); await fits('cover');
};
cases.D07 = async ({page, open, win}) => {
  await open('photoshop'); await open('premiere');
  await win('premiere').evaluate(w => { w.style.left='700px'; w.style.top='300px'; });
  const before = await win('premiere').evaluate(w => Number(w.style.zIndex));
  await win('photoshop').locator('.window-title').click();
  assert.ok(await win('photoshop').evaluate(w => Number(w.style.zIndex)) > before, 'header click raises window above previous front window');
};
cases.D05 = async ({page, open, win}) => {
  await page.setViewportSize({width:390,height:600});
  await open('notes');
  await win('notes').locator('[data-note="experience"]').click();
  const scroll = win('notes').locator('.notes-content');
  await scroll.evaluate(el => { el.scrollTop=90; });
  const before = await scroll.evaluate(el => el.scrollTop);
  assert.ok(before > 0, 'fixture has actual scrolling');
  await page.locator('#langToggle').click(); await page.waitForTimeout(250);
  assert.equal(await win('notes').locator('.note-item.active').getAttribute('data-note'), 'experience', 'language preserves Notes key');
  assert.equal(await scroll.evaluate(el => el.scrollTop), before, 'language preserves reading scroll');
  await page.locator('#langToggle').click(); await page.waitForTimeout(250);
  assert.equal(await scroll.evaluate(el => el.scrollTop), before, 'roundtrip scroll');
};
cases.M4 = async ({page, open, win}) => {
  for (const size of [{width:1440,height:1000},{width:390,height:844}]) {
    await page.setViewportSize(size);
    const launcher=page.locator('[data-open="cover"]').first();
    await open('cover');
    assert.equal(await win('cover').evaluate(w => w.contains(document.activeElement)), true, 'keyboard opening enters the non-modal window');
    await win('cover').locator('a').first().focus();
    await page.keyboard.press('Escape'); await page.waitForTimeout(220);
    assert.equal(await launcher.evaluate(el => document.activeElement===el), true, 'Escape returns focus to initiating launcher');
    await open('cover'); await win('cover').locator('.close').click(); await page.waitForTimeout(220);
    assert.equal(await launcher.evaluate(el => document.activeElement===el), true, 'Close returns focus to initiating launcher');
    await open('cover');
    await page.locator('#langToggle').focus();
    assert.equal(await page.locator('#langToggle').evaluate(el => document.activeElement===el), true, 'window is not a focus trap');
    await page.keyboard.press('Escape'); await page.waitForTimeout(220);
  }
  await page.locator('#nameBtn').focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(250);
  await win('notes').locator('.close').click(); await page.waitForTimeout(220);
  assert.equal(await page.locator('#nameBtn').evaluate(el=>document.activeElement===el), true, 'name menubar launcher also receives focus');
};
cases.tooltipRace = async ({page}) => {
  await page.evaluate(() => { const icon=document.querySelector('.dock-icon');showDockTooltip(icon);hideDockTooltip(); });
  await page.waitForTimeout(100);
};
cases.M5 = async ({page, open, win}) => {
  for (const key of ['cover','studio','live','video','cleaning','photos','notes','photoshop','premiere','flstudio']) {
    await open(key);
    const name = await win(key).locator('.window-title').textContent();
    assert.equal(await page.getByRole('region', {name, exact:true}).count(), 1, `${key}: named region linked to visible title`);
    assert.equal(await win(key).getAttribute('aria-labelledby'), await win(key).locator('.window-title').getAttribute('id'));
    assert.notEqual(await win(key).getAttribute('aria-modal'), 'true');
  }
  await page.locator('#langToggle').click(); await page.waitForTimeout(250);
  for (const region of await page.locator('.window').all()) {
    const name=await region.locator('.window-title').textContent();
    assert.equal(await page.getByRole('region', {name, exact:true}).count(), 1, 'translated accessible name stays linked');
  }
};
cases.A3 = async ({page, open, win}) => {
  await open('notes');
  const service = win('notes').locator('[data-note="services"]');
  assert.equal(await service.count(), 1, 'existing Services page is reachable from Notes');
  await service.click();
  assert.match(await win('notes').locator('.notes-content').innerText(), /WEBSITE.*DIGITAL DESIGN/);
  assert.match(await win('notes').locator('.notes-content').innerText(), /Figma/);
  await page.locator('#langToggle').click(); await page.waitForTimeout(250);
  assert.equal(await service.innerText(), 'УСЛУГИ');
  assert.equal(await service.getAttribute('class'), 'note-item active');
  assert.match(await win('notes').locator('.notes-content').innerText(), /ДИЗАЙН САЙТОВ/);
  assert.match(await win('notes').locator('.notes-content').innerText(), /Figma/);
  assert.equal(await win('notes').locator('.notes-content a[href^="mailto:"]').count(), 1);
};
cases.ROOM616 = async ({page, open, win}) => {
  assert.equal(await page.evaluate(()=>profile.experience.find(e=>e.company==='ROOM616').period), 'Oct 2023 — Present', 'source profile reflects confirmed current employment');
  const source=fs.readFileSync(path.join(root,'script.js'),'utf8');
  assert.ok(!source.includes('Oct 2023 — Sep 2026'), 'fallback Notes no obsolete end date');
  const polish=fs.readFileSync(path.join(root,'v19-final-polish.js'),'utf8');
  assert.ok(polish.includes('OCT 2023 — PRESENT') && polish.includes('ОКТ 2023 — ПО НАСТОЯЩЕЕ ВРЕМЯ'), 'v19 fallback dates EN/RU');
  await open('notes'); await win('notes').locator('[data-note="experience"]').click();
  assert.match(await win('notes').locator('.notes-content').innerText(), /2023.*PRESENT/);
  await page.locator('#langToggle').click(); await page.waitForTimeout(250);
  assert.match(await win('notes').locator('.notes-content').innerText(), /2023.*(СЕЙЧАС|НАСТОЯЩЕЕ)/);
};
cases.mediaClose = async ({page, open, win}) => {
  for (const action of ['close','escape','toggle','all']) {
    await open('live');
    await win('live').locator('video').first().evaluate(async v=>{await v.play();v.muted=false;window.__closedMedia=v;});
    if(action==='close')await win('live').locator('.close').click();
    if(action==='escape')await page.keyboard.press('Escape');
    if(action==='toggle')await open('live',false);
    if(action==='all')await page.locator('#closeAll').evaluate(el=>el.click());
    assert.equal(await page.evaluate(()=>__closedMedia.paused && __closedMedia.muted), true, `${action}: synchronously silence and pause media before removal`);
    await page.waitForTimeout(220);
    assert.equal(await win('live').count(), 0);
  }
};
cases.hiddenRerender = async ({page, open, win}) => {
  await open('live');
  await win('live').locator('video').first().evaluate(async v=>{await v.play();window.__oldMedia=v;});
  await win('live').locator('.min').click();
  await page.locator('#langToggle').click(); await page.waitForTimeout(700);
  assert.equal(await win('live').locator('video').first().evaluate(v=>v.paused && v.muted), true, 'language rerender cannot start invisible autoplay');
  assert.equal(await page.evaluate(()=>__oldMedia.paused && __oldMedia.muted), true, 'replaced media stopped');
};
cases.renderRace = async ({page, open, win}) => {
  await open('cleaning');
  await page.evaluate(()=>{
    const original=renderBody;let calls=0;
    renderBody=async data=>{const html=await original(data);const call=++calls;await new Promise(r=>setTimeout(r,call===1?450:15));return html;};
  });
  await page.locator('#langToggle').click();
  await page.locator('#langToggle').click();
  await page.waitForTimeout(650);
  assert.match(await win('cleaning').innerText(), /In development/, 'latest language wins even when earlier render resolves last');
  await page.evaluate(()=>{
    const original=wireWindowBody;window.__detachedWires=0;
    wireWindowBody=(w,d)=>{if(!w.isConnected)__detachedWires++;original(w,d);};
    document.querySelector('#langToggle').click();document.querySelector('#closeAll').click();
  });
  await page.waitForTimeout(600);
  assert.equal(await page.evaluate(()=>__detachedWires), 0, 'never initialize replaced content on a closed window');
};
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await playwright[process.env.ENGINE || 'chromium'].launch({headless:true});
  let failures = 0;
  try {
    for (const [name, test] of Object.entries(cases)) {
      if (process.env.CASE && !process.env.CASE.split(',').includes(name)) continue;
      const page = await browser.newPage({viewport:{width:1440, height:1000}});
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(()=>{window.__qaMediaErrors=[];document.addEventListener('error',e=>{if(e.target instanceof HTMLMediaElement)__qaMediaErrors.push({src:e.target.currentSrc,code:e.target.error?.code,message:e.target.error?.message});},true);});
      try {
        await page.goto(`http://127.0.0.1:${server.address().port}`);
        await page.waitForTimeout(1200);
        const win = key => page.locator(`.window[data-key="${key}"]`);
        const open = async (key, expectWindow = true) => {
          await page.locator(`[data-open="${key}"]`).first().focus();
          await page.keyboard.press('Enter');
          if (expectWindow) await win(key).locator('.window-body').waitFor();
          await page.waitForTimeout(250);
        };
        await test({page, win, open});
        assert.deepEqual(errors, [], 'no pageerror');
        console.log(`PASS ${name}`);
      } catch (error) { failures++; console.error(`FAIL ${name}: ${error.stack}`);console.error('Media diagnostics:',JSON.stringify(await page.evaluate(()=>window.__qaMediaErrors))); }
      finally { await page.close(); }
    }
  } finally {
    await browser.close(); server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
  if (failures) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
