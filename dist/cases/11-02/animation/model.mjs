export const DURATION=130;
export const PHASES=[
 {id:'forest',start:0,end:18,label:'森林與陷阱',title:'森林這麼大，巡護員該先去哪裡？',copy:'森林裡生活著野生動物，也可能藏著鋼索陷阱。巡護員得走進現場查找，但有限的人力無法走遍每個角落。',note:'森林、爪哇野牛與鋼索為AI生成概念情境，不是研究現場照片或獲救個體。'},
 {id:'coverage',start:18,end:40,label:'走過的只是一部分',title:'沒查獲的地方，也可能還沒看見',copy:'同一個鋼索留在原地。這條示意路徑只走過森林的一部分，沒有查到它。紀錄中的「沒有查獲」，和現場真的沒有陷阱，是兩件事。',note:'路徑與人員為教學示意，不是實際GPS軌跡；沒有查獲的紀錄不能直接當作確定的無陷阱區。'},
 {id:'prediction',start:40,end:64,label:'紀錄怎麼變成線索',title:'過去查到什麼，還要看怎麼巡過',copy:'PAWS利用歷史巡護、查獲紀錄及環境資料，估計給定巡護努力下的查獲可能性，並保留預測有多大把握的差別。',note:'格網與估計都是教學示意，沒有在此執行PAWS；沒巡過不直接等於模型計算出的高不確定性。'},
 {id:'planning',start:64,end:84,label:'為什麼改選路線',title:'預期查獲高，也要看預測有多大把握',copy:'兩條教學路線使用相同資源。只看預期查獲指標時，A較高；加入不確定性的扣分後，B的規劃分數較高。這說明本文保守規劃的方向。',note:'72、65、47、62都是教學分數，不是機率、論文輸出或陷阱數；沒有執行路線最佳化。'},
 {id:'field',start:84,end:116,label:'看真實試驗結果',title:'高風險選區，後來真的查到較多嗎？',copy:'Srepok第一輪試驗中，高風險組巡過42格，有14格查獲盜獵跡象；中風險組5／40，低風險組0／36。巡護員事前不知道風險分組。',note:'2018年12月至2019年1月；單位為1×1公里格網。這是查獲跡象的格數，不是陷阱數，也不是每公里效率。'},
 {id:'ending',start:116,end:130,label:'回到森林',title:'AI提供查找線索，巡護員在現場確認',copy:'歷史試驗支持模型分組能辨別較值得查找的區域。人員仍要判斷可行路線、走進森林確認；查獲結果不能直接換算成挽救多少動物。',note:'風險分組的現場驗證與不確定性路線評估分開；不宣稱已證明族群恢復或盜獵下降。'}
];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const interval=(t,a,b)=>clamp((t-a)/(b-a));
export const WIRE=Object.freeze({id:'fixed-wire',x:1099.2,y:732.6});
export const FOREST_PATH=Object.freeze([[1480,790],[1390,640],[1280,520],[1220,430],[1180,365]].map(Object.freeze));
export const ROUTES=Object.freeze({A:[[1140,714],[1140,570],[985,570],[985,314],[905,314]],B:[[1140,714],[1140,570],[1295,570],[1295,314],[1375,314]]});
export const RESULT=Object.freeze([{id:'high',label:'高風險',observed:14,patrolled:42},{id:'medium',label:'中風險',observed:5,patrolled:40},{id:'low',label:'低風險',observed:0,patrolled:36}].map(Object.freeze));
export const CELLS=Object.freeze(Array.from({length:24},(_,i)=>Object.freeze({id:i,visited:[2,3,7,8,9,13,14,19,20].includes(i),observed:[8,14].includes(i),risk:[.2,.3,.5,.4,.3,.2,.3,.5,.8,.7,.3,.1,.2,.4,.6,.7,.5,.3,.1,.3,.5,.4,.3,.2][i],uncertainty:[.6,.3,.4,.5,.6,.4,.3,.2,.7,.3,.2,.4,.5,.4,.2,.5,.3,.2,.5,.6,.4,.3,.7,.4][i]})));
function length(points){return points.slice(1).reduce((s,p,i)=>s+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0);}
export function stateAt(value,options={}){
 const time=clamp(Number(value)||0,0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),p=PHASES[phase];
 const beta=.5*interval(time,70,77),scoreA=72*(1-beta*.7),scoreB=65*(1-beta*.1);
 return {time,duration:DURATION,phase,phaseId:p.id,phaseProgress:interval(time,p.start,p.end),reducedMotion:!!options.reducedMotion,compact:!!options.compact,
  wire:{...WIRE},wireMoved:false,wireDetected:false,patrolProgress:interval(time,19,32),predictionProgress:interval(time,44,55),uncertaintyProgress:interval(time,54,61),
  planning:{demo:true,beta,rawA:72,rawB:65,uncertaintyA:.7,uncertaintyB:.1,scoreA,scoreB,selected:scoreA>=scoreB?'A':'B',costA:length(ROUTES.A),costB:length(ROUTES.B),routeProgress:interval(time,65,71),modelRun:false},
  field:{period:'2018-12 to2019-01',site:'Srepok Wildlife Sanctuary',cellSideKm:1,blockSideKm:3,blocksPerGroup:5,rangersKnewRiskGroups:false,unit:'observed cells / actually patrolled cells',results:RESULT.map(r=>({...r})),revealCount:time<90?0:time<98?1:time<104?2:3},
  generatedContext:true,modelInferenceRun:false,actualPatrolTracksLoaded:false,actualAnimalLivesSavedKnown:false,hasAudio:false,conclusion:PHASES[5].title,
  narrative:phase===2?{title:time<52?'紀錄有差別：巡過多少，查到什麼？':'模型估計風險，也保留預測把握'}:{}
 };
}
