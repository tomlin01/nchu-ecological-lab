export const DURATION = 78;
export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const PHASES = [
  {id:'intro',start:0,end:10,title:'先看牠怎麼吃',copy:'松鴉站在林中的取食支架上，低頭碰觸食物，又抬起頭。這段時間裡，有多少是在吃東西？'},
  {id:'definition',start:10,end:22,title:'怎樣才算「正在吃」？',copy:'研究者先選出有明確動作的畫面，標註嘴與食物接觸的位置，再拿這些例子訓練模型。右邊放大的是同一幀。'},
  {id:'detection',start:22,end:36,title:'電腦一次判讀一幀',copy:'框與分數來自作者公開的模型輸出。Eat表示進食候選；沒有框，只表示這一幀沒有檢出，不能直接當作沒在吃。'},
  {id:'events',start:36,end:50,title:'把相關的偵測接成一段',copy:'後處理會比較類別、位置與時間，把相關的框接成候選事件。每條短色帶是一段候選事件；上下排開方便看出重疊，不能當作鳥的身分編號。'},
  {id:'review',start:50,end:64,title:'回看開始和結束的地方',copy:'這裡慢放同一段原片，核對候選事件的開始與結束。相鄰事件可能重疊，事件內也可能短暫沒有檢出；這些地方要回看原片。'},
  {id:'result',start:64,end:78,title:'算出候選時間，再由人核對',copy:'先把重疊的候選區間合在一起，避免同一秒重複計算。算出的是模型候選涵蓋的時間，實際取食多久仍待人工確認。'}
];

// Integer, half-open intervals keep inclusive CSV end frames from being lost.
export function unionIntervals(intervals) {
  const sorted=intervals.map(([start,end])=>[start,end]).filter(([s,e])=>e>s).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const result=[];
  for(const [s,e] of sorted){const previous=result.at(-1);if(previous&&s<=previous[1])previous[1]=Math.max(previous[1],e);else result.push([s,e]);}
  return result;
}
export function intervalLength(intervals) { return unionIntervals(intervals).reduce((n,[s,e])=>n+e-s,0); }
export function clipEvents(events,start,end) {
  return events.map(event=>({...event,start:Math.max(start,event.startFrame),end:Math.min(end,event.endFrame+1)})).filter(e=>e.end>e.start);
}
export function validateData(data) {
  if(data?.schemaVersion!==1||data.modelInferenceRun!==false||data.newHumanGroundTruth!==false)throw new Error('來源資料版本不符。');
  if(data.duration!==DURATION||!Number.isFinite(data.outputFps)||data.outputFps<=0)throw new Error('教學時間資料不完整。');
  const s=data.source;
  if(!s||![s.width,s.height,s.fps,s.totalFrames].every(n=>Number.isFinite(n)&&n>0))throw new Error('來源影片規格不完整。');
  if(!Array.isArray(data.sourceFrames)||data.sourceFrames.length!==Math.round(data.duration*data.outputFps)||!data.sourceFrames.every(f=>Number.isInteger(f)&&f>=0&&f<s.totalFrames))throw new Error('影片對齊資料不完整。');
  if(!Array.isArray(data.detections)||!Array.isArray(data.events))throw new Error('候選紀錄不完整。');
  for(const d of data.detections){if(!Number.isInteger(d.frame)||d.frame<0||d.frame>=s.totalFrames||d.behaviour!=='Eat'||!Number.isFinite(d.confidence)||d.confidence<0||d.confidence>1||!Array.isArray(d.bbox)||d.bbox.length!==4||!d.bbox.every(Number.isFinite)||d.bbox[2]<=d.bbox[0]||d.bbox[3]<=d.bbox[1]||d.bbox[0]<0||d.bbox[1]<0||d.bbox[2]>s.width+1||d.bbox[3]>s.height+1)throw new Error('候選框或分數超出來源範圍。');}
  for(const e of data.events){if(!Number.isInteger(e.startFrame)||!Number.isInteger(e.endFrame)||e.startFrame<0||e.endFrame<e.startFrame||e.endFrame>=s.totalFrames)throw new Error('候選事件起訖不完整。');}
  if(!Array.isArray(data.selection)||data.selection.length!==2||!data.selection.every(Number.isInteger)||data.selection[0]<0||data.selection[1]<=data.selection[0]||data.selection[1]>s.totalFrames)throw new Error('選段範圍不完整。');
  const c=data.zoomCrop;
  if(!Array.isArray(c)||c.length!==4||!c.every(Number.isFinite)||c[0]<0||c[1]<0||c[2]<=0||c[3]<=0||c[0]+c[2]>s.width||c[1]+c[3]>s.height)throw new Error('局部放大範圍不完整。');
  return data;
}
export function stateAt(value,data) {
  const time=clamp(Number.isFinite(value)?value:0,0,DURATION);
  const phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start));
  const outputFrame=clamp(Math.floor(time*data.outputFps+1e-5),0,data.sourceFrames.length-1);
  const sourceFrame=data.sourceFrames[outputFrame];
  const detections=data.detections.filter(d=>d.frame===sourceFrame);
  const events=clipEvents(data.events,...data.selection);
  const intervals=unionIntervals(events.map(e=>[e.start,e.end]));
  return {time,phase,phaseId:PHASES[phase].id,outputFrame,sourceFrame,sourceSeconds:sourceFrame/data.source.fps,
    detections,events,intervals,activeEvents:events.filter(e=>sourceFrame>=e.start&&sourceFrame<e.end).map(e=>e.id),
    candidateFrames:intervalLength(intervals),candidateSeconds:intervalLength(intervals)/data.source.fps,
    selectedSeconds:(data.selection[1]-data.selection[0])/data.source.fps,
    showBoxes:phase>=2&&phase<=4,showZoom:phase===1||phase===4,showTimeline:phase>=2,
    showResult:phase===5,manualReview:'pending',modelInferenceRun:false,newHumanGroundTruth:false};
}
