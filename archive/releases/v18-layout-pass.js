
(() => {
  // ---------- COVER: artwork-first composition ----------
  renderCover = async function(){
    const paths=[
      'assets/cover/01-most-valuable-player.jpg','assets/cover/02-plus-aura.jpeg','assets/cover/03-appercot.jpg',
      'assets/cover/04-SCULPTURE.jpg','assets/cover/05-Museum.jpg','assets/cover/06-Однушки.jpg',
      'assets/cover/07-Negative-impact.jpg','assets/cover/08-LOVE-MUZIC.jpg','assets/cover/09-AMMO.jpeg',
      'assets/cover/10-Sugar-Dead.jpg','assets/cover/11-Wounds:Feign.jpg','assets/cover/12-Your-Heart.jpg'
    ];
    return `<div class="v18-scroll v18-cover">
      <div class="v18-page-head"><h1>COVER ART</h1><div>MUSIC ARTWORK · SELECTED WORK</div></div>
      ${coverWorks.map((w,i)=>{
        const art=`<div class="v18-cover-art"><img src="${paths[i]}" alt="${esc(w.title)}" draggable="false">
          <div class="v18-cover-overlay"><div>${esc(w.overlay)}</div>${w.link?'<b>OPEN MUSIC ↗</b>':''}</div></div>`;
        return `<article class="v18-cover-row" id="cover-${i}">
          ${w.link?`<a href="${esc(w.link)}" target="_blank" rel="noreferrer">${art}</a>`:art}
          <div class="v18-cover-info"><div class="v18-meta">${esc(w.year)} · ${esc(w.artist)}</div>
          <h2>${esc(w.title)}</h2><p>${esc(w.text)}</p>
          <div class="v18-tags">${w.roles.split(' / ').slice(0,4).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
          ${w.promo?`<a class="v18-promo" href="${esc(w.promo)}" target="_blank" rel="noreferrer">PROMO ↗</a>`:''}</div>
        </article>`;
      }).join('')}</div>`;
  };

  // ---------- LIVE: dense, intentional mosaic ----------
  const liveSet=[
    {id:'offtop1',title:'OFFTOP 1 — CLUB ACTION',year:'2024',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop1/offtop-01-hero.JPG',
     visual:['assets/live/offtop1/offtop-01-poster-01.jpg','assets/live/offtop1/offtop-01-poster-02.jpg','assets/live/offtop1/offtop-01-merch-01.jpg','assets/live/offtop1/offtop-01-merch-02jpg.jpg','assets/live/offtop1/offtop-01-merch-03.jpg'],
     photos:['assets/live/offtop1/offtop-01-photo-01.JPG','assets/live/offtop1/offtop-01-photo-02.jpg','assets/live/offtop1/offtop-01-photo-03.jpg','assets/live/offtop1/offtop-01-photo-04.jpeg'],
     videos:['assets/live/offtop1/offtop-01-video-01.MP4','assets/live/offtop1/offtop-01-video-02.MP4','assets/live/offtop1/offtop-01-video-03.mp4'],
     copy:'A LIVE PROJECT WHERE I HANDLED THE PRACTICAL SIDE OF THE EVENT, WORKED WITH ARTISTS, HELPED BUILD AND DISMANTLE THE VENUE, SOLD MERCHANDISE AND PERFORMED MY OWN MUSIC.'},
    {id:'offtop2',title:'OFFTOP 2 — CLUB LINZA',year:'2025',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop2/offtop-02-hero.jpg',
     visual:['assets/live/offtop2/offtop-02-poster-01.jpg','assets/live/offtop2/offtop-02-poster-02.jpg','assets/live/offtop2/offtop-02-poster-03.jpg','assets/live/offtop2/offtop-02-poster-04.jpg','assets/live/offtop2/offtop-02-merch-01.jpg','assets/live/offtop2/offtop-02-merch-02.jpg','assets/live/offtop2/offtop-02-merch-03.jpg','assets/live/offtop2/offtop-02-merch-04.png'],
     photos:[1,2,3,4,5,6,7,8].map(n=>`assets/live/offtop2/offtop-02-photo-0${n}.jpg`),
     videos:['assets/live/offtop2/offtop-02-video-01.MP4'],
     copy:'THE SECOND OFFTOP EXPANDED MY ROLE INTO VISUAL DIRECTION, MERCH, ARTIST COORDINATION AND A FREE RECORDING ZONE WHERE I RECORDED AND PRODUCED GUESTS.'},
    {id:'offtop3',title:'OFFTOP 3 — CLUB FACTORY 3',year:'2026',role:'ORGANIZER / PERFORMER',
     hero:'assets/live/offtop3/offtop-03-hero.jpeg',
     visual:['assets/live/offtop3/offtop-03-poster-01.jpg','assets/live/offtop3/offtop-03-poster-02.jpg','assets/live/offtop3/offtop-03-poster-03.jpeg','assets/live/offtop3/offtop-03-poster-04.jpeg'],
     photos:['assets/live/offtop3/offtop-03-photo-01.jpg','assets/live/offtop3/offtop-03-photo-02.jpg','assets/live/offtop3/offtop-03-photo-03.jpg','assets/live/offtop3/offtop-03-photo-04.jpeg','assets/live/offtop3/offtop-03-photo-05.jpg','assets/live/offtop3/offtop-03-photo-06.jpeg','assets/live/offtop3/offtop-03-photo-07.jpeg','assets/live/offtop3/offtop-03-photo-08.jpeg'],
     videos:[],copy:'THE THIRD OFFTOP CONTINUED THE LIVE SERIES WITH VENUE OPERATIONS, ARTIST COORDINATION, MERCHANDISE AND MY OWN PERFORMANCE.'}
  ];
  const mosaic=(arr,kind='')=>`<div class="v18-mosaic ${kind}">${arr.map((p,i)=>`<figure class="m${i%6}"><img src="${p}" alt="" loading="lazy" draggable="false"></figure>`).join('')}</div>`;
  const ambient=p=>`<div class="v18-ambient"><video src="${p}" autoplay muted loop playsinline preload="metadata"></video><button class="v18-sound">SOUND OFF</button></div>`;
  renderEvents=async function(){
    return `<div class="v18-scroll">${liveSet.map(e=>`<article class="v18-case" id="${e.id}">
      <header class="v18-case-head"><img src="assets/live/icns.png" alt=""><div><h1>${e.title}</h1><div class="v18-meta">${e.year} · ${e.role}</div></div></header>
      <div class="v18-natural"><img src="${e.hero}" alt="${e.title}" draggable="false"></div>
      <p class="v18-copy">${e.copy}</p>
      <h3>POSTERS / MERCH</h3>${mosaic(e.visual,'v18-visuals')}
      <h3>BACKSTAGE / LIVE</h3>${mosaic(e.photos,'v18-photos')}
      ${e.videos.map(ambient).join('')}
    </article>`).join('')}</div>`;
  };

  // ---------- VIDEO: all projects feel like moving artwork ----------
  renderVideos=async function(){
    const local=[
      ['2026 · DIRECTOR / PRODUCER / EDITOR','APPERCOT — PROMO CLIP','assets/video/video-appercot.mp4','A SHORT PROMOTIONAL VIDEO CREATED AS A VISUAL EXTENSION OF THE TRACK.'],
      ['2025 · DIRECTOR / PRODUCER / EDITOR','YOUR HEART — PROMO CLIP','assets/video/video-yourheart.MP4','A SHORT-FORM PROMO CREATED FOR SOCIAL PLATFORMS AROUND MY OWN MUSIC.']
    ];
    return `<div class="v18-scroll">
      <article class="v18-case"><div class="v18-meta">2025 · DIRECTOR / PERFORMER / PRODUCER / EDITOR</div><h1>SMALL TALK</h1>
      <div class="v18-youtube"><iframe src="https://www.youtube.com/embed/l4vY2bZz73o?autoplay=1&mute=1&loop=1&playlist=l4vY2bZz73o&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><a href="https://www.youtube.com/watch?v=l4vY2bZz73o" target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a></div>
      <p class="v18-copy">A SELF-PRODUCED MUSIC VIDEO BUILT AROUND MY OWN TRACK — FROM THE VISUAL CONCEPT AND SHOOT TO THE FINAL EDIT.</p></article>
      ${local.map(v=>`<article class="v18-case"><div class="v18-meta">${v[0]}</div><h1>${v[1]}</h1>${ambient(v[2])}<p class="v18-copy">${v[3]}</p></article>`).join('')}
    </div>`;
  };

  // ---------- Small utility windows for software ----------
  renderSkill=function(data){
    const key=String(data.title).toLowerCase();
    const icon=key.includes('photoshop')?'dock-fallback/photoshop.png':key.includes('premiere')?'dock-fallback/premiere.png':'dock-fallback/flstudio.png';
    const short = key.includes('photoshop')?['COVER ART','TYPOGRAPHY','COMPOSITING']:
                  key.includes('premiere')?['VIDEO EDITING','SHORT-FORM','MUSIC VIDEO']:
                  ['8 YEARS','RECORDING','MIXING / PRODUCTION'];
    return `<div class="v18-utility"><img src="${icon}" alt=""><div><div class="v18-meta">APPLICATION / SKILL</div><h1>${String(data.title).toUpperCase()}</h1><div class="v18-tags">${short.map(x=>`<span>${x}</span>`).join('')}</div></div></div>`;
  };

  // Smaller software windows; project windows remain consistent.
  const previousSize=getWindowSize;
  getWindowSize=function(key,data){
    if(data.type==='skill') return {width:470,height:250};
    if(['cover','events','studio','videos','photos','notes'].includes(data.type)) return {width:820,height:690};
    return previousSize(key,data);
  };

  // Sound toggles.
  document.addEventListener('click',e=>{
    const b=e.target.closest('.v18-sound');if(!b)return;
    e.stopPropagation();const v=b.parentElement.querySelector('video');if(!v)return;
    v.muted=!v.muted;b.textContent=v.muted?'SOUND OFF':'SOUND ON';v.play().catch(()=>{});
  });

  // Shorten the Skills content if the existing CV/skills view is present.
  const trimSkills=()=>{
    document.querySelectorAll('.skills-grid,.cv-skills,.skills-list').forEach(box=>{
      if(box.dataset.v18)return;box.dataset.v18='1';
      const items=[...box.children]; if(items.length>6) items.slice(6).forEach(x=>x.remove());
    });
  };
  new MutationObserver(trimSkills).observe(document.body,{subtree:true,childList:true}); trimSkills();
})();
