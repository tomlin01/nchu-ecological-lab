export const DURATION=120;
export const PHASES=[
  {id:'habitat',start:0,end:20,label:'先看見鳥',title:'牠就在灌叢裡',copy:'Sage Thrasher生活在北美西部的蒿灌叢草原。鳥在不在、我們有沒有看見，是兩個問題。',note:'鳥與棲地為AI生成情境；不是本研究的實拍觀察。'},
  {id:'observation',start:20,end:40,label:'觀察方式改變了',title:'同一片地方，記錄卻不同',copy:'這組示意鳥沒有減少。停留較短、走得較近，和看得久、走得遠，可能留下不同紀錄。',note:'15／60分鐘、0.5／2公里與2／4筆紀錄都是教學示意，不是論文資料。'},
  {id:'model',start:40,end:68,label:'把兩種變化分開估',title:'先看觀察改了什麼',copy:'模型分別學習類似條件下的鳥數紀錄，以及觀察方式隨年份的差異，再估計各地的增減。',note:'DML方法概念示意；沒有按時間比例換算鳥數，也沒有在此執行模型。'},
  {id:'map',start:68,end:94,label:'回到真實地圖',title:'同一種鳥，各地變化不同',copy:'這是官方Sage Thrasher繁殖季地圖：2012–2022累積相對豐度變化。紅色下降、藍色上升，圓點大小代表研究期間中段的相對豐度。',note:'2022資料版本；27公里格網。此靜態示範圖未套用逐格信賴區間遮罩。'},
  {id:'validation',start:94,end:108,label:'方法怎麼檢查',title:'先知道答案，再檢查方法',copy:'研究者用已知趨勢的模擬資料，檢查方法能否分辨增減與區域差異。結果支持這種用法，但偏差和不確定性仍存在。',note:'原論文檢驗的是Wood Thrush、Canada Warbler與Long-billed Curlew；下方是檢查流程示意，不是Sage Thrasher的評分。'},
  {id:'ending',start:108,end:120,label:'接著去哪裡看',title:'先找出哪裡在變，再調查為什麼',copy:'大量賞鳥紀錄可以幫助研究者找出需要關注的區域。鳥為什麼增減，仍要結合現地調查與其他證據。',note:'相對豐度不是區域內的全部鳥隻數；地圖不能直接證明變化原因。'}
];
export const BIRD_POOL=Object.freeze([
  {id:'bird-1',x:445,y:515,w:112,flip:false},
  {id:'bird-2',x:720,y:458,w:102,flip:true},
  {id:'bird-3',x:1030,y:392,w:94,flip:false},
  {id:'bird-4',x:1280,y:330,w:82,flip:true}
].map(Object.freeze));
export const MAP={version:2022,startYear:2012,endYear:2022,season:'breeding',gridKm:27,
  asset:'assets/official-trends-2022.png',sha256:'8e6ebdd19dcd1bf96dc8ed738e91cdfa4b7e8e49bca0af33bf3d06c3bc24c3d4',
  colors:'red-decrease-blue-increase',annualFrames:false,confidenceMask:false};
export const VALIDATION_SPECIES=['Wood Thrush','Canada Warbler','Long-billed Curlew'];
export const clamp=(v,lo=0,hi=1)=>Math.max(lo,Math.min(hi,v));
export const interval=(t,a,b)=>clamp((t-a)/(b-a));
export function stateAt(value,options={}){
  const time=clamp(Number.isFinite(Number(value))?Number(value):0,0,DURATION);
  const phase=Math.max(0,PHASES.findLastIndex(item=>time>=item.start));
  const progressA=interval(time,21,30),progressB=interval(time,21,36);
  const nA=progressA>.72?2:progressA>.30?1:0,nB=Math.min(4,Math.floor(progressB*4.8));
  return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,phaseProgress:interval(time,PHASES[phase].start,PHASES[phase].end),
    reducedMotion:Boolean(options.reducedMotion),compact:Boolean(options.compact),
    birds:BIRD_POOL.map(bird=>({...bird})),birdPoolIds:BIRD_POOL.map(bird=>bird.id),
    comparison:{demo:true,progressA,progressB,recordedA:BIRD_POOL.slice(0,nA).map(bird=>bird.id),recordedB:BIRD_POOL.slice(0,nB).map(bird=>bird.id),
      finalCountA:2,finalCountB:4,minutesA:15,minutesB:60,distanceKmA:.5,distanceKmB:2},
    methodStep:time<49?0:time<58?1:2,map:{...MAP},validationSpecies:[...VALIDATION_SPECIES],
    modelInferenceRun:false,rawChecklistsLoaded:false,hasAudio:false,
    conclusion:PHASES.at(-1).title};
}
