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
          <div><h1>NEATMI</h1>
            <div class="v23-meta">${tr('INDEPENDENT DEMO PROJECT', 'САМОСТОЯТЕЛЬНЫЙ ДЕМО-ПРОЕКТ')}</div>
          </div>
        </header>
        <div class="cleaning-status" role="status"><span aria-hidden="true"></span>${tr('Independent concept', 'Самостоятельный концепт')}</div>
        <div class="v23-copy"><p>${tr(
          'An independent demonstrational website concept for a cleaning service. It maps the booking flow from service type and rooms to an estimate and extras. The rates and request flow are not live.',
          'Самостоятельный демонстрационный концепт сайта клинингового сервиса: путь от типа уборки и комнат к расчёту и дополнениям. Тарифы условные, заявки не подключены.'
        )}</p></div>
        <div class="v23-section-title">${tr('WEBSITE PREVIEW', 'ПРЕВЬЮ САЙТА')}</div>
        <figure class="cleaning-preview">
          <video data-no-audio src="assets/projects/cleaning/website-preview.mp4" poster="assets/projects/cleaning/poster.jpg" controls muted loop playsinline preload="metadata" aria-label="${tr('Cleaning company website preview', 'Превью сайта клининговой компании')}"></video>
        </figure>
        <p class="cleaning-caption">${tr('Demonstration concept — not a client launch.', 'Демонстрационный концепт — не клиентский запуск.')}</p>
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

/* Web portfolio — confirmed work only. Kept separate from the existing project
   renderer so the desktop concept and legacy case windows stay untouched. */
