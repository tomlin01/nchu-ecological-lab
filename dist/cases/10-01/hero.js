import {createLakeScene} from './animation/lake-three.mjs';
const horizons=[16,20,24,28],buttons=[...document.querySelectorAll('[data-horizon]')];
let selected=28,lake=null,ready=false,error=null,draws=0;
const target=document.getElementById('hero-lake');
const fixed={time:27,phase:1,phaseId:'measurement',reducedMotion:true,cutaway:1,boardOpen:0,boardFocus:0,viewportMode:'full',cameraProgress:1};
function draw(){if(!lake||!target.getBoundingClientRect().width)return;lake.resize(false);lake.render(fixed);draws++;}
function choose(value){if(!horizons.includes(Number(value)))return;selected=Number(value);for(const b of buttons)b.setAttribute('aria-pressed',String(Number(b.dataset.horizon)===selected));for(const group of document.querySelectorAll('.time-target'))group.dataset.selected=String(Number(group.dataset.day)===selected);document.getElementById('selected-time').style.transform=`translateX(${(selected-28)*17.5}px)`;document.getElementById('horizon-reading').textContent=`${selected}天後：模型估計的是未來的色素相關訊號，之後仍要用量測核對。`;}
buttons.forEach(button=>{button.disabled=false;button.addEventListener('click',()=>choose(button.dataset.horizon));});choose(28);
async function start(){try{lake=await createLakeScene(target);draw();ready=true;document.getElementById('lake-poster').style.visibility='hidden';new ResizeObserver(draw).observe(target);}catch(cause){error=cause.message;target.replaceChildren();}}
window.BloomHero={select:choose,getState:()=>({ready,error,selected,horizons:[...horizons],draws,scene:lake?.getState(),clockRunning:false,modelInferenceRun:false,waterChangesWithSelection:false})};
start();
