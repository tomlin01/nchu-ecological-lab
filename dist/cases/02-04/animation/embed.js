(() => {
  'use strict';
  const root=document.querySelector('main');
  if(!root)return;
  const api=()=>window.caseAnimation;
  const sourceFiles=new Set([
    'assets/D20200701T002011_IFCB104_00120.png',
    'assets/D20200701T002011_IFCB104_00298.png',
    'assets/D20200701T002011_IFCB104_00216.png',
    'assets/D20200701T002011_IFCB104_00732.png',
    '../assets/scw-deployment.png','assets/paper-figure-1.png','../assets/paper-figure-3.png'
  ]);
  let lastHeight=0,sizeFrame=null;
  function pause(){api()?.pause();}
  function useHostHeight(height){
    if(!Number.isFinite(height)||height<200||height>5000)return;
    document.documentElement.style.setProperty('--embed-stage-height',`${Math.max(260,Math.min(420,height-520))}px`);
  }
  function reportSize(){
    sizeFrame=null;
    const height=Math.ceil(root.getBoundingClientRect().height);
    if(height===lastHeight)return;
    lastHeight=height;
    if(parent!==window)parent.postMessage({type:'ecology-size',height},'*');
  }
  function queueSize(){if(sizeFrame===null)sizeFrame=requestAnimationFrame(reportSize);}
  addEventListener('message',event=>{
    if(event.source!==parent||!event.data||typeof event.data!=='object')return;
    const data=event.data;if(data.type!=='ecology-control')return;
    if(data.action==='pause')pause();
    else if(data.action==='seek'&&Number.isFinite(data.time)&&data.time>=0&&data.time<=90){pause();api()?.seek(data.time);}
    else if(data.action==='viewport'){useHostHeight(data.hostHeight);queueSize();}
  });
  document.querySelectorAll('a[href="#source-gallery"]').forEach(link=>{
    link.href='index.html#source-gallery';link.target='_blank';link.rel='noopener';link.addEventListener('click',pause);
  });
  document.addEventListener('click',event=>{
    const button=event.target instanceof Element?event.target.closest('#open-source'):null;
    if(!button||button.disabled)return;
    event.preventDefault();event.stopImmediatePropagation();
    const source=api()?.getState().sourceFile;pause();
    if(sourceFiles.has(source))window.open(new URL(source,location.href).href,'_blank','noopener');
  },true);
  try{useHostHeight(parent.innerHeight);}catch(_){}
  const observer=new ResizeObserver(queueSize);observer.observe(root);
  document.fonts?.ready.then(queueSize);document.addEventListener('load',queueSize,true);
  addEventListener('resize',queueSize);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  addEventListener('pagehide',pause);
  addEventListener('unload',()=>{observer.disconnect();if(sizeFrame!==null)cancelAnimationFrame(sizeFrame);},{once:true});
  queueSize();
})();
