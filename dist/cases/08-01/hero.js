(() => {
  'use strict';
  const proof=document.getElementById('hero-proof');if(!proof)return;
  const buttons=[...proof.querySelectorAll('[data-hero-choice]')];
  const birds=[...proof.querySelectorAll('.hero-bird')];
  const route=document.getElementById('hero-route'),observer=document.getElementById('hero-observer');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const points=[[345,880],[405,765],[536,622],[636,536],[847,450],[1043,392],[1215,344],[1263,320]];
  const length=route.getTotalLength();let mode='short';
  route.style.strokeDasharray=String(length);
  function position(progress){const f=progress*(points.length-1),i=Math.min(points.length-2,Math.floor(f)),u=f-i;return [points[i][0]+(points[i+1][0]-points[i][0])*u,points[i][1]+(points[i+1][1]-points[i][1])*u];}
  function getState(){return {mode,birdIds:birds.map(node=>node.dataset.birdId),birdPositions:birds.map(node=>({id:node.dataset.birdId,transform:node.getAttribute('transform')})),recordedIds:birds.slice(0,mode==='short'?2:4).map(node=>node.dataset.birdId),count:mode==='short'?2:4,minutes:mode==='short'?15:60,distanceKm:mode==='short' ? .5 : 2,demo:true,modelInferenceRun:false};}
  function select(value,{animate=true}={}){
    if(value!=='short'&&value!=='long')return getState();mode=value;
    proof.classList.toggle('hero-instant',!animate||reduced.matches);
    const progress=mode==='short' ? .38 : 1,[x,y]=position(progress);
    route.style.strokeDashoffset=String(length*(1-progress));
    route.style.stroke=mode==='short'?'#f4d391':'#add8dd';
    observer.setAttribute('transform','');observer.style.transform=`translate(${x}px,${y}px)`;
    birds.forEach((node,index)=>node.querySelector('.record-mark').style.opacity=index<(mode==='short'?2:4)?'1':'0');
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.heroChoice===mode)));
    document.getElementById('hero-current').textContent=mode==='short'?'15分鐘・0.5公里，記錄到2隻。':'60分鐘・2公里，記錄到4隻。';
    proof.dataset.observation=mode;return getState();
  }
  buttons.forEach(button=>{button.disabled=false;button.addEventListener('click',event=>select(button.dataset.heroChoice,{animate:event.detail!==0}));});
  reduced.addEventListener('change',()=>select(mode,{animate:false}));
  select('short',{animate:false});window.EBirdHero={getState,select};
})();
