(() => {
  let pending=false;
  function reportSize(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{
      pending=false;
      const height=Math.ceil(document.querySelector('main').getBoundingClientRect().height+2);
      parent.postMessage({type:'ecology-size',height},'*');
    });
  }
  addEventListener('message',event=>{
    if(event.source!==parent||event.data?.type!=='ecology-control')return;
    const player=window.caseAnimation;
    if(event.data.action==='pause')player?.pause();
    if(event.data.action==='seek'&&Number.isFinite(event.data.time))player?.seek(Math.max(0,Math.min(78,event.data.time)));
  });
  new ResizeObserver(reportSize).observe(document.querySelector('main'));
  document.fonts.ready.then(reportSize);
  addEventListener('load',reportSize);
  reportSize();
})();
