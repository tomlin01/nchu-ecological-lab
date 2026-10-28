(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const slider=$('canopy-reveal'),status=$('canopy-status'),retry=$('canopy-retry');
  const buttons=[...document.querySelectorAll('[data-reveal]')],coarseButtons=[...document.querySelectorAll('[data-coarse]')];
  let reveal=50,coarse='lang',ready=false,loading=false,error=null,attempt=0;
  function render(){
    $('hero-model').style.clipPath=`inset(0 ${100-reveal}% 0 0)`;
    $('hero-divider').style.left=`${reveal}%`;
    $('hero-divider').style.opacity=reveal>0&&reveal<100?'1':'0';
    $('hero-model-label').style.opacity=reveal>0?'1':'0';
    $('hero-photo-label').style.opacity=reveal<100?'1':'0';
    $('hero-model-label').setAttribute('aria-hidden',String(reveal===0));
    $('hero-photo-label').setAttribute('aria-hidden',String(reveal===100));
    $('hero-model').setAttribute('aria-hidden',String(reveal===0));
    $('hero-photo').setAttribute('aria-hidden',String(reveal===100));
    $('hero-key').style.opacity=reveal>0?'1':'0';
    $('hero-key').setAttribute('aria-hidden',String(reveal===0));
    buttons.forEach(button=>{button.disabled=!ready;const value=Number(button.dataset.reveal);button.setAttribute('aria-pressed',String(value===50?reveal>0&&reveal<100:value===reveal));});
    slider.disabled=!ready;slider.value=String(reveal);slider.setAttribute('aria-valuetext',`高度圖 ${reveal}%，照片 ${100-reveal}%`);
    coarseButtons.forEach(button=>{button.disabled=!ready;button.setAttribute('aria-pressed',String(button.dataset.coarse===coarse));});
    $('detail-lang').toggleAttribute('hidden',coarse!=='lang');$('detail-potapov').toggleAttribute('hidden',coarse!=='potapov');
    $('coarse-label').textContent=coarse==='lang'?'Lang 等人的高度圖':'Potapov 等人的高度圖';
    status.textContent=error?`${error} 可以重試，或先閱讀下方解說。`:loading?'正在載入同一地點的照片與高度圖。':reveal===0?'照片裡看得見樹冠，還沒有高度數字。':reveal===100?'顏色表示作者推估的高度，保留原本的 0–20 公尺色階。':'同一片地，左側是高度估計，右側是衛星照片。';
    retry.hidden=!error;retry.disabled=loading;
  }
  function setReveal(value){
    const number=Number(value);if(!Number.isFinite(number)||!ready)return;
    reveal=Math.max(0,Math.min(100,number));render();
  }
  function setCoarse(value){if(!ready||!['lang','potapov'].includes(value))return;coarse=value;render();}
  async function load(){
    if(loading)return;attempt++;loading=true;ready=false;error=null;render();
    const url=`animation/assets/figure7.png${attempt>1?`?retry=${attempt}`:''}`;
    try{
      await new Promise((resolve,reject)=>{
        const image=new Image();let done=false;
        const finish=cause=>{if(done)return;done=true;clearTimeout(timer);image.onload=image.onerror=null;cause?reject(cause):resolve();};
        const timer=setTimeout(()=>finish(Error('圖片載入逾時。')),20000);
        image.onerror=()=>finish(Error('圖片暫時無法載入。'));
        image.onload=async()=>{
          if(image.naturalWidth!==2614||image.naturalHeight!==1144){finish(Error('圖片與原始圖版不符。'));return;}
          try{await image.decode();finish();}catch{finish(Error('圖片未能顯示。'));}
        };image.src=url;
      });
      document.querySelectorAll('[data-source-image]').forEach(node=>node.setAttribute('href',url));
      ready=true;
    }catch(cause){error=cause.message;}finally{loading=false;render();}
  }
  buttons.forEach(button=>button.addEventListener('click',()=>setReveal(button.dataset.reveal)));
  coarseButtons.forEach(button=>button.addEventListener('click',()=>setCoarse(button.dataset.coarse)));
  slider.addEventListener('input',()=>setReveal(slider.value));retry.addEventListener('click',load);
  window.CanopyVisual={setReveal,setCoarse,retry:load,getState:()=>({ready,loading,error,attempt,reveal,coarse,modelInferenceRun:false,source:'Tolan et al. Figure 7',sameExtent:true})};
  load();
})();
