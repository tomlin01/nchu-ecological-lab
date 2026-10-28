export const DURATION=88;
export const EXPORT_SIZE={width:1600,height:900};
export const ASSETS={fish:{file:'assets/fish-original.jpg',width:800,height:450},detected:{file:'assets/board-detection.jpg',width:800,height:450},template:{file:'assets/board-template.png',width:1590,height:380},study:{file:'assets/study-figure3.jpg',width:728,height:398}};
export const PHASES=[
 {id:'fish',start:0,end:12,label:'先看這尾魚',title:'魚長，要從哪裡量到哪裡？',copy:'做漁獲調查時，除了認魚種，也要記下每尾魚有多長。這尾魚的尾鰭末端細長，該量到凹口，還是最遠的尾尖？',note:'照片取自SPC公開範例，原資料未提供這尾魚經確認的魚種和長度；這裡也沒有重新量測。'},
 {id:'calibrate',start:12,end:30,label:'把尺規看清楚',title:'照片拍斜了，怎麼量？',copy:'照片不一定拍得正。程式先辨認板上的數字，再和尺寸已知的標準板比對，調整照片的方向和比例。先把尺規對好，接著才能量魚。',note:'彩色框是作者公布的結果；連到標準板的點和線是人工示意，沒有重新執行模型或計算這尾魚的長度。'},
 {id:'endpoints',start:30,end:48,label:'魚尾量到哪裡',title:'尾叉長和全長，差在哪裡？',copy:'從魚嘴最前端量到尾叉凹處，叫做「尾叉長」；量到尾鰭最遠處，則是「全長」。研究依魚的外形選用量法，因此比較長度時，也得用相同的量法。',note:'點和線由人工加上，只用來解釋從哪裡量到哪裡，並非模型替這尾魚找到的位置或算出的長度。'},
 {id:'review',start:48,end:66,label:'量完再看一次',title:'量完，再對照一次原照。',copy:'調查員會對照原照，檢查線從哪裡開始、量到哪裡，以及採用哪一種量法。需要時可以調整量測線；照片留著，日後也能回頭核對。',note:'畫面只示範該檢查哪些位置，沒有呈現這尾魚實際判錯或修改的過程。人工確認後，仍可能有量測誤差。'},
 {id:'result',start:66,end:88,label:'量得準嗎',title:'和人工量的差多少？',copy:'研究團隊把東加市場869尾魚的AI量測結果，和現場人工量得的長度逐一比較。平均絕對差是3.4毫米。照片能幫忙記錄魚長，量測位置和結果仍要檢查。',note:'測試魚長130–720 mm。先算每尾相差多少，不分高估或低估，再取平均；這是整批測試的平均，不是每尾的誤差上限。市場漁獲也不能代表海裡全部的魚。'}
];
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const smooth=v=>{const x=clamp(v);return x*x*(3-2*x);};
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
export const clockText=v=>{const t=Math.floor(clamp(v,0,DURATION));return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;};
export function validateSource(d){
 if(d?.caseId!=='04-03'||d.schemaVersion!==1||d.modelInferenceRun!==false||d.reportedFishLength!==null)throw Error('載入的資料與這段示範不符。');
 if(d.source?.width!==800||d.source.height!==450||d.calibrationIsConcept!==true||d.guidesAreManual!==true)throw Error('照片與示意資料的設定不符。');
 for(const p of Object.values(d.guidePoints||{}))if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>800||p[1]<0||p[1]>450)throw Error('導讀位置資料不完整。');
 if(!d.guidePoints?.snout||!d.guidePoints?.fork||!d.guidePoints?.tip)throw Error('缺少量測位置的導讀資料。');
 if(d.calibrationPairs?.length!==3||d.calibrationPairs.some(p=>!p.source.every(Number.isFinite)||!p.target.every(Number.isFinite)))throw Error('尺規對照資料不完整。');
 if(d.study?.n!==869||d.study.maeMm!==3.4||d.study.matN+d.study.boardN!==869)throw Error('研究比較資料與來源不符。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const full=[0,0,800,450],tail=[386,72,308,205];
 let camera=full.slice(),detectedOpacity=0,mappingProgress=0,guideOpacity=0,guideMode='none',measureOpacity=0,reviewStep=-1;
 if(phase===0&&!reducedMotion)camera=mix(full,[24,20,740,416],smooth((local-4)/8)*.45);
 if(phase===1){detectedOpacity=reducedMotion?1:smooth(local/2);mappingProgress=reducedMotion?1:smooth((local-6)/9);}
 if(phase===2){
  guideOpacity=reducedMotion?1:smooth(local/1.5);
  guideMode=reducedMotion?'both':local<9?'fork':'both';
  if(!reducedMotion){const zoom=local<8?smooth(local/3):1-smooth((local-8)/4);camera=mix(full,tail,zoom);}
  measureOpacity=reducedMotion?1:smooth((local-12)/2);
 }
 if(phase===3){reviewStep=Math.min(2,Math.floor(local/6));guideOpacity=1;guideMode=reviewStep===0?'snout':reviewStep===1?'fork':'both';measureOpacity=1;}
 return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,camera,detectedOpacity,mappingProgress,guideOpacity,guideMode,measureOpacity,reviewStep,
  conclusionProgress:phase===4?(reducedMotion?1:smooth((local-11)/3)):0,
  reportedFishLength:null,modelInferenceRun:false,calibrationIsConcept:true,teachingMarkers:true,hasAudio:false,reducedMotion,compact,exportMode};
}
