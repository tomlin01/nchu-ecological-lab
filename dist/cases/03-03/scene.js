/* Source recording comparison. Dataset annotation, never model inference. */
(() => {
  'use strict';
  const audio=document.getElementById('callPreview');
  const plate=document.getElementById('identityPlate');
  const revealButton=document.getElementById('identityReveal');
  const answer=document.getElementById('identityAnswer');
  const status=document.getElementById('callStatus');
  const frame=document.getElementById('method-frame');
  const rows=[...document.querySelectorAll('[data-recording]')];
  const buttons=[...document.querySelectorAll('[data-listen]')];
  const metadataURL=new URL('animation/audio-data.json',document.baseURI);
  const animationBase=new URL('./',metadataURL);
  const names={a:'參考 A',q:'待比較聲音',b:'參考 B'};
  let data=null,pending=null,active=null,intent=0,raf=0,revealed=false,error=null;
  const isQuestion=()=>document.body.dataset.page==='question'&&!document.hidden;
  function announce(text){status.textContent=text;}
  function controls(){
    const playing=!audio.paused&&!audio.ended;
    buttons.forEach(button=>{
      const selected=playing&&active===button.dataset.listen;
      button.setAttribute('aria-pressed',String(selected));
      button.textContent=selected?'停止':'試聽';
      button.setAttribute('aria-label',`${selected?'停止':'試聽'}${names[button.dataset.listen]}`);
    });
    rows.forEach(row=>row.classList.toggle('is-playing',playing&&row.dataset.recording===active));
  }
  function cursor(){
    raf=0;
    rows.forEach(row=>{
      const node=row.querySelector('.sonic-cursor');
      if(!node)return;
      const current=row.dataset.recording===active&&!audio.paused;
      node.style.opacity=current?'1':'0';
      node.style.left=`${Math.min(100,Math.max(0,audio.currentTime/1.5*100))}%`;
    });
    if(!audio.paused&&!audio.ended)raf=requestAnimationFrame(cursor);
  }
  function pause(){
    const wasPlaying=!audio.paused;intent++;audio.pause();try{audio.currentTime=0;}catch{}
    active=null;cancelAnimationFrame(raf);raf=0;controls();cursor();
    if(wasPlaying)announce('試聽已暫停。可以再聽一次，或查看個體編號。');
  }
  function setReveal(show){
    if(!data)return;
    revealed=show;plate.dataset.revealed=String(show);
    revealButton.setAttribute('aria-expanded',String(show));
    revealButton.textContent=show?'收起個體編號':'看錄音的個體編號';
    for(const row of rows){
      const key=row.dataset.recording;
      row.querySelector('[data-source-id]').textContent=show?String(data.clips[key].sourceId):'尚未顯示';
      row.dataset.sameSource=String(show&&data.clips[key].sourceId===data.clips.q.sourceId);
    }
    answer.textContent=show
      ?`A 與待比較聲音，原資料都標為 ${data.clips.a.sourceId}；B 是 ${data.clips.b.sourceId}。同一物種裡，還有不同個體。`
      :'三段都是小鴞；光知道物種，還不能確定是哪一隻。';
  }
  async function load(){
    if(data)return data;if(pending)return pending;
    revealButton.disabled=true;
    pending=fetch(metadataURL).then(response=>{
      if(!response.ok)throw new Error('metadata');return response.json();
    }).then(value=>{
      for(const key of ['a','q','b']){
        const clip=value?.clips?.[key];
        if(!clip||typeof clip.file!=='string'||!Number.isFinite(clip.duration)||!Number.isInteger(clip.sourceId))throw new Error('metadata');
        const url=new URL(clip.file,animationBase);
        if(url.origin!==animationBase.origin||!url.pathname.startsWith(animationBase.pathname))throw new Error('source');
      }
      if(value.clips.a.sourceId!==value.clips.q.sourceId||value.clips.b.sourceId===value.clips.q.sourceId)throw new Error('annotation');
      data=value;error=null;revealButton.disabled=false;setReveal(revealed);
      announce('按「試聽」就能聽見叫聲，也可以直接查看個體編號。');
      return data;
    }).catch(reason=>{
      pending=null;error='錄音與個體編號暫時無法載入。可以重試，或先讀下方解說。';
      revealButton.disabled=false;revealButton.textContent='重新載入個體資料';announce(error);
      throw reason;
    });
    return pending;
  }
  async function listen(key){
    if(!names[key]||!isQuestion())return;
    if(active===key&&!audio.paused){pause();announce('已停止試聽。');return;}
    pause();const request=++intent;announce(`正在準備${names[key]}。`);
    try{
      const meta=await load();if(request!==intent||!isQuestion())return;
      frame.contentWindow?.postMessage({type:'ecology-control',action:'pause'},location.origin);
      active=key;audio.src=new URL(meta.clips[key].file,animationBase).href;
      await audio.play();
      if(request!==intent)return;
      if(!isQuestion()){pause();return;}
      controls();announce(`正在播放${names[key]}。`);cursor();
    }catch(reason){
      if(request!==intent)return;
      pause();announce(reason?.name==='NotAllowedError'?'請再按一次試聽，讓瀏覽器開啟聲音。':error||'這段聲音暫時無法播放，請再按試聽重試。');
    }
  }
  revealButton.addEventListener('click',async()=>{
    const show=!revealed;try{await load();setReveal(show);}catch{}
  });
  buttons.forEach(button=>button.addEventListener('click',()=>listen(button.dataset.listen)));
  audio.addEventListener('ended',()=>{const key=active;pause();announce(`${names[key]||'錄音'}已播完。可以再聽一次，或查看個體編號。`);});
  audio.addEventListener('pause',controls);
  audio.addEventListener('error',()=>{if(!active)return;pause();announce('這段聲音暫時無法播放，請再按試聽重試。');});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  addEventListener('pagehide',pause);addEventListener('beforeprint',pause);
  new MutationObserver(()=>{if(!isQuestion())pause();}).observe(document.body,{attributes:true,attributeFilter:['data-page']});
  addEventListener('message',event=>{
    if(event.source!==frame.contentWindow||event.origin!==location.origin||event.data?.type!=='ecology-acoustic-state')return;
    if(event.data.state?.playing||event.data.state?.previewPlaying)pause();
  });
  window.EcologyScene={pause,getState:()=>({active,playing:!audio.paused&&!audio.ended,metadataLoaded:!!data,source:audio.getAttribute('src'),revealed,error})};
  load().catch(()=>{});
})();
