export const DURATION=84;
export const EXPORT_SIZE={width:1600,height:900};
export const ASSETS={specimen:{file:'assets/specimen.jpg',width:800,height:1200},overlay:{file:'assets/author-overlay.png',width:1980,height:2970},second:{file:'assets/second-specimen.jpg',width:789,height:1200},secondOverlay:{file:'assets/second-overlay.png',width:1980,height:3010}};
export const PHASES=[
 {id:'specimen',start:0,end:12,label:'一張植物標本',title:'標本留下了葉子的外形。',copy:'這是一張秋海棠標本，枝葉和採集資訊一起保存下來。拍成數位照片後，研究者就能比對不同館藏中的植物外形。',note:'紐約植物園 NY01212184。這張照片取自 GBIF 的顯示副本，沒有改動取得的像素。'},
 {id:'outline',start:12,end:26,label:'找出葉片輪廓',title:'先找出這片葉子的邊緣。',copy:'看最下方這片葉子。綠色是作者公布的模型分割結果；要計算葉片的面積和外形，得先找出它的邊緣。',note:'這是作者在 2023 年公布的疊圖。金色線沿著看得見的色塊描出，只用來解說；本頁沒有執行模型。'},
 {id:'scale',start:26,end:42,label:'像素換成公分',title:'照片上的距離，怎麼換成公分？',copy:'照片裡的距離以像素計算，要換成公分，得讀取同張原照上的尺規。放大時葉片和參照線一起變大，1 公分仍是1 公分。',note:'參照線由人工讀取原照 2 至 3 cm 的刻度，只用來解釋縮放；本頁沒有量出這片葉子的長度或面積。'},
 {id:'review',start:42,end:58,label:'回到照片看一眼',title:'這片大葉，輪廓在哪裡？',copy:'看中間這片大葉。作者公布的這份疊圖裡，沒有看到它獨立的輪廓。少了輪廓，就算尺規讀對，也無法可靠地算出這片葉子的大小。',note:'兩邊是同張原照與作者結果的相同位置。這裡只比較看得見的差異，不判定原因，也沒有修改作者模型。'},
 {id:'batch',start:58,end:70,label:'一次處理多張',title:'照片這麼多，怎麼量？',copy:'原研究在指定硬體與預設設定下，每小時可處理約150至200張影像。研究者再對照原照與疊圖，檢查葉子有沒有漏掉、邊緣有沒有畫錯。',note:'作者使用 8GB 顯存的 GPU、至少8個 CPU 核心。解析度和葉片數會影響速度；處理完也不代表量測都已確認正確。'},
 {id:'conclusion',start:70,end:84,label:'量完還要檢查',title:'電腦量完，還要檢查什麼？',copy:'LeafMachine2先找葉片、畫出範圍並讀取尺規。研究者還得確認葉子有沒有找對、邊緣和尺規有沒有讀錯；葉尖、葉柄等細節也要另外檢查。',note:'這段動畫使用原研究資料說明量測方法，沒有另外執行模型，也沒有推算新的生態結果。'}
];
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const smooth=v=>{const x=clamp(v);return x*x*(3-2*x);};
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
export const clockText=v=>{const t=Math.floor(clamp(v,0,DURATION));return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;};
export function validateSource(d){
 if(d?.caseId!=='04-01'||d.schemaVersion!==1||d.modelInferenceRun!==false||d.physicalLeafMeasurement!==null)throw Error('載入的資料與這段示範不符。');
 if(d.specimen?.id!=='NY01212184'||d.specimen.width!==800||d.specimen.height!==1200||d.authorOutput?.record!==7764379||d.authorOutput.scaleToDisplay!==2.475)throw Error('標本照片與作者結果對不上。');
 for(const box of [d.fullCamera,d.leaf?.camera,d.qualityCamera,d.ruler?.camera])if(!Array.isArray(box)||box.length!==4||!box.every(Number.isFinite)||box[2]<=0||box[3]<=0)throw Error('照片的顯示範圍資料不完整。');
 if(!Array.isArray(d.leaf.points)||d.leaf.points.length<10||d.leaf.points.some(p=>p.length!==2||!p.every(Number.isFinite)||p[0]<0||p[0]>800||p[1]<0||p[1]>1200))throw Error('葉片輪廓座標不完整。');
 if(d.ruler.authorQcValueAppliedToDisplayImage!==false||d.ruler.centimeters!==1||Math.abs(d.ruler.tickEnd[0]-d.ruler.tickStart[0]-d.ruler.pixelSpan)>.01)throw Error('尺規參照資料不符。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const full=data?.fullCamera||[0,0,800,1200],leaf=data?.leaf.camera||[205,785,345,290];
 let camera=full.slice(),overlay=0,trace=0,ruler=0,comparison=0,scale=1;
 if(phase===0)camera=full;
 if(phase===1){camera=mix(full,leaf,reducedMotion?1:smooth(local/5));overlay=reducedMotion?1:smooth((local-4)/3);trace=reducedMotion?1:smooth((local-7)/4);}
 if(phase===2){const zoom=reducedMotion?1:smooth(local/4);const enlarged=[leaf[0]-55,leaf[1]-45,leaf[2]+110,leaf[3]+90];camera=mix(leaf,enlarged,zoom);ruler=1;trace=.9;overlay=0;scale=leaf[2]/camera[2];}
 if(phase===3){camera=data?.qualityCamera||[255,470,350,270];comparison=reducedMotion?1:smooth((local-2)/3);}
 if(phase===5){camera=mix(leaf,full,reducedMotion?1:smooth(local/6));overlay=.65;trace=1;}
 return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,camera,overlay,trace,ruler,comparison,scale,
   batchReveal:phase===4?(reducedMotion?1:smooth(local/2)):0,conclusionReveal:phase===5?(reducedMotion?1:smooth((local-5)/3)):0,
   centimetersPerReference:1,reportedLeafMeasurement:null,authorRulerQcApplied:false,modelInferenceRun:false,hasAudio:false,reducedMotion,compact,exportMode};
}
