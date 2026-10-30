import {DURATION,PHASES,BIRD_POOL,interval,clamp} from './model.mjs';

const BG='assets/sagebrush-scene-v01.png';
let BIRD='assets/sage-thrasher-cutout-v01.png';
const MAP='assets/official-trends-2022.png';
let svg=null,timeline=null,latest=null,refs={},imagesReady=false;
const initialMotion={habitat:1,compare:0,method:0,map:0,validation:0,ending:0,zoom:1,portrait:1,world:0,portraitScale:1,portraitX:0,portraitY:0};
const motion={...initialMotion};
const $=id=>refs[id]||(refs[id]=svg.querySelector(`#${id}`));
const n=(value)=>Number(value).toFixed(3);
const ROUTE_POINTS=[[345,880],[405,765],[536,622],[636,536],[847,450],[1043,392],[1215,344],[1263,320]];
const ROUTE_PATH=ROUTE_POINTS.map(([x,y],i)=>`${i?'L':'M'}${x} ${y}`).join(' ');
const pathPoint=p=>{
  const points=ROUTE_POINTS;
  const f=clamp(p)*(points.length-1),i=Math.min(points.length-2,Math.floor(f)),u=f-i;
  return [points[i][0]+(points[i+1][0]-points[i][0])*u,points[i][1]+(points[i+1][1]-points[i][1])*u];
};
const birdMarkup=(prefix)=>BIRD_POOL.map(b=>`<g id="${prefix}-${b.id}" data-bird-id="${b.id}" transform="translate(${b.x} ${b.y})"><g transform="${b.flip?'translate('+b.w+' 0) scale(-1 1)':''}"><image href="${BIRD}" width="${b.w}" height="${b.w*2/3}" y="${-b.w*2/3}"/></g><ellipse class="bird-mark" cx="${b.w*.55}" cy="${-b.w*.33}" rx="${b.w*.62}" ry="${b.w*.43}"/></g>`).join('');
function world(prefix){return `<image href="${BG}" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/>${birdMarkup(prefix)}<path class="route" id="${prefix}-route" d="${ROUTE_PATH}"/><g id="${prefix}-observer"><use href="#observer" x="-25" y="-90" width="50" height="100"/></g>`;}
function markup(){return `<svg xmlns="http://www.w3.org/2000/svg" class="ebird-scene" viewBox="0 0 1600 900" role="img" aria-label="賞鳥觀察方式、鳥類趨勢與官方地圖的動畫">
<style>
.ebird-scene{--p:#f3f0e8;--ink:#26332f;--muted:#5b6a60;--accent:#526f61;--line:#a6b0a7;background:var(--p);font-family:var(--font-sans,'PingFang TC',sans-serif);color:var(--ink)}
html[data-theme="dark"] .ebird-scene{--p:#1b1e1f;--ink:#f0eee7;--muted:#b9bdbb;--accent:#cdbb95;--line:#737e79}
text{fill:var(--ink)}.title{font-family:var(--font-serif,'Songti TC',serif);font-weight:500;font-size:43px}.sub{fill:var(--muted);font-size:23px}.small{fill:var(--muted);font-size:18px}.label{font-size:29px;font-weight:500}.large{font-family:var(--font-serif,'Songti TC',serif);font-size:54px;font-weight:500}.paper{fill:var(--p)}.hairline{fill:none;stroke:var(--line);stroke-width:1.5}.route{fill:none;stroke:#f4d391;stroke-width:9;stroke-linecap:round;stroke-linejoin:round}.bird-mark{fill:none;stroke:#fff5c8;stroke-width:4;opacity:0}.observer-body{fill:#2c3933;stroke:#f5ead1;stroke-width:2}.chip{fill:var(--p);opacity:.96}.method-line{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round}.reference{fill:none;stroke:var(--muted);stroke-width:3;stroke-dasharray:8 8}.layer{pointer-events:none;opacity:0;visibility:hidden}.route-b{stroke:#add8dd}
</style>
<defs><clipPath id="fieldClip"><rect width="1600" height="900"/></clipPath><clipPath id="panelClip"><rect width="700" height="438" rx="3"/></clipPath>
<symbol id="observer" viewBox="0 0 60 125"><g class="observer-body"><circle cx="31" cy="14" r="10"/><path d="M22 28 Q30 24 39 29 L43 66 L35 70 L39 114 L30 114 L25 77 L20 115 L11 115 L16 67 Z"/><path d="M24 32 L41 40 L49 22 L55 25 L47 51 L24 45 Z"/><rect x="45" y="14" width="13" height="12" rx="2"/></g></symbol>
</defs>
<rect class="paper" width="1600" height="900"/>
<g id="habitat" class="layer"><g id="habitat-camera" clip-path="url(#fieldClip)"><image href="${BG}" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/><g id="portrait"><ellipse cx="1125" cy="786" rx="175" ry="16" fill="#26332f" opacity=".15"/><image href="${BIRD}" x="570" y="218" width="900" height="600"/></g><g id="opening-world">${birdMarkup('opening')}<g transform="translate(439 735)"><use href="#observer" x="-23" y="-100" width="46" height="100"/></g></g></g>
<rect class="chip" x="46" y="168" width="488" height="190"/><text class="large" x="75" y="232">Sage Thrasher</text><text class="label" x="78" y="280">蒿灌叢裡的鳥</text><text class="sub" x="78" y="324">牠在不在，和有沒有被看見？</text></g>
<g id="compare" class="layer"><g transform="translate(58 220)"><g clip-path="url(#panelClip)"><g transform="translate(-39.3 0) scale(.4867)">${world('short')}</g></g><text class="label" x="0" y="-38">短觀察</text><text class="sub" x="180" y="-38">15分鐘・0.5公里</text><text class="label" id="count-a" x="0" y="492">記錄到 0 隻</text></g>
<g transform="translate(842 220)"><g clip-path="url(#panelClip)"><g transform="translate(-39.3 0) scale(.4867)">${world('long')}</g></g><text class="label" x="0" y="-38">較長觀察</text><text class="sub" x="220" y="-38">60分鐘・2公里</text><text class="label" id="count-b" x="0" y="492">記錄到 0 隻</text></g>
<path class="hairline" d="M800 188V744"/><text class="label" x="800" y="790" text-anchor="middle">鳥仍是同一組，變的是這次怎麼看。</text></g>
<g id="method" class="layer"><g transform="translate(55 220)"><g clip-path="url(#panelClip)"><g transform="translate(-39.3 0) scale(.4867)">${world('method')}</g></g><text class="sub" x="0" y="-35">每筆紀錄，還帶著觀察條件。</text><text class="label" x="0" y="486">地點・季節・時段・停留時間</text></g>
<g transform="translate(840 194)"><g id="method-0"><text class="label" x="0" y="38">① 類似條件，通常記錄到多少？</text><path class="reference" d="M20 124H650"/><path class="method-line" d="M20 155 Q160 88 290 121 T650 96"/><text class="small" x="20" y="190">學習鳥數紀錄與環境、觀察條件的關係</text></g>
<g id="method-1" transform="translate(0 210)"><text class="label" x="0" y="38">② 各年的觀察方式，怎麼變了？</text><path class="reference" d="M20 124H650"/><g fill="var(--accent)"><rect x="35" y="100" width="72" height="25"/><rect x="175" y="75" width="72" height="50"/><rect x="315" y="48" width="72" height="77"/><rect x="455" y="30" width="72" height="95"/></g><text class="small" x="20" y="166">學習觀察條件隨年份的差異</text></g>
<g id="method-2" transform="translate(0 418)"><text class="label" x="0" y="38">③ 減少混在一起的影響，再估趨勢</text><path class="method-line" d="M22 101H610 M587 84L611 101L587 118"/><text class="small" x="20" y="160">這裡示意方法作用，不呈現模型分數。</text></g></g></g>
<g id="map" class="layer"><image id="official-map" href="${MAP}" x="47" y="140" width="1506" height="630" preserveAspectRatio="xMidYMid meet"/><rect class="chip" x="62" y="130" width="445" height="57"/><text class="label" x="78" y="170">Sage Thrasher｜2012–2022</text><g id="map-explain"><rect class="chip" x="70" y="785" width="1460" height="57"/><g id="legend-red"><circle cx="108" cy="810" r="12" fill="#d7191c"/><text class="sub" x="134" y="819">下降</text></g><g id="legend-blue"><circle cx="273" cy="810" r="12" fill="#2c7bb6"/><text class="sub" x="299" y="819">上升</text></g><text id="legend-size" class="sub" x="448" y="819">圓點大小：研究期間中段的相對豐度</text><text class="sub" x="1150" y="819">27公里格網</text><path id="legend-underline" class="method-line" d="M96 835H190" style="stroke-width:2"/></g></g>
<g id="validation" class="layer"><g transform="translate(65 210)"><text class="label" x="0" y="0">先設定已知的變化</text><g transform="translate(0 45)"><path class="hairline" d="M0 100H500"/><path class="method-line" d="M0 70H500"/><text class="sub" x="0" y="145">維持不變</text></g><g transform="translate(0 235)"><path class="hairline" d="M0 100H500"/><path class="method-line" d="M0 10L500 100"/><text class="sub" x="0" y="145">持續下降</text></g><g transform="translate(0 425)"><path class="hairline" d="M0 100H500"/><path d="M0 60L500 10" fill="none" stroke="#568e9b" stroke-width="4"/><path d="M0 40L500 100" fill="none" stroke="#b46b4d" stroke-width="4"/><text class="sub" x="0" y="145">不同區域，各自增減</text></g></g>
<path class="method-line" d="M650 450H815 M790 430L815 450L790 470"/><g id="validation-answer" transform="translate(920 290)"><text class="large" x="0" y="0">再看方法</text><text class="large" x="0" y="72">能否找回變化</text><text class="label" x="0" y="178">能辨識區域趨勢，</text><text class="label" x="0" y="230">偏差與不確定性仍存在。</text><text class="small" x="0" y="332">原論文使用另外三種鳥檢驗方法。</text><text class="small" x="0" y="370">此處是檢查流程示意，不是實跑結果。</text></g></g>
<g id="ending" class="layer"><image href="${BG}" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/><rect class="chip" x="58" y="175" width="720" height="248"/><text class="large" x="88" y="249">先找出哪裡在變，</text><text class="large" x="88" y="322">再調查為什麼。</text><text class="sub" x="91" y="382">地圖提供線索，原因仍要回到現場找。</text><g id="ending-observer"><use href="#observer" x="-28" y="-115" width="57" height="126"/></g><rect class="chip" x="60" y="747" width="710" height="72"/><text class="label" x="78" y="793">相對豐度，不是全部鳥隻數。</text></g>
<rect class="paper" width="1600" height="126"/><text id="headline" class="title" x="52" y="63"></text><text id="subtitle" class="sub" x="54" y="105"></text>
<rect class="paper" y="851" width="1600" height="49"/><text id="disclosure" class="small" x="34" y="882"></text><text id="stage-time" class="small" x="1565" y="882" text-anchor="end"></text>
</svg>`;}

