export const DURATION = 84;
export const EXPORT_SIZE = {width:1600,height:900};
export const ASSETS = {
  context:{file:'assets/context.png',width:1672,height:941},
  shade:{file:'assets/shade.jpg',width:717,height:324},
  sun:{file:'assets/sun.jpg',width:486,height:195},
  detection:{file:'assets/detection.jpg',width:4000,height:3000}
};
export const PHASES = [
  {id:'context',start:0,end:12,label:'先看牠站哪裡',title:'陽光與陰影，就在牠身旁。',copy:'這是粗尾岩鬣蜥，會利用陽光與陰影調節身體受熱。牠旁邊的地面很亮，自己卻站在陰影裡。判斷時要看牠所在的位置。',note:'這張插畫由 AI 生成，用來說明光線，並非研究現場照片。'},
  {id:'photos',start:12,end:26,label:'比較相機照片',title:'背景很亮，牠卻可能在陰影裡。',copy:'這張照片的背景很亮，作者仍把蜥蜴所在的位置標為「陰影」。旁邊另一張照片標為「日照」。判斷時看的是蜥蜴與身旁地面的光線。',note:'這是兩張不同照片，不能確認是同一隻蜥蜴的前後時刻。'},
  {id:'detection',start:26,end:40,label:'先找蜥蜴，再看光線',title:'找到蜥蜴，再分別看光線和色標。',copy:'模型先找出蜥蜴，再分別判斷光線和色標。這裡沿用作者畫出的框，看看框內的身體局部，沒有重新執行模型。',note:'框內只看得到身體局部，長尾沒有完整入框。原資料未提供這張照片的日照與色標答案。'},
  {id:'records',start:40,end:54,label:'每張照片各自記錄',title:'先記下照片裡看得到的資訊。',copy:'知道色標，還要知道圍欄，因為不同圍欄會重複用色。這兩張照片沒有足夠的時間與個體資料，不能接成同一隻蜥蜴前後的紀錄。',note:'日照與陰影沿用作者標註；拍攝時間、圍欄與個體資料則註明未提供。'},
  {id:'results',start:54,end:68,label:'日照和陰影分得準嗎',title:'分得有多準，要先看篩選條件。',copy:'作者先用 95% 的信心門檻篩選，約 85% 的日照／陰影預測通過。再和人工標註比對，這些高信心預測的分類準確率為 96.52%。',note:'數字來自論文的分類評估，並非替本頁例圖打分。模型沒找到或相機沒拍到的蜥蜴，也不在這個數字裡。'},
  {id:'gaps',start:68,end:84,label:'相機沒拍到的時段',title:'沒拍到，就不知道牠一直待在哪裡。',copy:'相機靠動作觸發，蜥蜴不動時可能沒有照片。照片能告訴我們拍到時的日照與陰影，卻無法補齊全天停留時間，也沒有直接量到體溫。',note:'研究會把符合條件的連拍合併，估算拍到的活動時段。本例缺少時間與個體資料，因此兩張照片各自呈現。'}
];
export const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(value)?value:min));
export const smooth=value=>{const p=clamp(value);return p*p*(3-2*p);};
export function phaseAt(value){const time=clamp(value,0,DURATION);return Math.max(0,PHASES.findLastIndex(phase=>time>=phase.start));}
export function clockText(value){const time=Math.floor(clamp(value,0,DURATION));return `${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`;}

