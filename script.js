/*
  MANJURIA OS — v12
  Content and portfolio data live in this file. Media can also be uploaded from
  Apple menu -> Upload portfolio photos and will persist in this browser.
*/

const windows = document.getElementById('windows');
const appleMenu = document.getElementById('appleMenu');
const toast = document.getElementById('toast');
const bootScreen = document.getElementById('bootScreen');
const desktop = document.getElementById('desktop');
const desktopIcons = document.getElementById('desktopIcons');
const wallpaperPicker = document.getElementById('wallpaperPicker');
const iconPicker = document.getElementById('iconPicker');
const dockIconPicker = document.getElementById('dockIconPicker');
const dockIconCustomizer = document.getElementById('dockCustomizer');
const dockCustomizerList = document.getElementById('dockCustomizerList');
const iconCustomizer = document.getElementById('iconCustomizer');
const iconCustomizerList = document.getElementById('iconCustomizerList');
const uploadCustomizer = document.getElementById('uploadCustomizer');
const uploadCustomizerList = document.getElementById('uploadCustomizerList');
const uploadPicker = document.getElementById('portfolioUploadPicker');

let zIndex = 100;
let windowCount = 0;
let iconPickerTarget = null;
let dockIconPickerTarget = null;
let uploadTarget = null;
let dockTooltip = null;

const positionsKey = 'manjuria-desktop-icon-positions-v12';
const wallpaperKey = 'manjuria-wallpaper-data-v12';
const iconImagesKey = 'manjuria-desktop-icon-images-v12';
const dockImagesKey = 'manjuria-dock-icon-images-v12';
const uploadedMediaKey = 'manjuria-portfolio-media-v11';
const mediaDBName = 'bymanjuria-portfolio-media';
const mediaDBVersion = 1;
let mediaDBPromise = null;

const links = {
  telegram: 'https://t.me/manjuria_puff616',
  instagram: 'https://www.instagram.com/hundred_euro/',
  linkedin: 'https://www.linkedin.com/in/manjuria-puff-undefined-69bb73437/',
  email: 'mailto:ramenskiy.7777@gmail.com',
  youtube: 'https://www.youtube.com/@ManjuriaPuff',
  youtubeVideo: 'https://youtu.be/l4vY2bZz73o',
  yandex: 'https://music.yandex.ru/artist/22551966',
  soundcloud: 'https://on.soundcloud.com/iauVCLzJf5dUZ2eV7J',
  behance: 'https://www.behance.net/b0c9caa2',
  studioInstagram: 'https://www.instagram.com/room616_rec/',
  studioSite: 'https://room616.ru/',
  eventInstagram: 'https://www.instagram.com/offtop616/',
  resume: 'assets/about/Resume Ramenskii Andrei.pdf.pdf'
};

const profile = {
  displayName: 'ByManjuria',
  name: 'Manjuria Puff',
  role: 'Creative Content Specialist / Creative Producer / Designer / Video Editor',
  locations: 'Nha-Trang, Vietnam / Saint-Petersburg, Russia',
  email: 'ramenskiy.7777@gmail.com',
  summary: 'Creative and versatile specialist working across digital content, audio production, video editing, graphic design, AI-assisted tools and live events. From 2023 to 2026, my main focus was running and developing ROOM616 in central Saint-Petersburg while working with artists, clients and creative projects.',
  about: `I create visual and audio content for music, artists, events and brands. My work includes cover art, posters, menus, merchandise, short-form content, music videos, recording, mixing and music production. I work confidently in Photoshop and Premiere Pro and have around eight years of experience with FL Studio.\n\nFor the last three years I have also been running and developing ROOM616, a recording studio in central Saint-Petersburg. I worked with clients and artists, produced music, created content and visuals, managed the studio, handled budgets and promotion, hired sound engineers, organized events and took part in live productions.\n\nMy background is broader than creative production: I studied software engineering, have basic HTML layout experience, worked in procurement and sales, and have experience creating marketplace product cards with AI tools. This combination helps me understand both the creative side of a project and the practical work needed to take an idea to a finished result.`,
  education: 'Information Systems and Programming / Applied Informatics — St. Petersburg University of Management Technologies and Economics, 2019–2022.',
  experience: [
    {role:'Sound Producer / SMM Specialist / Designer / Video Editor', company:'ROOM616', period:'Oct 2023 — Sep 2026'},
    {role:'Logistics Specialist', company:'Yandex Lavka', period:'Nov 2025 — Aug 2026'},
    {role:'Purchasing Manager', company:'ProService', period:'Apr 2022 — Nov 2024'}
  ],
  skills: [
    'Graphic Design', 'Cover Art', 'Typography', 'Poster Design', 'Merch Design',
    'Adobe Photoshop', 'Adobe Premiere Pro', 'Video Editing', 'Music Video Production',
    'Short-form Content', 'TikTok Content', 'Content Strategy', 'Creative Direction',
    'FL Studio', 'Recording', 'Music Production', 'Mixing', 'Mastering',
    'Client Communication', 'Project Coordination', 'Event Organization', 'Studio Management',
    'Promotion', 'Advertising', 'AI-assisted Content Creation', 'Marketplace Infographics',
    'HTML / Web Layout'
  ]
};

const coverWorks = [
  { title:'Most Valuable Player', artist:'Manjuria Puff, Pavook', year:'2025', image:'assets/cover/01-most-valuable-player.jpg', roles:'Cover Art / Typography / Full Artwork / Recording', text:'This track makes me feel like I am somewhere above the clouds.', overlay:'2025 · Art Director: ByManjuria · Feat: Pavook · Prod. By: krayzzzen, maathyas · Recording: ROOM616 · Mix: Pavook · Master: Pavook', link:'https://music.yandex.ru/album/37075448/track/140221739' },
  { title:'PLUS AURA', artist:'Manjuria Puff, Bomi G', year:'2025', image:'assets/cover/02-plus-aura.jpg', roles:'Cover Art / Typography / Full Artwork / Recording / Mix', text:'My first project with an international artist.', overlay:'2025 · Art Director: ByManjuria · Feat: Bomi G · Prod. By: Morioh · Recording: ROOM616 · Mix: Manjuria Puff · Master: Manjuria Puff', link:'https://music.yandex.ru/album/35100158/track/135452238' },
  { title:'Appercot', artist:'Manjuria Puff, VICEYY', year:'2026', image:'assets/cover/03-appercot.jpg', roles:'Cover Art / Typography / Full Artwork / Recording / Mix', text:'The longest project we worked on in terms of production time.', overlay:'2026 · Art Director: ByManjuria · Feat: VICEYY · Prod. By: wikee, kriskyle · Recording: ROOM616 · Mix: VICEYY · Master: VICEYY', link:'https://music.yandex.ru/album/41493998/track/150063853', promo:'https://www.instagram.com/reel/DXRcxZfjbXL/' },
  { title:'SCULPTURE', artist:'Manjuria Puff', year:'2025', image:'assets/cover/04-sculpture.jpg', roles:'Cover Art / Typography / Full Artwork / Recording / Mix / Mastering', text:'My first solo album, built from scratch. I never released it because the sound moved on while I was working on it alone. The visual became a piece of its own: a tracklist where different typefaces emphasize each title while the individual parts still work as one system.', overlay:'2025 · Art Director: ByManjuria · Recording: ROOM616 · Mix: Manjuria Puff · Master: Manjuria Puff' },
  { title:'Museum', artist:'MadamTusso', year:'2025', image:'assets/cover/05-museum.jpg', roles:'Cover Art / Typography / Full Artwork', text:'My first commercial project in this field.', overlay:'2025 · Art Director: ByManjuria' },
  { title:'Однушки', artist:'MadamTusso', year:'2025', image:'assets/cover/06-odnushki.jpg', roles:'Cover Art / Typography / Full Artwork', text:'A cover redesign that I rebuilt after an earlier version by other designers.', overlay:'2025 · Art Director: ByManjuria' },
  { title:'Negative Impact', artist:'Manjuria Puff', year:'2026', image:'assets/cover/07-negative-impact.jpg', roles:'Cover Art / Typography / Full Artwork / Recording / Mix', text:'I drew on the visual language of 2015–2017 rap covers, especially the Chief Keef era, and translated that reference into my own visual direction.', overlay:'2026 · Art Director: ByManjuria · Prod. By: Morioh · Recording: ROOM616 · Mix: Manjuria Puff · Master: Manjuria Puff', link:'https://soundcloud.com/manjuria/negative-impact' },
  { title:'LOVE MUZIC', artist:'Manjuria Puff', year:'2025', image:'assets/cover/08-love-muzic.jpg', roles:'Cover Art / Typography / Full Artwork', text:'This project was made completely by hand. It was my first attempt at drawing my own cover artwork.', overlay:'2025 · Art Director: ByManjuria' },
  { title:'AMMO', artist:'Manjuria Puff', year:'2025', image:'assets/cover/09-ammo.jpg', roles:'Cover Art / Typography / Full Artwork', text:'The music was lost, but the visual part of the project remained.', overlay:'2025 · Art Director: ByManjuria' },
  { title:'Sugar Dead', artist:'MadamTusso', year:'2025', image:'assets/cover/10-sugar-dead.jpg', roles:'Cover Art / Typography / Full Artwork', text:'Another commercial cover project.', overlay:'2025 · Art Director: ByManjuria' },
  { title:'Wounds / Feign', artist:'Manjuria Puff, Long Way, Hobo Kid', year:'2025', image:'assets/cover/11-wounds-feign.jpg', roles:'Cover Art / Typography / Full Artwork / Recording', text:'The artwork was inspired by Marina Abramović and Ulay, specifically their performance Rest Energy. I wanted to translate the tension and physical relationship of that work into the cover.', overlay:'2025 · Art Director: ByManjuria · Prod. By: 1FEELINGSSS, SK1PA · Recording: ROOM616 · Mix: Long Way · Master: Long Way', link:'https://music.yandex.ru/album/35461616' },
  { title:'Your Heart', artist:'Manjuria Puff', year:'2025', image:'assets/cover/12-your-heart.jpg', roles:'Cover Art / Typography / Full Artwork / Recording', text:'When was the last time you received a Valentine outside Valentine’s Day?', overlay:'2025 · Art Director: ByManjuria · Prod. By: destiny, glowkenji · Recording: ROOM616 · Mix: Feel · Master: Feel', link:'https://music.yandex.ru/album/37968035', promo:'https://www.instagram.com/reel/DOga5GhDKvL/' }
];

