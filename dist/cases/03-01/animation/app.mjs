import {DURATION,PHASES,frameAt,clamp,smooth} from './model.mjs';
document.documentElement.classList.add('player-script');
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const clock={time:0},compact=matchMedia('(max-width:800px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const labels={query:'照片一',match:'照片二',other:'第三張照片'};
let data=null,photos=new Map(),urls=new Map(),timeline=null,ready=false,loading=false,error=null,loadGeneration=0,loadPromise=null,controller=null;
let lastPhase=-1,lastPosted=-1,renderedCrops=[],printState=null,sourceId=null,sourceOpener=null,attempt=0;
const format=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
const text=(id,value)=>{if($(id).textContent!==value)$(id).textContent=value;};
const attr=(node,values)=>{for(const [name,value] of Object.entries(values))if(node.getAttribute(name)!==String(value))node.setAttribute(name,String(value));};
const show=(node,on)=>{node.style.display=on?'':'none';};
function svg(tag,values={},parent=$('photo-workspace')){const node=document.createElementNS(NS,tag);attr(node,values);parent.append(node);return node;}
function label(value,x,y,size,parent,more={}){const node=svg('text',{x,y,'font-family':'Case Sans, sans-serif','font-size':size,fill:'#eef2e8',...more},parent);node.textContent=value;return node;}
function photoPanel(key){
  const group=svg('g',{'data-panel':key});
  const viewport=svg('svg',{preserveAspectRatio:'xMidYMid meet',overflow:'hidden'},group);
  const defs=svg('defs',{},viewport),clip=svg('clipPath',{id:`clip-${key}`,clipPathUnits:'userSpaceOnUse'},defs),clipRect=svg('rect',{},clip);
  const image=svg('image',{x:0,y:0,preserveAspectRatio:'xMidYMid meet','clip-path':`url(#clip-${key})`},viewport);
  const caption=label('',0,0,27,group,{'text-anchor':'middle',fill:'#c5d4ce'});
  return {group,viewport,clipRect,image,caption};
}
const panels=Object.fromEntries(['query','match','other','query-detail','match-detail'].map(key=>[key,photoPanel(key)]));
const guides=['query','match'].map(id=>({id,box:svg('rect',{fill:'none',stroke:'#d2dfb3','stroke-width':2,'vector-effect':'non-scaling-stroke'},$('guide-workspace')),line:svg('path',{fill:'none',stroke:'#9eb9b2','stroke-width':1.5,'vector-effect':'non-scaling-stroke'},$('guide-workspace'))}));
const encoder=svg('g',{id:'encoder-illustration'},$('method-workspace'));
const modelBox=svg('rect',{fill:'#244443',stroke:'#8faf9e','stroke-width':2},encoder);
const modelText=label('同一個模型',0,0,34,encoder,{'text-anchor':'middle'});
const modelNote=label('方法示意',0,0,26,encoder,{'text-anchor':'middle',fill:'#bccdcc'});
const paths=[0,1].map(()=>svg('path',{fill:'none',stroke:'#8faf9e','stroke-width':4,pathLength:1,'stroke-dasharray':1},encoder));
const tokens=[0,1].map(()=>svg('rect',{width:14,height:14,fill:'#d2dfb3'},encoder));
const matrices=[0,1].map(()=>{
  const group=svg('g',{},encoder);const squares=[];
  for(let row=0;row<3;row++)for(let col=0;col<5;col++)squares.push(svg('rect',{x:col*33,y:row*33,width:23,height:23,fill:'#a9bfa9',opacity:.55+(row+col)%3*.15},group));
  const name=label('外觀特徵示意',80,132,27,group,{'text-anchor':'middle',fill:'#bccdcc'});return {group,name,squares};
});
const records=svg('g',{id:'source-record-connection'},$('method-workspace'));
const recordLines=[0,1].map(()=>svg('path',{fill:'none',stroke:'#8faf9e','stroke-width':3,pathLength:1,'stroke-dasharray':1},records));
const recordBox=svg('rect',{fill:'#24433b'},records);
const recordTitle=label('同一個體',0,0,43,records,{'text-anchor':'middle'});
const recordNote=label('資料集原有標籤',0,0,31,records,{'text-anchor':'middle',fill:'#d2dfb3'});

function cropFor(photo,kind){return kind==='full'?[0,0,photo.width,photo.height]:kind==='bbox'?photo.bbox:photo.detailCrop;}
function fit(photo,rect){const scale=Math.min(rect[2]/photo.width,rect[3]/photo.height);return {x:rect[0]+(rect[2]-photo.width*scale)/2,y:rect[1]+(rect[3]-photo.height*scale)/2,scale};}
function renderMethods(state){
  show(encoder,state.showEncoder);show(records,state.showIdentity);
  if(state.showEncoder){
    const small=compact.matches,box=small?[390,450,220,165]:[420,238,180,165];
    attr(modelBox,{x:box[0],y:box[1],width:box[2],height:box[3]});
    modelText.textContent=small?'影像模型':'同一個模型';
    attr(modelText,{x:box[0]+box[2]/2,y:box[1]+75,'font-size':small?55:31});
    attr(modelNote,{x:box[0]+box[2]/2,y:box[1]+119,'font-size':small?45:25});
    [0,1].forEach(i=>{
      const point=small?[110+i*520,870]:[765,110+i*310];
      attr(matrices[i].name,{'font-size':small?36:27});
      attr(matrices[i].group,{transform:`translate(${point[0]} ${point[1]}) scale(${small?1.7:1})`,opacity:smooth((state.local-4-i*.5)/2)});
      const d=small?`M${255+i*490} 428Q${255+i*490} 440 500 450M500 615Q500 750 ${point[0]+135} 830`:`M325 ${160+i*325}Q370 ${160+i*325} 420 320M600 320Q690 320 755 ${155+i*310}`;
      attr(paths[i],{d,'stroke-dashoffset':1-state.encoderProgress});
      const t=state.encoderProgress;
      const location=paths[i].getPointAtLength(paths[i].getTotalLength()*t);
      attr(tokens[i],{x:location.x-7,y:location.y-7,opacity:t>0&&t<1?1:0});
    });
  }else{
    attr(modelBox,{x:0,y:0,width:1,height:1});attr(modelText,{x:0,y:0,'font-size':31});attr(modelNote,{x:0,y:0,'font-size':25});
    paths.forEach(path=>attr(path,{d:'','stroke-dashoffset':1}));tokens.forEach(token=>attr(token,{x:0,y:0,opacity:0}));matrices.forEach(matrix=>attr(matrix.group,{transform:'translate(0 0) scale(1)',opacity:0}));
  }
  if(state.showIdentity){
    const small=compact.matches,box=small?[100,535,800,180]:[55,425,610,145];
    attr(recordBox,{x:box[0],y:box[1],width:box[2],height:box[3]});
    attr(recordTitle,{x:box[0]+box[2]/2,y:box[1]+65,'font-size':small?60:43});
    attr(recordNote,{x:box[0]+box[2]/2,y:box[1]+119,'font-size':small?50:31});
    attr(records,{opacity:state.identityProgress});
    recordLines.forEach((line,i)=>attr(line,{d:small?`M${255+i*490} 450V490L500 535`:`M${177+i*340} 350V390L360 425`,'stroke-dashoffset':1-smooth((state.local-2)/3)}));
  }else{attr(records,{opacity:0});attr(recordBox,{x:0,y:0,width:1,height:1});attr(recordTitle,{x:0,y:0,'font-size':43});attr(recordNote,{x:0,y:0,'font-size':31});recordLines.forEach(line=>attr(line,{d:'','stroke-dashoffset':1}));}
}
function render(){
  const state=frameAt(clock.time,{compact:compact.matches}),phase=PHASES[state.phase];
  $('scene').setAttribute('viewBox',state.viewBox.join(' '));renderedCrops=[];
  const present=new Set(state.panels.map(panel=>panel.key));
  Object.entries(panels).forEach(([key,panel])=>{
    show(panel.group,false);
    if(!present.has(key)){
      attr(panel.group,{opacity:0});attr(panel.viewport,{x:0,y:0,width:1,height:1,viewBox:'0 0 1 1'});attr(panel.clipRect,{x:0,y:0,width:1,height:1});
      panel.image.removeAttribute('href');attr(panel.image,{width:1,height:1});attr(panel.caption,{x:0,y:0,'font-size':27});panel.caption.textContent='';
    }
  });
  if(data){
    for(const item of state.panels){
      const photo=photos.get(item.photoId),panel=panels[item.key],crop=cropFor(photo,item.crop),[x,y,w,h]=item.rect;
      attr(panel.group,{opacity:item.opacity});show(panel.group,item.opacity>0);
      attr(panel.viewport,{x,y,width:w,height:h,viewBox:crop.join(' ')});
      attr(panel.clipRect,{x:crop[0],y:crop[1],width:crop[2],height:crop[3]});
      attr(panel.image,{href:urls.get(item.photoId)||photo.src,width:photo.width,height:photo.height});
      attr(panel.caption,{x:x+w/2,y:y+h+(compact.matches?68:34),'font-size':compact.matches?56:27});panel.caption.textContent=item.label;
      renderedCrops.push({key:item.key,photoId:item.photoId,crop:crop.slice(),displayRect:item.rect.slice(),opacity:item.opacity});
    }
  }
  for(const guide of guides){
    const original=state.panels.find(p=>p.key===guide.id),detail=state.panels.find(p=>p.key===`${guide.id}-detail`);
    const enabled=!!data&&!!detail&&detail.opacity>0&&!!original;
    show(guide.box,enabled);show(guide.line,enabled);
    if(enabled){
      const photo=photos.get(guide.id),mapping=fit(photo,original.rect),c=photo.detailCrop;
      const box=[mapping.x+c[0]*mapping.scale,mapping.y+c[1]*mapping.scale,c[2]*mapping.scale,c[3]*mapping.scale];
      attr(guide.box,{x:box[0],y:box[1],width:box[2],height:box[3],opacity:detail.opacity});
      attr(guide.line,{d:`M${box[0]+box[2]/2} ${box[1]+box[3]}L${detail.rect[0]+detail.rect[2]/2} ${detail.rect[1]}`,opacity:detail.opacity*.8});
    }else{attr(guide.box,{x:0,y:0,width:1,height:1,opacity:0});attr(guide.line,{d:'',opacity:0});}
  }
  renderMethods(state);
  if(lastPhase!==state.phase){
    text('phase-title',phase.title);text('phase-description',phase.description);text('phase-detail',phase.detail);
    text('phase-position',`${state.phase+1} / ${PHASES.length}`);text('phase-time',`${format(phase.start)}–${format(phase.end)}`);
    document.querySelectorAll('[data-phase]').forEach(button=>{if(Number(button.dataset.phase)===state.phase)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
    lastPhase=state.phase;
  }
  $('comparison-note').hidden=state.phase<3;
  $('identity-readout').hidden=!state.showIdentity||!ready;
  text('identity-short',state.showIdentity&&data?`來源 ID：${photos.get('query').individualId.slice(0,8)}…`:'');
  text('frame-meta',state.showIdentity?'兩筆影像記錄 · 依資料集既有標籤連結':state.showEncoder?'外觀特徵示意 · 未計算這組照片的特徵':state.phase===3?'同物種候選照片 · 沒有模型分數或排名':state.showDetail?'同側斑紋與原圖局部 · 沒有生成或補出細節':'真實來源照片 · 個體標籤留到最後揭露');
  text('clock',`${format(state.time)} / ${format(DURATION)}`);$('timeline').value=state.time;
  $('timeline').setAttribute('aria-valuetext',`${format(state.time)}，${phase.label}`);
  $('play-toggle').disabled=$('replay').disabled=!ready;
  text('play-toggle',isPlaying()?'暫停':state.time>=DURATION?'重新播放':'播放動畫');$('play-toggle').setAttribute('aria-pressed',String(isPlaying()));
  document.querySelectorAll('[data-source]').forEach(button=>{button.hidden=!state.photoIDs.includes(button.dataset.source);button.disabled=!ready;});
  if($('source-dialog').open&&sourceId)fillSource(sourceId);
  if(Math.abs(state.time-lastPosted)>=.5){lastPosted=state.time;postState();}
}
function isPlaying(){return !!timeline&&!timeline.paused()&&ready&&clock.time<DURATION;}
function getState(){const state=frameAt(clock.time,{compact:compact.matches});return {...state,duration:DURATION,ready,loading,playing:isPlaying(),error,attempt,photoIDs:state.photoIDs,cropRects:renderedCrops.map(c=>({...c,crop:c.crop.slice(),displayRect:c.displayRect.slice()})),sourceDialogOpen:$('source-dialog').open,sourcePhoto:sourceId,reducedMotion:reduced.matches,sourceIdentityVisible:state.showIdentity&&ready,dataset:data?.dataset||null,sourceLabelsArePriorData:true};}
function postState(){if(parent!==window)parent.postMessage({type:'ecology-photo-state',state:getState()},'*');}
function pause(reason='動畫已暫停。'){timeline?.pause();render();text('player-status',reason);postState();return getState();}
function seek(value){const t=Number(value);if(!Number.isFinite(t))return getState();timeline?.pause();clock.time=clamp(t,0,DURATION);timeline?.time(clock.time,true);render();text('player-status',ready?`已停在 ${format(clock.time)}，按播放繼續。`:`已選擇 ${format(clock.time)}；照片就緒後會停在這裡。`);postState();return getState();}
function play(){if(!ready||document.hidden||printState||$('source-dialog').open)return getState();if(clock.time>=DURATION)seek(0);timeline.play();render();text('player-status','動畫播放中。');postState();return getState();}
function validate(value){
  if(!value||value.modelInferenceRun!==false||!Array.isArray(value.photos))throw new Error('來源資料格式不完整。');
  const map=new Map(value.photos.map(photo=>[photo.id,photo]));
  for(const id of ['query','match','other']){
    const p=map.get(id);
    if(!p||p.src!==`assets/${id}.jpg`||!Number.isFinite(p.width)||!Number.isFinite(p.height)||p.width<=0||p.height<=0||typeof p.individualId!=='string'||!p.individualId)throw new Error('照片或來源標籤資料缺漏。');
    for(const rect of [p.bbox,p.detailCrop])if(!Array.isArray(rect)||rect.length!==4||!rect.every(Number.isFinite)||rect[0]<0||rect[1]<0||rect[2]<=0||rect[3]<=0||rect[0]+rect[2]>p.width+1||rect[1]+rect[3]>p.height+1)throw new Error('來源裁切範圍超出原圖。');
  }
  if(map.get('query').individualId!==map.get('match').individualId||map.get('query').viewpoint!==map.get('match').viewpoint)throw new Error('照片的身分標籤或身體側面與示範資料不符。');
  return map;
}
function preload(photo,url){return new Promise((resolve,reject)=>{
  const image=new Image(),timeout=setTimeout(()=>finish(new Error(`${labels[photo.id]}載入逾時。`)),20000);
  const finish=err=>{clearTimeout(timeout);image.onload=image.onerror=null;err?reject(err):resolve();};
  image.onerror=()=>finish(new Error(`${labels[photo.id]}未能載入。`));
  image.onload=()=>{
    if(image.naturalWidth!==photo.width||image.naturalHeight!==photo.height){finish(new Error('照片尺寸與來源紀錄不符。'));return;}
    if(typeof image.decode==='function')image.decode().then(()=>finish()).catch(()=>finish(new Error('照片未能解碼。')));else finish();
  };
  image.src=url;
});}
async function load(){
  if(loading)return loadPromise;
  const generation=++loadGeneration;attempt++;
  timeline?.pause();ready=false;loading=true;error=null;controller?.abort();controller=new AbortController();
  document.documentElement.classList.remove('player-ready');$('retry-load').hidden=true;$('retry-load').disabled=true;
  text('player-status','正在載入來源資料與三張照片。可以先選段落，完成後不會自動播放。');render();postState();
  loadPromise=(async()=>{
    const timeout=setTimeout(()=>controller?.abort(),15000);
    try{
      if(!window.gsap)throw new Error('動畫程式未能載入；文字與原圖仍可閱讀。');
      const response=await fetch('assets/display-data.json',{signal:controller.signal,cache:attempt>1?'reload':'default'});
      if(!response.ok)throw new Error(`來源資料載入失敗（${response.status}）。`);
      const next=await response.json(),nextPhotos=validate(next);
      clearTimeout(timeout);
      const nextUrls=new Map([...nextPhotos].map(([id,p])=>[id,attempt>1?`${p.src}?retry=${attempt}`:p.src]));
      await Promise.all([...nextPhotos].map(([id,p])=>preload(p,nextUrls.get(id))));
      if(generation!==loadGeneration)return;
      data=next;photos=nextPhotos;urls=nextUrls;
      const requested=clock.time;
      if(!timeline){timeline=gsap.timeline({paused:true,onUpdate:render,onComplete(){timeline.pause();render();text('player-status','動畫結束。可重播，或查看完整來源照片。');postState();}});timeline.fromTo(clock,{time:0},{time:DURATION,duration:DURATION,ease:'none',immediateRender:false},0);}
      timeline.time(requested,true).pause();clock.time=requested;
      ready=true;loading=false;document.documentElement.classList.add('player-ready');render();
      text('player-status',reduced.matches?`照片已就緒，停在 ${format(clock.time)}。依減少動態偏好，按播放後才開始。`:`照片已就緒，停在 ${format(clock.time)}。按播放開始。`);
    }catch(e){
      if(generation!==loadGeneration)return;
      loading=false;ready=false;error=e.name==='AbortError'?'來源資料載入逾時。':e.message||'照片載入失敗。';
      text('player-status',`${error} 請重試載入，已選時間會保留。`);$('retry-load').hidden=false;$('retry-load').disabled=false;render();
    }finally{clearTimeout(timeout);if(generation===loadGeneration){loadPromise=null;postState();}}
  })();
  return loadPromise;
}
function retry(){pause('正在重新載入；已選時間保留。');return load();}
function fillSource(id){
  const p=photos.get(id),reveal=frameAt(clock.time).showIdentity;
  const src=urls.get(id)||p.src;if($('source-image').getAttribute('src')!==src)$('source-image').src=src;
  $('source-image').width=p.width;$('source-image').height=p.height;$('source-image').alt=`${labels[id]}的完整來源照片。${id==='other'?'本次只比較後方側身個體，前景另一隻不在範圍內。':''}`;
  text('source-title',`${labels[id]} · 完整原圖`);$('source-file').href=p.src;
  const target=id==='other'?' 本次只比較背景中的側身個體；前景另一隻的頭部不是標註目標。':'';
  const identity=reveal?` 資料集原有個體 ID：${p.individualId}。影像編號：${p.imageId}；標註編號：${p.annotationId}。原檔名：${p.sourceFilename}。拍攝時間：${p.capturedAt||'未提供'}；遭遇編號：${p.encounterId||'未提供'}。`:' 資料集個體標籤在最後一段揭露；此處尚不顯示答案。';
  text('source-caption',`${data.dataset}，照片保留原貌。${target}${identity} 身分標籤來自資料集，並非這段動畫另外執行模型或請人員重新鑑定的結果。${id==='other'?' 動畫中仍保留待確認。':''}`);
}
function openSource(id,opener){if(!ready||!photos.has(id))return false;pause('查看完整原圖；關閉後維持暫停。');sourceId=id;sourceOpener=opener||document.activeElement;fillSource(id);if(!$('source-dialog').open)$('source-dialog').showModal();postState();return true;}
window.caseAnimation={seek,play,pause,getState,retry,openSource,frameAt};window.caseFrameAt=frameAt;
$('play-toggle').addEventListener('click',()=>isPlaying()?pause():play());$('replay').addEventListener('click',()=>{seek(0);play();});
$('timeline').addEventListener('input',event=>seek(event.target.value));$('retry-load').addEventListener('click',retry);
document.querySelectorAll('[data-phase]').forEach(button=>button.addEventListener('click',()=>seek(PHASES[Number(button.dataset.phase)].start)));
document.querySelectorAll('[data-source]').forEach(button=>button.addEventListener('click',()=>openSource(button.dataset.source,button)));
$('stage').addEventListener('keydown',event=>{if(event.code==='Space'){event.preventDefault();isPlaying()?pause():play();}});
$('source-dialog').addEventListener('close',()=>{sourceId=null;text('player-status','原圖已關閉。動畫維持暫停。');sourceOpener?.focus({preventScroll:true});postState();});
document.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>pause('查看來源時，動畫已暫停。')));
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('分頁已隱藏，動畫已暫停。');});window.addEventListener('pagehide',()=>pause());
compact.addEventListener('change',()=>render());reduced.addEventListener('change',()=>pause('動態偏好已變更，動畫已暫停。'));
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting&&isPlaying())pause('動畫已離開可見範圍，播放已暫停。');},{threshold:0}).observe($('stage'));
window.addEventListener('beforeprint',()=>{printState={time:clock.time};pause('列印時動畫已暫停。');});window.addEventListener('afterprint',()=>{if(printState){const t=printState.time;printState=null;seek(t);}});
window.addEventListener('message',event=>{
  if(event.source!==parent||!event.data||typeof event.data!=='object')return;
  const d=event.data;
  if(d.type==='ecology-control'){
    if(d.action==='pause')pause('動畫已暫停。');else if(d.action==='seek')seek(d.time);else if(d.action==='retry')retry();else if(d.action==='state')postState();
  }
});
render();load();
