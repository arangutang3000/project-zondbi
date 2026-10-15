(() => {
  const LANG_KEY = 'bymanjuria-lang';
  const lang = () => localStorage.getItem(LANG_KEY) === 'ru' ? 'ru' : 'en';
  const tr = (en, ru) => lang() === 'ru' ? ru : en;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const img = (src, alt='') => `<figure class="v20-media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" draggable="false" onerror="const f=this.closest('figure');if(f)f.remove()"></figure>`;
  const wide = (src, alt='') => `<div class="v20-wide">${img(src, alt)}</div>`;
  const row = (items, cls='') => `<div class="v20-row ${cls}">${items.join('')}</div>`;
  const section = (en, ru) => `<div class="v20-section-title">${tr(en,ru)}</div>`;
  const soundVideo = (src, label='') => `<div class="v19-ambient v20-video"><video src="${esc(src)}" aria-label="${esc(label)}" autoplay muted loop playsinline preload="metadata"></video><button class="v19-sound" type="button">${tr('SOUND OFF','ЗВУК ВЫКЛ')}</button></div>`;
  const caseHeader = (title, meta, icon='assets/live/icns.png') => `<header class="v20-case-head"><img class="v20-project-icon" src="${icon}" onerror="this.style.display='none'" alt=""><div><h1>${title}</h1><div class="v20-meta">${meta}</div></div></header>`;
  const figma = name => `assets/figma-export/offtop-02/${name}`;

  window.renderEvents = async function(){
    const extraA='assets/live/offtop3/7aL7joHFlcHu7n6XEXT5hftEfoBroLVi7VxNMvtWzvYz-nmbxihciYO67hIIv6NQrqbzPQdTfEXz4qdi5U4jkQqx.jpg';
    const extraB='assets/live/offtop3/Gnh535bOgh7gTQ60rixeeli94aa8RPUvxhe9hJTlcYGZZ9KpqVfXkwaB0CXNZ7xcjLF-itCDH6V3EZcGToQQVYtw.jpg';
    const extraC='assets/live/offtop3/SiIYSmporJJCN5LaH6aHQGO1ukQmdeY736zIJEUGdrpeQHC5u5AxOnVLxHnEznWlrbGedUaGbPXrdQWR0XkUW53B.jpg';

    return `<div class="v20-scroll v20-live v22-live">
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
        <div class="v20-copy"><p>${tr('OFFTOP 2 expanded my role from event operations into a full creative-production workflow. I worked with the artists and venue, performed, created the visual system and merchandise, and helped connect the live event with ROOM616 through a free recording zone.','Во втором OFFTOP моя роль выросла от организационной работы до полноценного креативного продакшна. Я работал с артистами и площадкой, выступал, создавал визуальную систему и мерч, а также связал концерт с ROOM616 через бесплатную зону записи.')}</p></div>

        ${section('SELECTED VISUAL SYSTEM · DESIGNED BY ME','ВИЗУАЛЬНАЯ СИСТЕМА · МОЙ ДИЗАЙН')}
        <div class="v22-design-intro"><p>${tr('For OFFTOP 02 I created the visual system across the main poster, ticket formats, social communication, lineup graphics and merchandise promotion.','Для OFFTOP 02 я разработал визуальную систему: основную афишу, форматы билетов, коммуникацию для соцсетей, графику лайнапа и промо мерча.')}</p></div>
        <div class="v22-design-wall">
          ${img(figma('01-main-poster.png'),'OFFTOP 02 main poster')}
          ${img(figma('04-event-announcement.png'),'OFFTOP 02 event announcement')}
          ${img(figma('02-ticket-single.png'),'OFFTOP 02 single ticket')}
          ${img(figma('06-dj-lineup.png'),'OFFTOP 02 DJ lineup')}
          ${img(figma('07-live-lineup.png'),'OFFTOP 02 live lineup')}
          ${img(figma('05-ticket-info.png'),'OFFTOP 02 ticket information')}
          ${img(figma('08-merch-campaign.png'),'OFFTOP 02 merchandise campaign')}
          ${img(figma('03-ticket-group.png'),'OFFTOP 02 group ticket')}
          ${img(figma('09-event-story.png'),'OFFTOP 02 event story')}
        </div>

        ${section('MERCH / PHYSICAL OUTPUT','МЕРЧ / ФИЗИЧЕСКИЙ РЕЗУЛЬТАТ')}
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
})();
