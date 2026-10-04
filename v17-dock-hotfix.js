
(() => {
  const icons={
    'contact-telegram':'telegram.png',
    'contact-instagram':'instagram.png',
    'contact-mail':'mail.png',
    'contact-linkedin':'linkedin.png',
    'photos':'photos.png',
    'notes':'notes.png',
    'photoshop':'photoshop.png',
    'premiere':'premiere.png',
    'flstudio':'flstudio.png'
  };
  document.querySelectorAll('.dock-icon[data-dock-key]').forEach(btn=>{
    const file=icons[btn.dataset.dockKey];
    if(!file)return;
    btn.querySelectorAll(':scope > span').forEach(s=>s.remove());
    let img=btn.querySelector(':scope > img');
    if(!img){img=document.createElement('img');btn.prepend(img);}
    img.src='dock-fallback/'+file;
    img.alt=btn.getAttribute('aria-label')||'';
    img.draggable=false;
    btn.classList.add('has-real-icon');
  });
})();
