import {DURATION,PHASES,RESULTS} from './model.mjs';
import {createDNAView} from './dna-three.mjs';
const $=id=>document.getElementById(id);
let timeline=null,dnaView=null,currentVisualTime=0,firstCells=[],lastPhase=-1,lastHighlight=false,lastResult='';
const panels=['animalScene','locationScene','laboratoryScene','sequenceScene','learningScene','classificationScene','resultsScene','endingScene'];
function element(tag,className,content){const node=document.createElement(tag);if(className)node.className=className;if(content!==undefined)node.textContent=content;return node;}
export function buildSourceGeometry(data){
  if(!Array.isArray(data.records)||data.records.length!==4||data.window.length!==20)throw new Error('參考序列的數量或短窗長度不符。');
  if(data.records.some(r=>!/^([ACGT]){20}$/.test(r.sequence)))throw new Error('參考序列含有無法顯示的字母。');
  const container=$('sequenceRows');container.replaceChildren();
  const positions=data.window.positions;
  for(const record of data.records){
    const row=element('div','sequence-row'),label=element('div','sequence-label');
    label.append(element('i','',record.species.replaceAll('_',' ')),element('small','',record.specimen_id));
    const cells=element('div','dna-cells');
    [...record.sequence].forEach((letter,i)=>{const cell=element('span','dna-cell'+(data.variable_positions.includes(positions[i])?' variable':''),letter);cell.dataset.position=positions[i];cell.setAttribute('aria-label',`對齊欄位${positions[i]}：${letter}`);cells.append(cell);});
    row.append(label,cells);container.append(row);
  }
  container.dataset.coordinateNote=`相同對齊欄位 ${data.window.start}–${data.window.end} · 20個字母`;
  $('windowLabel').textContent=`放大對齊欄位 ${data.window.start}–${data.window.end}`;
  $('windowSource').textContent='短窗只供比較，不足以單獨辨認物種。';
  firstCells=[...container.querySelector('.sequence-row').querySelectorAll('.dna-cell')];
  dnaView?.dispose();dnaView=null;
  try{dnaView=createDNAView({container:$('dnaViewport'),data,onError:error=>document.dispatchEvent(new CustomEvent('ecology-dna-error',{detail:{message:error?.message||String(error)}}))});}
  catch(error){$('dnaViewport').replaceChildren();throw error;}
  $('resultBars').replaceChildren(...RESULTS.mean.values.map(([name])=>{const row=element('div','result-row');row.dataset.method=name;const track=element('div','bar-track');track.append(element('div','bar-fill'));row.append(element('span','',name),track,element('output','','0.000'));return row;}));
  if(!window.gsap)throw new Error('動畫程式未載入，請重新載入。');
  timeline?.kill();
  timeline=gsap.timeline({paused:true,defaults:{ease:'power3.out'}});
  timeline.to({}, {duration:DURATION},0);
  timeline.fromTo('#mosquitoPhoto',{scale:1},{scale:1.1,duration:14,ease:'none'},0);
  timeline.fromTo('#animalQuestion',{opacity:0,y:12},{opacity:1,y:0,duration:1.6},6);
  timeline.fromTo('#windowMarker',{scaleX:1},{scaleX:9,duration:3},47);
  timeline.fromTo('.sequence-row',{y:14},{y:0,duration:.65,stagger:1.2},48);
  timeline.fromTo('#trainConnection',{opacity:.2},{opacity:1,duration:2},64);
  timeline.fromTo('.reference-entry',{x:0},{x:5,duration:3,stagger:.5},64);
  timeline.fromTo('#trainedModel',{scale:.94,opacity:.4},{scale:1,opacity:1,duration:3},65);
  timeline.fromTo('#queryLane',{opacity:0,y:15},{opacity:1,y:0,duration:1.5},71);
  timeline.fromTo('#tokenRibbon',{opacity:0,y:8},{opacity:1,y:0,duration:1.2},73);
  timeline.fromTo('#phylumStep',{y:12},{y:0,duration:1.2},80);
  timeline.fromTo('#jointOutput',{opacity:0,x:24},{opacity:1,x:0,duration:1.7},84);
  timeline.fromTo('#checkLedger p',{x:-8},{x:0,duration:.7,stagger:1.8},115);
  timeline.fromTo('#endingMessage',{opacity:0,y:10},{opacity:1,y:0,duration:1.2},120);
  timeline.fromTo('#closingLine',{opacity:0,y:10},{opacity:1,y:0,duration:1.2},123);
  lastPhase=-1;lastResult='';lastHighlight=false;
}
export function renderScene(s,data){
  for(let i=0;i<panels.length;i++)$(panels[i]).hidden=i!==s.phase;
  if(!data||!timeline)return;
  const local=s.local;
  const drawTime=s.reducedMotion?(s.phase===1?25:s.phase===2?43:Math.min(PHASES[s.phase].end-.01,DURATION)):s.time;
  currentVisualTime=drawTime;
  const dnaActive=drawTime>=14&&drawTime<48;
  $('stage').classList.toggle('dna-active',s.phase===1||s.phase===2);
  $('dnaViewport').hidden=!dnaActive;
  // Update layout-affecting transforms before measuring the receiving letters.
  timeline.time(drawTime,true);
  const bridging=dnaActive&&drawTime>=46;
  let targets=[];
  if(bridging){const bounds=$('dnaViewport').getBoundingClientRect();targets=firstCells.map(cell=>{const r=cell.getBoundingClientRect();return {x:r.x-bounds.x,y:r.y-bounds.y,width:r.width,height:r.height};});}
  firstCells.forEach(cell=>cell.style.opacity=bridging?'0':'1');
  if(dnaActive)dnaView?.render({time:drawTime,theme:document.documentElement.dataset.theme,reducedMotion:s.reducedMotion,compact:s.compact,targets});
  // A paused GSAP timeline is sampled by the player's single clock, including reverse seeks.
  const highlight=s.phase===3&&(local>=7||s.reducedMotion);
  if(highlight!==lastHighlight){$('sequenceRows').classList.toggle('differences-on',highlight);lastHighlight=highlight;}
  document.querySelectorAll('.sequence-row').forEach((row,i)=>row.classList.toggle('active',s.phase===3&&local>=7+i*1.5));
  const usingQuery=s.time>=71;
  $('modelLabel').textContent=usingQuery?'已訓練的模型':'學習序列中的特徵';
  $('learningHeading').textContent=usingQuery?'新序列送進已訓練的模型。':'先學習，再使用。';
  $('trainConnection').style.visibility=usingQuery?'hidden':'visible';
  if(s.phase===6){
    const key=s.resultView,result=RESULTS[key];
    if(key!==lastResult){$('resultTitle').textContent=result.title;$('resultTakeaway').textContent=key==='mean'?'DeepCOI在五個分類階層的平均較高。':'只看「種」這一層，BLAST的分數較高。';lastResult=key;}
    const elapsed=key==='mean'?local:local-8;
    const p=s.reducedMotion?1:1-Math.pow(1-Math.max(0,Math.min(1,elapsed/1.5)),3);
    document.querySelectorAll('.result-row').forEach((row,i)=>{row.querySelector('.bar-fill').style.transform=`scaleX(${result.values[i][1]*p})`;row.querySelector('output').textContent=result.values[i][1].toFixed(3);row.setAttribute('aria-label',`${result.values[i][0]}，F1 ${result.values[i][1].toFixed(3)}`);});
  }
  if(s.phase!==lastPhase){panels.forEach((id,i)=>$(id).setAttribute('aria-hidden',String(i!==s.phase)));lastPhase=s.phase;}
}

export function getSceneState(){const active=currentVisualTime>=14&&currentVisualTime<48;return active?{...dnaView?.getState(),active}:{ready:!!dnaView?.getState().ready,active};}
