export const DURATION=120;
export const EXPORT_SIZE={width:1600,height:900};
export const VALIDATION={tiles:409,validPixels:68137571,agreePixels:50299775,agreementPercent:73.8,reference:'Expert Consensus',table:'Table 7'};
export const ASSETS={rgb:{file:'assets/s2-reference-rgb.png'},label:{file:'assets/dw-label.png'},top1:{file:'assets/dw-top1.png'},reference:{file:'assets/reference-label.png'},disagreement:{file:'assets/disagreement.png'},threshold05:{file:'assets/dw-threshold-05.png'}};
export const PHASES=[
 {id:'landscape',start:0,end:12,label:'先看地景',title:'一張地景裡，有好幾種地表。',copy:'水面、植被、房屋和道路交錯在一起。Dynamic World把衛星影像中的線索，整理成九種土地覆蓋的分數與標籤。',note:'美國Fox Valley，2019-06-08。同次觀測的L2A參考影像，處理方式與模型使用的L1C影像不同。'},
 {id:'labels',start:12,end:26,label:'顏色從哪裡來',title:'顏色，是分數最高的那一類。',copy:'模型對每一格估計九類機率，再取最高者作為標籤。紅色代表建成區，藍色代表水面；只看顏色，還不知道最高分有多高。',note:'分類來自作者公開驗證資料。不是本頁重新執行模型。'},
 {id:'scores',start:26,end:46,label:'同色，分數不同',title:'同樣是紅色，支持程度一樣嗎？',copy:'這兩個位置的最高類別都是建成區，但完整的九類分數不同。一起看最高分與其他類別，才能看見標籤沒有呈現的差別。',note:'機率不是建物面積比例，也不是已校準的逐格正確率。'},
 {id:'reference',start:46,end:62,label:'拿參考資料檢查',title:'這一張，是保留來檢查的影像。',copy:'研究先用其他影像及人工標記訓練模型，再拿沒參與訓練的影像，對照模型分類與專家參考。這張圖就來自保留的驗證資料。',note:'專家參考也有判讀差異；不一致不等於本頁已確認現地狀況。'},
 {id:'threshold',start:62,end:78,label:'分散的分數先留白',title:'先不採用，和沒有地表，是兩回事。',copy:'如果分析只想先保留支持較集中的位置，可以設定門檻。這裡示範最高機率至少0.5才保留，A留下、B暫不採用。',note:'0.5只是這段教學自訂的門檻，不是研究推薦的通用值。'},
 {id:'updates',start:78,end:92,label:'有合適影像才更新',title:'持續更新，不代表每天都看得清楚。',copy:'每張合格的Sentinel-2影像，各自產生分類。被判定為雲或雲影的位置會被遮蔽；沒有可用影像時，也不會有可靠的新判讀。',note:'流程示意，不是此地的實際天氣或多日期觀測。'},
 {id:'validation',start:92,end:106,label:'研究做得如何',title:'分類和專家參考，有多少相同？',copy:'作者保留409塊影像作測試。在納入比較的像素中，模型最高類別與專家共識的整體一致率約為73.8%。不同類別仍有不同表現。',note:'這是測試資料的一致率，不是每一格的機率，也不能直接校正任意地區的面積。'},
 {id:'ending',start:106,end:120,label:'怎麼使用這張圖',title:'把顏色、分數和日期，一起讀。',copy:'標籤方便看分布，九類機率保留模型的猶豫；日期與觀測條件則告訴我們，這張圖是在什麼情況下做出的。重要判斷仍要回查影像與其他資料。',note:'本頁是固定的2019驗證示例。服務持續供應新資料，不代表這個示例是即時地圖。'}
];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number.isFinite(v)?v:a));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
export function validateSource(d){
 if(d?.caseId!=='05-04'||d.verification?.modelRun!==false||d.nativeGrid?.width!==512||d.nativeGrid?.height!==512)throw Error('來源資料與本案不符。');
 const order=['water','trees','grass','flooded_vegetation','crops','shrub_and_scrub','built','bare','snow_and_ice'];
 if(JSON.stringify(d.classOrder)!==JSON.stringify(order)||d.classes?.length!==9)throw Error('九類順序不符。');
 for(const key of Object.keys(ASSETS)){const a=d.assets?.[key];if(!a||a.width!==1536||a.height!==1536)throw Error('影像尺寸與來源不符。');}
 if(d.points?.length!==2||d.points[0].id!=='A'||d.points[1].id!=='B')throw Error('兩點資料不完整。');
 for(const p of d.points){if(p.probabilities.length!==9||p.probabilities.some(v=>!Number.isFinite(v)||v<0||v>1)||Math.abs(p.probabilities.reduce((a,v)=>a+v,0)-1)>2e-6)throw Error('原始機率不符合九類資料。');const top=p.probabilities.indexOf(Math.max(...p.probabilities));if(top!==p.classIndex||top!==6||p.x!==(p.col+.5)/512||p.y!==(p.row+.5)/512)throw Error('位置或最高類別與來源不符。');}
 if(d.teachingThreshold05?.value!==.5||d.points[0].retainedAtTeachingThreshold05!==true||d.points[1].retainedAtTeachingThreshold05!==false)throw Error('教學門檻資料不符。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const pointIndex=phase===2&&local<10?0:1,point=data?.points?.[pointIndex]||null;
 let narrative={...PHASES[phase]};
 if(phase===2&&pointIndex===0)narrative={title:'位置A，明顯偏向建成區。',copy:'A的建成區估計機率約78.8%，其他類別的分數較小。這些是作者留下的原始模型輸出，不是我們替這一格打分數。',note:'各項顯示值各自四捨五入；長條使用原始數值。'};
 if(phase===2&&pointIndex===1)narrative={title:'位置B，最高的兩類很接近。',copy:'B仍被標為建成區，但它只有約28.6%，水面也有約24.5%。相同的紅色標籤，掩蓋了兩個位置很不一樣的分數。',note:'機率不是建物面積比例，也不是此格分類正確的保證。'};
 if(phase===3&&local>=8)narrative={title:'不一致的位置，值得再回頭看。',copy:'紫色標出模型與專家參考不同的地方，只比較雙方都有有效資料的位置。這能協助檢查，不等於每個紫點都已被現地證實判錯。',note:'本張是驗證示例，不是訓練材料；沒有用它代表全球準確率。'};
 if(phase===4&&local<6)narrative={title:'原圖會替每個有效位置選一類。',copy:'即使最高分不高，只要有有效輸出，仍會選出分數最高的標籤。若只看這張圖，就看不到哪些位置的分數很接近。',note:'原始無效分數另排除；類別0是水面，不是無資料。'};
 if(phase===5&&local>=5&&local<10)narrative={title:'被雲遮住時，先不要下結論。',copy:'影像有雲或雲影，就可能缺少可判讀的像素。這些地方沒有可靠新結果，不能把空白或前後顏色差異直接當作地表改變。',note:'更新流程示意；不代表此地真的在這個日期下雨或有雲。'};
 return{time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,narrative,reducedMotion,compact,exportMode,
  labelReveal:reducedMotion?1:smooth(local/8),pointIndex,point,
  referenceMode:local<8?'pair':'difference',thresholdMode:local<6?'all':'filtered',updateStep:Math.min(2,Math.floor(local/5)),
  validation:VALIDATION,hasAudio:false,modelInferenceRun:false,newPrediction:false,perPixelAccuracyClaim:false};
}
