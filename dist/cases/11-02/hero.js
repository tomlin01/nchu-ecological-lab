import {stateAt} from './animation/model.mjs';
const MODES={raw:stateAt(66).planning,robust:stateAt(78).planning};
const buttons=[...document.querySelectorAll('[data-plan-mode]')];
let mode='robust';
function selectMode(next){if(!MODES[next])return;mode=next;const s=MODES[mode];for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.planMode===mode));document.getElementById('score-heading').textContent=mode==='raw'?'只看預期查獲的教學指標':'加入預測把握後的規劃分數';document.getElementById('hero-score-a').textContent=String(Math.round(s.scoreA));document.getElementById('hero-score-b').textContent=String(Math.round(s.scoreB));for(const id of ['a','b']){const selected=s.selected===id.toUpperCase();document.getElementById(`hero-route-${id}`).dataset.selected=String(selected);document.getElementById(`hero-score-${id}`).dataset.selected=String(selected);}document.getElementById('plan-reading').textContent=mode==='raw'?'只看預期查獲的教學指標，A72高於B65，因此先選A。':'加入不確定性的扣分後，B的教學規劃分數較高，因此改選B。';}
buttons.forEach(b=>{b.disabled=false;b.addEventListener('click',()=>selectMode(b.dataset.planMode));});selectMode(mode);
const mapDialog=document.getElementById("map-dialog"),mapButton=document.getElementById("map-expand");
function closeMap(){if(mapDialog.open)mapDialog.close();}
mapButton.hidden=false;
mapButton.addEventListener("click",()=>{mapDialog.showModal();mapButton.setAttribute("aria-expanded","true");});
document.getElementById("map-close").addEventListener("click",closeMap);
mapDialog.addEventListener("close",()=>{mapButton.setAttribute("aria-expanded","false");mapButton.focus({preventScroll:true});});
mapDialog.addEventListener("click",event=>{if(event.target===mapDialog){const r=mapDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeMap();}});
addEventListener("beforeprint",closeMap);
window.PawsHero={selectMode,closeMap,getState:()=>({ready:true,mapExpanded:mapDialog.open,mode,selected:MODES[mode].selected,scores:{A:Math.round(MODES[mode].scoreA),B:Math.round(MODES[mode].scoreB)},raw:{A:72,B:65},resourceCost:{A:MODES[mode].costA,B:MODES[mode].costB},teachingExample:true,modelRun:false,imageSrc:document.getElementById('hero-forest').getAttribute('src'),imageReady:document.getElementById('hero-forest').complete&&document.getElementById('hero-forest').naturalWidth>0})};
