import {DURATION,PHASES,clamp,validateData,stateAt} from './model.mjs';
const $=id=>document.getElementById(id),video=$('sourceVideo'),NS='http://www.w3.org/2000/svg';
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),storageKey='ecology-color-theme';
let data=null,visual=null,ready=false,loading=true,error=null,attempt=0,requestedTime=0,displayedTime=0,lastPhase=-1,pendingSeek=0,fetchController=null;
let videoFrameCallback=null,printState=null,lastPosted=-1,timeout=null,loadGeneration=0,playIntent=0;
const txt=(id,value)=>{const node=$(id);if(node&&node.textContent!==String(value))node.textContent=String(value);};
const fmt=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
function node(tag,attrs,parent){const el=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);parent.append(el);return el;}
function textSvg(value,x,y,parent,attrs={}){const el=node('text',{x,y,...attrs},parent);el.textContent=value;return el;}
function theme(value,persist=false){
  const mode=value==='dark'?'dark':'light';document.documentElement.dataset.theme=mode;
  txt('themeButton',mode==='light'?'切換深色':'切換淺色');$('themeButton')?.setAttribute('aria-pressed',String(mode==='dark'));$('themeButton')?.setAttribute('aria-label',mode==='light'?'切換深色模式':'切換淺色模式');
  if(persist)try{localStorage.setItem(storageKey,mode);}catch{}
}
try{theme(localStorage.getItem(storageKey));}catch{theme('light');}
$('themeButton')?.addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
window.addEventListener('storage',e=>{if(e.key===storageKey||e.key===null)theme(e.newValue);});
const status=message=>txt('mediaStatus',message);
function controls(){
  const playing=!video.paused&&!video.ended&&ready;
  txt('playButton',playing?'暫停':video.ended?'重新播放':'播放');$('playButton').setAttribute('aria-pressed',String(playing));
  $('playButton').setAttribute('aria-label',playing?'暫停動畫':'播放動畫');
  $('playButton').disabled=$('replayButton').disabled=!ready||loading;
  $('retryButton').hidden=!error;$('retryButton').disabled=loading;
  document.body.classList.toggle('mediaReady',ready&&!loading);document.body.classList.toggle('mediaError',!!error);
  if(!ready)$('overlay').replaceChildren();
}
function getState(){return {time:video.currentTime,displayedTime,duration:DURATION,ready:ready&&!loading,loading,error,attempt,playing:!video.paused&&!video.ended,
  expanded:document.body.classList.contains('is-expanded'),theme:document.documentElement.dataset.theme,reducedMotion:reduced.matches,
  ...(data?stateAt(displayedTime,data):{}),videoTime:video.currentTime,videoElementCount:document.querySelectorAll('#sourceVideo').length};}
