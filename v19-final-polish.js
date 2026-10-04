(() => {
  const LANG_KEY='bymanjuria-lang';
  let lang=localStorage.getItem(LANG_KEY)==='ru'?'ru':'en';
  const t=(en,ru)=>lang==='ru'?ru:en;
  const esc19=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const roleRU={
    'Cover Art':'ОБЛОЖКА','Typography':'ТИПОГРАФИКА','Full Artwork':'ПОЛНЫЙ АРТ','Recording':'ЗАПИСЬ','Mix':'СВЕДЕНИЕ','Mastering':'МАСТЕРИНГ',
    'Organizer':'ОРГАНИЗАТОР','Performer':'АРТИСТ','Producer':'ПРОДЮСЕР','Director':'РЕЖИССЁР','Editor':'МОНТАЖ','Music':'МУЗЫКА','Design':'ДИЗАЙН'
  };
  const coverTextRU={
    'This track makes me feel like I am somewhere above the clouds.':'Этот трек заставляет меня почувствовать, будто я где-то над облаками.',
    'My first project with an international artist.':'Мой первый проект с международным артистом.',
    'The longest project we worked on in terms of production time.':'Самый долгий проект по времени производства.',
    'My first solo album. The release stayed unreleased after the sound no longer represented me, but the visual system remained important to me.':'Мой первый сольный альбом. Релиз остался невыпущенным, когда звучание перестало меня отражать, но визуальная система проекта осталась для меня важной.',
    'My first commercial cover project.':'Мой первый коммерческий проект по созданию обложки.',
    'A redesign made after the artist had already worked with other designers.':'Редизайн, сделанный после того, как артист уже работал с другими дизайнерами.',
    'A visual language inspired by 2015–2017 rap covers and the Chief Keef era.':'Визуальный язык, вдохновлённый рэп-обложками 2015–2017 годов и эпохой Chief Keef.',
    'A handmade cover and my first attempt at drawing my own artwork.':'Ручная обложка и моя первая попытка самостоятельно рисовать арт.',
    'The music was lost, but the visual remained.':'Музыка была потеряна, но визуал остался.',
    'Another commercial cover project.':'Ещё один коммерческий проект по созданию обложки.',
    'Inspired by Marina Abramović and Ulay’s Rest Energy.':'Вдохновлено работой Marina Abramović и Ulay — Rest Energy.',
    'When was the last time you received a Valentine outside Valentine’s Day?':'Когда вы в последний раз получали валентинку не в День святого Валентина?'
  };
  const translateRoles=roles=>roles.split(' / ').map(x=>lang==='ru'?(roleRU[x]||x):x).join(' / ');

  const liveSet=[
    {id:'offtop1',title:'OFFTOP 1 — CLUB ACTION',year:'2024',roleEN:'ORGANIZER / PERFORMER',roleRU:'ОРГАНИЗАТОР / АРТИСТ',hero:'assets/live/offtop1/offtop-01-hero.JPG',visual:['assets/live/offtop1/offtop-01-poster-01.jpg','assets/live/offtop1/offtop-01-poster-02.jpg','assets/live/offtop1/offtop-01-merch-01.jpg','assets/live/offtop1/offtop-01-merch-02jpg.jpg','assets/live/offtop1/offtop-01-merch-03.jpg'],photos:['assets/live/offtop1/offtop-01-photo-01.JPG','assets/live/offtop1/offtop-01-photo-02.jpg','assets/live/offtop1/offtop-01-photo-03.jpg','assets/live/offtop1/offtop-01-photo-04.jpeg'],videos:['assets/live/offtop1/offtop-01-video-01.MP4','assets/live/offtop1/offtop-01-video-02.MP4','assets/live/offtop1/offtop-01-video-03.mp4'],copyEN:'A live project where I handled the practical side of the event, worked with artists, helped build and dismantle the venue, sold merchandise and performed my own music.',copyRU:'Живой проект, где я отвечал за практическую часть события: работал с артистами, участвовал в монтаже и демонтаже площадки, продавал мерч и выступал со своей музыкой.'},
    {id:'offtop2',title:'OFFTOP 2 — CLUB LINZA',year:'2025',roleEN:'ORGANIZER / PERFORMER / PRODUCER',roleRU:'ОРГАНИЗАТОР / АРТИСТ / ПРОДЮСЕР',hero:'assets/live/offtop2/offtop-02-hero.jpg',visual:['assets/live/offtop2/offtop-02-poster-01.jpg','assets/live/offtop2/offtop-02-poster-02.jpg','assets/live/offtop2/offtop-02-poster-03.jpg','assets/live/offtop2/offtop-02-poster-04.jpg','assets/live/offtop2/offtop-02-merch-01.jpg','assets/live/offtop2/offtop-02-merch-02.jpg','assets/live/offtop2/offtop-02-merch-03.jpg','assets/live/offtop2/offtop-02-merch-04.png'],photos:[1,2,3,4,5,6,7,8].map(n=>`assets/live/offtop2/offtop-02-photo-0${n}.jpg`),videos:['assets/live/offtop2/offtop-02-video-01.MP4'],copyEN:'The second OFFTOP expanded my role into visual direction, merchandise, artist coordination and a free recording zone where I recorded and produced guests.',copyRU:'Во втором OFFTOP моя роль расширилась: визуальное направление, мерч, координация артистов и бесплатная зона записи, где я записывал и продюсировал гостей.'},
    {id:'offtop3',title:'OFFTOP 3 — CLUB FACTORY 3',year:'2026',roleEN:'ORGANIZER / PERFORMER',roleRU:'ОРГАНИЗАТОР / АРТИСТ',hero:'assets/live/offtop3/offtop-03-hero.jpeg',visual:['assets/live/offtop3/offtop-03-poster-01.jpg','assets/live/offtop3/offtop-03-poster-02.jpg'],pair:['assets/live/offtop3/offtop-03-poster-03.jpeg','assets/live/offtop3/offtop-03-poster-04.jpeg'],photos:['assets/live/offtop3/offtop-03-photo-01.jpg','assets/live/offtop3/offtop-03-photo-02.jpg','assets/live/offtop3/offtop-03-photo-03.jpg','assets/live/offtop3/offtop-03-photo-04.jpeg','assets/live/offtop3/offtop-03-photo-05.jpg','assets/live/offtop3/offtop-03-photo-06.jpeg','assets/live/offtop3/offtop-03-photo-07.jpeg','assets/live/offtop3/offtop-03-photo-08.jpeg'],videos:[],copyEN:'The third OFFTOP continued the live series with venue operations, artist coordination, merchandise and my own performance.',copyRU:'Третий OFFTOP продолжил серию живых событий: работа с площадкой, координация артистов, мерч и моё собственное выступление.'}
  ];

  const masonry=arr=>`<div class="v19-masonry">${arr.map(p=>`<figure><img src="${p}" alt="" loading="lazy" draggable="false"></figure>`).join('')}</div>`;
  const ambient=p=>`<div class="v19-ambient"><video src="${p}" autoplay muted loop playsinline preload="metadata"></video><button class="v19-sound" type="button">${t('SOUND OFF','ЗВУК ВЫКЛ')}</button></div>`;
  const sectionTitle=(en,ru)=>`<div class="v19-section-title">${t(en,ru)}</div>`;

  renderEvents=async function(){
    return `<div class="v19-scroll">${liveSet.map(e=>`<article class="v19-case" id="${e.id}">
      <header class="v19-case-head"><img class="v19-project-icon" src="assets/live/icns.png" alt=""><div><h1>${e.title}</h1><div class="v19-meta">${e.year} · ${lang==='ru'?e.roleRU:e.roleEN}</div></div></header>
      <div class="v19-natural"><img src="${e.hero}" alt="${e.title}" draggable="false"></div>
      <div class="v19-copy-card"><p>${lang==='ru'?e.copyRU:e.copyEN}</p></div>
      ${sectionTitle('POSTERS / MERCH','ПОСТЕРЫ / МЕРЧ')}
      ${masonry(e.visual)}
      ${e.pair?`<div class="v19-split-pair"><img src="${e.pair[0]}" alt=""><img src="${e.pair[1]}" alt=""></div>`:''}
      ${sectionTitle('BACKSTAGE / LIVE','БЭКСТЕЙДЖ / LIVE')}
      ${masonry(e.photos)}
      ${e.videos.map(ambient).join('')}
    </article>`).join('')}</div>`;
  };

  renderStudio=async function(){
    const ps=['assets/studio/studio-photo-01.jpg','assets/studio/studio-photo-02.jpg','assets/studio/studio-photo-03.JPG','assets/studio/studio-photo-04.JPG','assets/studio/studio-photo-05.JPG'];
    return `<div class="v19-scroll"><article class="v19-case">
      <header class="v19-case-head"><img class="v19-project-icon" src="assets/studio/icns-studio.png" onerror="this.onerror=null;this.src='assets/live/icns.png'" alt=""><div><div class="v19-meta">ROOM616 · 2023 — ${t('PRESENT','СЕЙЧАС')} · 3 ${t('YEARS','ГОДА')}</div><h1>${t('RUNNING A RECORDING STUDIO AS A CREATIVE BUSINESS','УПРАВЛЕНИЕ СТУДИЕЙ ЗВУКОЗАПИСИ КАК КРЕАТИВНЫМ БИЗНЕСОМ')}</h1></div></header>
      <div class="v19-copy-card"><p>${t('For the last three years I have run and developed ROOM616 in central Saint-Petersburg. My work combines recording and music production with client communication, content creation, promotion, studio management and event production.','Последние три года я управлял и развивал ROOM616 в центре Санкт-Петербурга. Моя работа объединяет запись и музыкальное производство, общение с клиентами, создание контента, продвижение, управление студией и организацию событий.')}</p></div>
      <div class="v19-natural"><img src="assets/studio/studio-hero.png" alt="ROOM616"></div>
      ${sectionTitle('MY ROLE','МОЯ РОЛЬ')}<h2>${t('FOUNDER / CREATIVE PRODUCER / STUDIO MANAGER','ОСНОВАТЕЛЬ / КРЕАТИВНЫЙ ПРОДЮСЕР / STUDIO MANAGER')}</h2>
      <div class="v19-copy-card"><p>${t('I recorded clients, produced artists, shot and edited content, designed covers, mixed tracks, managed the team and budget, hired sound engineers, handled promotion and organized events and livestreams.','Я записывал клиентов, продюсировал артистов, снимал и монтировал контент, создавал обложки, сводил треки, управлял командой и бюджетом, нанимал звукорежиссёров, занимался продвижением и организовывал события и трансляции.')}</p></div>
      ${masonry(ps)}
    </article></div>`;
  };

  renderVideos=async function(){
    return `<div class="v19-scroll">
      <article class="v19-case"><div class="v19-meta">2025 · ${t('DIRECTOR / PERFORMER / PRODUCER / EDITOR','РЕЖИССЁР / АРТИСТ / ПРОДЮСЕР / МОНТАЖ')}</div><h1>SMALL TALK</h1><div class="v19-youtube"><iframe src="https://www.youtube.com/embed/l4vY2bZz73o?autoplay=1&mute=1&loop=1&playlist=l4vY2bZz73o&playsinline=1&rel=0" title="SMALL TALK" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><a href="https://www.youtube.com/watch?v=l4vY2bZz73o" target="_blank" rel="noreferrer">${t('OPEN ON YOUTUBE ↗','ОТКРЫТЬ В YOUTUBE ↗')}</a></div><div class="v19-copy-card"><p>${t('A self-produced music video built around my own track — from the visual concept and shoot to the final edit.','Самостоятельно созданный клип на мой трек — от визуальной концепции и съёмки до финального монтажа.')}</p></div></article>
      <article class="v19-case"><div class="v19-meta">2026 · ${t('DIRECTOR / PRODUCER / EDITOR','РЕЖИССЁР / ПРОДЮСЕР / МОНТАЖ')}</div><h1>APPERCOT — PROMO CLIP</h1>${ambient('assets/video/video-appercot.mp4')}<div class="v19-copy-card"><p>${t('A short promotional video created as a visual extension of the track.','Короткое промо-видео, созданное как визуальное продолжение трека.')}</p></div></article>
      <article class="v19-case"><div class="v19-meta">2025 · ${t('DIRECTOR / PRODUCER / EDITOR','РЕЖИССЁР / ПРОДЮСЕР / МОНТАЖ')}</div><h1>YOUR HEART — PROMO CLIP</h1>${ambient('assets/video/video-yourheart.MP4')}<div class="v19-copy-card"><p>${t('A short-form promo created for social platforms around my own music.','Короткое промо для социальных платформ, созданное вокруг моей собственной музыки.')}</p></div></article>
    </div>`;
  };

  renderCover=async function(){
    const paths=['assets/cover/01-most-valuable-player.jpg','assets/cover/02-plus-aura.jpeg','assets/cover/03-appercot.jpg','assets/cover/04-SCULPTURE.jpg','assets/cover/05-Museum.jpg','assets/cover/06-Однушки.jpg','assets/cover/07-Negative-impact.jpg','assets/cover/08-LOVE-MUZIC.jpg','assets/cover/09-AMMO.jpeg','assets/cover/10-Sugar-Dead.jpg','assets/cover/11-Wounds:Feign.jpg','assets/cover/12-Your-Heart.jpg'];
    return `<div class="v19-scroll v19-cover"><div class="v19-page-head"><h1>${t('COVER ART','ОБЛОЖКИ')}</h1><div>${t('MUSIC ARTWORK · SELECTED WORK','МУЗЫКАЛЬНЫЙ АРТ · ИЗБРАННЫЕ РАБОТЫ')}</div></div>${coverWorks.map((w,i)=>{
      const roles=translateRoles(w.roles).split(' / ').slice(0,4);
      const art=`<div class="v19-cover-art"><img src="${paths[i]}" alt="${esc19(w.title)}"><div class="v19-cover-overlay"><div>${esc19(w.overlay)}</div>${w.link?`<b>${t('OPEN MUSIC ↗','ОТКРЫТЬ МУЗЫКУ ↗')}</b>`:''}</div></div>`;
      return `<article class="v19-cover-row" id="cover-${i}">${w.link?`<a href="${esc19(w.link)}" target="_blank" rel="noreferrer">${art}</a>`:art}<div class="v19-cover-info"><div class="v19-meta">${w.year} · ${esc19(w.artist)}</div><h2>${esc19(w.title)}</h2><p>${esc19(lang==='ru'?(coverTextRU[w.text]||w.text):w.text)}</p><div class="v19-tags">${roles.map(x=>`<span>${esc19(x)}</span>`).join('')}</div>${w.promo?`<a class="v19-promo" href="${esc19(w.promo)}" target="_blank">PROMO ↗</a>`:''}</div></article>`;
    }).join('')}</div>`;
  };

  renderPhotos=async function(){
    const paths=['assets/photos/photo-01.jpg','assets/photos/photo-02.jpg','assets/photos/photo-03.jpg','assets/photos/photo-04.jpg','assets/photos/photo-05.jpg','assets/photos/photo-06.jpg','assets/photos/photo-07.jpg','assets/photos/photo-08.jpg','assets/photos/photo-09.jpg'];
    return `<div class="v19-scroll"><div class="v19-page-head"><h1>${t('PHOTOS','ФОТО')}</h1><div>${t('LIFESTYLE / ARCHIVE','LIFESTYLE / АРХИВ')}</div></div><div class="v19-photo-columns">${paths.map((p,i)=>`<img src="${p}" alt="${t('Photo','Фото')} ${i+1}" loading="lazy">`).join('')}</div></div>`;
  };

  renderSkill=function(data){
    const key=String(data.title).toLowerCase();
    const icon=key.includes('photoshop')?'dock-fallback/photoshop.png':key.includes('premiere')?'dock-fallback/premiere.png':'dock-fallback/flstudio.png';
    const skills=key.includes('photoshop')?[t('COVER ART','ОБЛОЖКИ'),t('TYPOGRAPHY','ТИПОГРАФИКА'),t('COMPOSITING','КОМПОЗИТИНГ')]:key.includes('premiere')?[t('VIDEO EDITING','МОНТАЖ'),t('SHORT-FORM','КОРОТКИЙ ФОРМАТ'),t('MUSIC VIDEO','КЛИПЫ')]:['8 YEARS / 8 ЛЕТ',t('RECORDING','ЗАПИСЬ'),t('MIXING / PRODUCTION','СВЕДЕНИЕ / ПРОДАКШН')];
    return `<div class="v19-utility"><img src="${icon}" alt=""><div><div class="v19-meta">${t('APPLICATION / SKILL','ПРОГРАММА / НАВЫК')}</div><h1>${String(data.title).toUpperCase()}</h1><div class="v19-tags">${skills.map(x=>`<span>${x}</span>`).join('')}</div></div></div>`;
  };

  renderNotes=function(){
    const labels=lang==='ru'?[['overview','ОБЗОР'],['experience','ОПЫТ'],['studio','СТУДИЯ'],['skills','НАВЫКИ'],['education','ОБРАЗОВАНИЕ'],['contacts','КОНТАКТЫ']]:[['overview','OVERVIEW'],['experience','EXPERIENCE'],['studio','STUDIO'],['skills','SKILLS'],['education','EDUCATION'],['contacts','CONTACTS']];
    return `<div class="notes-app"><aside class="notes-sidebar"><div class="notes-folder">${t('Notes','Заметки')}</div><div class="notes-section-label">${t('ON MY MAC','НА МОЁМ MAC')}</div>${labels.map((x,i)=>`<button class="note-item ${i===0?'active':''}" data-note="${x[0]}"><span class="note-dot"></span>${x[1]}</button>`).join('')}</aside><div class="notes-content" id="notesContent"></div></div>`;
  };
  notePages=function(){
    const skillsEN=['ART DIRECTION','GRAPHIC DESIGN','VIDEO / EDITING','CONTENT PRODUCTION','MUSIC PRODUCTION','EVENT / PROJECT MANAGEMENT'];
    const skillsRU=['АРТ-ДИРЕКШН','ГРАФИЧЕСКИЙ ДИЗАЙН','ВИДЕО / МОНТАЖ','КОНТЕНТ-ПРОДАКШН','МУЗЫКАЛЬНЫЙ ПРОДАКШН','EVENT / PROJECT MANAGEMENT'];
    return {
      overview:{title:t('Overview','Обзор'),html:`<div class="note-meta">BYMANJURIA · CV / RESUME</div><h1>${profile.name}</h1><p class="note-lead">${t('Creative Content Specialist / Creative Producer','Креативный контент-специалист / Креативный продюсер')}</p><p>${t('Multidisciplinary creative working across visual design, video, music production, studio operations and live events.','Мультидисциплинарный специалист на пересечении визуального дизайна, видео, музыкального продакшна, управления студией и live-событий.')}</p><div class="note-links"><a href="${links.resume}" download="ByManjuria-CV.pdf">${t('DOWNLOAD CV ↓','СКАЧАТЬ CV ↓')}</a><a href="${links.behance}" target="_blank">Behance ↗</a><a href="${links.youtube}" target="_blank">YouTube ↗</a></div>`},
      experience:{title:t('Experience','Опыт'),html:`<h1>${t('EXPERIENCE','ОПЫТ')}</h1><h2>ROOM616 — ${t('SOUND PRODUCER / SMM SPECIALIST / DESIGNER / VIDEO EDITOR','САУНД-ПРОДЮСЕР / SMM / ДИЗАЙНЕР / ВИДЕОМОНТАЖ')}</h2><div class="note-meta">${t('OCT 2023 — SEP 2026 · SAINT-PETERSBURG','ОКТ 2023 — СЕН 2026 · САНКТ-ПЕТЕРБУРГ')}</div><ul><li>${t('Recording sessions and full audio post-production: editing, mixing and mastering.','Запись клиентов и полный аудио-постпродакшн: редактирование, сведение и мастеринг.')}</li><li>${t('Artist collaboration, content shooting and editing.','Работа с артистами, съёмка и монтаж контента.')}</li><li>${t('Graphic design: covers, posters, merchandise and promotional materials.','Графический дизайн: обложки, афиши, мерч и промо-материалы.')}</li><li>${t('Team coordination, promotion, studio operations and events.','Координация команды, продвижение, управление студией и события.')}</li></ul><h2>ProService — ${t('PURCHASING MANAGER','МЕНЕДЖЕР ПО ЗАКУПКАМ')}</h2><div class="note-meta">APR 2022 — NOV 2024</div><p>${t('Procurement, supplier negotiations, order management, documentation and delivery scheduling.','Закупки, переговоры с поставщиками, управление заказами, документация и графики поставок.')}</p><h2>Yandex Lavka — ${t('LOGISTICS SPECIALIST','СПЕЦИАЛИСТ ПО ЛОГИСТИКЕ')}</h2><div class="note-meta">NOV 2025 — AUG 2026</div><p>${t('Documentation flow, transport routes, warehouse operations and order fulfilment.','Документооборот, транспортные маршруты, складские процессы и выполнение заказов.')}</p>`},
      studio:{title:'ROOM616',html:`<h1>ROOM616</h1><div class="note-meta">3 ${t('YEARS · CENTRAL SAINT-PETERSBURG','ГОДА · ЦЕНТР САНКТ-ПЕТЕРБУРГА')}</div><p>${t('My most sustained professional project: music production, visual content, client work, marketing and operations in one creative business.','Мой самый продолжительный профессиональный проект: музыкальный продакшн, визуальный контент, работа с клиентами, маркетинг и операционное управление в одном креативном бизнесе.')}</p>`},
      skills:{title:t('Skills','Навыки'),html:`<h1>${t('CORE SKILLS','КЛЮЧЕВЫЕ НАВЫКИ')}</h1><div class="note-skill-list">${(lang==='ru'?skillsRU:skillsEN).map(s=>`<span class="role">${s}</span>`).join('')}</div>`},
      education:{title:t('Education','Образование'),html:`<h1>${t('EDUCATION','ОБРАЗОВАНИЕ')}</h1><h2>${t('INFORMATION SYSTEMS AND PROGRAMMING / APPLIED INFORMATICS','ИНФОРМАЦИОННЫЕ СИСТЕМЫ И ПРОГРАММИРОВАНИЕ / ПРИКЛАДНАЯ ИНФОРМАТИКА')}</h2><p>${t('St. Petersburg University of Management Technologies and Economics, 2019–2022. HTML/web layout experience and technical problem solving with modern AI-assisted tools.','Санкт-Петербургский университет технологий управления и экономики, 2019–2022. Опыт HTML-вёрстки и решения технических задач с современными AI-инструментами.')}</p>`},
      contacts:{title:t('Contacts','Контакты'),html:`<h1>${t('GET IN TOUCH','СВЯЗАТЬСЯ')}</h1><p>${esc19(profile.email)}</p><div class="note-links"><a href="${links.telegram}" target="_blank">Telegram ↗</a><a href="${links.instagram}" target="_blank">Instagram ↗</a><a href="${links.linkedin}" target="_blank">LinkedIn ↗</a><a href="${links.behance}" target="_blank">Behance ↗</a></div>`}
    };
  };

  function layoutMasonry(box){
    if(!box || box.dataset.layoutBusy==='1') return;
    const figs=[...box.querySelectorAll(':scope > figure')]; if(!figs.length)return;
    box.dataset.layoutBusy='1';
    const doLayout=()=>{
      const W=box.clientWidth; if(!W){box.dataset.layoutBusy='0';return;}
      const gap=7, cols=W<430?1:2, colW=(W-gap*(cols-1))/cols, heights=Array(cols).fill(0);
      figs.forEach(fig=>{
        const img=fig.querySelector('img'); const ratio=(img?.naturalWidth&&img?.naturalHeight)?img.naturalHeight/img.naturalWidth:0.75;
        let col=0; for(let i=1;i<cols;i++)if(heights[i]<heights[col])col=i;
        const h=Math.max(80,colW*ratio);
        Object.assign(fig.style,{position:'absolute',left:`${col*(colW+gap)}px`,top:`${heights[col]}px`,width:`${colW}px`,height:`${h}px`});
        heights[col]+=h+gap;
      });
      box.style.height=`${Math.max(...heights)-gap}px`; box.dataset.layoutBusy='0';
    };
    figs.forEach(f=>{const img=f.querySelector('img');if(img&&!img.complete)img.addEventListener('load',doLayout,{once:true});});
    requestAnimationFrame(doLayout);
  }
  function enhance(root=document){
    root.querySelectorAll?.('.v19-masonry').forEach(layoutMasonry);
    root.querySelectorAll?.('.v19-ambient video').forEach(observeVideo);
  }
  const videoObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target;if(e.isIntersecting&&e.intersectionRatio>.25)v.play().catch(()=>{});else v.pause();}),{threshold:[0,.25,.5]}):null;
  function observeVideo(v){if(v.dataset.v19Observed)return;v.dataset.v19Observed='1';v.muted=true;v.loop=true;v.playsInline=true;videoObserver?.observe(v);}
  new ResizeObserver(entries=>entries.forEach(e=>{if(e.target.classList.contains('v19-masonry'))layoutMasonry(e.target);})).observe(document.documentElement);
  new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{if(n.nodeType===1)enhance(n);}))).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('resize',()=>document.querySelectorAll('.v19-masonry').forEach(layoutMasonry),{passive:true});

  document.addEventListener('click',e=>{const b=e.target.closest('.v19-sound');if(!b)return;e.preventDefault();e.stopPropagation();const v=b.parentElement.querySelector('video');if(!v)return;v.muted=!v.muted;b.textContent=v.muted?t('SOUND OFF','ЗВУК ВЫКЛ'):t('SOUND ON','ЗВУК ВКЛ');v.play().catch(()=>{});});

  function applyStaticLanguage(){
    document.documentElement.lang=lang==='ru'?'ru':'en';
    const role=document.querySelector('.menu-label');if(role)role.textContent=t('Creative Content Specialist','Креативный контент-специалист');
    const labels={cover:t('COVER','ОБЛОЖКИ'),studio:t('STUDIO','СТУДИЯ'),live:t('EVENT & LIVE','СОБЫТИЯ & LIVE'),video:t('VIDEO','ВИДЕО')};
    document.querySelectorAll('.desktop-icon').forEach(el=>{const l=el.querySelector(':scope > span:last-child');if(l&&labels[el.dataset.open])l.textContent=labels[el.dataset.open];});
    const menuMap={menuResume:t('Download CV / Resume','Скачать CV / Resume'),changeWallpaper:t('Change Wallpaper…','Сменить обои…'),customizeIcons:t('Change Desktop Images…','Сменить иконки рабочего стола…'),customizeDockIcons:t('Change Dock Icons…','Сменить иконки Dock…'),resetIconPositions:t('Reset folder positions','Сбросить позиции папок'),closeAll:t('Close all windows','Закрыть все окна')};
    Object.entries(menuMap).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v;});
    const btn=document.getElementById('langToggle');if(btn){btn.textContent=lang.toUpperCase();btn.title=t('Switch language','Сменить язык');}
    const titleMap={notes:t('NOTES','ЗАМЕТКИ'),photos:t('PHOTOS','ФОТО'),cover:t('COVER','ОБЛОЖКИ'),studio:t('STUDIO','СТУДИЯ'),live:t('EVENT & LIVE','СОБЫТИЯ & LIVE'),video:t('VIDEO','ВИДЕО')};
    Object.entries(titleMap).forEach(([k,v])=>{if(content[k])content[k].title=v;});
  }
  function updateTopClock(){const el=document.getElementById('dateTime');if(!el)return;const locale=lang==='ru'?'ru-RU':'en-US';el.textContent=new Intl.DateTimeFormat(locale,{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date());}
  function rerenderWindows(){[...document.querySelectorAll('.window')].forEach(async win=>{const key=win.dataset.key,data=content[key];if(!data)return;const title=win.querySelector('.window-title');if(title)title.textContent=data.title;const body=win.querySelector('.window-body');if(!body)return;body.innerHTML=await renderBody(data);wireWindowBody(win,data);enhance(body);});}
  document.getElementById('langToggle')?.addEventListener('click',()=>{lang=lang==='en'?'ru':'en';localStorage.setItem(LANG_KEY,lang);applyStaticLanguage();updateTopClock();rerenderWindows();});
  applyStaticLanguage();updateTopClock();setInterval(updateTopClock,500);enhance();
})();