(() => {
  const ru = () => localStorage.getItem('bymanjuria-lang') === 'ru';
  const tr = (en, russian) => ru() ? russian : en;
  const cases = [
    {
      id: 'memorium',
      label: 'Мемориум',
      eyebrow: ['COMMERCIAL WEBSITE', 'КОММЕРЧЕСКИЙ САЙТ'],
      title: ['Memorium — a memorial workshop website', 'Мемориум — сайт мастерской памятников'],
      summary: [
        'A commercial website for a memorial workshop. I took it from information structure and copy to interface design and front-end layout.',
        'Коммерческий сайт мастерской памятников. Я сделал полный путь: структуру и контент, дизайн интерфейса и вёрстку.'
      ],
      focus: [
        ['Trust-building structure', 'Monument configurator', 'Lead form and mobile screens'],
        ['Структура доверия', 'Конфигуратор памятника', 'Заявка и мобильные экраны']
      ],
      accent: 'stone'
    },
    {
      id: 'neatmi',
      label: 'NEATMI',
      eyebrow: ['INDEPENDENT DEMO PROJECT', 'САМОСТОЯТЕЛЬНЫЙ ДЕМО-ПРОЕКТ'],
      title: ['NEATMI — cleaning service website concept', 'NEATMI — концепт сайта клинингового сервиса'],
      summary: [
        'An independent demonstrational website concept. It maps the booking flow from service type and rooms to an estimate and extras; the rates and request flow are not live.',
        'Самостоятельный демонстрационный концепт: путь от типа уборки и комнат к расчёту и дополнениям. Тарифы условные, заявки не подключены.'
      ],
      focus: [
        ['Service selection', 'Room-plan interaction', 'Estimate and add-ons'],
        ['Выбор услуги', 'Взаимодействие с планировкой', 'Расчёт и дополнения']
      ],
      accent: 'clean'
    },
    {
      id: 'late-light',
      label: 'LATE LIGHT / LINE',
      eyebrow: ['INDEPENDENT PROTOTYPE', 'САМОСТОЯТЕЛЬНЫЙ ПРОТОТИП'],
      title: ['LATE LIGHT / LINE — interior objects showcase', 'LATE LIGHT / LINE — витрина интерьерных объектов'],
      summary: [
        'A visual catalogue with product cards, expanded states and hover transitions. The prototype uses Smart Animate interactions; it is a design prototype, not a user-tested product.',
        'Визуальный каталог с карточками объектов, развёрнутыми состояниями и hover-переходами Smart Animate. Это дизайн-прототип, а не протестированный продукт.'
      ],
      focus: [
        ['Editorial product cards', 'Hover states', 'Interactive prototype'],
        ['Редакционные карточки', 'Hover-состояния', 'Интерактивный прототип']
      ],
      accent: 'line'
    },
    {
      id: 'milk',
      label: 'MILK',
      eyebrow: ['INDEPENDENT WEBSITE STUDY', 'САМОСТОЯТЕЛЬНАЯ ВЕБ-РАБОТА'],
      title: ['Milk — beverage product cards and states', 'Milk — карточки напитков и состояния'],
      summary: [
        'An independent web study focused on product-card hierarchy, flavour states and interaction prototypes. Commercial release status is not claimed.',
        'Самостоятельная веб-работа о иерархии карточек напитков, состояниях вкусов и прототипных взаимодействиях. Коммерческий запуск не заявляется.'
      ],
      focus: [
        ['Product hierarchy', 'Flavour states', 'Card interactions'],
        ['Иерархия продукта', 'Состояния вкусов', 'Взаимодействия карточек']
      ],
      accent: 'milk'
    },
    {
      id: 'dubai-match',
      label: 'DUBAI MATCH',
      eyebrow: ['TEST ASSIGNMENT', 'ТЕСТОВОЕ ЗАДАНИЕ'],
      title: ['Dubai Match — travel social concepts', 'Dubai Match — travel-концепты для соцсетей'],
      summary: [
        'A test assignment: Russian and English Stories concepts plus a travel carousel. It is presented as a test task, not as a client contract.',
        'Тестовое задание: концепты Stories на русском и английском и туристическая карусель. Показано как тестовое, не как коммерческий контракт.'
      ],
      focus: [
        ['RU / EN adaptation', 'Stories concepts', 'Carousel structure'],
        ['Адаптация RU / EN', 'Концепты Stories', 'Структура карусели']
      ],
      accent: 'sun'
    }
  ];

  content.web = { get title() { return tr('WEB PROJECTS', 'ВЕБ-ПРОЕКТЫ'); }, type: 'web' };

  function projectIcon(type) {
    return `<div class="web-project-mark web-project-mark--${type}" aria-hidden="true"><span></span><i></i><b></b></div>`;
  }

  function caseUrl(id) { return `#web/${id}`; }

  function renderWebProjects() {
    const language = ru() ? 1 : 0;
    return `<div class="v23-scroll web-projects-scroll"><div class="v23-content web-projects-content">
      <header class="web-projects-intro">
        <div class="v23-eyebrow">${tr('WEB DESIGN · FIGMA · FRONT-END', 'ВЕБ-ДИЗАЙН · FIGMA · ВЁРСТКА')}</div>
        <h1>${tr('WEB PROJECTS', 'ВЕБ-ПРОЕКТЫ')}</h1>
        <p>${tr('Selected website work: commercial work, independent prototypes and a test assignment. Every case is marked by its real status.', 'Избранные веб-работы: коммерческий сайт, самостоятельные прототипы и тестовое задание. У каждого кейса указан его реальный статус.')}</p>
      </header>
      ${cases.map((item, index) => `<article class="web-case" id="web-${item.id}">
        <div class="web-case-visual web-case-visual--${item.accent}">${projectIcon(item.accent)}<span class="web-case-index">${String(index + 1).padStart(2, '0')}</span><strong>${esc(item.label)}</strong></div>
        <div class="web-case-copy">
          <div class="v23-eyebrow">${esc(item.eyebrow[language])}</div>
          <h2>${esc(item.title[language])}</h2>
          <p>${esc(item.summary[language])}</p>
          <div class="role-list">${item.focus[language].map(x => `<span class="role">${esc(x)}</span>`).join('')}</div>
          <a class="cta secondary web-case-link" href="${caseUrl(item.id)}">${tr('DIRECT CASE LINK ↗', 'ПРЯМАЯ ССЫЛКА НА КЕЙС ↗')}</a>
        </div>
      </article>`).join('')}
      <p class="web-projects-note">${tr('Source Figma workspaces are intentionally not linked as a whole: they include draft, third-party and sensitive material outside this public selection.', 'Исходные Figma-файлы намеренно не даны целиком: в них есть черновые, чужие и чувствительные материалы вне этой публичной подборки.')}</p>
    </div></div>`;
  }

  const originalRenderBody = renderBody;
  renderBody = async function(data) {
    if (data.type === 'web') return renderWebProjects();
    return originalRenderBody(data);
  };

  const originalGetWindowSize = getWindowSize;
  getWindowSize = function(key, data) {
    return data.type === 'web' ? { width: 1080, height: 720 } : originalGetWindowSize(key, data);
  };

  function addWebFolder() {
    if (document.querySelector('.desktop-icon[data-open="web"]')) return;
    const folder = document.createElement('button');
    folder.className = 'desktop-icon web-folder-icon';
    folder.dataset.open = 'web';
    folder.dataset.position = '42,19';
    folder.style.setProperty('--x', '42%');
    folder.style.setProperty('--y', '19%');
    folder.setAttribute('aria-label', tr('Open web projects', 'Открыть веб-проекты'));
    folder.innerHTML = `<span class="desktop-thumb web-folder-thumb" aria-hidden="true"><span>WEB</span></span><span>${tr('WEB PROJECTS', 'ВЕБ-ПРОЕКТЫ')}</span>`;
    document.getElementById('desktopIcons')?.appendChild(folder);
    // Reuse the existing click and drag conventions by cloning the event setup
    // from an established launcher through a harmless synthetic click route.
    folder.addEventListener('click', () => openWindow('web', folder));
  }

  function openCaseFromHash() {
    const match = location.hash.match(/^#web\/([a-z-]+)$/);
    if (!match || !cases.some(item => item.id === match[1])) return;
    const win = [...windows.children].find(item => item.dataset.key === 'web') || openWindow('web', document.querySelector('.desktop-icon[data-open="web"]'));
    const targetId = `web-${match[1]}`;
    const moveToCase = () => {
      const target = win?.querySelector(`#${CSS.escape(targetId)}`);
      if (target) target.scrollIntoView({ block: 'start' });
      else window.setTimeout(moveToCase, 40);
    };
    moveToCase();
  }

  addWebFolder();
  window.addEventListener('hashchange', openCaseFromHash);
  window.addEventListener('load', openCaseFromHash, { once: true });
  document.getElementById('langToggle')?.addEventListener('click', () => {
    const label = document.querySelector('.desktop-icon[data-open="web"] > span:last-child');
    if (label) label.textContent = tr('WEB PROJECTS', 'ВЕБ-ПРОЕКТЫ');
    document.querySelector('.desktop-icon[data-open="web"]')?.setAttribute('aria-label', tr('Open web projects', 'Открыть веб-проекты'));
  });
})();