const events = [
  { id:'offtop1', title:'OFFTOP 1 — CLUB ACTION', year:'2024', role:'Organizer / Performer', image:'assets/live/offtop-01-hero.jpg', text:'A live project where I handled the practical side of the event, worked with artists, helped build and dismantle the venue, sold merchandise and performed my own music. The visual materials and backstage documentation show the event as a working production rather than only a finished poster.', posters:['assets/live/offtop-01-poster-01.jpg','assets/live/offtop-01-poster-02.jpg'], merch:['assets/live/offtop-01-merch-01.jpg','assets/live/offtop-01-merch-02.jpg'], gallery:['assets/live/offtop-01-photo-01.jpg','assets/live/offtop-01-photo-02.jpg','assets/live/offtop-01-photo-03.jpg','assets/live/offtop-01-photo-04.jpg'] },
  { id:'offtop2', title:'OFFTOP 2 — CLUB LINZA', year:'2025', role:'Organizer / Performer / Producer', image:'assets/live/offtop-02-hero.jpg', text:'A larger creative and production role: I handled venue setup and teardown, worked with artists, sold merchandise and performed. We also created an open recording zone where anyone could record music for free; I handled the recording and production there. I also created the visual design and merchandise for the event.', logo:'assets/live/offtop-02-logo.jpg', posters:['assets/live/offtop-02-poster-01.jpg','assets/live/offtop-02-poster-02.jpg','assets/live/offtop-02-poster-03.jpg','assets/live/offtop-02-poster-04.jpg'], merch:['assets/live/offtop-02-merch-01.jpg','assets/live/offtop-02-merch-02.jpg','assets/live/offtop-02-merch-03.jpg'], gallery:['assets/live/offtop-02-photo-01.jpg','assets/live/offtop-02-photo-02.jpg','assets/live/offtop-02-photo-03.jpg','assets/live/offtop-02-photo-04.jpg','assets/live/offtop-02-photo-05.jpg'] },
  { id:'offtop3', title:'OFFTOP 3 — CLUB FACTORY 3', year:'2026', role:'Organizer / Performer', image:'assets/live/offtop-03-hero.jpg', text:'A live event focused on production, artist coordination and performance. I handled venue setup and teardown, looked after artists, sold merchandise and performed my own music.', logo:'assets/live/offtop-03-logo.jpg', posters:['assets/live/offtop-03-poster-01.jpg','assets/live/offtop-03-poster-02.jpg','assets/live/offtop-03-poster-03.jpg'], gallery:['assets/live/offtop-03-photo-01.jpg','assets/live/offtop-03-photo-02.jpg','assets/live/offtop-03-photo-03.jpg','assets/live/offtop-03-photo-04.jpg','assets/live/offtop-03-photo-05.jpg','assets/live/offtop-03-photo-06.jpg'] }
];

const videos = [
  { id:'video1', title:'SMALL TALK', year:'2025', image:'assets/video/01-small-talk.jpg', role:'Director / Performer / Producer / Editor', text:'A self-produced music video built around my own track. I planned the visual concept, shot the material and edited the final piece, taking the project from the song to a finished video.', youtube:'https://youtu.be/l4vY2bZz73o' },
  { id:'video2', title:'PROMO CLIP', year:'2026', image:'assets/video/02-promo.jpg', role:'Director / Producer / Editor', text:'A short promotional video created for my own music. The piece was produced as a compact visual extension of the track for social platforms.' },
  { id:'video3', title:'SMALL TALK — SHORT', year:'2025', image:'assets/video/03-small-talk-short.jpg', role:'Director / Producer / Editor', text:'A short-form version of the SMALL TALK visual, adapted for a vertical social format.', youtube:'https://youtube.com/shorts/tVVMIZzchsY' }
];

const content = {
  notes: { title:'NOTES', type:'notes' },
  photos: { title:'PHOTOS', type:'photos' },
  cover: { title:'COVER', type:'cover' },
  studio: { title:'STUDIO', type:'studio' },
  live: { title:'EVENT & LIVE', type:'events' },
  video: { title:'VIDEO', type:'videos' },
  photoshop: { title:'Adobe Photoshop', type:'skill', short:'Ps', years:'CONFIDENT WORKING EXPERIENCE', skills:['Cover art','Posters','Typography','Photo manipulation','Menus','Merchandise','Marketplace graphics'] },
  premiere: { title:'Adobe Premiere Pro', type:'skill', short:'Pr', years:'VIDEO EDITING', skills:['Music videos','Short-form content','Vertical video','Social content','Editing'] },
  flstudio: { title:'FL Studio', type:'skill', short:'FL', years:'8 YEARS', skills:['Recording','Music production','Arrangement','Mixing','Mastering'] }
};

function esc(value='') {
  return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function escapeJS(value) { return String(value).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
function showToast(message) { toast.textContent = message; toast.classList.remove('hidden'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.add('hidden'),2600); }
window.showToast = showToast;

function safeJSON(key, fallback={}) { try { return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)); } catch (_) { return fallback; } }
function saveJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { showToast('Browser storage is full. Use smaller images.'); return false; } }

// Wallpaper / desktop images / dock images
function restoreWallpaper() {
  const saved = localStorage.getItem(wallpaperKey);
  desktop.style.setProperty('--wallpaper-image', `url("${saved || 'assets/wallpaper/wallpaper.jpg'}")`);
}
function chooseWallpaper() { wallpaperPicker.click(); }
wallpaperPicker.addEventListener('change',()=>{ const file=wallpaperPicker.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{desktop.style.setProperty('--wallpaper-image',`url("${reader.result}")`); try{localStorage.setItem(wallpaperKey,reader.result);}catch(_){}}; reader.readAsDataURL(file); });

