(() => {
 'use strict';
 const map=document.getElementById('hero-map'),period=document.getElementById('map-period'),legend=document.getElementById('map-legend');
 const buttons=[...document.querySelectorAll('button[data-map-view]')],images=[...map.querySelectorAll('img[data-map]')];
 const pictures=[...document.querySelectorAll('main img')];
 const error=document.getElementById('map-error'),retry=document.getElementById('map-retry');let view='difference';
 const periods={before:'2019–2020：資料標示的海草範圍',after:'2023–2024：資料標示的海草範圍',difference:'2019–2020 / 2023–2024：兩期標示範圍疊合'};
 function select(next){if(!Object.hasOwn(periods,next))return;view=next;images.forEach(img=>img.hidden=img.dataset.map!==view);buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapView===view)));period.textContent=periods[view];legend.hidden=view!=='difference';map.dataset.view=view;}
 function imageState(){const failed=pictures.some(i=>i.complete&&!i.naturalWidth),ready=images.every(i=>i.complete&&i.naturalWidth>0);error.hidden=!failed;retry.hidden=!failed;buttons.forEach(b=>b.disabled=!ready);}
 for(const b of buttons)b.addEventListener('click',()=>select(b.dataset.mapView));
 for(const img of pictures){img.addEventListener('load',imageState);img.addEventListener('error',imageState);}
 retry.addEventListener('click',()=>{buttons.forEach(b=>b.disabled=true);error.hidden=true;retry.hidden=true;for(const img of pictures.filter(i=>i.complete&&!i.naturalWidth)){const u=new URL(img.src);u.searchParams.set('retry',Date.now());img.src=u.href;}});
 window.SeagrassWeb={select,getState:()=>({view,period:period.textContent,imagesReady:images.every(i=>i.complete&&i.naturalWidth>0),bounds:[-82.85000168683206,27.479913698858223,-82.34999939969113,28.080078140178475],presenceOnly:true,noDataMeansAbsence:false})};
 select(view);imageState();
})();