function makeTimeline(){
  timeline=gsap.timeline({paused:true});
  const keys=['habitat','compare','method','map','validation','ending'];
  for(let i=1;i<keys.length;i++){
    const at=PHASES[i].start;
    timeline.to(motion,{[keys[i-1]]:0,duration:.65,ease:'power1.inOut'},at-.3)
      .fromTo(motion,{[keys[i]]:0},{[keys[i]]:1,duration:.65,ease:'power1.inOut',immediateRender:false},at-.3);
  }
  timeline.fromTo(motion,{zoom:1},{zoom:1.035,duration:14,ease:'none'},0)
    .to(motion,{portraitScale:112/900,portraitX:445-570*112/900,portraitY:515-112*2/3-218*112/900,duration:3.4,ease:'power2.inOut'},14)
    .to(motion,{world:1,duration:1.2,ease:'power1.inOut'},16)
    .to(motion,{portrait:0,duration:.6,ease:'power1.out'},17)
    .to(motion,{ending:1,duration:.01},DURATION-.01);
}
function preload(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>image.decode().then(resolve,resolve);image.onerror=()=>reject(new Error('素材尚未載入，請重試。'));image.src=src;});}
export async function initScene(element){
  imagesReady=false;refs={};timeline?.kill();Object.assign(motion,initialMotion);
  element.innerHTML=markup();svg=element.querySelector('svg');makeTimeline();
  await Promise.all([BG,BIRD,MAP].map(preload));imagesReady=true;
}
function text(id,value){const node=$(id);if(node.textContent!==value)node.textContent=value;}
function setOpacity(id,opacity){$(id).style.opacity=n(opacity);$(id).style.visibility=opacity>.001?'visible':'hidden';}
function animateWorld(prefix,progress,recorded){
  const route=$(`${prefix}-route`),length=route.getTotalLength();
  route.style.strokeDasharray=String(length);route.style.strokeDashoffset=String(length*(1-progress));
  const [x,y]=pathPoint(progress);$(`${prefix}-observer`).setAttribute('transform',`translate(${n(x)} ${n(y)})`);
  for(const bird of BIRD_POOL){const node=$(`${prefix}-${bird.id}`),seen=recorded.includes(bird.id);node.style.opacity=seen?'1':'.48';node.querySelector('.bird-mark').style.opacity=seen?'.95':'0';}
}
export function renderScene(state){
  if(!svg||!imagesReady)return;
  latest=state;timeline.time(state.time,false);
  for(const key of ['habitat','compare','method','map','validation','ending'])setOpacity(key,motion[key]);
  const z=state.reducedMotion?1:motion.zoom;
  $('habitat-camera').setAttribute('transform',`translate(${n(800*(1-z))} ${n(450*(1-z))}) scale(${n(z)})`);
  setOpacity('portrait',motion.portrait);setOpacity('opening-world',motion.world);
  $('portrait').setAttribute('transform',`translate(${n(motion.portraitX)} ${n(motion.portraitY)}) scale(${n(motion.portraitScale)})`);
  const c=state.comparison;
  animateWorld('short',c.progressA*.38,c.recordedA);animateWorld('long',c.progressB,c.recordedB);
  $('long-route').classList.add('route-b');
  text('count-a',`記錄到 ${c.recordedA.length} 隻`);text('count-b',`記錄到 ${c.recordedB.length} 隻`);
  animateWorld('method',.65,['bird-1','bird-2']);
  for(let i=0;i<3;i++){
    const opacity=i<=state.methodStep?1:.15;
    $(`method-${i}`).style.opacity=String(opacity);
  }
  $('validation-answer').style.opacity=n(.35+.65*interval(state.time,96,102));
  const legendStep=state.time<77?0:state.time<85?1:2;
  $('legend-underline').setAttribute('d',['M96 835H190','M261 835H354','M448 835H1065'][legendStep]);
  const p=state.reducedMotion ? .48 : .25+.32*interval(state.time,108,118),[ex,ey]=pathPoint(p);
  $('ending-observer').setAttribute('transform',`translate(${n(ex)} ${n(ey)})`);
  const phase=PHASES[state.phase];text('headline',state.phase===5?'接下來，回到現場':phase.title);
  const subtitles=['Sage Thrasher・北美西部蒿灌叢草原','鳥的位置相同；兩次觀察方式不同。','把觀察過程的差異納入，再估計區域增減。','官方圖資｜繁殖季累積變化，不是逐年動畫。','以已知答案的資料檢查，而非只看一張地圖。','找出值得關注的位置，結合現地調查。'];
  text('subtitle',subtitles[state.phase]);
  const notes=['AI生成情境；鳥為放大示意。','鳥與路線為示意；15／60分鐘與2／4隻不是研究數據。','DML方法示意；這裡沒有重新執行模型。','Cornell Lab / eBird Status and Trends｜資料版本2022・期間2012–2022。','檢查流程示意；方法論文的三個驗證物種與此地圖示例不同。','情境為AI生成；相對豐度趨勢不能直接回答變化原因。'];
  text('disclosure',notes[state.phase]);text('stage-time',`${Math.floor(state.time/60)}:${String(Math.floor(state.time%60)).padStart(2,'0')} / 2:00`);
}
export function getSceneState(){return {ready:imagesReady,time:latest?.time??0,phase:latest?.phaseId??'habitat',
  birdPoolIds:[...BIRD_POOL.map(b=>b.id)],birdPoolPositions:BIRD_POOL.map(({id,x,y})=>({id,x,y})),
  recordedCounts:latest?{a:latest.comparison.recordedA.length,b:latest.comparison.recordedB.length}:null,
  comparisonIsDemo:true,officialMapVersion:2022,officialMapPeriod:[2012,2022],officialMapUnmodified:true,
  modelInferenceRun:false,layerOpacity:{habitat:motion.habitat,compare:motion.compare,method:motion.method,map:motion.map,validation:motion.validation,ending:motion.ending}};}
