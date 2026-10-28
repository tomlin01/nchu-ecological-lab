(() => {
  'use strict';
  const details=document.getElementById('source-review');
  const video=document.getElementById('source-preview');
  const status=document.getElementById('source-preview-status');
  const time=document.getElementById('source-preview-time');
  const retry=document.getElementById('source-preview-retry');
  const playhead=document.getElementById('source-playhead');
  if(!details||!video)return;
  const firstFrame=1500,lastFrame=1849,fps=25;
  let loaded=false,printing=false,pendingFrame=null,lastPauseReason='initial';
  function pause(reason='user') {video.pause();lastPauseReason=reason;return getState();}
  function renderTime(){
    const local=Math.max(0,Math.min(14,video.currentTime||0));
    time.textContent=`原始影片 ${(60+local).toFixed(2)} 秒`;
    playhead.hidden=!loaded;playhead.style.left=`${local/14*100}%`;
  }
  function ensureSource(){
    if(loaded||printing)return;
    loaded=true;retry.hidden=true;
    status.textContent='正在載入原始影片。完成後不會自動播放。';
    video.src=video.dataset.src;video.preload='metadata';video.load();
  }
  function seekSourceFrame(frame){
    if(!Number.isInteger(frame)||frame<firstFrame||frame>lastFrame)return false;
    pendingFrame=frame;pause('seek-source');details.open=true;ensureSource();
    if(video.readyState>=1){video.currentTime=(frame-firstFrame)/fps;pendingFrame=null;}
    details.scrollIntoView({block:'nearest',behavior:'instant'});
    return true;
  }
  function getState(){return{loaded,open:details.open,paused:video.paused,currentTime:video.currentTime||0,sourceTime:60+(video.currentTime||0),sourceFrame:Math.min(lastFrame,firstFrame+Math.floor((video.currentTime||0)*fps+1e-5)),src:video.getAttribute('src'),error:!!video.error,pendingFrame,lastPauseReason};}
  details.addEventListener('toggle',()=>{if(details.open)ensureSource();else pause('review-closed');});
  document.querySelectorAll('[data-source-frame]').forEach(button=>button.addEventListener('click',()=>seekSourceFrame(Number(button.dataset.sourceFrame))));
  video.addEventListener('loadedmetadata',()=>{
    if(pendingFrame!==null){video.currentTime=(pendingFrame-firstFrame)/fps;pendingFrame=null;}
    renderTime();status.textContent='14 秒原速節錄，沒有聲音。按下播放，或拖曳進度條查看不同時刻。';
  });
  video.addEventListener('timeupdate',renderTime);
  video.addEventListener('seeked',renderTime);
  video.addEventListener('play',()=>{
    if(printing||document.hidden||document.body.dataset.page!=='question'){pause('question-not-active');return;}
    document.getElementById('method-frame')?.contentWindow?.postMessage({type:'ecology-control',action:'pause'},'*');
    status.textContent='正在播放原速節錄，可對照上方的候選時間列。';
  });
  video.addEventListener('pause',()=>{if(loaded&&!video.error)status.textContent='原始影片已暫停。可拖曳進度條，查看其他時刻。';});
  video.addEventListener('ended',()=>{status.textContent='14 秒原始影片已播完。可按播放從頭再看。';});
  video.addEventListener('error',()=>{pause('source-error');retry.hidden=false;status.textContent='原始影片暫時無法載入。上方停格與候選時間列仍可閱讀。';});
  retry.addEventListener('click',()=>{pendingFrame=pendingFrame??Math.min(lastFrame,firstFrame+Math.floor((video.currentTime||0)*fps));loaded=false;ensureSource();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('document-hidden');});
  window.addEventListener('pagehide',()=>pause('page-hidden'));
  window.addEventListener('beforeprint',()=>{printing=true;pause('before-print');});
  window.addEventListener('afterprint',()=>{printing=false;pause('after-print');});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting)pause('source-offscreen');},{threshold:0}).observe(video);
  window.EcologyJayPreview={seekSourceFrame,pause,getState};
})();
