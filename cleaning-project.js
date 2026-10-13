/* A separate project renderer; the existing OS owns icons and window lifecycle. */
(() => {
  const ru = () => localStorage.getItem('bymanjuria-lang') === 'ru';
  const tr = (en, russian) => ru() ? russian : en;
  content.cleaning = {
    get title() { return 'neatmi'; },
    type: 'cleaning'
  };

  const originalRenderBody = renderBody;
  renderBody = async function(data) {
    if (data.type !== 'cleaning') return originalRenderBody(data);
    return `<div class="v23-scroll cleaning-scroll"><div class="v23-content">
      <article class="v23-case cleaning-case">
        <header class="v23-case-head">
          <img class="v23-project-icon" src="assets/desktop/cleaning.png" alt="">
          <div><h1>${tr('Cleaning company', 'Клининговая компания')}</h1>
            <div class="v23-meta">${tr('WEBSITE · DESIGN & DEVELOPMENT', 'САЙТ · ДИЗАЙН И РАЗРАБОТКА')}</div>
          </div>
        </header>
        <div class="cleaning-status" role="status"><span aria-hidden="true"></span>${tr('In development', 'В разработке')}</div>
        <div class="v23-copy"><p>${tr(
          'A website for a cleaning company, currently in development. This screen recording shows the work in progress: page structure, visual direction and the browsing experience.',
          'Сайт клининговой компании, который сейчас находится в разработке. В записи экрана — текущая версия проекта: структура страниц, визуальное направление и взаимодействие с сайтом.'
        )}</p></div>
        <div class="v23-section-title">${tr('WEBSITE PREVIEW', 'ПРЕВЬЮ САЙТА')}</div>
        <figure class="cleaning-preview">
          <video data-no-audio src="assets/projects/cleaning/website-preview.mp4" poster="assets/projects/cleaning/poster.jpg" controls muted loop playsinline preload="metadata" aria-label="${tr('Cleaning company website preview', 'Превью сайта клининговой компании')}"></video>
        </figure>
        <p class="cleaning-caption">${tr('Work in progress — not the final release.', 'Рабочая версия — не финальный релиз.')}</p>
      </article>
    </div></div>`;
  };

  const originalGetWindowSize = getWindowSize;
  getWindowSize = function(key, data) {
    return data.type === 'cleaning' ? {width:760, height:650} : originalGetWindowSize(key, data);
  };

  function updateFolderLabel() {
    const folder = document.querySelector('.desktop-icon[data-open="cleaning"]');
    const label = folder?.querySelector(':scope > span:last-child');
    if (label) label.textContent = 'neatmi';
    folder?.setAttribute('aria-label', tr('Open cleaning company website project', 'Открыть проект сайта клининговой компании'));
  }
  updateFolderLabel();
  document.getElementById('langToggle')?.addEventListener('click', updateFolderLabel);
})();
