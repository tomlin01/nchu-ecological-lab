/* One source coordinate system for the original photograph, author layer and display reference. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),study=$('leaf-study'),camera=$('leaf-camera');
  if(!study||!camera)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const full=[0,0,800,1200],files={specimen:'animation/assets/specimen.jpg',overlay:'animation/assets/author-overlay.png'};
  let data=null,ready=false,loading=false,error=null,attempt=0,controller=null,loadPromise=null;
  let view='full',overlay=false,box=full.slice(),motion=0,printState=null;
  const setText=(id,value)=>{if($(id).textContent!==value)$(id).textContent=value;};
  function getState(){return {ready,loading,error,attempt,view,overlay,viewBox:box.slice(),referencePixelSpan:data?.ruler.pixelSpan??null,referenceCentimeters:data?.ruler.centimeters??null,authorOutputDisplayScale:data?.authorOutput.scaleToDisplay??null,reportedLeafMeasurement:null,modelInferenceRun:false,sourceImagesEdited:false,displayOutlineDigitized:true};}
  function referenceType(){
    const r=camera.getBoundingClientRect(),scale=Math.min(r.width/box[2],r.height/box[3]);
    if(scale>0){$('leaf-reference-label').style.fontSize=`${14/scale}px`;if(data){const y=data.leaf.bounds[1]+data.leaf.bounds[3]+22;$('leaf-reference-label').setAttribute('y',String(y+22/scale));}}
  }
  function setBox(value){box=value.slice();camera.setAttribute('viewBox',box.join(' '));referenceType();}
  function cancelMotion(){if(motion)cancelAnimationFrame(motion);motion=0;}
  function moveTo(target,animate=true){
    cancelMotion();
    if(!animate||reduced.matches||document.hidden){setBox(target);return;}
    const from=box.slice(),started=performance.now();
    function tick(now){const p=Math.min(1,(now-started)/360),ease=p*p*(3-2*p);setBox(from.map((n,i)=>n+(target[i]-n)*ease));if(p<1)motion=requestAnimationFrame(tick);else motion=0;}
    motion=requestAnimationFrame(tick);
  }
  function controls(){
    $('leaf-tools').hidden=!ready;
    $('leaf-zoom').disabled=$('leaf-overlay').disabled=!ready;
    $('leaf-reset').disabled=!ready||view==='full';
    $('leaf-zoom').setAttribute('aria-pressed',String(view==='leaf'&&!overlay));
    $('leaf-overlay').setAttribute('aria-pressed',String(overlay));
    setText('leaf-overlay',overlay?'收起程式圈的範圍':'看程式圈的範圍');
    $('leaf-load-retry').hidden=!error;$('leaf-load-retry').disabled=loading;
  }
  function show({nextView=view,nextOverlay=overlay,animate=true}={}){
    if(!ready)return getState();
    view=nextView;overlay=view==='leaf'&&nextOverlay;
    study.dataset.view=view;study.dataset.overlay=String(overlay);
    $('leaf-map').hidden=view!=='leaf';
    $('leaf-author-layer').setAttribute('opacity',overlay?'1':'0');
    $('leaf-author-layer').setAttribute('aria-hidden',String(!overlay));
    $('leaf-locator').setAttribute('visibility',view==='full'?'visible':'hidden');
    $('leaf-reference').setAttribute('visibility',view==='leaf'?'visible':'hidden');
    $('leaf-reference').setAttribute('aria-hidden',String(view!=='leaf'));
    controls();moveTo(view==='leaf'?data.leaf.camera:full,animate);
    setText('leaf-view-caption',overlay?'同一位置 · 作者公開的分割色塊':'完整標本 · NY01212184 · Begonia glabra');
    if(view==='leaf'&&!overlay)setText('leaf-view-caption','同一張原始照片中最下方的葉片 · NY01212184');
    setText('leaf-status',view==='full'?'框出的是查看位置，不是模型結果。可放大看看葉片與尺度。':overlay?'綠色是作者公布的結果，只顯示畫面中看得到的葉片範圍。圖片與參照線仍使用相同的縮放比例。':'畫面放大了，葉子沒有變大。代表 1 cm 的線也跟著圖片一起放大。');
    return getState();
  }
  const showLeaf=()=>show({nextView:'leaf',nextOverlay:false});
  const showFull=()=>show({nextView:'full',nextOverlay:false});
  const setOverlay=value=>show({nextView:value?'leaf':view,nextOverlay:Boolean(value)});
  function validate(source){
    if(source?.caseId!=='04-01'||source.schemaVersion!==1||source.modelInferenceRun!==false||source.physicalLeafMeasurement!==null)throw Error('來源資料不符。');
    if(source.specimen?.id!=='NY01212184'||source.specimen.width!==800||source.specimen.height!==1200||source.authorOutput?.width!==1980||source.authorOutput.height!==2970||source.authorOutput.scaleToDisplay!==2.475)throw Error('原照與作者結果未對上。');
    const region=source.leaf?.camera;
    if(!Array.isArray(region)||region.length!==4||!region.every(Number.isFinite)||region[0]<0||region[1]<0||region[2]<=0||region[3]<=0||region[0]+region[2]>800||region[1]+region[3]>1200)throw Error('局部視窗不完整。');
    if(!Array.isArray(source.leaf.points)||source.leaf.points.length<10||source.leaf.points.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>800||p[1]<0||p[1]>1200))throw Error('可見色塊的範圍不完整。');
    if(source.ruler?.centimeters!==1||Math.abs(source.ruler.pixelSpan-26.7)>.001||source.ruler.authorQcValueAppliedToDisplayImage!==false)throw Error('尺規解說參照不符。');
    return source;
  }
  function imageReady(url,width,height,signal){
    return new Promise((resolve,reject)=>{
      const img=new Image();let settled=false;
      const finish=cause=>{if(settled)return;settled=true;img.onload=img.onerror=null;signal.removeEventListener('abort',abort);cause?reject(cause):resolve();};
      const abort=()=>finish(new DOMException('Aborted','AbortError'));
      img.onload=()=>finish(img.naturalWidth===width&&img.naturalHeight===height?null:Error('來源圖片尺寸不符。'));
      img.onerror=()=>finish(Error('來源圖片尚未載入。'));
      signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}img.src=url;
    });
  }
  function geometry(source){
    const points=source.leaf.points;
    $('web-leaf-mask-path').setAttribute('d',points.map((p,i)=>`${i?'L':'M'}${p[0]} ${p[1]}`).join(' ')+' Z');
    for(const id of ['leaf-locator','leaf-map-region'])['x','y','width','height'].forEach((name,i)=>$(id).setAttribute(name,String(source.leaf.camera[i])));
    const x=source.leaf.bounds[0]+20,y=source.leaf.bounds[1]+source.leaf.bounds[3]+22,span=source.ruler.pixelSpan;
    $('leaf-reference-line').setAttribute('d',`M${x} ${y-3}v6m0-3h${span}m0-3v6`);
    $('leaf-reference-label').setAttribute('x',String(x+span/2));$('leaf-reference-label').setAttribute('y',String(y+16));
  }
  function load(){
    if(loading)return loadPromise;
    loading=true;error=null;attempt++;controller?.abort();controller=new AbortController();const active=controller;
    setText('leaf-status','正在準備局部對照。完整標本仍可閱讀。');controls();
    loadPromise=(async()=>{
      const timeout=setTimeout(()=>active.abort(),15000);
      const urls=Object.fromEntries(Object.entries(files).map(([key,url])=>[key,attempt>1?`${url}?hero-retry=${attempt}`:url]));
      try{
        const request=fetch('animation/assets/source-data.json',{signal:active.signal,cache:attempt>1?'reload':'default'}).then(async response=>{if(!response.ok)throw Error('來源資料尚未載入。');return validate(await response.json());});
        const [source]=await Promise.all([request,imageReady(urls.specimen,800,1200,active.signal),imageReady(urls.overlay,1980,2970,active.signal)]);
        data=source;geometry(source);
        document.querySelectorAll('[data-leaf-image]').forEach(node=>node.setAttribute('href',urls[node.dataset.leafImage]));
        ready=true;loading=false;show({animate:false});
      }catch(cause){active.abort();ready=false;loading=false;error=cause?.name==='AbortError'?'局部對照載入逾時。':cause.message;controls();setText('leaf-status',`${error} 可重試，或先閱讀完整標本與下頁對照。`);}
      finally{clearTimeout(timeout);loadPromise=null;}
      return getState();
    })();return loadPromise;
  }
  $('leaf-zoom').addEventListener('click',showLeaf);$('leaf-reset').addEventListener('click',showFull);
  $('leaf-overlay').addEventListener('click',()=>setOverlay(!overlay));$('leaf-load-retry').addEventListener('click',load);
  reduced.addEventListener('change',()=>{if(ready)show({animate:false});});
  addEventListener('resize',referenceType);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelMotion();if(ready)setBox(view==='leaf'?data.leaf.camera:full);}});
  addEventListener('pagehide',cancelMotion);
  const chapter=study.closest('.chapter');
  new MutationObserver(()=>{if(document.documentElement.classList.contains('paged')&&chapter.dataset.active!=='true'){cancelMotion();if(ready)setBox(view==='leaf'?data.leaf.camera:full);}else if(ready){referenceType();}}).observe(chapter,{attributes:true,attributeFilter:['data-active']});
  addEventListener('beforeprint',()=>{if(!ready||printState)return;printState={view,overlay};show({nextView:'full',nextOverlay:false,animate:false});});
  addEventListener('afterprint',()=>{if(!printState)return;const saved=printState;printState=null;show({nextView:saved.view,nextOverlay:saved.overlay,animate:false});});
  window.LeafSpecimenScene={getState,showLeaf,showFull,setOverlay,retry:load};
  load();
})();