function loadIconImages(){return safeJSON(iconImagesKey,{});}
function saveIconImage(key,data){const x=loadIconImages();x[key]=data;saveJSON(iconImagesKey,x);}
function setThumbNaturalSize(thumb,src){const image=new Image();image.onload=()=>{thumb.style.setProperty('--thumb-size',window.innerWidth<=800?'68px':'82px');thumb.classList.add('has-image');};image.src=src;}
function applyIconImage(icon,data){const thumb=icon.querySelector('.desktop-thumb'),img=thumb?.querySelector('.desktop-folder-image');if(!thumb||!img)return;img.src=data;thumb.dataset.customImage='true';setThumbNaturalSize(thumb,data);}
function setupIconImages(){desktopIcons.querySelectorAll('.desktop-icon').forEach(icon=>{const thumb=icon.querySelector('.desktop-thumb'),img=thumb?.querySelector('.desktop-folder-image');if(!thumb||!img)return;thumb.dataset.defaultImage=img.getAttribute('src')||'';setThumbNaturalSize(thumb,img.src);});}
function restoreIconImages(){const imgs=loadIconImages();desktopIcons.querySelectorAll('.desktop-icon').forEach(i=>{if(imgs[i.dataset.open])applyIconImage(i,imgs[i.dataset.open]);});}
function getIconLabel(icon){return icon.querySelector(':scope > span:last-child')?.textContent?.trim()||icon.dataset.open;}
function openIconCustomizer(){renderIconCustomizer();iconCustomizer.classList.remove('hidden');}
function renderIconCustomizer(){const imgs=loadIconImages();iconCustomizerList.innerHTML=[...desktopIcons.querySelectorAll('.desktop-icon')].map(i=>{const key=i.dataset.open,c=imgs[key]||i.querySelector('.desktop-folder-image')?.getAttribute('src')||'';return `<div class="customizer-row"><div class="customizer-preview desktop-preview ${imgs[key]?'has-preview-image':''}" style='background-image:url("${esc(c)}")'></div><div><div class="customizer-name">${esc(getIconLabel(i))}</div><div class="customizer-file">${imgs[key]?'Custom icon':'Default icon'}</div></div><button class="customizer-change" data-icon-target="${esc(key)}">Change icon</button></div>`;}).join('');iconCustomizerList.querySelectorAll('.customizer-change').forEach(b=>b.onclick=()=>{iconPickerTarget=b.dataset.iconTarget;iconPicker.value='';iconPicker.click();});}
iconPicker.addEventListener('change',()=>{const file=iconPicker.files?.[0];if(!file||!iconPickerTarget)return;const reader=new FileReader();reader.onload=()=>{const icon=desktopIcons.querySelector(`.desktop-icon[data-open="${CSS.escape(iconPickerTarget)}"]`);if(icon){applyIconImage(icon,reader.result);saveIconImage(iconPickerTarget,reader.result);renderIconCustomizer();}iconPickerTarget=null;};reader.readAsDataURL(file);});

document.getElementById('closeIconCustomizer').addEventListener('click',()=>iconCustomizer.classList.add('hidden'));iconCustomizer.addEventListener('click',e=>{if(e.target===iconCustomizer)iconCustomizer.classList.add('hidden');});

function loadDockImages(){return safeJSON(dockImagesKey,{});} function saveDockImage(key,data){const x=loadDockImages();x[key]=data;saveJSON(dockImagesKey,x);}
function applyDockImage(button,data){button.style.setProperty('--dock-image',`url("${data}")`);button.classList.add('has-custom-image');}
function restoreDockImages(){const imgs=loadDockImages();document.querySelectorAll('.dock-icon[data-dock-key]').forEach(b=>{if(imgs[b.dataset.dockKey])applyDockImage(b,imgs[b.dataset.dockKey]);});}
function getDockLabel(button){return button.dataset.label||button.dataset.dockKey||'Dock icon';}
function renderDockCustomizer(){const imgs=loadDockImages();dockCustomizerList.innerHTML=[...document.querySelectorAll('.dock-icon[data-dock-key]')].map(b=>{const k=b.dataset.dockKey,c=imgs[k]||'';return `<div class="customizer-row"><div class="customizer-preview dock-preview ${c?'has-preview-image':''}" style="${c?`background-image:url("${c}")`:''}">${c?'':esc(b.textContent.trim())}</div><div><div class="customizer-name">${esc(getDockLabel(b))}</div><div class="customizer-file">${c?'Custom image':'Default icon'}</div></div><button class="customizer-change" data-dock-target="${esc(k)}">Change image</button></div>`}).join('');dockCustomizerList.querySelectorAll('.customizer-change').forEach(b=>b.onclick=()=>{dockIconPickerTarget=b.dataset.dockTarget;dockIconPicker.value='';dockIconPicker.click();});}
document.getElementById('customizeDockIcons').addEventListener('click',()=>{appleMenu.classList.add('hidden');renderDockCustomizer();dockIconCustomizer.classList.remove('hidden');});document.getElementById('closeDockCustomizer').addEventListener('click',()=>dockIconCustomizer.classList.add('hidden'));dockIconCustomizer.addEventListener('click',e=>{if(e.target===dockIconCustomizer)dockIconCustomizer.classList.add('hidden');});
function readU32(view,offset){return view.getUint32(offset,false);} function parseICNS(buf){const view=new DataView(buf);if(view.byteLength<8)throw Error('Invalid ICNS file.');const magic=String.fromCharCode(...new Uint8Array(buf.slice(0,4)));if(magic!=='icns')throw Error('This file is not a valid .icns icon.');const sizes={ic10:1024,ic09:512,ic14:512,ic13:256,ic08:256,ic07:128,ic12:64,ic06:64,ic11:32,ic05:32,ic04:16};let off=8,entries=[];while(off+8<=view.byteLength){const type=String.fromCharCode(...new Uint8Array(buf.slice(off,off+4))),len=readU32(view,off+4);if(len<8||off+len>view.byteLength)break;const data=buf.slice(off+8,off+len),b=new Uint8Array(data),png=b.length>8&&b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71,jpg=b.length>2&&b[0]===255&&b[1]===216;if(png||jpg)entries.push({data,mime:png?'image/png':'image/jpeg',size:sizes[type]||0});off+=len;}entries.sort((a,b)=>b.size-a.size);if(!entries.length)throw Error('This ICNS file does not contain a browser-readable PNG/JPEG image.');return entries[0];}
function blobToDataURL(blob){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(blob);});}

async function normalizeDockIcon(dataUrl){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>{
      const size=256, pad=18, c=document.createElement('canvas'); c.width=size; c.height=size;
      const ctx=c.getContext('2d'); ctx.clearRect(0,0,size,size);
      const scale=Math.min((size-pad*2)/img.naturalWidth,(size-pad*2)/img.naturalHeight);
      const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
      ctx.drawImage(img,(size-w)/2,(size-h)/2,w,h);
      resolve(c.toDataURL('image/png'));
    }; img.onerror=()=>resolve(dataUrl); img.src=dataUrl;
  });
}
function trimTransparentPadding(dataUrl){return new Promise((resolve)=>{const img=new Image();img.onload=()=>{try{const c=document.createElement('canvas'),ctx=c.getContext('2d',{willReadFrequently:true});c.width=img.naturalWidth;c.height=img.naturalHeight;ctx.drawImage(img,0,0);const d=ctx.getImageData(0,0,c.width,c.height).data;let minX=c.width,minY=c.height,maxX=-1,maxY=-1;for(let y=0;y<c.height;y++){for(let x=0;x<c.width;x++){if(d[(y*c.width+x)*4+3]>8){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}}}if(maxX<0){resolve(dataUrl);return;}const pad=2,x=Math.max(0,minX-pad),y=Math.max(0,minY-pad),w=Math.min(c.width-x,maxX-minX+1+pad*2),h=Math.min(c.height-y,maxY-minY+1+pad*2);const out=document.createElement('canvas');out.width=w;out.height=h;out.getContext('2d').drawImage(c,x,y,w,h,0,0,w,h);resolve(out.toDataURL('image/png'));}catch(_){resolve(dataUrl);}};img.onerror=()=>resolve(dataUrl);img.src=dataUrl;});}
dockIconPicker.addEventListener('change',async()=>{const file=dockIconPicker.files?.[0];if(!file||!dockIconPickerTarget)return;try{const e=parseICNS(await file.arrayBuffer());const raw=await blobToDataURL(new Blob([e.data],{type:e.mime}));const trimmed=await trimTransparentPadding(raw);const data=await normalizeDockIcon(trimmed);const b=document.querySelector(`.dock-icon[data-dock-key="${CSS.escape(dockIconPickerTarget)}"]`);if(b){applyDockImage(b,data);saveDockImage(dockIconPickerTarget,data);renderDockCustomizer();}}catch(err){showToast(err.message||'Could not read this ICNS file.');}finally{dockIconPickerTarget=null;dockIconPicker.value='';}});

