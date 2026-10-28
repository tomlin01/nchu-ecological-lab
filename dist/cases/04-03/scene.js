(() => {
 'use strict';
 const $=id=>document.getElementById(id),root=$('fish-study'),camera=$('fish-camera');
 if(!root||!camera)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),views=['original','fork','total','marks'];
 const files={original:'animation/assets/fish-original.jpg',detected:'animation/assets/board-detection.jpg'};
 let ready=false,loading=false,error=null,attempt=0,view='original',data=null,controller=null,promise=null,motion=null,printState=null;
 const copy={
  original:['選一種量法，看看同一尾魚的量測終點如何改變。','SPC 公開範例的完整原照'],
  fork:['從魚嘴最前端量到尾叉凹處。圖上的線只示範量法，沒有計算這尾魚的長度。','尾叉長：量到尾鰭凹處 · 人工示意'],
  total:['從相同的起點，量到尾鰭最遠的邊緣。比較魚長時，也得使用相同的量法。','全長：量到尾鰭最遠處 · 人工示意'],
  marks:['彩色框是作者辨認出的板上數字，用來對照量測板。這張結果顯示的是尺規標記。','作者公布的板上數字偵測結果']
 };
 const setText=(id,value)=>{const e=$(id);if(e&&e.textContent!==value)e.textContent=value;};
 function getState(){return {ready,loading,error,attempt,view,reportedFishLength:null,modelInferenceRun:false,sourceImagesEdited:false,guidePointsAreManual:true};}
 function controls(){
  $('fish-tools').hidden=false;
  document.querySelectorAll('[data-fish-view]').forEach(b=>{b.disabled=!ready||loading;b.setAttribute('aria-pressed',String(b.dataset.fishView===view));});
  $('fish-retry').hidden=!error;$('fish-retry').disabled=loading;
 }
 function labelSize(){
  const r=camera.getBoundingClientRect(),box=camera.viewBox.baseVal,s=Math.min(r.width/box.width,r.height/box.height);
  if(s<=0)return;
  camera.querySelectorAll('[data-guide-text]').forEach(e=>{e.setAttribute('font-size',String(14/s));e.setAttribute('stroke-width',String(2/s));});
 }
 function show({animate=true}={}){
  motion?.cancel();motion=null;root.dataset.view=view;
  const guides=$('fish-guides'),author=$('fish-author-layer'),measurement=view==='fork'||view==='total';
  guides.setAttribute('visibility',measurement?'visible':'hidden');
  author.setAttribute('opacity',view==='marks'?'1':'0');
  guides.querySelectorAll('[data-endpoint]').forEach(e=>{e.style.display=measurement&&(e.dataset.endpoint==='snout'||e.dataset.endpoint===(view==='total'?'tip':'fork'))?'':'none';});
  guides.querySelectorAll('[data-length-line]').forEach(e=>{e.style.display=e.dataset.lengthLine===view?'':'none';});
  controls();setText('fish-status',copy[view][0]);setText('fish-caption',copy[view][1]);labelSize();
  if(animate&&!reduced.matches&&ready&&view!=='original')motion=(view==='marks'?author:guides).animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'});
 }
 function setView(value){if(!views.includes(value)||!ready||loading)return getState();view=value;show();return getState();}
 const ns='http://www.w3.org/2000/svg';
 function el(tag,attrs={},text=''){const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text)e.textContent=text;return e;}
 function add(parent,tag,attrs,text){const e=el(tag,attrs,text);parent.append(e);return e;}
 function path(parent,d,color,width){return add(parent,'path',{d,fill:'none',stroke:color,'stroke-width':width,'stroke-linecap':'round','vector-effect':'non-scaling-stroke'});}
 function label(parent,x,y,text,color){return add(parent,'text',{x,y,'text-anchor':'middle',fill:color,stroke:'#fff','stroke-width':2,'paint-order':'stroke','stroke-linejoin':'round','font-weight':600,'data-guide-text':''},text);}
 function geometry(source){
  const g=$('fish-guides');g.replaceChildren();const p=source.guidePoints;
  for(const [kind,key,y,text,color]of[['fork','fork',305,'尾叉長','#225f7c'],['total','tip',365,'全長','#9a461d']]){
   const group=add(g,'g',{'data-length-line':kind}),a=p.snout,b=p[key];
   const d=`M${a[0]},${a[1]}V${y}H${b[0]}V${b[1]}`;
   path(group,d,'#fff',5);path(group,d,color,2.5);
   path(group,`M${a[0]-4},${y}h8m-4-5v10M${b[0]-4},${y}h8m-4-5v10`,color,2.5);
   label(group,(a[0]+b[0])/2,y-10,text,color);
  }
  for(const [key,x,y,text,color]of[['snout',87,115,'魚嘴前端','#225f7c'],['fork',518,253,'尾叉凹處','#225f7c'],['tip',681,60,'尾鰭末端','#9a461d']]){
   const group=add(g,'g',{'data-endpoint':key}),point=p[key];
   add(group,'circle',{cx:point[0],cy:point[1],r:7,fill:'none',stroke:'#fff','stroke-width':6,'vector-effect':'non-scaling-stroke'});
   add(group,'circle',{cx:point[0],cy:point[1],r:7,fill:'none',stroke:color,'stroke-width':3,'vector-effect':'non-scaling-stroke'});
   path(group,`M${point}L${x},${y-6}`,'#fff',5);path(group,`M${point}L${x},${y-6}`,color,2);label(group,x,y,text,color);
  }
 }
 function validate(source){
  if(source?.caseId!=='04-03'||source.modelInferenceRun!==false||source.reportedFishLength!==null||source.guidesAreManual!==true||source.source?.width!==800||source.source.height!==450)throw Error('照片和量測示意的資料不符。');
  for(const key of ['snout','fork','tip']){const p=source.guidePoints?.[key];if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>800||p[1]<0||p[1]>450)throw Error('量測位置的資料不完整。');}
  return source;
 }
 function imageReady(url,signal){return new Promise((resolve,reject)=>{
  const image=new Image();let done=false;
  const finish=cause=>{if(done)return;done=true;image.onload=image.onerror=null;signal.removeEventListener('abort',abort);cause?reject(cause):resolve();};
  const abort=()=>finish(new DOMException('Aborted','AbortError'));
  image.onerror=()=>finish(Error('照片暫時無法載入。'));
  image.onload=()=>finish(image.naturalWidth===800&&image.naturalHeight===450?null:Error('照片尺寸與來源不符。'));
  signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}image.src=url;
 });}
 function load(){
  if(loading)return promise;
  loading=true;error=null;attempt++;controller?.abort();controller=new AbortController();const active=controller;
  controls();setText('fish-status','正在準備量測位置的示意。可以先看完整原照。');
  promise=(async()=>{
   const timeout=setTimeout(()=>active.abort(),15000);
   const urls=Object.fromEntries(Object.entries(files).map(([key,url])=>[key,attempt>1?`${url}?hero-retry=${attempt}`:url]));
   try{
    const response=await fetch('animation/assets/source-data.json',{signal:active.signal,cache:attempt>1?'reload':'default'});
    if(!response.ok)throw Error('量測示意的資料暫時無法載入。');
    const source=validate(await response.json());await Promise.all(Object.values(urls).map(url=>imageReady(url,active.signal)));
    data=source;geometry(source);document.querySelectorAll('[data-fish-image]').forEach(e=>e.setAttribute('href',urls[e.dataset.fishImage]));
    ready=true;loading=false;show({animate:false});
   }catch(cause){active.abort();loading=false;ready=false;error=cause?.name==='AbortError'?'量測示意載入逾時。':cause.message;controls();setText('fish-status',`${error} 可重試，或先閱讀原照與後面的說明。`);}
   finally{clearTimeout(timeout);promise=null;}
   return getState();
  })();return promise;
 }
 document.querySelectorAll('[data-fish-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.fishView)));
 $('fish-retry').addEventListener('click',load);addEventListener('resize',labelSize);
 document.fonts?.ready.then(labelSize);
 reduced.addEventListener('change',()=>{if(ready)show({animate:false});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){motion?.cancel();motion=null;}});
 addEventListener('pagehide',()=>{motion?.cancel();controller?.abort();});
 const chapter=root.closest('.chapter');
 if(chapter)new MutationObserver(()=>{if(chapter.dataset.active==='true')labelSize();else{motion?.cancel();motion=null;}}).observe(chapter,{attributes:true,attributeFilter:['data-active']});
 addEventListener('beforeprint',()=>{if(!ready||printState)return;printState={view};view='original';show({animate:false});});
 addEventListener('afterprint',()=>{if(!printState)return;view=printState.view;printState=null;show({animate:false});});
 window.FishMeasurementScene={getState,setView,retry:load};
 load();
})();