export function validateDetection(data){
  if(data?.schemaVersion!==1||data.caseId!=='03-04')throw new Error('照片標註的版本不相符，請重新載入。');
  const {image,annotation,selected,evidenceLimits}=data;
  if(!image||![image.width,image.height].every(value=>Number.isInteger(value)&&value>0))throw new Error('原照片尺寸不完整。');
  if(image.width!==ASSETS.detection.width||image.height!==ASSETS.detection.height)throw new Error('原照片尺寸與選定素材不符。');
  if(!annotation||!Array.isArray(annotation.objects)||!annotation.objects.length)throw new Error('來源 XML 框缺漏。');
  function rectValid(rect){return Array.isArray(rect)&&rect.length===4&&rect.every(Number.isFinite)&&rect[0]>=0&&rect[1]>=0&&rect[2]>0&&rect[3]>0&&rect[0]+rect[2]<=image.width&&rect[1]+rect[3]<=image.height;}
  for(const object of annotation.objects){
    const rect=object.displayRectXYWH,xyxy=object.bboxXYXY;
    if(object.sourceClass!=='lizard'||!rectValid(rect)||!Array.isArray(xyxy)||xyxy.length!==4||!xyxy.every(Number.isFinite))throw new Error('來源框超出原圖或格式不符。');
    if(rect.some((value,index)=>value!==[xyxy[0],xyxy[1],xyxy[2]-xyxy[0],xyxy[3]-xyxy[1]][index]))throw new Error('顯示視窗不符合原 XML 座標。');
  }
  const original=annotation.objects.find(object=>object.annotationIndex===selected?.annotationIndex);
  if(!selected||!original||!rectValid(selected.displayRectXYWH)||selected.displayRectXYWH.some((value,index)=>value!==original.displayRectXYWH[index]))throw new Error('局部視窗與選定來源框不符。');
  if(selected.cropIncludesCompleteAnimal!==false||selected.tailPartlyOutsideSourceBox!==true)throw new Error('局部框的可見範圍說明不符。');
  if(['sunShade','markingColor','individualId','sourceConfidence'].some(key=>selected[key]!==null))throw new Error('資料含有尚未核實的分類或身分，無法顯示。');
  if(evidenceLimits?.modelInferenceRun!==false||evidenceLimits?.classificationGroundTruthAvailableForThisImage!==false)throw new Error('資料標示的用途與這段動畫不符，請核對檔案。');
  return data;
}

export function stateAt(value,data=null,{reducedMotion=false}={}){
  const time=clamp(value,0,DURATION),phase=phaseAt(time),definition=PHASES[phase],local=time-definition.start;
  const comparison=phase===1?(reducedMotion?1:smooth((local-4)/3)):0;
  const cropReveal=phase===2?(reducedMotion?1:smooth((local-2)/2.5)):0;
  return {time,duration:DURATION,phase,phaseId:definition.id,local,
    shadeTranslate:phase===1?(1-comparison)*50:0,shadeScale:phase===1?1+(1-comparison)*.55:1,
    sunOpacity:phase===1?comparison:1,
    sourceBoxOpacity:phase===2?(reducedMotion?1:.3+.7*smooth(local/1.6)):0,
    cropOpacity:phase===2?cropReveal:0,
    questionOpacity:phase===2?(reducedMotion?1:.3+.7*smooth((local-5)/2)):1,
    recordOpacities:phase===3?[1,reducedMotion?1:smooth((local-3)/2.5)]:[1,1],
    resultEmphasis:phase===4?(reducedMotion?1:.66+.34*smooth(local/2)):1,
    gapEmphasis:phase===5?(reducedMotion?1:.55+.45*smooth((local-2)/3)):1,
    sourceRect:data?.selected?.displayRectXYWH?.slice()||null,
    selectedAnnotationIndex:data?.selected?.annotationIndex??null,
    sourceClassifications:{sunShade:null,markingColor:null,individualId:null,confidence:null},
    observations:[{source:'Shade-1',sourceLabel:'陰影',time:null,enclosure:null,individual:null},{source:'Sun-1',sourceLabel:'日照',time:null,enclosure:null,individual:null}],
    paper:{confidenceThresholdPercent:95,retainedPredictionPercentApprox:85,retainedClassificationAccuracyPercent:96.52},
    modelInferenceRun:false,newHumanClassification:false,continuousTrajectory:false,hasAudio:false,
    reducedMotion};
}
