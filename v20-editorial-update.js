(() => {
  const V20_LANG_KEY = 'bymanjuria-lang';
  const v20Lang = () => localStorage.getItem(V20_LANG_KEY) === 'ru' ? 'ru' : 'en';
  const tr = (en, ru) => v20Lang() === 'ru' ? ru : en;
  const e = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const img = (src, alt='') => `<figure class="v20-media"><img src="${e(src)}" alt="${e(alt)}" loading="lazy" draggable="false"></figure>`;
  const wide = (src, alt='') => `<div class="v20-wide">${img(src, alt)}</div>`;
  const row = (items, cls='') => `<div class="v20-row ${cls}">${items.join('')}</div>`;
  const section = (en, ru) => `<div class="v20-section-title">${tr(en,ru)}</div>`;
  const soundVideo = (src, label='') => `<div class="v19-ambient v20-video"><video src="${e(src)}" aria-label="${e(label)}" autoplay muted loop playsinline preload="metadata"></video><button class="v19-sound" type="button">${tr('SOUND OFF','ЗВУК ВЫКЛ')}</button></div>`;
  const caseHeader = (title, meta, icon='assets/live/icns.png') => `<header class="v20-case-head"><img class="v20-project-icon" src="${icon}" onerror="this.style.display='none'" alt=""><div><h1>${title}</h1><div class="v20-meta">${meta}</div></div></header>`;

  renderEvents = async function(){
    const extraA='assets/live/offtop3/7aL7joHFlcHu7n6XEXT5hftEfoBroLVi7VxNMvtWzvYz-nmbxihciYO67hIIv6NQrqbzPQdTfEXz4qdi5U4jkQqx.jpg';
    const extraB='assets/live/offtop3/Gnh535bOgh7gTQ60rixeeli94aa8RPUvxhe9hJTlcYGZZ9KpqVfXkwaB0CXNZ7xcjLF-itCDH6V3EZcGToQQVYtw.jpg';
    const extraC='assets/live/offtop3/SiIYSmporJJCN5LaH6aHQGO1ukQmdeY736zIJEUGdrpeQHC5u5AxOnVLxHnEznWlrbGedUaGbPXrdQWR0XkUW53B.jpg';
    return `<div class="v20-scroll v20-live">
      <section class="v20-live-intro">
        <div class="v20-eyebrow">EVENT &amp; LIVE · 2024—2026</div>
        <h1>OFFTOP</h1>
        <p>${tr('OFFTOP is a series of independent live events I helped build and organize across three consecutive years. My work covered both the creative and practical sides of production — artist coordination, venue setup, backstage operations, merchandise, content, performance and the many small decisions required to turn an idea into a real event.','OFFTOP — серия независимых концертных мероприятий, которые я помогал создавать и организовывать на протяжении трёх лет. Моя работа охватывала как творческую, так и организационную сторону проекта: координацию артистов, подготовку площадки, backstage, мерч, контент, собственные выступления и множество небольших задач, из которых в итоге складывается настоящее мероприятие.')}</p>
        <div class="v20-timeline"><span>01 · ACTION · 2024</span><span>02 · LINZA · 2025</span><span>03 · FACTORY 3 · 2026</span></div>
      </section>

      <article class="v20-case" id="offtop1">
        ${caseHeader('OFFTOP 01 — ACTION CLUB', `2024 · ${tr('ORGANIZER / PERFORMER','ОРГАНИЗАТОР / АРТИСТ')}`)}
        <div class="v20-hero">${img('assets/live/offtop1/offtop-01-hero.JPG','OFFTOP 1')}</div>
        <div class="v20-copy"><p>${tr('The first OFFTOP was where I learned the event from the inside: venue setup and teardown, artist care, merchandise, backstage work and my own performance. My focus here was event operations and live production; the visual identity was not my design.','Первый OFFTOP стал для меня опытом работы с событием изнутри: монтаж и демонтаж площадки, работа с артистами, мерч, backstage и собственное выступление. Здесь мой фокус был на организации и live-продакшне; визуальный дизайн мероприятия делал не я.')}</p></div>
        ${section('EVENT MATERIALS','МАТЕРИАЛЫ СОБЫТИЯ')}
        ${row([img('assets/live/offtop1/offtop-01-poster-01.jpg'),img('assets/live/offtop1/offtop-01-poster-02.jpg')],'v20-2')}
        ${section('LIVE / ATMOSPHERE','LIVE / АТМОСФЕРА')}
        ${row([img('assets/live/offtop1/offtop-01-photo-01.JPG'),img('assets/live/offtop1/offtop-01-photo-02.jpg')],'v20-7-5')}
        ${wide('assets/live/offtop1/offtop-01-photo-03.jpg')}
        ${row([img('assets/live/offtop1/offtop-01-merch-02jpg.jpg'),img('assets/live/offtop1/offtop-01-merch-03.jpg')],'v20-5-7')}
        ${soundVideo('assets/live/offtop1/offtop-01-video-01.MP4','OFFTOP 1 live video')}
        ${wide('assets/live/offtop1/offtop-01-photo-04.jpeg')}
        ${soundVideo('assets/live/offtop1/offtop-01-video-03.mp4','OFFTOP 1 recap')}
      </article>

      <article class="v20-case v20-featured" id="offtop2">
        ${caseHeader('OFFTOP 02 — LINZA', `2025 · ${tr('ORGANIZER / PRODUCER / PERFORMER / VISUAL DESIGN','ОРГАНИЗАТОР / ПРОДЮСЕР / АРТИСТ / ВИЗУАЛЬНЫЙ ДИЗАЙН')}`)}
        <div class="v20-hero">${img('assets/live/offtop2/offtop-02-hero.jpg','OFFTOP 2')}</div>
        <div class="v20-copy"><p>${tr('OFFTOP 2 expanded my role from event operations into a full creative-production workflow. I worked with the artists and venue, performed, created the visual materials and merchandise, and helped connect the live event with ROOM616 through a free recording zone.','Во втором OFFTOP моя роль выросла от организационной работы до полноценного креативного продакшна. Я работал с артистами и площадкой, выступал, делал визуальные материалы и мерч, а также связал концерт с ROOM616 через бесплатную зону записи.')}</p></div>
        ${section('VISUAL IDENTITY','ВИЗУАЛЬНАЯ СИСТЕМА')}
        ${row([img('assets/live/offtop2/offtop-02-poster-01.jpg'),img('assets/live/offtop2/offtop-02-poster-02.jpg')],'v20-2')}
        ${row([img('assets/live/offtop2/offtop-02-poster-03.jpg'),img('assets/live/offtop2/offtop-02-poster-04.jpg')],'v20-2')}
        ${section('MERCH','МЕРЧ')}
        ${row([img('assets/live/offtop2/offtop-02-merch-01.jpg'),img('assets/live/offtop2/offtop-02-merch-03.jpg')],'v20-2')}
        ${wide('assets/live/offtop2/offtop-02-merch-04.png')}
        <div class="v20-substory"><div class="v20-substory-label">${tr('FREE RECORDING ZONE','ЗОНА ЗАПИСИ')}</div><p>${tr('We added a free recording area directly inside the event, connecting the live show with ROOM616 and giving artists another way to interact with the project. I handled recording and production in the zone.','Внутри мероприятия мы организовали бесплатную зону записи ROOM616, объединив концерт и студийную часть проекта в одном пространстве. Я отвечал за запись и продакшн в этой зоне.')}</p></div>
        ${row([img('assets/live/offtop2/offtop-02-photo-01.jpg'),img('assets/live/offtop2/offtop-02-photo-06.jpg')],'v20-2')}
        ${wide('assets/live/offtop2/offtop-02-photo-04.jpg')}
        ${section('LIVE','LIVE')}
        ${row([img('assets/live/offtop2/offtop-02-photo-05.jpg'),img('assets/live/offtop2/offtop-02-photo-07.jpg')],'v20-5-7')}
        ${wide('assets/live/offtop2/offtop-02-photo-03.jpg')}
        ${row([img('assets/live/offtop2/offtop-02-photo-08.jpg'),img('assets/live/offtop2/offtop-02-photo-02.jpg')],'v20-7-5')}
        ${soundVideo('assets/live/offtop2/offtop-02-video-01.MP4','OFFTOP 2 live video')}
      </article>

      <article class="v20-case" id="offtop3">
        ${caseHeader('OFFTOP 03 — FACTORY 3', `2026 · ${tr('ORGANIZER / PERFORMER','ОРГАНИЗАТОР / АРТИСТ')}`)}
        <div class="v20-hero">${img('assets/live/offtop3/offtop-03-hero.jpeg','OFFTOP 3')}</div>
        <div class="v20-copy"><p>${tr('The third OFFTOP continued the series at a larger live venue. My responsibility was event operations, artist coordination, merchandise and performance. As with OFFTOP 1, the event visual identity itself was not my design.','Третий OFFTOP продолжил серию уже на более крупной live-площадке. Я отвечал за организационную часть, координацию артистов, мерч и собственное выступление. Как и в OFFTOP 1, визуальный стиль самого мероприятия делал не я.')}</p></div>
        ${section('EVENT MATERIALS','МАТЕРИАЛЫ СОБЫТИЯ')}
        ${row([img('assets/live/offtop3/offtop-03-poster-01.jpg'),img('assets/live/offtop3/offtop-03-poster-02.jpg')],'v20-2')}
        <div class="v20-diptych">${img('assets/live/offtop3/offtop-03-poster-03.jpeg')}${img('assets/live/offtop3/offtop-03-poster-04.jpeg')}</div>
        ${section('EVENT / SPACE','СОБЫТИЕ / ПРОСТРАНСТВО')}
        ${wide(extraB)}
        ${row([img(extraC),img('assets/live/offtop3/offtop-03-photo-04.jpeg')],'v20-5-7')}
        ${section('LIVE','LIVE')}
        <div class="v20-composite"><div>${img('assets/live/offtop3/offtop-03-photo-01.jpg')}</div><div>${img('assets/live/offtop3/offtop-03-photo-02.jpg')}${img(extraA)}</div></div>
        ${row([img('assets/live/offtop3/offtop-03-photo-06.jpeg'),img('assets/live/offtop3/offtop-03-photo-05.jpg')],'v20-7-5')}
        ${wide('assets/live/offtop3/offtop-03-photo-07.jpeg')}
        ${row([img('assets/live/offtop3/offtop-03-photo-08.jpeg'),img('assets/live/offtop3/photo_2026-09-25 18.20.38.jpeg')],'v20-2')}
        ${wide('assets/live/offtop3/photo_2026-09-25 18.20.57.jpeg')}
      </article>
    </div>`;
  };

  renderStudio = async function(){
    return `<div class="v20-scroll"><article class="v20-case v20-studio">
      ${caseHeader('ROOM616', `2023 — ${tr('PRESENT','СЕЙЧАС')} · ${tr('CREATIVE PRODUCER / STUDIO MANAGEMENT','КРЕАТИВНЫЙ ПРОДЮСЕР / УПРАВЛЕНИЕ СТУДИЕЙ')}`, 'assets/desktop/studio.png')}
      <div class="v20-studio-lead"><h2>${tr('A RECORDING STUDIO AS A CREATIVE BUSINESS','СТУДИЯ ЗВУКОЗАПИСИ КАК КРЕАТИВНЫЙ БИЗНЕС')}</h2><p>${tr('ROOM616 is the project where most of my disciplines come together. Since 2023, I have been involved in the studio’s day-to-day development: recording and producing artists, visual content and cover art, shooting and editing, promotion, team coordination, hiring sound engineers, studio improvements, events and livestreams.','ROOM616 — проект, в котором сошлось большинство моих направлений. С 2023 года я занимаюсь ежедневным развитием студии: записываю и продюсирую артистов, создаю визуальный контент и обложки, снимаю и монтирую, занимаюсь продвижением, координацией команды, поиском звукорежиссёров, развитием пространства, мероприятиями и трансляциями.')}</p><p>${tr('My role sits between creative production and operations. I can work directly with an artist on a track and its visual identity while also thinking about how the studio itself should function, communicate and grow.','Моя роль находится между креативным продакшном и операционным управлением. Я могу работать с артистом над треком и его визуальной идентичностью и одновременно думать о том, как должна работать, коммуницировать и развиваться сама студия.')}</p></div>
      <div class="v20-hero">${img('assets/studio/studio-hero.png','ROOM616')}</div>
      ${section('SELECTED PROCESS','ПРОЦЕСС')}
      ${row([img('assets/studio/studio-photo-01.jpg'),img('assets/studio/studio-photo-02.jpg')],'v20-7-5')}
      ${wide('assets/studio/studio-photo-03.JPG')}
      ${row([img('assets/studio/studio-photo-04.JPG'),img('assets/studio/studio-photo-05.JPG')],'v20-5-7')}
    </article></div>`;
  };

  renderVideos = async function(){
    return `<div class="v20-scroll v20-video-page">
      <section class="v20-live-intro"><div class="v20-eyebrow">VIDEO / MOVING IMAGE</div><h1>${tr('VIDEO WORK','ВИДЕО')}</h1><p>${tr('Music video, short-form promotion and social content — usually built as part of the same visual system as the music around it.','Клипы, короткие промо и социальный контент — обычно как часть той же визуальной системы, в которой существует сама музыка.')}</p></section>
      <article class="v20-case"><div class="v20-meta">2025 · ${tr('DIRECTOR / EDITOR / PRODUCER / MUSIC','РЕЖИССЁР / МОНТАЖ / ПРОДЮСЕР / МУЗЫКА')}</div><h1>SMALL TALK</h1><div class="v19-youtube"><iframe src="https://www.youtube.com/embed/l4vY2bZz73o?autoplay=1&mute=1&loop=1&playlist=l4vY2bZz73o&playsinline=1&rel=0" title="SMALL TALK" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><a href="https://www.youtube.com/watch?v=l4vY2bZz73o" target="_blank" rel="noreferrer">${tr('OPEN ON YOUTUBE ↗','ОТКРЫТЬ В YOUTUBE ↗')}</a></div><div class="v20-copy"><p>${tr('A fully self-produced music video — music, concept, shooting, direction, editing and final visual presentation.','Полностью самостоятельный музыкальный видеопроект: музыка, концепция, съёмка, режиссура, монтаж и финальная визуальная подача.')}</p></div></article>
      <article class="v20-case"><div class="v20-meta">2026 · ${tr('DIRECTOR / PRODUCER / EDITOR','РЕЖИССЁР / ПРОДЮСЕР / МОНТАЖ')}</div><h1>APPERCOT — PROMO CLIP</h1>${soundVideo('assets/video/video-appercot.mp4','Appercot promo')}<div class="v20-copy"><p>${tr('A short-form promo created around the release and designed for social distribution.','Короткое промо, созданное вокруг релиза и рассчитанное на распространение в социальных сетях.')}</p></div></article>
      <article class="v20-case"><div class="v20-meta">2025 · ${tr('DIRECTOR / PRODUCER / EDITOR','РЕЖИССЁР / ПРОДЮСЕР / МОНТАЖ')}</div><h1>YOUR HEART — PROMO CLIP</h1>${soundVideo('assets/video/video-yourheart.MP4','Your Heart promo')}<div class="v20-copy"><p>${tr('A compact visual campaign piece connecting the track’s identity with short-form social content.','Компактный визуальный промо-материал, связывающий идентичность трека с коротким социальным контентом.')}</p></div></article>
    </div>`;
  };

  notePages = function(){
    const skillRows = v20Lang()==='ru' ? [
      ['КРЕАТИВ','Креативное направление','Графический / обложечный дизайн','Контент-концепции'],
      ['ПРОДАКШН','Видео-продакшн','Музыкальный продакшн','Запись / сведение'],
      ['УПРАВЛЕНИЕ','Координация проектов','Управление студией','Продакшн live-событий']
    ] : [
      ['CREATIVE','Creative Direction','Graphic / Cover Design','Content Concepts'],
      ['PRODUCTION','Video Production','Music Production','Recording / Mixing'],
      ['MANAGEMENT','Project Coordination','Studio Management','Live Event Production']
    ];
    const skillGrid = `<div class="v20-skill-groups">${skillRows.map(g=>`<section><h3>${g[0]}</h3>${g.slice(1).map(x=>`<div>${x}</div>`).join('')}</section>`).join('')}</div>`;
    return {
      overview:{title:tr('Overview','Обзор'),html:`<div class="note-meta">BYMANJURIA · CV / PORTFOLIO</div><h1>BYMANJURIA</h1><p class="note-lead">${tr('CREATIVE PRODUCER / CONTENT SPECIALIST','КРЕАТИВНЫЙ ПРОДЮСЕР / CONTENT SPECIALIST')}</p><p>${tr('I’m a creative producer and content specialist working across visual design, video, music and live events. For the last three years, I’ve been developing ROOM616, a recording studio in central Saint Petersburg, where my work combines creative production with the practical side of running a project — clients, artists, content, team coordination, promotion and events.','Я креативный продюсер и контент-специалист, работающий на стыке визуального дизайна, видео, музыки и live-проектов. Последние три года я развиваю ROOM616 — студию звукозаписи в центре Санкт-Петербурга, где творческий продакшн соединяется с практической работой над проектом: клиентами, артистами, контентом, командой, продвижением и мероприятиями.')}</p><p>${tr('I’m used to taking ideas from the first conversation to a finished result: shaping the visual direction, organizing the process, creating the content and making sure the final product works in the real world. My background in music production affects the way I work with visual projects — I care about atmosphere, rhythm, detail and the overall identity rather than treating design, video and sound as separate things.','Я привык работать с проектом от первой идеи до готового результата: сформировать визуальное направление, организовать процесс, создать контент и довести всё до состояния, в котором оно работает не только красиво, но и на практике. Опыт музыкального продакшна влияет и на мою визуальную работу — для меня важны атмосфера, ритм, детали и общая идентичность проекта, а не отдельные дизайн, видео или звук сами по себе.')}</p><div class="v20-location">${e(profile.locations)}</div><div class="note-links"><a href="${links.resume}" download="ByManjuria-CV.pdf">${tr('DOWNLOAD CV ↓','СКАЧАТЬ CV ↓')}</a><a href="${links.behance}" target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="${links.youtube}" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div>`},
      services:{title:tr('Services','Услуги'),html:`<h1>${tr('SERVICES','УСЛУГИ')}</h1><p class="note-lead">${tr('Available for selected creative projects and collaborations.','Открыт к избранным креативным проектам и коллаборациям.')}</p><div class="v20-service-list"><section><h2>${tr('VISUAL IDENTITY','ВИЗУАЛЬНАЯ ИДЕНТИЧНОСТЬ')}</h2><p>${tr('Cover art, posters, merchandise, release visuals and flexible visual systems for artists and brands.','Обложки, постеры, мерч, визуалы для релизов и гибкие визуальные системы для артистов и брендов.')}</p></section><section><h2>${tr('WEBSITES & DIGITAL','САЙТЫ И DIGITAL')}</h2><p>${tr('Portfolio sites and focused promotional pages — from visual direction to a working public result.','Портфолио-сайты и точечные промо-страницы — от визуального направления до готового публичного результата.')}</p></section><section><h2>${tr('CONTENT & PRODUCTION','КОНТЕНТ И ПРОДАКШН')}</h2><p>${tr('Music video, short-form content, creative production and project coordination for releases, events and campaigns.','Клипы, короткий контент, креативный продакшн и координация проектов для релизов, событий и кампаний.')}</p></section></div><p>${tr('For a project, send a short brief, timeline and references by email or Telegram.','Для проекта пришлите короткий бриф, сроки и референсы на почту или в Telegram.')}</p><div class="note-links"><a href="${links.email}">${tr('EMAIL ME ↗','НАПИСАТЬ НА ПОЧТУ ↗')}</a><a href="${links.telegram}" target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>`},
      experience:{title:tr('Experience','Опыт'),html:`<h1>${tr('EXPERIENCE','ОПЫТ')}</h1><h2>ROOM616 — ${tr('CREATIVE PRODUCER / STUDIO MANAGEMENT','КРЕАТИВНЫЙ ПРОДЮСЕР / УПРАВЛЕНИЕ СТУДИЕЙ')}</h2><div class="note-meta">2023 — ${tr('PRESENT','СЕЙЧАС')} · SAINT-PETERSBURG</div><p>${tr('My main long-term creative project: artist recording and production, visual content, cover art, shooting and editing, promotion, team coordination, studio operations, events and livestreams.','Мой основной долгосрочный креативный проект: запись и продюсирование артистов, визуальный контент, обложки, съёмка и монтаж, продвижение, координация команды, управление студией, мероприятия и трансляции.')}</p><h2>${tr('ADDITIONAL EXPERIENCE','ДОПОЛНИТЕЛЬНЫЙ ОПЫТ')}</h2><div class="v20-small-experience"><strong>ProService — ${tr('Purchasing Manager','Менеджер по закупкам')}</strong><span>2022—2024</span><p>${tr('Procurement, suppliers, orders, documentation and delivery coordination.','Закупки, поставщики, заказы, документация и координация поставок.')}</p><strong>Yandex Lavka — ${tr('Logistics Specialist','Специалист по логистике')}</strong><span>2025—2026</span><p>${tr('Logistics operations, documentation and order fulfilment.','Логистические процессы, документация и выполнение заказов.')}</p></div>`},
      studio:{title:'ROOM616',html:`<h1>ROOM616</h1><div class="note-meta">2023 — ${tr('PRESENT · CENTRAL SAINT-PETERSBURG','СЕЙЧАС · ЦЕНТР САНКТ-ПЕТЕРБУРГА')}</div><p>${tr('ROOM616 is the project where most of my disciplines come together. My role sits between creative production and operations: I can work directly with an artist on a track and its visual identity while also thinking about how the studio itself should function, communicate and grow.','ROOM616 — проект, в котором сошлось большинство моих направлений. Моя роль находится между креативным продакшном и операционным управлением: я могу работать с артистом над треком и визуальной идентичностью и одновременно думать о том, как должна работать, коммуницировать и развиваться сама студия.')}</p><ul><li>${tr('Recording / music production / mixing','Запись / музыкальный продакшн / сведение')}</li><li>${tr('Visual content / cover art / shooting / editing','Визуальный контент / обложки / съёмка / монтаж')}</li><li>${tr('Team coordination / hiring / studio operations','Координация команды / найм / управление студией')}</li><li>${tr('Promotion / events / livestreams','Продвижение / мероприятия / трансляции')}</li></ul>`},
      skills:{title:tr('Skills','Навыки'),html:`<h1>${tr('CORE SKILLS','КЛЮЧЕВЫЕ НАВЫКИ')}</h1>${skillGrid}<h2>TOOLS</h2><div class="note-skill-list">${['Adobe Photoshop','Adobe Premiere Pro','FL Studio','AI Tools','HTML / Web Layout'].map(s=>`<span class="role">${s}</span>`).join('')}</div>`},
      education:{title:tr('Education','Образование'),html:`<h1>${tr('EDUCATION','ОБРАЗОВАНИЕ')}</h1><h2>${tr('INFORMATION SYSTEMS AND PROGRAMMING / APPLIED INFORMATICS','ИНФОРМАЦИОННЫЕ СИСТЕМЫ И ПРОГРАММИРОВАНИЕ / ПРИКЛАДНАЯ ИНФОРМАТИКА')}</h2><div class="note-meta">2019—2022 · SAINT-PETERSBURG</div><p>${tr('St. Petersburg University of Management Technologies and Economics. The technical background gave me experience with HTML/web layout and a practical approach to researching and solving digital problems with modern AI-assisted tools.','Санкт-Петербургский университет технологий управления и экономики. Техническая база дала мне опыт HTML-вёрстки и практический подход к поиску и решению цифровых задач с современными AI-инструментами.')}</p>`},
      contacts:{title:tr('Contacts','Контакты'),html:`<h1>${tr('GET IN TOUCH','СВЯЗАТЬСЯ')}</h1><p class="note-lead">${tr('For collaborations, freelance work and creative roles, the fastest way to reach me is email or Telegram.','Для коллабораций, фриланс-задач и креативных ролей быстрее всего написать мне на почту или в Telegram.')}</p><p><a class="v20-contact-email" href="${links.email}">${e(profile.email)}</a></p><p>${e(profile.locations)}</p><div class="note-links"><a href="${links.email}">${tr('EMAIL ↗','ПОЧТА ↗')}</a><a href="${links.telegram}" target="_blank" rel="noopener noreferrer">Telegram ↗</a><a href="${links.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="${links.behance}" target="_blank" rel="noopener noreferrer">Behance ↗</a></div>`}
    };
  };

  function applyV20Static(){
    const role=document.querySelector('.menu-label');
    if(role) role.textContent=tr('Creative Producer / Content Specialist','Креативный продюсер / Content Specialist');
    const bootRole=document.querySelector('.boot-role');
    const bootFields=document.querySelector('.boot-fields');
    if(bootRole) bootRole.textContent=tr('CREATIVE PRODUCER / CONTENT SPECIALIST','КРЕАТИВНЫЙ ПРОДЮСЕР / CONTENT SPECIALIST');
    if(bootFields) bootFields.textContent=tr('VISUAL DESIGN · VIDEO · MUSIC · LIVE','ДИЗАЙН · ВИДЕО · МУЗЫКА · LIVE');
  }
  document.getElementById('langToggle')?.addEventListener('click',()=>queueMicrotask(applyV20Static));
  applyV20Static();
})();
