(() => {
  'use strict';
  const frame=document.getElementById('method-frame'),status=document.getElementById('frame-status'),retry=document.getElementById('retry-frame');
  let frameLoaded=false,child=null,lastHeight=820,printState=null;
  const send=(action,extra={})=>frame.contentWindow?.postMessage({type:'ecology-control',action,...extra},'*');
  const viewport=()=>send('viewport',{hostHeight:window.innerHeight,hostWidth:window.innerWidth});
  function update(){
    retry.hidden=!child?.error;retry.disabled=!!child?.loading;
    status.textContent=child?.error?`${child.error} 可在原播放器或這裡重試，所選時間保留。`:child?.ready?'照片已就緒。按播放器的播放鍵開始。':child?.loading?'正在載入三張照片。可先選擇段落，完成後不會自動播放。':frameLoaded?'播放器已載入，正在準備照片。':'正在載入照片播放器。下方保留完整文字與原圖。';
  }
  window.addEventListener('message',event=>{
    if(event.source!==frame.contentWindow||!event.data||typeof event.data!=='object')return;
    const data=event.data;
    if(data.type==='ecology-size'&&Number.isFinite(data.height)&&data.height>=300&&data.height<=7000){
      const height=Math.ceil(data.height);if(height!==lastHeight){lastHeight=height;frame.height=String(height);frame.style.height=`${height}px`;}
    }else if(data.type==='ecology-photo-state'&&data.state&&typeof data.state==='object'){
      child=data.state;update();
    }else if(data.type==='ecology-photo-ready'){viewport();send('state');}
  });
  frame.addEventListener('load',()=>{frameLoaded=true;viewport();send('state');update();});
  frame.addEventListener('error',()=>{status.textContent='播放器未能載入；下方仍可閱讀完整文字與原圖。';});
  retry.addEventListener('click',()=>send('retry'));
  document.querySelectorAll('.source-gallery a,.source-footer a').forEach(link=>link.addEventListener('click',()=>send('pause')));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)send('pause');});
  window.addEventListener('pagehide',()=>send('pause'));
  window.addEventListener('resize',()=>{send('pause');viewport();});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting)send('pause');},{threshold:0}).observe(frame);
  window.addEventListener('beforeprint',()=>{send('pause');if(!printState){printState=[...document.querySelectorAll('details')].map(node=>[node,node.open]);printState.forEach(([node])=>node.open=true);}});
  window.addEventListener('afterprint',()=>{if(printState){printState.forEach(([node,open])=>node.open=open);printState=null;}send('pause');});
  window.EcologyPhotoPreview={getState:()=>({frameLoaded,childReady:child?.ready===true,childState:child,frameHeight:lastHeight,frameCount:document.querySelectorAll('iframe').length}),retry:()=>send('retry')};
  document.getElementById('reading-notes').open=false;
  viewport();update();
  setTimeout(()=>{if(!child)status.textContent='播放器仍未就緒。可以按重試；下方原圖與文字仍可閱讀。';},40000);
})();
