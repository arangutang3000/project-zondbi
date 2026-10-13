// Run: NODE_PATH=<playwright node_modules> node tests/cleaning-project.cjs
// Uses Playwright Chromium; serves the real portfolio without a build step.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.mp4':'video/mp4'};
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, bytes) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream'}); res.end(bytes);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless:true});
    const page = await browser.newPage({viewport:{width:1440, height:1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForTimeout(1500);
    const folder = page.locator('.desktop-icon[data-open="cleaning"]');
    assert.equal(await folder.count(), 1, 'neatmi desktop folder must be integrated');
    assert.equal((await folder.innerText()).trim(), 'neatmi');
    assert.equal(await folder.locator('img').getAttribute('alt'), 'neatmi');
    assert.equal(await folder.locator('img').getAttribute('src'), 'assets/desktop/cleaning.png');
    await folder.click();
    const win = page.locator('.window[data-key="cleaning"]');
    async function assertSilentPlayback(stage) {
      const video = win.locator('video');
      await video.waitFor();
      // Let the shared MutationObserver enhance any inserted project media.
      await page.waitForTimeout(100);
      assert.equal(await win.locator('.sound-switch').count(), 0, `${stage}: no sound switch for silent screencast`);
      assert.equal(await video.getAttribute('data-no-audio'), '', `${stage}: explicit silent-media flag`);
      assert.equal(await win.locator('.window-title').innerText(), 'neatmi');
      const before = await video.evaluate(async v => { await v.play(); return v.currentTime; });
      await page.waitForFunction(start => {
        const v = document.querySelector('.window[data-key="cleaning"] video');
        return v && !v.paused && v.currentTime > start + 0.2;
      }, before, {timeout:10000});
      const after = await video.evaluate(v => v.currentTime);
      console.log(`PASS ${stage}: playback ${before.toFixed(3)} → ${after.toFixed(3)}s, no sound-switch`);
    }
    await assertSilentPlayback('initial EN open');
    await win.locator('video').waitFor();
    assert.match(await win.innerText(), /In development/);
    assert.match(await win.innerText(), /Cleaning company/i);
    const video = win.locator('video');
    assert.equal(await video.getAttribute('src'), 'assets/projects/cleaning/website-preview.mp4');
    assert.equal(await video.getAttribute('poster'), 'assets/projects/cleaning/poster.jpg');
    assert.equal(await video.evaluate(v => v.controls && v.muted && v.playsInline), true);
    // Existing renderers and window lifecycle remain in use.
    assert.equal(await win.locator('.traffic button').count(), 3);
    await win.locator('.max').click();
    assert.equal(await win.evaluate(w => w.classList.contains('maximized')), true);
    await win.locator('.max').click();
    await page.locator('#langToggle').click();
    await page.waitForTimeout(250);
    assert.match(await win.innerText(), /В разработке/);
    assert.match(await win.innerText(), /Клининговая компания/i);
    await assertSilentPlayback('RU language rerender');
    assert.equal(await win.locator('.window-title').innerText(), 'neatmi');
    assert.equal((await folder.innerText()).trim(), 'neatmi');
    await win.locator('.close').click();
    await page.waitForTimeout(220);
    assert.equal(await win.count(), 0);
    await folder.click();
    await win.locator('video').waitFor();
    assert.match(await win.innerText(), /В разработке/);
    await assertSilentPlayback('RU reopen');
    await win.locator('.close').click();
    await page.waitForTimeout(220);
    await page.locator('.desktop-icon[data-open="cover"]').click();
    await page.locator('.window[data-key="cover"] .window-body article').first().waitFor();
    await page.locator('.desktop-icon[data-open="live"]').click();
    const live = page.locator('.window[data-key="live"]');
    await live.locator('.sound-switch').first().waitFor({state:'attached'});
    const liveVideo = live.locator('video').first();
    assert.equal(await liveVideo.getAttribute('data-no-audio'), null, 'Other project videos are not flagged silent');
    assert.equal(await liveVideo.evaluate(v => v.parentElement.querySelectorAll('.sound-switch').length), 1, 'Other project retains sound switch');
    await liveVideo.evaluate(v => v.parentElement.querySelector('.sound-switch').click());
    assert.equal(await liveVideo.evaluate(v => v.muted), false, 'Other project sound can still be enabled');
    console.log('PASS existing LIVE video: sound switch retained and enables audio');
    await page.locator('#closeAll').evaluate(button => button.click());
    await page.waitForTimeout(220);
    assert.equal(await page.locator('.window').count(), 0);
    await page.setViewportSize({width:390, height:844});
    await folder.click();
    await win.locator('video').waitFor();
    const bounds = await win.boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 391, 'Window fits phone width');
    assert.equal(await win.locator('.v23-scroll').evaluate(el => el.scrollWidth <= el.clientWidth + 1), true, 'No horizontal content overflow');
    const header = await win.locator('.window-header').boundingBox();
    const content = await win.locator('.v23-case-head').boundingBox();
    assert.ok(content.y >= header.y + header.height, 'Project content clears title bar');
    await page.locator('#langToggle').click();
    await page.waitForTimeout(250);
    assert.match(await win.innerText(), /In development/);
    await assertSilentPlayback('mobile EN language rerender');
    assert.equal(await win.locator('.window-title').innerText(), 'neatmi');
    assert.deepEqual(errors, [], 'No JavaScript runtime errors');
    console.log('PASS cleaning integration: desktop, media, EN/RU, close/reopen/maximize, existing COVER, close-all, mobile safe area');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
