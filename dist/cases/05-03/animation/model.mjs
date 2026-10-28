export const DURATION=116;
export const PHASES=[
 {id:'meadow',start:0,end:12,label:'海中的草地',title:'海底，也長著一片草地。',copy:'海草有真正的根、莖和葉，也會開花。許多植株連在一起，形成海草床，提供海中生物棲身的地方。',note:'實拍用來認識海草；不是後面比較地點的前後紀錄。'},
 {id:'scale',start:12,end:24,label:'看的是一片範圍',title:'放大地圖，不等於多看見了細節。',copy:'研究用約10公尺的網格標示海草範圍。把同一小塊放大，能看清分類格子，但不能藉此辨認每株海草或每片葉子。',note:'局部圖為原資料40×40格，放大時沒有補出新細節。'},
 {id:'compare',start:24,end:46,label:'同一海灣，兩個時期',title:'位置不動，只換一個時期。',copy:'固定相同範圍，比較2019–2020與2023–2024的公開海草標示。看看哪些地方兩期都有，哪些只在其中一期出現。',note:'地圖空白是無資料值，不能直接當成現地完全沒有海草。'},
 {id:'learning',start:46,end:66,label:'電腦怎麼辨認',title:'不只看綠色，也看周圍的線索。',copy:'模型向參考標記學習，結合周圍影像紋理、中心位置的影像特徵與推估水深，判斷海草範圍。研究再用獨立資料檢查分類。',note:'方法示意；本動畫沒有重新執行模型或產生信心分數。'},
 {id:'change',start:66,end:84,label:'範圍和疏密不同',title:'少了一片，和變稀了，是兩件事。',copy:'範圍變動描述哪裡標示為海草。覆蓋變稀則是海草仍在，但鋪滿海床的程度改變。研究在熱帶地區另分析密集與稀疏覆蓋。',note:'公開範圍圖不能直接讀出疏密；疏密畫面是概念示意。'},
 {id:'results',start:84,end:104,label:'研究看見什麼',title:'有些地方新增，整體仍淨減少。',copy:'作者報告，兩期相比，清澈淺海的海草總面積淨減少約5,969平方公里。淨減少已扣掉新增，不是所有消失斑塊的總和。',note:'2019–2020與2023–2024兩期比較，不是每年減少同樣的面積。'},
 {id:'ending',start:104,end:116,label:'接著去哪裡調查',title:'先找到改變，再追問原因。',copy:'兩期地圖讓人看見海草標示範圍的差異，也能提示值得複查的地方。是否真的消失、為什麼改變，仍需要其他觀測。',note:'研究範圍限於可判讀的清澈淺海；分類圖不是完整現地普查。'}
];
export const ASSETS={context:{file:'assets/context/seagrass.jpg'},before:{file:'assets/maps/tampa-before.png'},after:{file:'assets/maps/tampa-after.png'},difference:{file:'assets/maps/tampa-difference.png'},detail:{file:'assets/maps/tampa-detail-before.png'},detailDifference:{file:'assets/maps/tampa-detail-difference.png'}};
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number.isFinite(v)?v:a));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
export function validateSource(d){
 if(d?.caseId!=='05-03'||d.modelInferenceRun!==false)throw Error('來源資料與本案不符。');
 if(d.results?.baselineKm2!==148506||d.results.netLossKm2!==5969||d.results.denseToSparseKm2!==6221||d.results.netLossKind!=='net'||d.results.denseToSparseScope!=='tropical')throw Error('研究結果或適用範圍與來源不符。');
 if(JSON.stringify(d.periods)!==JSON.stringify(['2019–2020','2023–2024']))throw Error('兩期日期資料不符。');
 for(const key of Object.keys(ASSETS)){const a=d.assets?.[key];if(!a||!Number.isInteger(a.width)||!Number.isInteger(a.height)||a.width<1||a.height<1)throw Error('圖片尺寸資料不完整。');}
 if(d.assets.before.width!==d.assets.after.width||d.assets.before.height!==d.assets.after.height||d.assets.before.width!==d.assets.difference.width||d.assets.before.height!==d.assets.difference.height)throw Error('兩期地圖必須使用相同範圍與尺寸。');
 if(d.region?.presenceOnly!==true||d.region?.commonValidMaskAvailable!==false)throw Error('海草標示與無資料的界線未正確記錄。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const mapMode=local<7?'before':local<14?'after':'difference';
 let narrative={...PHASES[phase]};
 if(phase===2&&mapMode==='difference')narrative={title:'兩期都有的，和只出現一期的。',copy:'疊在一起看，能找到兩期共有、前期獨有與後期獨有的標示。這裡呈現公開資料的差異，還不能把空白直接判作海草死亡。',note:'相同座標範圍與網格；不把無資料值改成非海草。'};
 if(phase===3&&local>=13)narrative={title:'分完之後，還要拿參考資料檢查。',copy:'模型可能漏掉海草，也可能把其他海床誤認為海草。研究以獨立參考資料評估；分類表現與變化判定的可靠度，仍是不同問題。',note:'不能把分類正確率當作每個位置的信心，或直接當作變化正確率。'};
 if(phase===4&&local<9)narrative={title:'局部有增有減，整體要一起算。',copy:'有些位置只在前期圖上標示，有些只在後期出現。判讀整體面積變動時，新增與減少都要納入。',note:'局部圖只呈現公開標示範圍；沒有計算現地海草的流失面積。'};
 if(phase===4&&local>=9)narrative={title:'海草還在，也可能變得比較稀。',copy:'研究在熱帶另區分密集與稀疏覆蓋。從密集轉為稀疏，不等於整片海草床完全消失。',note:'疏密為概念示意，未表示植株數、精確覆蓋率或特定地點觀測。'};
 if(phase===5&&local>=10)narrative={title:'另有一批海草床，從密集轉稀疏。',copy:'作者另報告，熱帶地區約6,221平方公里從密集覆蓋轉為稀疏。它仍屬海草，不能和淨減少直接相加成完全消失面積。',note:'6,221是單方向轉疏面積，沒有扣掉另一方向變密的面積。'};
 return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,narrative,reducedMotion,compact,exportMode,
  photoScale:reducedMotion?1:1.045-.045*smooth(local/12),scaleReveal:reducedMotion?1:smooth(local/4),
  mapMode,learningMode:local<13?'inputs':'check',inputReveal:reducedMotion?1:smooth(local/7),
  changeMode:local<9?'extent':'cover',coverProgress:reducedMotion?1:smooth((local-10)/5),resultMode:local<10?'net':'sparse',
  hasAudio:false,modelInferenceRun:false,perPointConfidence:null,region:data?.region||null};
}