// Desktop icon positions — direct pointer tracking, no RAF and no CSS movement transition.
function loadPositions(){return safeJSON(positionsKey,{});} function applyDesktopIconPosition(item,x,y){x=Math.max(-30,Math.min(130,x));y=Math.max(-25,Math.min(130,y));item.style.setProperty('--x',`${x}%`);item.style.setProperty('--y',`${y}%`);item.dataset.x=x;item.dataset.y=y;}
function setDesktopIconPositions(){const saved=loadPositions();desktopIcons.querySelectorAll('.desktop-icon').forEach(item=>{const f=(item.dataset.position||'50,50').split(',').map(Number),s=saved[item.dataset.open];applyDesktopIconPosition(item,Number.isFinite(s?.x)?s.x:f[0],Number.isFinite(s?.y)?s.y:f[1]);});}
function saveDesktopIconPositions(){const d={};desktopIcons.querySelectorAll('.desktop-icon').forEach(i=>d[i.dataset.open]={x:Number(i.dataset.x),y:Number(i.dataset.y)});saveJSON(positionsKey,d);} function resetDesktopIconPositions(){localStorage.removeItem(positionsKey);setDesktopIconPositions();}
desktopIcons.querySelectorAll('.desktop-icon').forEach(icon=>{
  icon.draggable=false;
  icon.addEventListener('dragstart',e=>e.preventDefault());
  const handle=icon.querySelector('.desktop-thumb')||icon;
  let dragging=false,moved=false,pointerId=null,offsetX=0,offsetY=0,startX=0,startY=0;
  handle.addEventListener('pointerdown',e=>{
    if(e.button!==0||matchMedia('(max-width:768px)').matches)return;
    window.getSelection?.()?.removeAllRanges();
    const r=icon.getBoundingClientRect();
    dragging=true;moved=false;pointerId=e.pointerId;startX=e.clientX;startY=e.clientY;
    offsetX=e.clientX-r.left;offsetY=e.clientY-r.top;
    icon.classList.add('dragging');
    handle.setPointerCapture(pointerId);
    e.preventDefault();e.stopPropagation();
  });
  handle.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==pointerId)return;
    const desktopRect=desktopIcons.getBoundingClientRect();
    // Pointer coordinates are viewport-relative, whereas the icon coordinates
    // are relative to the desktop area. Convert them into the same space before
    // calculating the icon centre so the folder stays under the cursor.
    const xPx=e.clientX-desktopRect.left-offsetX;
    const yPx=e.clientY-desktopRect.top-offsetY;
    const centerX=xPx+icon.offsetWidth/2, centerY=yPx+icon.offsetHeight/2;
    const x=centerX/desktopRect.width*100; const y=centerY/desktopRect.height*100;
    if(Math.hypot(e.clientX-startX,e.clientY-startY)>4)moved=true;
    applyDesktopIconPosition(icon,x,y);
    e.preventDefault();
  });
  const finish=e=>{
    if(!dragging||(e?.pointerId!=null&&e.pointerId!==pointerId))return;
    dragging=false;icon.classList.remove('dragging');
    if(moved)saveDesktopIconPositions();
    pointerId=null;
  };
  handle.addEventListener('pointerup',finish);handle.addEventListener('pointercancel',finish);
  icon.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;return;}openWindow(icon.dataset.open);});
});

