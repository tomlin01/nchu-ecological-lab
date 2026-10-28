(() => {
 'use strict';
 const pair=document.getElementById('map-pair'),buttons=[...document.querySelectorAll('[data-map-view][type=button]')],status=document.getElementById('map-status');
 const images=[...pair.querySelectorAll('img')],error=document.getElementById('map-error'),retry=document.getElementById('map-retry');
 function select(view){if(!['both','geomorphic','benthic'].includes(view))return;pair.dataset.mapView=view;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapView===view)));status.textContent=view==='geomorphic'?'位置沒有變。這張地貌圖回答：它位在外礁坪。':view==='benthic'?'位置沒有變。這張底質圖回答：主要底質是岩石。':'同一個定位點：地貌是外礁坪，主要底質是岩石。';}
 buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.mapView)));
 function imageState(){const failed=images.some(i=>i.complete&&!i.naturalWidth);error.hidden=!failed;retry.hidden=!failed;}
 for(const img of images){img.addEventListener('load',imageState);img.addEventListener('error',imageState);}
 retry.addEventListener('click',()=>{for(const img of images){const url=new URL(img.src);url.searchParams.set('retry',Date.now());img.src=url.href;}error.hidden=true;retry.hidden=true;});imageState();
 window.ReefMap={select,getState:()=>({view:pair.dataset.mapView,point:[172.86525,1.86975],classes:['Outer Reef Flat','Rock'],imagesReady:images.every(i=>i.complete&&i.naturalWidth>0)})};
})();