function postState(){if(parent!==window)parent.postMessage({type:'ecology-behaviour-state',state:getState()},'*');}
function pause(message='已暫停。'){playIntent++;video.pause();if(message)status(message);controls();postState();return getState();}
function fail(message){pendingSeek++;playIntent++;ready=false;loading=false;error=message;clearTimeout(timeout);video.pause();controls();status(`${message} 可重試，已選時間會保留。`);postState();}
function buildTimeline(){
  const svg=$('timelineSvg');svg.replaceChildren();svg.setAttribute('viewBox','0 0 1000 168');
  const [start,end]=data.selection,x=f=>94+(f-start)/(end-start)*884;
  const detected=new Set(data.detections.filter(d=>d.frame>=start&&d.frame<end).map(d=>d.frame));
  textSvg('逐幀',10,45,svg,{class:'axis-label row-label'});
  node('rect',{x:94,y:31,width:884,height:18,rx:2,class:'empty-track'},svg);
  for(const f of detected)node('rect',{x:x(f),y:31,width:Math.max(.8,x(f+1)-x(f)),height:18,class:'detection-tick','data-detected-frame':f},svg);
  textSvg('候選事件',10,88,svg,{class:'axis-label row-label event-row-label'});
  const events=stateAt(0,data).events;
  const rows=[];
  for(const e of events){let row=rows.findIndex(last=>last<=e.start);if(row<0){row=rows.length;rows.push(e.end);}else rows[row]=e.end;
    node('rect',{x:x(e.start),y:62+row*12,width:Math.max(1,x(e.end)-x(e.start)),height:8,rx:2,class:'event-bar','data-event':e.id,'data-event-start':e.start},svg);}
  const baseline=Math.max(116,76+rows.length*12);svg.setAttribute('viewBox',`0 0 1000 ${baseline+40}`);
  const union=stateAt(0,data).intervals;
  textSvg('不重複',10,baseline-10,svg,{class:'axis-label row-label union-row'});
  for(const [a,b] of union)node('rect',{x:x(a),y:baseline-24,width:Math.max(1,x(b)-x(a)),height:11,rx:2,class:'union-bar union-row'},svg);
  node('line',{x1:94,y1:baseline,x2:978,y2:baseline,class:'time-axis'},svg);
  for(let i=0;i<=4;i++){const f=Math.round(start+(end-start)*i/4);textSvg(`${(f/data.source.fps).toFixed(1)}s`,x(f),baseline+25,svg,{class:'axis-label','text-anchor':i===0?'start':i===4?'end':'middle'});}
  node('line',{id:'sourceCursor',x1:94,x2:94,y1:19,y2:baseline+3,class:'source-cursor'},svg);
  svg.setAttribute('aria-label',`原影片${(start/data.source.fps).toFixed(1)}至${(end/data.source.fps).toFixed(1)}秒的逐幀候選與事件。`);
}
function drawBoxes(s){
  const svg=$('overlay');svg.replaceChildren();svg.setAttribute('viewBox',`0 0 ${data.source.width} ${data.source.height}`);
  if(!s.showBoxes||!ready||video.seeking)return;
  const scale=data.source.width/1920;
  for(const d of s.detections){const [x1,y1,x2,y2]=d.bbox;
    node('rect',{x:x1,y:y1,width:x2-x1,height:y2-y1,fill:'none',stroke:'#ffce73','stroke-width':4*scale},svg);
    const label=`Eat ${d.confidence.toFixed(2)}`,w=154*scale,h=36*scale,x=clamp(x1,0,data.source.width-w),y=Math.max(0,y1-h-3*scale);
    node('rect',{x,y,width:w,height:h,rx:3*scale,fill:'#151716',opacity:.9},svg);
    textSvg(label,x+8*scale,y+26*scale,svg,{'font-size':25*scale,fill:'#fff2d9','font-family':'sans-serif'});
  }
}
function drawZoom(s){
  if(!s.showZoom||!ready||video.readyState<2||video.seeking)return;
  const canvas=$('zoomCanvas'),ctx=canvas.getContext('2d');
  const [x,y,w,h]=data.zoomCrop;canvas.width=640;canvas.height=Math.round(640*h/w);
  const sx=video.videoWidth/data.source.width,sy=video.videoHeight/data.source.height;
  ctx.drawImage(video,x*sx,y*sy,w*sx,h*sy,0,0,canvas.width,canvas.height);
}
function render(time=video.currentTime){
  if(!data)return;
  displayedTime=clamp(time,0,DURATION);const s=stateAt(displayedTime,data),phase=PHASES[s.phase];
  document.body.dataset.phase=phase.id;
  if(lastPhase!==s.phase){txt('chapterTitle',phase.title);txt('chapterCopy',phase.copy);lastPhase=s.phase;}
  document.querySelectorAll('#chapterNav [data-time]').forEach(button=>{if(Number(button.dataset.time)===phase.start)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
  txt('timeLabel',`${fmt(displayedTime)} / ${fmt(DURATION)}`);$('seekRange').value=displayedTime;
  $('seekRange').setAttribute('aria-valuetext',`${fmt(displayedTime)}，${phase.title}`);
  txt('sourceTime',`${(s.sourceSeconds).toFixed(2)} s`);txt('frameLabel',s.sourceFrame);
  txt('scoreLabel',s.showBoxes?(s.detections.length?s.detections.map(d=>d.confidence.toFixed(2)).join('／'):'未檢出'):'—');
  txt('resultValue',`${s.candidateSeconds.toFixed(2)} 秒`);txt('resultNote',`這 ${s.selectedSeconds.toFixed(1)} 秒原片中的候選時段，重疊只算一次；仍待人工確認。`);
  const x=94+(s.sourceFrame-data.selection[0])/(data.selection[1]-data.selection[0])*884;
  $('sourceCursor')?.setAttribute('x1',clamp(x,94,978));$('sourceCursor')?.setAttribute('x2',clamp(x,94,978));
  document.querySelectorAll('[data-event]').forEach(el=>{el.classList.toggle('active',s.activeEvents.includes(el.dataset.event));el.style.opacity=s.phase===3&&Number(el.dataset.eventStart)>s.sourceFrame ? 0.12 : 1;});
  document.querySelectorAll('[data-detected-frame]').forEach(el=>el.style.opacity=s.phase===2&&Number(el.dataset.detectedFrame)>s.sourceFrame ? 0.08 : 1);
  drawBoxes(s);drawZoom(s);if(reduced.matches)gsap.set('#zoomCanvas',{scale:1});else visual?.time(displayedTime,true);controls();
  if(Math.abs(displayedTime-lastPosted)>.5){lastPosted=displayedTime;postState();}
}
function frameLoop(now,metadata){
  videoFrameCallback=null;render(metadata.mediaTime);
  if(!video.paused&&!video.ended)videoFrameCallback=video.requestVideoFrameCallback(frameLoop);
}
function ensureFrameLoop(){if('requestVideoFrameCallback'in video&&videoFrameCallback===null)videoFrameCallback=video.requestVideoFrameCallback(frameLoop);}
async function seek(value,keepPlayIntent=false){
  const n=Number(value);if(!Number.isFinite(n))return getState();
  requestedTime=clamp(n,0,DURATION);const generation=++pendingSeek,loadAtStart=loadGeneration;
  if(keepPlayIntent){video.pause();status('正在定位畫面。');}else pause('正在定位畫面。');
  if(!ready){$('seekRange').value=requestedTime;status(`已選擇${fmt(requestedTime)}，載入後會停在這裡。`);return getState();}
  const target=requestedTime;
  if(Math.abs(video.currentTime-target)>.001){
    await new Promise(resolve=>{const done=()=>{video.removeEventListener('seeked',done);clearTimeout(timer);resolve();};const timer=setTimeout(done,8000);video.addEventListener('seeked',done);video.currentTime=target;});
  }
  if(generation!==pendingSeek||loadAtStart!==loadGeneration||!ready)return getState();
  if(video.seeking){fail('畫面定位逾時。');return getState();}
  render(target);ensureFrameLoop();status(`停在${fmt(target)}，按播放繼續。`);postState();return getState();
}
async function play(){
  if(!ready||loading||document.hidden||printState)return getState();
  const intent=++playIntent;
  if(video.ended||video.currentTime>=DURATION-.02)await seek(0,true);
  if(intent!==playIntent||!ready||loading||document.hidden||printState)return getState();
  try{await video.play();if(intent===playIntent){status('播放中。');ensureFrameLoop();controls();postState();}}catch{if(intent===playIntent)pause('瀏覽器尚未開始播放，請再按一次播放。');}
  return getState();
}
async function load(){
  if(loading&&attempt)return;
  const generation=++loadGeneration;
  pendingSeek++;playIntent++;
  attempt++;ready=false;loading=true;error=null;video.pause();fetchController?.abort();fetchController=new AbortController();controls();status('正在載入原片與候選紀錄。');
  const signal=fetchController.signal;
  clearTimeout(timeout);timeout=setTimeout(()=>{if(generation===loadGeneration){fetchController.abort();fail('影片或來源資料載入逾時。');}},25000);
  try{
    if(!window.gsap)throw new Error('動畫程式未能載入。');
    const response=await fetch('assets/display-data.json',{signal:fetchController.signal,cache:attempt>1?'reload':'default'});
    if(!response.ok)throw new Error(`來源資料載入失敗（${response.status}）。`);
    data=validateData(await response.json());buildTimeline();
    if(!visual){visual=gsap.timeline({paused:true});visual.fromTo('#zoomCanvas',{scale:1},{scale:1.05,duration:6,ease:'power1.inOut',immediateRender:false},10);visual.to('#zoomCanvas',{scale:1,duration:1},21);visual.fromTo('#zoomCanvas',{scale:1},{scale:1.04,duration:14,ease:'none',immediateRender:false},50);}
    await new Promise((resolve,reject)=>{
      const abort=()=>{clean();reject(new Error('影片載入逾時。'));};
      const clean=()=>{video.removeEventListener('loadeddata',ok);video.removeEventListener('error',bad);signal.removeEventListener('abort',abort);};
      const ok=()=>{clean();resolve();},bad=()=>{clean();reject(new Error('影片未能載入或解碼。'));};
      if(attempt===1&&video.readyState>=2){resolve();return;}
      video.addEventListener('loadeddata',ok,{once:true});video.addEventListener('error',bad,{once:true});
      signal.addEventListener('abort',abort,{once:true});
      if(attempt>1)video.src=`assets/jay-clip.mp4?retry=${attempt}`;video.load();
    });
    if(generation!==loadGeneration||error)return;
    if(Math.abs(video.duration-DURATION)>.1)throw new Error('影片長度與時間資料不符。');
    clearTimeout(timeout);ready=true;error=null;
    do {await seek(requestedTime);} while(generation===loadGeneration&&ready&&!error&&(video.seeking||Math.abs(video.currentTime-requestedTime)>.001));
    if(generation!==loadGeneration||error||!ready)return;
    loading=false;controls();
    status(reduced.matches?'已載入。已套用減少動態設定，按播放才會開始；下方也可閱讀逐段解說。':'已載入。按播放開始。');
  }catch(e){if(generation===loadGeneration)fail(e.name==='AbortError'?'來源資料載入逾時。':e.message);}
}
$('playButton').addEventListener('click',()=>video.paused?play():pause());
async function replay(){const pending=seek(0),intent=playIntent;await pending;if(intent===playIntent)return play();return getState();}
$('replayButton').addEventListener('click',replay);
$('seekRange').addEventListener('input',e=>seek(e.target.value));
document.querySelectorAll('#chapterNav [data-time]').forEach(button=>button.addEventListener('click',()=>seek(button.dataset.time)));
$('retryButton').addEventListener('click',()=>{loading=false;load();});
$('fullscreenButton').addEventListener('click',()=>{const expanded=document.body.classList.toggle('is-expanded');txt('fullscreenButton',expanded?'縮回':'放大');$('fullscreenButton').setAttribute('aria-pressed',String(expanded));$('fullscreenButton').setAttribute('aria-label',expanded?'縮回播放器':'放大播放器');postState();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('is-expanded')){$('fullscreenButton').click();$('fullscreenButton').focus();}if(e.code==='Space'&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!/INPUT|BUTTON|TEXTAREA|SELECT|A|SUMMARY/.test(document.activeElement?.tagName)){e.preventDefault();video.paused?play():pause();}});
video.addEventListener('playing',()=>{ensureFrameLoop();controls();});
video.addEventListener('pause',controls);
video.addEventListener('timeupdate',()=>{if(ready&&!loading&&!video.seeking&&!video.paused)requestedTime=video.currentTime;if(ready&&!('requestVideoFrameCallback'in video))render();});
video.addEventListener('seeking',()=>{$('overlay').replaceChildren();});
video.addEventListener('seeked',()=>{render();ensureFrameLoop();});
video.addEventListener('ended',()=>{requestedTime=DURATION;render(DURATION);status('已播完，可重播或回看任何段落。');postState();});
video.addEventListener('waiting',()=>{if(ready)status('影片緩衝中，畫面與標註會一起繼續。');});
video.addEventListener('error',()=>{if(ready){requestedTime=video.currentTime;fail('影片載入失敗。');}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('切換分頁，已暫停。');});
window.addEventListener('pagehide',()=>pause(''));
document.querySelectorAll('a[href],details').forEach(el=>el.addEventListener(el.tagName==='DETAILS'?'toggle':'click',()=>{if(el.tagName!=='DETAILS'||el.open)pause('查看來源，已暫停。');}));
window.addEventListener('beforeprint',()=>{pause('列印時暫停。');printState=[...document.querySelectorAll('details')].map(el=>[el,el.open]);printState.forEach(([el])=>el.open=true);});
window.addEventListener('afterprint',()=>{printState?.forEach(([el,open])=>el.open=open);printState=null;render();});
reduced.addEventListener('change',()=>{pause('已套用動態偏好。');render();});
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&!document.body.classList.contains('is-expanded'))pause('播放器離開畫面，已暫停。');},{threshold:0}).observe($('stage'));
window.addEventListener('message',e=>{if(e.source!==parent||!e.data||e.data.type!=='ecology-control')return;const {action,time}=e.data;if(action==='pause')pause();if(action==='play')play();if(action==='seek')seek(time);if(action==='retry')load();if(action==='state')postState();});
window.EcologyBehaviourPlayer={getState,play,pause,seek,replay,retry:()=>load()};
load();
