
(() => {
  const dockFallback = {
    telegram:'dock-fallback/telegram.png', instagram:'dock-fallback/instagram.png',
    email:'dock-fallback/mail.png', mail:'dock-fallback/mail.png', linkedin:'dock-fallback/linkedin.png',
    photos:'dock-fallback/photos.png', notes:'dock-fallback/notes.png',
    photoshop:'dock-fallback/photoshop.png', premiere:'dock-fallback/premiere.png', flstudio:'dock-fallback/flstudio.png'
  };

  // Browser cannot reliably display .icns directly. Try the user's ICNS path first where supported,
  // then fall back to the converted PNG bundled with this build.
  document.querySelectorAll('.dock-item').forEach(item=>{
    const key=item.dataset.open || item.dataset.link || '';
    const img=item.querySelector('img');
    if(img && dockFallback[key]){
      img.src=dockFallback[key];
      img.onerror=()=>{ img.onerror=null; img.src=dockFallback[key]; };
    }
  });

  // One visual language and one scale for every content window.
  const oldGetWindowSize=getWindowSize;
  getWindowSize=function(key,data){
    if(['cover','events','studio','videos','photos','notes'].includes(data.type)) return {width:760,height:650};
    if(data.type==='skill') return {width:620,height:520};
    return oldGetWindowSize(key,data);
  };

  // Photos: Pinterest-like masonry, preserving natural image ratios.
  renderPhotos = async function(){
    const paths = [
      'assets/photos/photo-01.jpg','assets/photos/photo-02.jpg','assets/photos/photo-03.jpg',
      'assets/photos/photo-04.jpg','assets/photos/photo-05.jpg','assets/photos/photo-06.jpg',
      'assets/photos/photo-07.jpg','assets/photos/photo-08.jpg','assets/photos/photo-09.jpg'
    ];
    return `<div class="v15-unified-scroll"><div class="v15-page-head"><h1>PHOTOS</h1><div>LIFESTYLE / ARCHIVE</div></div>
      <div class="v15-masonry">${paths.map((p,i)=>`<img src="${p}" alt="Lifestyle ${i+1}" loading="lazy" draggable="false">`).join('')}</div></div>`;
  };

  // CV: same skeleton/typography as the portfolio windows instead of a separate oversized design.
  const oldNotes=renderNotes;
  renderNotes = async function(){
    const body=await oldNotes();
    return `<div class="v15-unified-scroll v15-cv">${body}</div>`;
  };

  // If YouTube blocks embedding in a local file, provide a clear direct-open fallback instead of an error-looking blank.
  new MutationObserver(()=>{
    document.querySelectorAll('.window[data-key="video"] iframe').forEach(f=>{
      if(f.dataset.v15) return; f.dataset.v15='1';
      const wrap=f.parentElement;
      const a=document.createElement('a'); a.className='v15-youtube-fallback';
      a.href='https://www.youtube.com/watch?v=l4vY2bZz73o'; a.target='_blank'; a.rel='noreferrer';
      a.textContent='OPEN ON YOUTUBE ↗'; wrap.appendChild(a);
    });
  }).observe(document.body,{childList:true,subtree:true});
})();