// Portfolio media manager. Uploaded media is stored in IndexedDB so large photo/video files do not hit localStorage's tiny quota.
const uploadSections=[
  ['cover','COVER','assets/cover/'],['studio','STUDIO','assets/studio/'],['live','EVENT & LIVE','assets/live/'],['video','VIDEO','assets/video/'],['photos','PHOTOS','assets/photos/'],['about','CV / DOCUMENTS','assets/about/']
];
function openMediaDB(){
  if(mediaDBPromise)return mediaDBPromise;
  mediaDBPromise=new Promise((resolve,reject)=>{
    const req=indexedDB.open(mediaDBName,mediaDBVersion);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('media')){const store=db.createObjectStore('media',{keyPath:'id',autoIncrement:true});store.createIndex('section','section',{unique:false});}};
    req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
  });
  return mediaDBPromise;
}
async function loadUploads(){
  try{const db=await openMediaDB();return await new Promise((resolve,reject)=>{const tx=db.transaction('media','readonly');const req=tx.objectStore('media').getAll();req.onsuccess=()=>{const out={};for(const item of req.result){const normalized={...item,url:item.url||(item.blob?URL.createObjectURL(item.blob):item.data)};(out[item.section]??=[]).push(normalized);}Object.values(out).forEach(a=>a.sort((x,y)=>x.order-y.order||x.id-y.id));resolve(out);};req.onerror=()=>reject(req.error);});}
  catch(_){return safeJSON(uploadedMediaKey,{});}
}
async function saveUploadItems(section,files,slot=''){
  const db=await openMediaDB(); const existing=await loadUploads(); let order=(existing[section]?.length||0);
  return new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');const store=tx.objectStore('media');
    for(const file of files)store.add({section,slot,name:file.name,type:file.type||'',blob:file,order:order++});
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function renderUploadManager(){
  const data=await loadUploads();
  uploadCustomizerList.innerHTML=`<div class="upload-assets-tools"><div><strong>Project assets</strong><div class="customizer-file">Import an entire assets folder once. Files are sorted automatically by assets/cover, assets/studio, assets/live, assets/video, assets/photos.</div></div><button class="customizer-change" id="importAssetsFolder">Import assets folder</button></div>`+uploadSections.map(([key,label,path])=>{const count=(data[key]||[]).length;return `<div class="upload-section"><div><div class="customizer-name">${label}</div><div class="customizer-file">${count} imported file${count===1?'':'s'} · permanent path <code>${path}</code></div></div><button class="customizer-change" data-upload-target="${key}">Add media</button></div>`}).join('');
  uploadCustomizerList.querySelectorAll('[data-upload-target]').forEach(b=>b.onclick=()=>{uploadTarget=b.dataset.uploadTarget;uploadPicker.value='';uploadPicker.click();});
  document.getElementById('importAssetsFolder')?.addEventListener('click',()=>{const folderPicker=document.getElementById('assetsFolderPicker');folderPicker.value='';folderPicker.click();});
}
async function addUploadedFiles(target,files){
  const valid=files.filter(f=>isSupportedMedia(f)); if(!valid.length)return;
  const [section,...slotParts]=target.split(':'); const slot=slotParts.join(':');
  try{await saveUploadItems(section,valid,slot);await renderUploadManager();showToast(`${valid.length} file${valid.length===1?'':'s'} added to ${slot?slot.toUpperCase():section.toUpperCase()}`);refreshOpenWindows(section);}
  catch(_){showToast('Could not save these files.');}
}
uploadPicker.addEventListener('change',async()=>{const files=[...uploadPicker.files||[]];if(!files.length||!uploadTarget)return;const section=uploadTarget;uploadTarget=null;uploadPicker.value='';await addUploadedFiles(section,files);});
const assetsFolderPicker=document.getElementById('assetsFolderPicker');
function isSupportedMedia(file){return /^(image|video)\//i.test(file.type)||/\.(jpe?g|png|webp|gif|avif|heic|heif|mp4|webm|mov|m4v)$/i.test(file.name);}
assetsFolderPicker.addEventListener('change',async()=>{const files=[...assetsFolderPicker.files||[]];if(!files.length)return;const buckets={cover:[],studio:[],live:[],video:[],photos:[],about:[]};for(const file of files){const path=(file.webkitRelativePath||file.name).replaceAll('\\','/');const match=path.match(/(?:^|\/)assets\/(cover|studio|live|video|photos|about)(?:\/|$)/i);if(match&&isSupportedMedia(file))buckets[match[1].toLowerCase()].push(file);}let added=0;for(const [section,items] of Object.entries(buckets)){if(items.length){await addUploadedFiles(section,items);added+=items.length;}}assetsFolderPicker.value='';showToast(added?`Imported ${added} project media files`:'No supported media found inside assets/cover, studio, live, video, photos or about.');});
async function openUploadManager(){await renderUploadManager();uploadCustomizer.classList.remove('hidden');}
document.getElementById('uploadPhotos').addEventListener('click',()=>{appleMenu.classList.add('hidden');openUploadManager();});document.getElementById('closeUploadCustomizer').addEventListener('click',()=>uploadCustomizer.classList.add('hidden'));uploadCustomizer.addEventListener('click',e=>{if(e.target===uploadCustomizer)uploadCustomizer.classList.add('hidden');});

async function getUploadedFor(section,slot=''){const all=(await loadUploads())[section]||[];return slot?all.filter(x=>x.slot===slot):all;}
async function deleteUpload(id){try{const db=await openMediaDB();await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').delete(Number(id));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});return true;}catch(_){return false;}}
function inferLegacyLiveSlot(name){
  const n=String(name||'').toLowerCase();
  const event=n.match(/(?:offtop|event|club)[\s_-]*0?([123])/);
  const id=event?.[1]==='1'?'offtop1':event?.[1]==='2'?'offtop2':event?.[1]==='3'?'offtop3':n.includes('action')?'offtop1':n.includes('linza')?'offtop2':n.includes('factory')?'offtop3':'';
  if(!id)return '';
  if(/hero|главн|main/.test(n))return `${id}:hero`;
  if(/poster|афиш/.test(n))return `${id}:poster`;
  if(/merch|мерч|shirt|tee/.test(n))return `${id}:merch`;
  if(/photo|gallery|backstage|live/.test(n))return `${id}:gallery`;
  return `${id}:gallery`;
}
async function migrateLegacySlots(){
  try{const db=await openMediaDB();await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');const store=tx.objectStore('media');const req=store.getAll();req.onsuccess=()=>{for(const item of req.result){if(item.section==='live'&&!item.slot){const slot=inferLegacyLiveSlot(item.name);if(slot){item.slot=slot;store.put(item);}}} };req.onerror=()=>reject(req.error);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}catch(_){}
}

function refreshOpenWindows(section){[...windows.children].forEach(win=>{const key=win.dataset.key;if((section==='live'&&key==='live')||(section===key)||(section==='photos'&&key==='photos')){const data=content[key];if(data){win.querySelector('.window-body').innerHTML=renderBody(data);wireWindowBody(win,data);}}});}

function inlineUpload(target,label='ADD IMAGE'){
  return `<button type="button" class="inline-upload" data-inline-upload="${esc(target)}">＋ ${esc(label).replace(/^＋\s*/, '')}</button>`;
}
function imageMarkup(src,alt='',options={}){const removable=options.uploadId!=null;const uploadOverlay=options.uploadTarget?`<div class="media-upload-overlay"><button type="button" data-inline-upload="${esc(options.uploadTarget)}" aria-label="Upload replacement">＋</button></div>`:'';return `<div class="media-frame${removable?' uploaded-media':''}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" draggable="false" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="card-placeholder" hidden>ADD IMAGE<small>${esc(src)}</small></div>${uploadOverlay}${removable?`<button class="media-delete" type="button" data-delete-upload="${esc(options.uploadId)}" title="Remove photo" aria-label="Remove photo">×</button>`:''}</div>`;}
function mediaMarkup(src,alt='',options={}){const isVideo=/\.(mp4|webm|mov|m4v)$/i.test(src||'')||String(src||'').startsWith('blob:video');return isVideo?`<div class="media-frame uploaded-media"><video src="${esc(src)}" controls playsinline preload="metadata"></video>${options.uploadId!=null?`<button class="media-delete" type="button" data-delete-upload="${esc(options.uploadId)}" title="Remove video" aria-label="Remove video">×</button>`:''}</div>`:imageMarkup(src,alt,options);}
function placeholderMarkup(label,target){return `<div class="media-frame media-placeholder"><span class="placeholder-plus">＋</span><span class="placeholder-label">${esc(label)}</span><button class="placeholder-upload" type="button" data-inline-upload="${esc(target)}" aria-label="Upload ${esc(label)}">Upload</button></div>`;}
async function renderCover(){
  const uploaded=await getUploadedFor('cover');
  return `<div class="case-layout cover-layout"><aside class="case-sidebar"><div class="case-sidebar-title">COVER ART</div>${coverWorks.map((w,i)=>`<button class="case-nav-item" data-scroll-target="cover-${i}">${String(i+1).padStart(2,'0')} ${esc(w.title)}</button>`).join('')}</aside><div class="case-scroll">${coverWorks.map((w,i)=>{const item=uploaded.find(x=>x.slot===String(i));const src=item?.url||w.image;const art=imageMarkup(src,w.title,item?{uploadId:item.id,uploadTarget:`cover:${i}`}:{uploadTarget:`cover:${i}`});const hover=`<div class="cover-meta-hover"><strong>${esc(w.overlay)}</strong></div>`;const linked=w.link?`<a class="cover-art-link" href="${esc(w.link)}" target="_blank" rel="noreferrer">${art}${hover}<span class="cover-open-label">OPEN MUSIC ↗</span></a>`:`${art}${hover}`;return `<article class="cover-row case-section" id="cover-${i}"><div class="cover-art">${linked}</div><div class="cover-info"><div class="kicker">${esc(w.year)} · ${esc(w.artist)}</div><h2>${esc(w.title)}</h2><p>${esc(w.text)}</p><div class="role-list">${w.roles.split(' / ').map(r=>`<span class="role">${esc(r)}</span>`).join('')}</div><div class="case-links"><button class="inline-upload compact-upload" data-inline-upload="cover:${i}">＋ REPLACE / ADD COVER</button>${w.promo?`<a class="cta secondary" href="${esc(w.promo)}" target="_blank" rel="noreferrer">PROMO ↗</a>`:''}</div></div></article>`;}).join('')}</div></div>`;
}
async function renderEvents(){
  const uploaded=await getUploadedFor('live');
  const group=(prefix,fallbacks,label,target,kind='grid')=>{
    const prefixes=Array.isArray(prefix)?prefix:[prefix];
    const items=prefixes.flatMap(slot=>uploaded.filter(x=>x.slot===slot));
    const total=Math.max(fallbacks.length,items.length,1);
    const cells=[];
    for(let i=0;i<total;i++){
      const item=items[i], fallback=fallbacks[i];
      if(item)cells.push(imageMarkup(item.url||item.data,label,{uploadId:item.id,uploadTarget:target}));
      else if(fallback)cells.push(imageMarkup(fallback,label,{uploadTarget:target}));
      else cells.push(placeholderMarkup(label,target));
    }
    return cells.join('');
  };
  return `<div class="case-layout live-layout"><aside class="case-sidebar"><div class="case-sidebar-title">EVENT & LIVE</div>${events.map(e=>`<button class="case-nav-item" data-scroll-target="${e.id}">${esc(e.title)}</button>`).join('')}</aside><div class="case-scroll">${events.map(e=>{
    const hero=uploaded.find(x=>x.slot===`${e.id}:hero`);
    const posters=e.posters||[], merch=e.merch||[], gallery=e.gallery||[];
    const visualFallbacks=[...posters,...merch];
    return `<article class="event-section" id="${e.id}">
      <div class="event-hero">${hero?imageMarkup(hero.url,e.title,{uploadId:hero.id,uploadTarget:`live:${e.id}:hero`}):imageMarkup(e.image,e.title,{uploadTarget:`live:${e.id}:hero`})}</div>
      <div class="case-copy"><div class="kicker">${esc(e.year)} · ${esc(e.role)}</div><h2>${esc(e.title)}</h2><p>${esc(e.text)}</p>${inlineUpload(`live:${e.id}:hero`,'REPLACE / ADD HERO')}</div>
      ${e.logo?`<div class="event-logo">${imageMarkup(e.logo,'Logo')}</div>`:''}
      <div class="event-block"><div class="kicker">POSTERS / MERCH</div><p class="muted-copy">Posters, merchandise and visual materials from the event.</p><div class="media-grid">${group([`${e.id}:visuals`,`${e.id}:poster`,`${e.id}:merch`],visualFallbacks,'Poster / Merch',`live:${e.id}:visuals`)}</div></div>
      <div class="event-block"><div class="kicker">BACKSTAGE / LIVE</div><div class="media-grid">${group(`${e.id}:gallery`,gallery,'Backstage photo',`live:${e.id}:gallery`)}</div></div>
    </article>`;
  }).join('')}</div></div>`;
}
async function renderVideos(){const uploaded=await getUploadedFor('video');return `<div class="case-layout"><aside class="case-sidebar"><div class="case-sidebar-title">VIDEO</div>${videos.map((v,i)=>`<button class="case-nav-item" data-scroll-target="${v.id}">${esc(v.title)}</button>`).join('')}</aside><div class="case-scroll">${videos.map((v,i)=>{const local=uploaded.find(x=>x.slot===String(i))?.url||uploaded[i]?.url;const media=v.youtube&&!local?`<iframe src="https://www.youtube.com/embed/${v.youtube.split('/').pop().split('?')[0]}" title="${esc(v.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`:mediaMarkup(local||v.image,v.title);return `<article class="video-section" id="${v.id}"><div class="video-cover">${media}</div><div class="case-links">${inlineUpload(`video:${i}`,'ADD / REPLACE VIDEO MEDIA')}</div><div class="case-copy"><div class="kicker">${esc(v.year)} · ${esc(v.role)}</div><h2>${esc(v.title)}</h2><p>${esc(v.text)}</p>${v.youtube?`<a class="cta" href="${esc(v.youtube)}" target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a>`:''}</div></article>`;}).join('')}</div></div>`;}

async function renderStudio(){const uploads=await getUploadedFor('studio');return `<div class="case-layout"><aside class="case-sidebar"><div class="case-sidebar-title">STUDIO</div><button class="case-nav-item" data-scroll-target="studio-story">Overview</button><button class="case-nav-item" data-scroll-target="studio-role">Role & Work</button><button class="case-nav-item" data-scroll-target="studio-gallery">Gallery</button></aside><div class="case-scroll"><article class="case-section" id="studio-story"><div class="case-image-wrap">${imageMarkup(uploads[0]?.url||'assets/studio/studio-hero.jpg','ROOM616')}</div><div class="case-copy"><div class="kicker">ROOM616 · 2023 — PRESENT · 3 YEARS</div><h2>Running a recording studio as a creative business</h2><p>${esc('For the last three years I have run and developed ROOM616 in central Saint-Petersburg. My work combines recording and music production with client communication, content creation, promotion, studio management and event production.')}</p><a class="cta" href="${links.studioSite}" target="_blank" rel="noreferrer">ROOM616 WEBSITE ↗</a><a class="cta secondary" href="${links.studioInstagram}" target="_blank" rel="noreferrer">ROOM616 INSTAGRAM ↗</a></div></article><article class="case-section" id="studio-role"><div class="case-copy"><div class="kicker">MY ROLE</div><h2>Founder / Creative Producer / Studio Manager</h2><p>${esc('I recorded clients, produced artists, wrote lyrics with them, shot and edited content, designed covers, mixed tracks, made music to order, managed the studio team, monitored budgets, renovated the space, hired sound engineers, handled promotion and advertising, and organized studio events and livestreams.')}</p><div class="role-list">${['Founder','Creative Producer','Studio Manager','Recording Engineer','Music Producer','Content Creator','Graphic Designer','Event Organizer','Promotion'].map(x=>`<span class="role">${x}</span>`).join('')}</div></div></article><article class="case-section" id="studio-gallery"><div class="kicker">STUDIO MEDIA</div>${inlineUpload('studio','ADD STUDIO MEDIA')}<div class="media-grid">${uploads.slice(1).map(x=>`<div>${imageMarkup(x.url,x.name)}</div>`).join('') || `<div class="upload-empty">Add studio photos from Apple → Upload portfolio photos.</div>`}</div></article></div></div>`;}

async function renderPhotos(){const uploads=await getUploadedFor('photos');const groups=[['All Photos',uploads],['Studio',uploads.filter(x=>/studio/i.test(x.name))],['Live',uploads.filter(x=>/live|concert|offtop/i.test(x.name))],['Covers',uploads.filter(x=>/cover/i.test(x.name))],['Video',uploads.filter(x=>/video|clip/i.test(x.name))]];return `<div class="photos-layout"><aside class="photos-sidebar"><div class="photos-title">Photos</div>${groups.map((g,i)=>`<button class="photos-nav ${i===0?'active':''}" data-photo-group="${i}">${esc(g[0])}<span>${g[1].length}</span></button>`).join('')}</aside><div class="photos-main"><div class="photos-toolbar"><strong>Photos</strong><span>Library</span>${inlineUpload('photos','ADD PHOTOS')}</div><div class="photo-grid" id="photoGrid">${uploads.map(x=>`<figure><img src="${esc(x.url)}" alt="${esc(x.name)}" loading="lazy"><figcaption>${esc(x.name)}</figcaption></figure>`).join('')||'<div class="upload-empty">Your photo library is empty. Add images from Apple → Upload portfolio photos.</div>'}</div></div></div>`;}

function renderNotes(){return `<div class="notes-app"><aside class="notes-sidebar"><div class="notes-folder">Notes</div><div class="notes-section-label">ON MY MAC</div>${['Overview','Experience','Studio','Skills','Education','Contacts'].map((x,i)=>`<button class="note-item ${i===0?'active':''}" data-note="${x.toLowerCase()}"><span class="note-dot"></span>${x}</button>`).join('')}</aside><div class="notes-content" id="notesContent"></div></div>`;}
function notePages(){return {
  overview:{title:'Overview',html:`<div class="note-meta">BYMANJURIA · CV / RESUME</div><h1>${profile.name}</h1><p class="note-lead">${esc(profile.role)}</p><p>${esc(profile.summary)}</p><div class="note-links"><a href="${links.resume}" download="ByManjuria-CV.pdf" target="_blank">DOWNLOAD CV ↓</a><a href="${links.behance}" target="_blank">Behance ↗</a><a href="${links.youtube}" target="_blank">YouTube ↗</a></div>`},
  experience:{title:'Experience',html:`<h1>Experience</h1><h2>ROOM616 — Sound Producer / SMM Specialist / Designer / Video Editor</h2><div class="note-meta">Oct 2023 — Sep 2026 · Saint-Petersburg</div><ul><li>Recording sessions and full audio post-production: editing, mixing and mastering.</li><li>Studio equipment and software setup and maintenance.</li><li>Collaboration with artists on creative projects.</li><li>Copywriting, video shooting and editing, Stories and layouts.</li><li>Graphic design: advertising banners, product cards, merchandise, price lists and cover art.</li><li>Social media visuals: feed, Highlights and profile design.</li><li>Promo and backstage video production, including artist interviews.</li><li>Advanced video editing: beat-synced cuts, colour grading, sound design and audio processing.</li></ul><h2>Purchasing Manager — ProService</h2><div class="note-meta">Apr 2022 — Nov 2024</div><p>Procurement of spare parts and components, supplier negotiations, purchasing, order management, delivery scheduling, documentation and supplier selection based on cost, quality and lead times.</p><h2>Logistics Specialist — Yandex Lavka</h2><div class="note-meta">Nov 2025 — Aug 2026</div><p>Documentation flow, transport routes and shipping methods, warehouse management and order fulfilment.</p>`},
  studio:{title:'Studio',html:`<h1>ROOM616</h1><div class="note-meta">3 years · central Saint-Petersburg</div><p>My most sustained professional project. I combined music production, visual content, client work, marketing and operations rather than working in only one creative discipline.</p><ul><li>Recording, production, mixing and mastering</li><li>Artist development and content creation</li><li>Cover art and visual materials</li><li>Promotion, targeted advertising and paid placements</li><li>Budget and team management</li><li>Event organization and livestreams</li></ul>`},
  skills:{title:'Skills',html:`<h1>Skills</h1><div class="note-skill-list">${profile.skills.map(s=>`<span class="role">${esc(s)}</span>`).join('')}</div><h2>Resume keywords</h2><div class="note-skill-list">${['Document Management','Social Media Marketing','Digital & AI Proficiency','Systems Analysis and Design','Internal Communication','Team Collaboration','Communication','Time Management','Adaptability','Attention to Detail','Problem Solving','Creative Thinking','Stress Resistance'].map(s=>`<span class="role">${s}</span>`).join('')}</div>`},
  education:{title:'Education',html:`<h1>Education</h1><h2>Software Engineering</h2><p>College education in software engineering. During college I created websites with HTML and worked with web layout. I do not position myself as a programmer, but I am comfortable researching technical problems and using AI-assisted tools to build and adapt working solutions.</p>`},
  contacts:{title:'Contacts',html:`<h1>Get in touch</h1><p>${esc(profile.email)}</p><div class="note-links"><a href="${links.telegram}" target="_blank" rel="noreferrer">Telegram ↗</a><a href="${links.instagram}" target="_blank" rel="noreferrer">Instagram ↗</a><a href="${links.linkedin}" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="${links.behance}" target="_blank" rel="noreferrer">Behance ↗</a></div>`}
};}
function activateNotes(win,key='overview'){const pages=notePages(),contentEl=win.querySelector('#notesContent');if(!contentEl)return;contentEl.innerHTML=pages[key]?.html||pages.overview.html;win.querySelectorAll('.note-item').forEach(b=>{b.classList.toggle('active',b.dataset.note===key);b.onclick=()=>activateNotes(win,b.dataset.note);});}

function renderAbout(){return `<div class="about"><div class="kicker">${esc(profile.role)}</div><h1>ByManjuria</h1><p class="lead">${esc(profile.summary)}</p><div class="about-copy">${profile.about.split('\n\n').map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="stats"><div class="stat"><strong>3+</strong><span>years running ROOM616</span></div><div class="stat"><strong>8</strong><span>years with FL Studio</span></div><div class="stat"><strong>2026</strong><span>current portfolio</span></div></div><a class="cta" href="#" data-open-notes>OPEN CV →</a></div>`;}
function renderSkill(data){return `<div class="app-skill"><div><div class="app-logo">${esc(data.short)}</div><div class="kicker">APPLICATION / SKILL</div><h1>${esc(data.title)}</h1><div class="years">${esc(data.years)}</div><div class="role-list" style="justify-content:center;max-width:620px;margin:22px auto 0">${data.skills.map(s=>`<span class="role">${esc(s)}</span>`).join('')}</div></div></div>`;}

async function renderBody(data){
    if(data.type==='notes')return renderNotes();
  if(data.type==='photos')return renderPhotos();
  if(data.type==='cover')return renderCover();
  if(data.type==='events')return renderEvents();
  if(data.type==='videos')return renderVideos();
  if(data.type==='studio')return renderStudio();
  if(data.type==='skill')return renderSkill(data);
  return '';
}

function getWindowSize(key,data){
  if(data.type==='notes')return{width:980,height:650};
  if(data.type==='photos')return{width:1000,height:650};
  if(['cover','events','videos','studio'].includes(data.type))return{width:1080,height:720};
  if(data.type==='about')return{width:860,height:600};
  if(data.type==='skill')return{width:560,height:480};
  return{width:720,height:500};
}
function applyWindowSize(win,key,data){const s=getWindowSize(key,data),maxW=Math.max(320,innerWidth-24),maxH=Math.max(260,innerHeight-108);win.style.width=`${Math.min(s.width,maxW)}px`;win.style.height=`${Math.min(s.height,maxH)}px`;}
function nextWindowPosition(width,height){const topMin=46,topMax=Math.max(topMin,innerHeight-height-72);const leftMax=Math.max(10,innerWidth-width-10);const step=windowCount++;const golden=0.61803398875;const rx=(0.17+((step*golden)%0.66));const ry=(0.10+((step*0.381966)%0.68));return{left:Math.round(Math.max(10,Math.min(leftMax,rx*leftMax))),top:Math.round(Math.max(topMin,Math.min(topMax,topMin+ry*Math.max(1,topMax-topMin))))};}

function openWindow(key){appleMenu.classList.add('hidden');const data=content[key];if(!data)return;const existing=[...windows.children].find(w=>w.dataset.key===key);if(existing){existing.classList.add('closing');setTimeout(()=>existing.remove(),160);return;}const win=document.createElement('section');win.className='window';win.dataset.key=key;win.style.zIndex=++zIndex;windows.appendChild(win);applyWindowSize(win,key,data);const rect=win.getBoundingClientRect();const pos=nextWindowPosition(rect.width,rect.height);win.style.left=`${pos.left}px`;win.style.top=`${pos.top}px`;win.style.transform='translate(0,0) scale(.965)';win.innerHTML=`<div class="window-header"><div class="traffic"><button class="close" title="Close" aria-label="Close"></button><button class="min" title="Minimize" aria-label="Minimize"></button><button class="max" title="Maximize" aria-label="Maximize"></button></div><div class="window-title">${esc(data.title)}</div><div class="window-spacer"></div></div><div class="window-body">Loading…</div>`;
  renderBody(data).then(html=>{const body=win.querySelector('.window-body');if(body){body.innerHTML=html;wireWindowBody(win,data);}}).catch(err=>{const body=win.querySelector('.window-body');if(body){body.innerHTML=`<div class="load-error"><strong>Could not load this section.</strong><p>${esc(err?.message||'Unknown error')}</p></div>`;}});requestAnimationFrame(()=>{win.classList.add('open');win.style.transform='translate(0,0) scale(1)';});makeDraggable(win);win.addEventListener('pointerdown',()=>focusWindow(win));
  win.querySelector('.close').onclick=e=>{e.stopPropagation();win.classList.add('closing');setTimeout(()=>win.remove(),160);};
  win.querySelector('.min').onclick=e=>{e.stopPropagation();win.classList.add('minimized');};
  win.querySelector('.max').onclick=e=>{e.stopPropagation();win.classList.toggle('maximized');if(win.classList.contains('maximized')){win.dataset.restoreLeft=win.style.left;win.dataset.restoreTop=win.style.top;win.dataset.restoreWidth=win.style.width;win.dataset.restoreHeight=win.style.height;}else{win.style.left=win.dataset.restoreLeft||win.style.left;win.style.top=win.dataset.restoreTop||win.style.top;win.style.width=win.dataset.restoreWidth||win.style.width;win.style.height=win.dataset.restoreHeight||win.style.height;}};
  return win;
}
function wireWindowBody(win,data){
  win.querySelectorAll('[data-inline-upload]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();uploadTarget=btn.dataset.inlineUpload;uploadPicker.value='';uploadPicker.click();}));
  win.querySelectorAll('[data-delete-upload]').forEach(btn=>btn.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();if(await deleteUpload(btn.dataset.deleteUpload)){const body=win.querySelector('.window-body');body.innerHTML=await renderBody(data);wireWindowBody(win,data);}}));
  if(data.type==='notes')activateNotes(win);
  win.querySelector('[data-open-notes]')?.addEventListener('click',e=>{e.preventDefault();openWindow('notes');});
  win.querySelectorAll('[data-scroll-target]').forEach(b=>b.addEventListener('click',async()=>{const t=win.querySelector('#'+CSS.escape(b.dataset.scrollTarget));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}));
  if(data.type==='photos')setupPhotos(win);
  if(['cover','events','videos','studio'].includes(data.type))setupCaseNavigation(win);
}
function setupCaseNavigation(win){
  const scroll=win.querySelector('.case-scroll'); if(!scroll)return;
  const nav=[...win.querySelectorAll('.case-nav-item')]; const targets=nav.map(b=>win.querySelector('#'+CSS.escape(b.dataset.scrollTarget))).filter(Boolean);
  const update=()=>{let best=0,bestDist=Infinity;targets.forEach((el,i)=>{const d=Math.abs(el.getBoundingClientRect().top-scroll.getBoundingClientRect().top-20);if(d<bestDist){bestDist=d;best=i;}});nav.forEach((b,i)=>b.classList.toggle('active',i===best));};
  scroll.addEventListener('scroll',update,{passive:true}); requestAnimationFrame(update);
}
window.openWindow=openWindow;
function focusWindow(win){win.classList.remove('minimized','closing');win.classList.add('open');win.style.zIndex=++zIndex;}
function makeDraggable(win){
  const header=win.querySelector('.window-header'); if(!header)return;
  let dragging=false,pointerId=null,offsetX=0,offsetY=0;
  header.addEventListener('pointerdown',e=>{
    if(e.button!==0||win.classList.contains('maximized')||matchMedia('(max-width:768px)').matches||e.pointerType==='touch')return;
    if(e.target.closest('.traffic,button,a,input,textarea,select'))return;
    dragging=true;pointerId=e.pointerId;
    const r=win.getBoundingClientRect(), parent=win.offsetParent.getBoundingClientRect();
    offsetX=e.clientX-r.left; offsetY=e.clientY-r.top;
    // `left` and `top` are relative to `.windows`, while DOMRect values are
    // relative to the viewport. Convert them before writing so the parent's
    // 31px top inset is not added again at the start of every drag.
    win.style.left=`${r.left-parent.left}px`;win.style.top=`${r.top-parent.top}px`;win.style.transform='translate(0,0) scale(1)';
    header.setPointerCapture(pointerId);win.classList.add('dragging');e.preventDefault();e.stopPropagation();
  });
  header.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==pointerId)return;
    const parent=win.offsetParent.getBoundingClientRect();
    const x=Math.max(6-parent.left,Math.min(innerWidth-win.offsetWidth-6-parent.left,e.clientX-offsetX-parent.left));
    const y=Math.max(38-parent.top,Math.min(innerHeight-win.offsetHeight-70-parent.top,e.clientY-offsetY-parent.top));
    win.style.left=`${x}px`;win.style.top=`${y}px`;e.preventDefault();
  });
  const stop=e=>{if(!dragging||(e?.pointerId!=null&&e.pointerId!==pointerId))return;dragging=false;win.classList.remove('dragging');pointerId=null;};
  header.addEventListener('pointerup',stop);header.addEventListener('pointercancel',stop);
}

function setupPhotos(win){win.querySelectorAll('.photos-nav').forEach(b=>b.addEventListener('click',async()=>{win.querySelectorAll('.photos-nav').forEach(x=>x.classList.remove('active'));b.classList.add('active');const all=await loadUploads();const data=all.photos||[];const filters=[()=>data, x=>data.filter(a=>/studio/i.test(a.name)),x=>data.filter(a=>/live|concert|offtop/i.test(a.name)),x=>data.filter(a=>/cover/i.test(a.name)),x=>data.filter(a=>/video|clip/i.test(a.name))];const arr=filters[Number(b.dataset.photoGroup)](data);const grid=win.querySelector('#photoGrid');grid.innerHTML=arr.map(x=>`<figure><img src="${esc(x.url)}" alt="${esc(x.name)}" loading="lazy"><figcaption>${esc(x.name)}</figcaption></figure>`).join('')||'<div class="upload-empty">No photos in this category yet.</div>';}));}

// Dock: external links open directly, no internal contact windows.
const directDockLinks={ 'contact-telegram':links.telegram,'contact-instagram':links.instagram,'contact-mail':links.email,'contact-linkedin':links.linkedin };
document.querySelectorAll('.dock-icon').forEach(icon=>{icon.addEventListener('mouseenter',()=>showDockTooltip(icon));icon.addEventListener('mouseleave',hideDockTooltip);icon.addEventListener('focus',()=>showDockTooltip(icon));icon.addEventListener('blur',hideDockTooltip);icon.addEventListener('click',()=>{const k=icon.dataset.dockKey;if(directDockLinks[k]){if(k==='contact-mail')window.location.href=links.email;else window.open(directDockLinks[k],'_blank','noopener,noreferrer');return;}openWindow(icon.dataset.open);});});
function showDockTooltip(icon){hideDockTooltip();dockTooltip=document.createElement('div');dockTooltip.className='dock-tooltip';dockTooltip.textContent=getDockLabel(icon);document.body.appendChild(dockTooltip);const r=icon.getBoundingClientRect(),t=dockTooltip.getBoundingClientRect();let x=r.left+r.width/2-t.width/2;x=Math.max(6,Math.min(innerWidth-t.width-6,x));let y=r.top-t.height-9;if(y<4)y=r.bottom+9;dockTooltip.style.left=`${x}px`;dockTooltip.style.top=`${y}px`;requestAnimationFrame(()=>dockTooltip.classList.add('show'));}
function hideDockTooltip(){if(dockTooltip){dockTooltip.remove();dockTooltip=null;}}

// Menubar / Apple menu
function updateClock(){const lg=localStorage.getItem('bymanjuria-lang')==='ru'?'ru-RU':'en-US';const value=new Intl.DateTimeFormat(lg,{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date());document.getElementById('dateTime').textContent=value;}
updateClock();setInterval(updateClock,1000);
document.getElementById('dateTime').addEventListener('click',e=>e.preventDefault());
document.getElementById('appleBtn').addEventListener('click',e=>{e.stopPropagation();appleMenu.classList.toggle('hidden');});document.getElementById('nameBtn').textContent=profile.displayName;document.getElementById('nameBtn').addEventListener('click',()=>openWindow('notes'));
document.getElementById('menuResume').addEventListener('click',()=>{appleMenu.classList.add('hidden');const a=document.createElement('a');a.href=links.resume;a.download='ByManjuria-CV.pdf';a.target='_blank';a.rel='noreferrer';document.body.appendChild(a);a.click();a.remove();});document.getElementById('changeWallpaper').addEventListener('click',()=>{appleMenu.classList.add('hidden');chooseWallpaper();});document.getElementById('customizeIcons').addEventListener('click',()=>{appleMenu.classList.add('hidden');openIconCustomizer();});document.getElementById('resetIconPositions').addEventListener('click',()=>{resetDesktopIconPositions();appleMenu.classList.add('hidden');});document.getElementById('closeAll').addEventListener('click',()=>{windows.innerHTML='';appleMenu.classList.add('hidden');});document.addEventListener('click',e=>{if(!appleMenu.contains(e.target)&&e.target.id!=='appleBtn')appleMenu.classList.add('hidden');});

// Do not wait for every large video and external embed before showing the
// portfolio. Those resources can continue loading after the interface is ready.
document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>bootScreen?.classList.add('is-hidden'),900));
window.addEventListener('resize',()=>{hideDockTooltip();[...windows.children].forEach(w=>{const data=content[w.dataset.key];if(data&&!w.classList.contains('maximized'))applyWindowSize(w,w.dataset.key,data);});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=[...windows.children].filter(w=>!w.classList.contains('minimized')).sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex))[0];if(open)open.remove();}});

setDesktopIconPositions();setupIconImages();restoreIconImages();restoreDockImages();restoreWallpaper();migrateLegacySlots();
