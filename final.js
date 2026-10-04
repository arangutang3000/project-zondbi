(() => {
  const ru = () => localStorage.getItem('bymanjuria-lang') === 'ru';
  const legacy = '.v15-sound,.v16-sound,.v18-sound,.v19-sound,.v23-sound';
  const registered = new WeakSet();
  function setup(video) {
    if (registered.has(video)) return;
    registered.add(video);
    const wrap = video.parentElement;
    wrap.querySelectorAll(legacy).forEach(b => b.remove());
    wrap.classList.add('sound-container');
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.className = 'sound-switch';
    toggle.setAttribute('role', 'switch');
    toggle.innerHTML = '<span class="sound-track" aria-hidden="true"><span></span></span><span class="sound-label"></span>';
    const label = toggle.querySelector('.sound-label');
    function sync() {
      const on = !video.muted && video.volume > 0;
      toggle.setAttribute('aria-checked', String(on));
      toggle.setAttribute('aria-label', ru() ? 'Звук видео' : 'Video sound');
      const text = ru() ? (on ? 'Звук вкл' : 'Звук выкл') : (on ? 'Sound on' : 'Sound off');
      if (label.textContent !== text) label.textContent = text;
    }
    toggle.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const enable = video.muted || video.volume === 0;
      if (enable) {
        document.querySelectorAll('.window video').forEach(other => {
          if (other !== video) other.muted = true;
        });
        video.volume = 1;
      }
      video.muted = !enable;
      sync();
      if (enable) video.play().catch(() => { video.muted = true; sync(); });
    });
    video.addEventListener('volumechange', sync);
    wrap.appendChild(toggle); sync();
  }
  function enhance(root) {
    if (root.matches?.('.window video')) setup(root);
    root.querySelectorAll?.('.window video').forEach(setup);
  }
  enhance(document);
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === 1) enhance(node);
    }
  }).observe(document.getElementById('windows'), {subtree:true, childList:true});
  // Remove authoring controls after the original scripts finish initialization.
  ['changeWallpaper','customizeIcons','customizeDockIcons','uploadPhotos','resetIconPositions',
   'iconCustomizer','dockCustomizer','uploadCustomizer','wallpaperPicker','iconPicker',
   'dockIconPicker','portfolioUploadPicker','assetsFolderPicker'].forEach(id => document.getElementById(id)?.remove());
  inlineUpload = () => '';
  const credit = document.createElement('div');
  credit.className = 'site-credit';
  const updateCredit = () => { credit.textContent = ru() ? 'Сайт создан ByManjuria' : 'Website created by ByManjuria'; };
  updateCredit(); document.getElementById('desktop').appendChild(credit);
  const updateProjectWidget = () => {
    const russian = ru();
    document.querySelectorAll('.project-widget [data-en]').forEach(el => {
      el.textContent = russian ? el.dataset.ru : el.dataset.en;
    });
  };
  updateProjectWidget();
  document.getElementById('langToggle')?.addEventListener('click', () => { updateCredit(); updateProjectWidget(); });
})();
