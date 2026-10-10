(() => {
  const LANG_KEY = 'bymanjuria-lang';
  const lang = () => localStorage.getItem(LANG_KEY) === 'ru' ? 'ru' : 'en';
  const tr = (en, ru) => lang() === 'ru' ? ru : en;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  window.v23MediaError = function(el){
    const fallbacks = (el.dataset.fallbacks || '').split('|').filter(Boolean);
    const next = fallbacks.shift();
    if(next){
      el.dataset.fallbacks = fallbacks.join('|');
      el.src = next;
      return;
    }
    const repair = container => {
      if(!container) return;
      if(container.classList?.contains('v23-stack')){
        const kids=container.querySelectorAll(':scope > .v23-cell').length;
        if(kids===0){const parent=container.parentElement;container.remove();repair(parent);}
        return;
      }
      if(container.classList?.contains('v23-row')){
        const kids=container.querySelectorAll(':scope > .v23-cell, :scope > .v23-stack').length;
        if(kids===0) container.remove();
        else if(kids===1) container.classList.add('v23-single');
      }
    };
    const cell = el.closest('.v23-cell');
    if(!cell) return;
    const parent = cell.parentElement;
    cell.remove();
    repair(parent);
  };

  const media = (sources, alt='') => {
    const list = Array.isArray(sources) ? sources : [sources];
    const src = list[0] || '';
    const rest = list.slice(1).map(esc).join('|');
    return `<figure class="v23-cell"><img src="${esc(src)}" data-fallbacks="${rest}" alt="${esc(alt)}" loading="lazy" draggable="false" onerror="v23MediaError(this)"></figure>`;
  };
  const video = (sources, label='') => {
    const list = Array.isArray(sources) ? sources : [sources];
    const src = list[0] || '';
    const rest = list.slice(1).map(esc).join('|');
    return `<div class="v23-cell v23-video"><video src="${esc(src)}" data-fallbacks="${rest}" aria-label="${esc(label)}" autoplay muted loop playsinline preload="metadata" onerror="v23MediaError(this)"></video><button class="v23-sound" type="button">${tr('SOUND OFF','ЗВУК ВЫКЛ')}</button></div>`;
  };
  const row = (items, cls, ratio) => `<div class="v23-row ${cls}" style="aspect-ratio:${ratio}">${items.join('')}</div>`;
  const section = (en,ru) => `<div class="v23-section-title">${tr(en,ru)}</div>`;
  const caseHeader = (title, meta, icon='assets/live/icns.png') => `<header class="v23-case-head"><img class="v23-project-icon" src="${esc(icon)}" alt="" onerror="this.style.display='none'"><div><h1>${title}</h1><div class="v23-meta">${meta}</div></div></header>`;

  // Optional design exports. If they are not present, their cells disappear without leaving a hole.
  const opt = (folder, name, fallback='') => fallback ? [`${folder}/${name}`, fallback] : `${folder}/${name}`;

  renderEvents = async function(){
    const o1='assets/live/offtop1';
    const o2='assets/live/offtop2';
    const o3='assets/live/offtop3';
    const extraA=`${o3}/offtop-03-photo-03.png`;
    const extraB=`${o3}/offtop-03-photo-04.png`;

    return `<div class="v23-scroll"><div class="v23-content v23-live">
      <section class="v23-live-intro">
        <div class="v23-eyebrow">EVENT &amp; LIVE · 2024—2026</div>
        <h1>OFFTOP</h1>
        <p>${tr('OFFTOP is a series of independent live events I helped build and organize across three consecutive years. My work covered both the creative and practical sides of production — artist coordination, venue setup, backstage operations, merchandise, content, performance and the many small decisions required to turn an idea into a real event.','OFFTOP — серия независимых концертных мероприятий, которые я помогал создавать и организовывать на протяжении трёх лет. Моя работа охватывала как творческую, так и организационную сторону проекта: координацию артистов, подготовку площадки, backstage, мерч, контент, собственные выступления и множество небольших задач, из которых в итоге складывается настоящее мероприятие.')}</p>
        <div class="v23-timeline"><span>01 · ACTION · 2024</span><span>02 · LINZA · 2025</span><span>03 · FACTORY 3 · 2026</span></div>
      </section>

      <article class="v23-case" id="offtop1">
        ${caseHeader('OFFTOP 01 — ACTION CLUB', `2024 · ${tr('ORGANIZER / PERFORMER','ОРГАНИЗАТОР / АРТИСТ')}`)}
        ${row([media(`${o1}/offtop-01-hero.png`,'OFFTOP 1')],'v23-full','343 / 165')}
        <div class="v23-copy"><p>${tr('The first OFFTOP was where I learned the event from the inside: venue setup and teardown, artist care, merchandise, backstage work and my own performance. My focus here was event operations and live production; the visual identity was not my design.','Первый OFFTOP стал для меня опытом работы с событием изнутри: монтаж и демонтаж площадки, работа с артистами, мерч, backstage и собственное выступление. Здесь мой фокус был на организации и live-продакшне; визуальный дизайн мероприятия делал не я.')}</p></div>
        ${section('EVENT MATERIALS','МАТЕРИАЛЫ СОБЫТИЯ')}
        ${row([media(`${o1}/offtop-01-poster-01.png`),media(`${o1}/offtop-01-poster-02.png`)],'v23-2','343 / 170')}
        ${row([media(`${o1}/offtop-01-poster-03.png`)],'v23-full','343 / 165')}
        ${row([media(`${o1}/offtop-01-poster-04.png`),media(`${o1}/offtop-01-merch-01.png`)],'v23-7-5','343 / 134')}
        ${row([media(`${o1}/offtop-01-merch-02.png`),media(`${o1}/offtop-01-merch-03.png`)],'v23-5-7','343 / 136')}
        ${section('LIVE / ATMOSPHERE','LIVE / АТМОСФЕРА')}
        ${row([media(`${o1}/offtop-01-photo-01.png`)],'v23-full','343 / 166')}
        ${row([media(`${o1}/offtop-01-photo-02.png`),video(`${o1}/offtop-01-video-01.MP4`,'OFFTOP 1 video 1')],'v23-7-5','343 / 136')}
        ${row([video(`${o1}/offtop-01-video-02.MP4`,'OFFTOP 1 video 2'),media(`${o1}/offtop-01-photo-04.png`)],'v23-5-7','343 / 135')}
        ${row([media(`${o1}/offtop-01-photo-03.png`),video(`${o1}/offtop-01-video-03.mp4`,'OFFTOP 1 video 3')],'v23-7-5','343 / 135')}
      </article>

      <article class="v23-case v23-featured" id="offtop2">
        ${caseHeader('OFFTOP 02 — LINZA', `2025 · ${tr('ORGANIZER / PRODUCER / PERFORMER / VISUAL DESIGN','ОРГАНИЗАТОР / ПРОДЮСЕР / АРТИСТ / ВИЗУАЛЬНЫЙ ДИЗАЙН')}`)}
        ${row([media(`${o2}/offtop-02-hero.png`,'OFFTOP 2')],'v23-full','343 / 165')}
        <div class="v23-copy"><p>${tr('OFFTOP 2 expanded my role from event operations into a full creative-production workflow. I worked with the artists and venue, performed, created the visual system and merchandise, and helped connect the live event with ROOM616 through a free recording zone.','Во втором OFFTOP моя роль выросла от организационной работы до полноценного креативного продакшна. Я работал с артистами и площадкой, выступал, создавал визуальную систему и мерч, а также связал концерт с ROOM616 через бесплатную зону записи.')}</p></div>
        ${section('VISUAL SYSTEM · DESIGNED BY ME','ВИЗУАЛЬНАЯ СИСТЕМА · МОЙ ДИЗАЙН')}
        ${row([media(`${o2}/offtop-02-poster-01.png`),media(`${o2}/offtop-02-poster-02.png`)],'v23-2','343 / 238')}
        ${row([media(`${o2}/offtop-02-poster-03.png`),media(`${o2}/offtop-02-poster-04.png`),media(`${o2}/offtop-02-poster-05.png`)],'v23-3','343 / 112')}
        ${row([media(`${o2}/offtop-02-poster-08.png`),media(`${o2}/offtop-02-poster-07.png`)],'v23-8-4','343 / 114')}
        ${row([media(`${o2}/offtop-02-poster-09.png`)],'v23-full','343 / 166')}
        <div class="v23-row v23-4-8" style="aspect-ratio:343 / 230"><div class="v23-stack">${media(`${o2}/offtop-02-merch-01.png`)}${media(`${o2}/offtop-02-merch-02.png`)}</div>${media(`${o2}/offtop-02-merch-03.png`)}</div>
        <div class="v23-substory"><div class="v23-substory-label">${tr('FREE RECORDING ZONE','ЗОНА ЗАПИСИ')}</div><p>${tr('We added a free recording area directly inside the event, connecting the live show with ROOM616 and giving artists another way to interact with the project. I handled recording and production in the zone.','Внутри мероприятия мы организовали бесплатную зону записи ROOM616, объединив концерт и студийную часть проекта в одном пространстве. Я отвечал за запись и продакшн в этой зоне.')}</p></div>
        ${section('LIVE','LIVE')}
        ${row([media(`${o2}/offtop-02-photo-01.png`),media(`${o2}/offtop-02-photo-06.png`)],'v23-2','343 / 97')}
        ${row([media(`${o2}/offtop-02-photo-05.png`),media(`${o2}/offtop-02-photo-04.png`)],'v23-2','343 / 96')}
        ${row([video(`${o2}/offtop-02-video-01.MP4`,'OFFTOP 2 live video')],'v23-full','343 / 194')}
        ${row([media(`${o2}/offtop-02-photo-02.png`)],'v23-full','343 / 166')}
        ${row([media(`${o2}/offtop-02-photo-03.png`)],'v23-full','343 / 165')}
      </article>

      <article class="v23-case" id="offtop3">
        ${caseHeader('OFFTOP 03 — FACTORY 3', `2026 · ${tr('ORGANIZER / PERFORMER','ОРГАНИЗАТОР / АРТИСТ')}`)}
        ${row([media(`${o3}/offtop-03-hero.png`,'OFFTOP 3')],'v23-full','343 / 165')}
        <div class="v23-copy"><p>${tr('The third OFFTOP continued the series at a larger live venue. My responsibility was event operations, artist coordination, merchandise and performance. As with OFFTOP 1, the event visual identity itself was not my design.','Третий OFFTOP продолжил серию уже на более крупной live-площадке. Я отвечал за организационную часть, координацию артистов, мерч и собственное выступление. Как и в OFFTOP 1, визуальный стиль самого мероприятия делал не я.')}</p></div>
        ${section('EVENT MATERIALS','МАТЕРИАЛЫ СОБЫТИЯ')}
        ${row([media(`${o3}/offtop-03-poster-01.png`),media(`${o3}/offtop-03-poster-02.png`)],'v23-2','343 / 168')}
        ${row([media(`${o3}/offtop-03-poster-03.png`)],'v23-full','343 / 171')}
        ${row([video(`${o3}/offtop-03-video-01.mp4`,'OFFTOP 3 video')],'v23-full','343 / 193')}
        ${section('LIVE / SPACE','LIVE / ПРОСТРАНСТВО')}
        <div class="v23-row v23-composite" style="aspect-ratio:343 / 242">
          ${media(`${o3}/offtop-03-photo-01.png`)}
          <div class="v23-stack">${media(`${o3}/offtop-03-photo-06.png`)}${media(`${o3}/offtop-03-photo-08.png`)}</div>
        </div>
        ${row([media(`${o3}/offtop-03-photo-05.png`)],'v23-full','343 / 166')}
        ${row([media(`${o3}/offtop-03-photo-02.png`),media(`${o3}/offtop-03-photo-07.png`)],'v23-2','343 / 127')}
        ${row([media(extraA),media(extraB)],'v23-2','343 / 113')}
      </article>
    </div></div>`;
  };

  renderStudio = async function(){
    const s='assets/studio';
    const pic = n => media([
      `${s}/studio-photo-${String(n).padStart(2,'0')}.jpg`,
      `${s}/studio-photo-${String(n).padStart(2,'0')}.JPG`,
      `${s}/studio-photo-${String(n).padStart(2,'0')}.jpeg`,
      `${s}/studio-photo-${String(n).padStart(2,'0')}.png`
    ]);
    return `<div class="v23-scroll"><div class="v23-content v23-studio"><article class="v23-case">
      ${caseHeader('ROOM616', `2023 — ${tr('PRESENT','СЕЙЧАС')} · ${tr('CREATIVE PRODUCER / STUDIO MANAGEMENT','КРЕАТИВНЫЙ ПРОДЮСЕР / УПРАВЛЕНИЕ СТУДИЕЙ')}`, 'assets/desktop/studio.png')}
      <div class="v23-studio-lead"><h2>${tr('A RECORDING STUDIO AS A CREATIVE BUSINESS','СТУДИЯ ЗВУКОЗАПИСИ КАК КРЕАТИВНЫЙ БИЗНЕС')}</h2><p>${tr('ROOM616 is the project where most of my disciplines come together. Since 2023, I have been involved in the studio’s day-to-day development: recording and producing artists, visual content and cover art, shooting and editing, promotion, team coordination, hiring sound engineers, studio improvements, events and livestreams.','ROOM616 — проект, в котором сошлось большинство моих направлений. С 2023 года я занимаюсь ежедневным развитием студии: записываю и продюсирую артистов, создаю визуальный контент и обложки, снимаю и монтирую, занимаюсь продвижением, координацией команды, поиском звукорежиссёров, развитием пространства, мероприятиями и трансляциями.')}</p><p>${tr('My role sits between creative production and operations. I can work directly with an artist on a track and its visual identity while also thinking about how the studio itself should function, communicate and grow.','Моя роль находится между креативным продакшном и операционным управлением. Я могу работать с артистом над треком и его визуальной идентичностью и одновременно думать о том, как должна работать, коммуницировать и развиваться сама студия.')}</p></div>
      ${row([media([`${s}/studio-hero.png`,`${s}/studio-hero.jpg`],'ROOM616')],'v23-full','343 / 166')}
      ${section('STUDIO / PROCESS','СТУДИЯ / ПРОЦЕСС')}
      ${row([pic(1),pic(2)],'v23-7-5','343 / 136')}
      ${row([pic(3),pic(4)],'v23-5-7','343 / 136')}
      ${row([pic(5),pic(6)],'v23-7-5','343 / 137')}
    </article></div></div>`;
  };

  renderPhotos = async function(){
    const p='assets/photos';
    const pic = n => {
      const nn=String(n).padStart(2,'0');
      return media([`${p}/photo-${nn}.jpg`,`${p}/photo-${nn}.JPG`,`${p}/photo-${nn}.jpeg`,`${p}/photo-${nn}.png`],`${tr('Photo','Фото')} ${n}`);
    };
    return `<div class="v23-scroll"><div class="v23-content v23-photos"><article class="v23-case">
      ${caseHeader(tr('PHOTOS','ФОТО'), tr('LIFESTYLE / ARCHIVE','LIFESTYLE / АРХИВ'), 'dock-fallback/photos.png')}
      <div class="v23-copy v23-photo-copy"><p>${tr('A visual archive around the studio, music, people and everyday production.','Визуальный архив вокруг студии, музыки, людей и повседневного продакшна.')}</p></div>
      ${row([pic(1),pic(2)],'v23-2','343 / 169')}
      ${row([pic(3),pic(4)],'v23-5-7','343 / 135')}
      ${row([pic(5),pic(6)],'v23-2','343 / 169')}
      ${row([pic(7),pic(8),pic(9)],'v23-3','343 / 111')}
      ${row([pic(10),pic(11)],'v23-2','343 / 169')}
      ${row([pic(12)],'v23-full','343 / 228')}
    </article></div></div>`;
  };

  document.addEventListener('click', e => {
    const b=e.target.closest('.v23-sound');
    if(!b) return;
    e.preventDefault(); e.stopPropagation();
    const v=b.parentElement.querySelector('video');
    if(!v) return;
    v.muted=!v.muted;
    b.textContent=v.muted?tr('SOUND OFF','ЗВУК ВЫКЛ'):tr('SOUND ON','ЗВУК ВКЛ');
    v.play().catch(()=>{});
  });
})();
