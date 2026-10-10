/* Production guardrails for the static portfolio.
   This file owns the small amount of cross-page state left after retiring the
   intermediate visual passes. */
(() => {
  const LANG_KEY = 'bymanjuria-lang';
  const windows = document.getElementById('windows');
  const languageButton = document.getElementById('langToggle');

  const language = () => localStorage.getItem(LANG_KEY) === 'ru' ? 'ru' : 'en';
  const syncLanguageChrome = () => {
    const ru = language() === 'ru';
    document.documentElement.lang = ru ? 'ru' : 'en';
    languageButton?.setAttribute('aria-label', ru ? 'Сменить язык' : 'Switch language');
    languageButton?.setAttribute('title', ru ? 'Сменить язык' : 'Switch language');
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      const labels = {cover:['COVER','ОБЛОЖКИ'], studio:['STUDIO','СТУДИЯ'], live:['EVENT & LIVE','СОБЫТИЯ & LIVE'], video:['VIDEO','ВИДЕО']};
      const label = labels[icon.dataset.open];
      const text = icon.querySelector(':scope > span:last-child');
      if (label && text) text.textContent = ru ? label[1] : label[0];
    });
  };

  let renderVersion = 0;
  const rerenderWindows = async () => {
    const version = ++renderVersion;
    const snapshot = [...(windows?.querySelectorAll('.window') || [])];
    for (const win of snapshot) {
      const data = content[win.dataset.key];
      const body = win.querySelector('.window-body');
      if (!data || !body) continue;
      try {
        const html = await renderBody(data);
        if (version !== renderVersion || !win.isConnected) return;
        body.innerHTML = html;
        wireWindowBody(win, data);
      } catch (_) {
        body.textContent = language() === 'ru' ? 'Не удалось обновить этот раздел.' : 'Could not update this section.';
      }
    }
  };

  const hardenExternalLinks = root => {
    const links = [];
    if (root.matches?.('a[target="_blank"]')) links.push(root);
    root.querySelectorAll?.('a[target="_blank"]').forEach(link => links.push(link));
    links.forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  };

  document.addEventListener('error', event => {
    const media = event.target;
    if (!(media instanceof HTMLImageElement || media instanceof HTMLVideoElement)) return;
    if ((media instanceof HTMLVideoElement && media.dataset.videoFallback) ||
        (media instanceof HTMLImageElement && media.dataset.imageFallback)) {
      window.v23MediaError?.(media);
      return;
    }
    if (!(media instanceof HTMLImageElement)) return;
    if (media.dataset.mediaFallback === 'placeholder') {
      media.hidden = true;
      const placeholder = media.nextElementSibling;
      if (placeholder?.classList.contains('card-placeholder')) placeholder.hidden = false;
    }
    if (media.hasAttribute('data-remove-on-error')) media.closest('figure')?.remove();
    if (media.hasAttribute('data-hide-on-error')) media.hidden = true;
  }, true);
  hardenExternalLinks(document);

  // Capture phase ensures all later legacy listeners read the new language.
  languageButton?.addEventListener('click', event => {
    event.preventDefault();
    localStorage.setItem(LANG_KEY, language() === 'ru' ? 'en' : 'ru');
    syncLanguageChrome();
    queueMicrotask(rerenderWindows);
  }, true);
  syncLanguageChrome();

  // Do not continue decoding media after a window is closed or replaced.
  new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.removedNodes) {
        if (node.nodeType !== 1) continue;
        node.querySelectorAll?.('video').forEach(video => {
          video.pause();
          video.removeAttribute('src');
          video.load();
        });
      }
      for (const node of record.addedNodes) {
        if (node.nodeType === 1) hardenExternalLinks(node);
      }
    }
  }).observe(windows, {childList:true, subtree:true});
})();
