(() => {
 'use strict';
 const $=id=>document.getElementById(id),root=$('trait-study');if(!root)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),compact=matchMedia('(max-width:700px)');
 const contextURL='animation/assets/leaf-context.png',mapURL='animation/assets/trait-maps.png';
 let ready=false,loading=false,error=null,errorKind=null,attempt=0,view='plants',composition='large',mapLoaded=false,data=null,controller=null,promise=null,motion=null,printState=null;
 const weights=()=>composition==='large'?[.75,.25]:[.25,.75];
 const text=(id,value)=>{const e=$(id);if(e&&e.textContent!==value)e.textContent=value;};
 function getState(){const[a,b]=weights();return{ready,loading,error,attempt,view,composition,mapLoaded,exampleWeightA:a,exampleWeightB:b,reportedTraitValue:null,modelInferenceRun:false,generatedContext:true,conceptualWeightsOnly:true,sourceImagesEdited:false};}
 function controls(){
  $('trait-tools').hidden=false;
  document.querySelectorAll('[data-trait-view]').forEach(b=>{b.disabled=!ready||loading;b.setAttribute('aria-pressed',String(b.dataset.traitView===view));});
  $('trait-swap').disabled=!ready||loading;
  $('trait-retry').hidden=!error;$('trait-retry').disabled=loading;
 }
 const ns='http://www.w3.org/2000/svg';
 function el(tag,attrs={}){const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
 document.querySelectorAll('[data-hero-scene="community"] svg').forEach((svg,i)=>{
  const image=svg.querySelector('image'),box=svg.viewBox.baseVal;
  const defs=el('defs'),clip=el('clipPath',{id:`web-context-crop-${i}`,clipPathUnits:'userSpaceOnUse'});
  clip.append(el('rect',{x:box.x,y:box.y,width:box.width,height:box.height}));defs.append(clip);svg.prepend(defs);
  const group=el('g',{'clip-path':`url(#web-context-crop-${i})`});group.append(image);svg.append(group);
 });
 function windowImage(id,box,url){
  const svg=$(id);svg.replaceChildren();svg.setAttribute('viewBox',box.join(' '));
  const defs=el('defs'),clip=el('clipPath',{id:`web-clip-${id}`,clipPathUnits:'userSpaceOnUse'});
  clip.append(el('rect',{x:box[0],y:box[1],width:box[2],height:box[3]}));defs.append(clip);svg.append(defs);
  const group=el('g',{'clip-path':`url(#web-clip-${id})`});group.append(el('image',{href:url,x:0,y:0,width:1956,height:2811}));svg.append(group);
 }
 function mapGeometry(url){
  const box=compact.matches?data.windows.leafRegionCompact:data.windows.leafRegion;
  windowImage('trait-map-camera',box,url);windowImage('trait-map-locator',data.windows.leafMap,url);windowImage('trait-map-legend',data.windows.leafLegend,url);
  $('trait-map-locator').append(el('rect',{x:box[0],y:box[1],width:box[2],height:box[3],fill:'none',stroke:'#f0c778','stroke-width':2,'vector-effect':'non-scaling-stroke'}));
 }
 function show({animate=true}={}){
  motion?.cancel();motion=null;root.dataset.view=view;
  document.querySelectorAll('[data-hero-scene]').forEach(e=>e.hidden=e.dataset.heroScene!==view);
  const[a,b]=weights();$('web-weight-large').style.width=`${a*100}%`;$('web-weight-small').style.width=`${b*100}%`;
  text('trait-community-meaning',composition==='large'?'大葉型的覆蓋比例較高，對平均值影響較大。':'小葉型的覆蓋比例較高，對平均值影響較大。');
  const copy={
   plants:['先看葉片大小，再看看不同植物的組成如何影響當地植物的平均特徵。','植物情境示意 · 不是研究樣區'],
   community:['換一種組成，看看哪一類植物對平均值的影響較大。比例只供解說，沒有計算新的葉面積。','相對覆蓋度的教學示意 · 不代表株數'],
   map:['這張是作者利用性狀與環境資料建立的預測，與前面的教學比例分開看。色條保留美洲區段的原始尺度。','葉面積群聚平均 · 作者預測 · 美洲局部']
  };
  text('trait-status',copy[view][0]);text('trait-caption',copy[view][1]);controls();
  const panel=document.querySelector(`[data-hero-scene="${view}"]`);
  if(animate&&!reduced.matches&&panel)motion=panel.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'});
 }
 function swapComposition(){if(!ready||loading)return getState();composition=composition==='large'?'small':'large';show({animate:false});return getState();}
 function valid(source){
  if(source?.caseId!=='04-04'||source.modelInferenceRun!==false||source.reportedTraitValue!==null||source.conceptualWeightsOnly!==true)throw Error('來源資料與本頁示意不符。');
  const full=source.windows?.leafMap;
  if(!Array.isArray(full)||full.length!==4||!full.every(Number.isFinite))throw Error('地圖的顯示範圍資料不完整。');
  for(const key of ['leafMap','leafRegion','leafRegionCompact','leafLegend']){
   const b=source.windows[key];if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<full[0]||b[1]<full[1]||b[2]<=0||b[3]<=0||b[0]+b[2]>full[0]+full[2]||b[1]+b[3]>full[1]+full[3])throw Error('地圖與色條的區域不符。');
  }
  return source;
 }
 function imageReady(url,width,height,signal){return new Promise((resolve,reject)=>{
  const image=new Image();let done=false;
  const finish=cause=>{if(done)return;done=true;image.onload=image.onerror=null;signal.removeEventListener('abort',abort);cause?reject(cause):resolve();};
  const abort=()=>finish(new DOMException('Aborted','AbortError'));
  image.onload=()=>finish(image.naturalWidth===width&&image.naturalHeight===height?null:Error('圖片尺寸與來源不符。'));
  image.onerror=()=>finish(Error('圖片暫時無法載入。'));
  signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}image.src=url;
 });}
 function loadBase(){
  if(loading)return promise;
  loading=true;error=null;errorKind=null;attempt++;controller?.abort();controller=new AbortController();const active=controller;
  controls();text('trait-status','正在準備組成示意。可以先看植物情境。');
  promise=(async()=>{const timeout=setTimeout(()=>active.abort(),20000);try{
   const response=await fetch('animation/assets/source-data.json',{signal:active.signal,cache:attempt>1?'reload':'default'});
   if(!response.ok)throw Error('示意資料暫時無法載入。');
   const source=valid(await response.json());const url=attempt>1?`${contextURL}?hero-retry=${attempt}`:contextURL;
   await imageReady(url,1672,941,active.signal);data=source;
   document.querySelectorAll('[data-context-image]').forEach(e=>e.setAttribute('href',url));
   ready=true;loading=false;show({animate:false});
  }catch(cause){active.abort();ready=false;loading=false;errorKind='base';error=cause.name==='AbortError'?'示意資料載入逾時。':cause.message;controls();text('trait-status',`${error} 可重試，或先閱讀後面的說明。`);}
  finally{clearTimeout(timeout);promise=null;}return getState();})();return promise;
 }
 function loadMap(retry=false){
  if(loading)return promise;
  if(!ready)return getState();
  loading=true;error=null;errorKind=null;attempt++;controller?.abort();controller=new AbortController();const active=controller;
  controls();text('trait-status','正在載入作者的葉面積地圖。前面的示意仍可閱讀。');
  promise=(async()=>{const timeout=setTimeout(()=>active.abort(),30000);try{
   const url=retry?`${mapURL}?hero-map-retry=${attempt}`:mapURL;await imageReady(url,1956,2811,active.signal);mapGeometry(url);mapLoaded=true;loading=false;
   if(!printState)view='map';show({animate:!printState});
  }catch(cause){active.abort();loading=false;errorKind='map';error=cause.name==='AbortError'?'地圖載入逾時。':'作者地圖暫時無法載入。';controls();text('trait-status',`${error} 可重試；植物情境與組成示意仍保留。`);}
  finally{clearTimeout(timeout);promise=null;}return getState();})();return promise;
 }
 function setView(value){
  if(!ready||loading||!['plants','community','map'].includes(value))return getState();
  if(value==='map'&&!mapLoaded)return loadMap();
  view=value;error=null;errorKind=null;show();return getState();
 }
 function retry(){return errorKind==='map'?loadMap(true):loadBase();}
 document.querySelectorAll('[data-trait-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.traitView)));
 $('trait-swap').addEventListener('click',swapComposition);$('trait-retry').addEventListener('click',retry);
 compact.addEventListener('change',()=>{if(mapLoaded){const url=$('trait-map-camera').querySelector('image').getAttribute('href');mapGeometry(url);}});
 reduced.addEventListener('change',()=>{if(ready)show({animate:false});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){motion?.cancel();motion=null;}});
 addEventListener('pagehide',()=>{motion?.cancel();controller?.abort();});
 addEventListener('beforeprint',()=>{if(!ready||printState)return;printState={view,composition};view='plants';show({animate:false});});
 addEventListener('afterprint',()=>{if(!printState)return;view=printState.view;composition=printState.composition;printState=null;show({animate:false});});
 window.TraitMapScene={getState,setView,swapComposition,retry};
 loadBase();
})();
