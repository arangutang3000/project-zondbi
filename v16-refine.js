
(() => {
  const LIVE_ICON='assets/live/icns.png';
  const STUDIO_ICON='assets/studio/icns-studio.png';
  const liveData=[
    {id:'offtop1',title:'OFFTOP 1 — CLUB ACTION',year:'2024',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop1/offtop-01-hero.JPG',
     visual:['assets/live/offtop1/offtop-01-poster-01.jpg','assets/live/offtop1/offtop-01-poster-02.jpg','assets/live/offtop1/offtop-01-merch-01.jpg','assets/live/offtop1/offtop-01-merch-02jpg.jpg','assets/live/offtop1/offtop-01-merch-03.jpg'],
     photos:['assets/live/offtop1/offtop-01-photo-01.JPG','assets/live/offtop1/offtop-01-photo-02.jpg','assets/live/offtop1/offtop-01-photo-03.jpg','assets/live/offtop1/offtop-01-photo-04.jpeg'],
     videos:['assets/live/offtop1/offtop-01-video-01.MP4','assets/live/offtop1/offtop-01-video-02.MP4','assets/live/offtop1/offtop-01-video-03.mp4']},
    {id:'offtop2',title:'OFFTOP 2 — CLUB LINZA',year:'2025',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop2/offtop-02-hero.jpg',
     visual:['assets/live/offtop2/offtop-02-poster-01.jpg','assets/live/offtop2/offtop-02-poster-02.jpg','assets/live/offtop2/offtop-02-poster-03.jpg','assets/live/offtop2/offtop-02-poster-04.jpg','assets/live/offtop2/offtop-02-merch-01.jpg','assets/live/offtop2/offtop-02-merch-02.jpg','assets/live/offtop2/offtop-02-merch-03.jpg','assets/live/offtop2/offtop-02-merch-04.png'],
     photos:[1,2,3,4,5,6,7,8].map(n=>`assets/live/offtop2/offtop-02-photo-0${n}.jpg`),
     videos:['assets/live/offtop2/offtop-02-video-01.MP4']},
    {id:'offtop3',title:'OFFTOP 3 — CLUB FACTORY 3',year:'2026',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop3/offtop-03-hero.jpeg',
     visual:['assets/live/offtop3/offtop-03-poster-01.jpg','assets/live/offtop3/offtop-03-poster-02.jpg','assets/live/offtop3/offtop-03-poster-03.jpeg','assets/live/offtop3/offtop-03-poster-04.jpeg'],
     photos:['assets/live/offtop3/offtop-03-photo-01.jpg','assets/live/offtop3/offtop-03-photo-02.jpg','assets/live/offtop3/offtop-03-photo-03.jpg','assets/live/offtop3/offtop-03-photo-04.jpeg','assets/live/offtop3/offtop-03-photo-05.jpg','assets/live/offtop3/offtop-03-photo-06.jpeg','assets/live/offtop3/offtop-03-photo-07.jpeg','assets/live/offtop3/offtop-03-photo-08.jpeg'],
     videos:[]}
  ];
  const pic=(p,a='')=>`<img src="${p}" alt="${a}" loading="lazy" draggable="false">`;
  const ambient=(p,a='')=>`<div class="v16-ambient"><video src="${p}" aria-label="${a}" autoplay muted loop playsinline preload="metadata"></video><button class="v16-sound" type="button">SOUND OFF</button></div>`;
  const masonry=(arr,cls='')=>`<div class="v16-masonry ${cls}">${arr.map(p=>`<figure>${pic(p)}</figure>`).join('')}</div>`;

  renderEvents=async function(){
    const descriptions=[
      'A LIVE PROJECT WHERE I HANDLED THE PRACTICAL SIDE OF THE EVENT, WORKED WITH ARTISTS, HELPED BUILD AND DISMANTLE THE VENUE, SOLD MERCHANDISE AND PERFORMED MY OWN MUSIC.',
      'THE SECOND OFFTOP EVENT EXPANDED MY ROLE INTO VISUAL DIRECTION, MERCH, ARTIST COORDINATION AND A FREE RECORDING ZONE WHERE I RECORDED AND PRODUCED GUESTS.',
      'THE THIRD OFFTOP CONTINUED THE LIVE SERIES WITH VENUE OPERATIONS, ARTIST COORDINATION, MERCHANDISE AND MY OWN PERFORMANCE.'
    ];
    return `<div class="v16-scroll">${liveData.map((e,i)=>`<article class="v16-case" id="${e.id}">
      <header class="v16-case-head"><img src="${LIVE_ICON}" alt=""><div><h1>${e.title}</h1><div class="v16-meta">${e.year} · ${e.role}</div></div></header>
      <div class="v16-hero">${pic(e.hero,e.title)}</div>
      <p class="v16-copy">${descriptions[i]}</p>
      <div class="v16-section-title">POSTERS / MERCH</div>
      ${masonry(e.visual,'v16-visuals')}
      <div class="v16-section-title">BACKSTAGE / LIVE</div>
      ${masonry(e.photos,'v16-live-photos')}
      ${e.videos.map(v=>ambient(v,'Live video')).join('')}
    </article>`).join('')}</div>`;
  };

  renderStudio=async function(){
    const ps=['assets/studio/studio-photo-01.jpg','assets/studio/studio-photo-02.jpg','assets/studio/studio-photo-03.JPG','assets/studio/studio-photo-04.JPG','assets/studio/studio-photo-05.JPG'];
    return `<div class="v16-scroll"><article class="v16-case">
      <header class="v16-case-head"><img src="${STUDIO_ICON}" alt=""><div><div class="v16-meta">ROOM616 · 2023 — PRESENT · 3 YEARS</div><h1>RUNNING A RECORDING STUDIO AS A CREATIVE BUSINESS</h1></div></header>
      <p class="v16-copy">FOR THE LAST THREE YEARS I HAVE RUN AND DEVELOPED ROOM616 IN CENTRAL SAINT PETERSBURG: CLIENT WORK, MUSIC PRODUCTION, CONTENT, PROMOTION, TEAM COORDINATION AND DAY-TO-DAY OPERATIONS.</p>
      <div class="v16-hero">${pic('assets/studio/studio-hero.png','ROOM616')}</div>
      <div class="v16-section-title">MY ROLE</div><h2>FOUNDER / CREATIVE PRODUCER / STUDIO MANAGER</h2>
      <p class="v16-copy">I RECORDED CLIENTS, PRODUCED ARTISTS, SHOT AND EDITED CONTENT, DESIGNED COVERS, MIXED TRACKS, MANAGED THE TEAM AND BUDGET, HIRED SOUND ENGINEERS, HANDLED PROMOTION AND ORGANIZED EVENTS AND LIVESTREAMS.</p>
      ${masonry(ps,'v16-studio-photos')}
    </article></div>`;
  };

  renderVideos=async function(){
    return `<div class="v16-scroll">
      <article class="v16-case"><div class="v16-meta">2025 · DIRECTOR / PERFORMER / PRODUCER / EDITOR</div><h1>SMALL TALK</h1>
        <div class="v16-youtube"><iframe src="https://www.youtube.com/embed/l4vY2bZz73o?autoplay=1&mute=1&loop=1&playlist=l4vY2bZz73o&playsinline=1&rel=0" title="SMALL TALK" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><a href="https://www.youtube.com/watch?v=l4vY2bZz73o" target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a></div>
        <p class="v16-copy">A SELF-PRODUCED MUSIC VIDEO BUILT AROUND MY OWN TRACK — FROM THE VISUAL CONCEPT AND SHOOT TO THE FINAL EDIT.</p></article>
      <article class="v16-case"><div class="v16-meta">2026 · DIRECTOR / PRODUCER / EDITOR</div><h1>APPERCOT — PROMO CLIP</h1>${ambient('assets/video/video-appercot.mp4','Appercot promo')}<p class="v16-copy">A SHORT PROMOTIONAL VIDEO CREATED AS A VISUAL EXTENSION OF THE TRACK.</p></article>
      <article class="v16-case"><div class="v16-meta">2025 · DIRECTOR / PRODUCER / EDITOR</div><h1>YOUR HEART — PROMO CLIP</h1>${ambient('assets/video/video-yourheart.MP4','Your Heart promo')}<p class="v16-copy">A SHORT-FORM PROMO CREATED FOR SOCIAL PLATFORMS AROUND MY OWN MUSIC.</p></article>
    </div>`;
  };

  renderSkill=function(data){
    const map={Photoshop:'dock-fallback/photoshop.png','Adobe Photoshop':'dock-fallback/photoshop.png','Adobe Premiere Pro':'dock-fallback/premiere.png','FL Studio':'dock-fallback/flstudio.png'};
    const icon=map[data.title]||'';
    return `<div class="v16-scroll"><article class="v16-skill"><img class="v16-skill-icon" src="${icon}" alt=""><div class="v16-meta">APPLICATION / SKILL</div><h1>${String(data.title).toUpperCase()}</h1><h2>${String(data.years).toUpperCase()}</h2><div class="v16-tags">${data.skills.map(s=>`<span>${String(s).toUpperCase()}</span>`).join('')}</div></article></div>`;
  };

  // Ambient video sound toggle for both LIVE and VIDEO.
  document.addEventListener('click',e=>{
    const b=e.target.closest('.v16-sound'); if(!b)return;
    e.preventDefault();e.stopPropagation();
    const v=b.parentElement.querySelector('video'); if(!v)return;
    v.muted=!v.muted;b.textContent=v.muted?'SOUND OFF':'SOUND ON'; if(v.paused)v.play().catch(()=>{});
  });

  // Make every window use the same project2 scale.
  const prevSize=getWindowSize;
  getWindowSize=function(key,data){
    if(['cover','events','studio','videos','photos','notes'].includes(data.type)) return {width:800,height:680};
    if(data.type==='skill') return {width:640,height:540};
    return prevSize(key,data);
  };

  // Dock: use correctly extracted icons, never text/emoji placeholders.
  const dockMap={telegram:'telegram',instagram:'instagram',email:'mail',mail:'mail',linkedin:'linkedin',photos:'photos',notes:'notes',photoshop:'photoshop',premiere:'premiere',flstudio:'flstudio'};
  document.querySelectorAll('.dock-item').forEach(el=>{
    const k=el.dataset.open||el.dataset.link||'';
    const name=dockMap[k]; if(!name)return;
    let img=el.querySelector('img');
    if(!img){img=document.createElement('img');el.prepend(img);}
    img.src=`dock-fallback/${name}.png`;img.alt='';img.draggable=false;
  });
})();
