export const DURATION=120;
export const PHASES=[
 {id:'lake',start:0,end:18,label:'湖裡正在發生什麼',title:'湖裡的藍綠藻，幾週後會變多嗎？',copy:'藍綠藻也叫藍綠菌。大量增生時，水面可能出現水華；但只看今天的湖面，還不知道幾週後會怎麼變。',note:'湖泊、浮標與水華均為三維概念場景；不是研究現場的紀錄。'},
 {id:'measurement',start:18,end:38,label:'量到現在',title:'探頭量到的，是現在的水況',copy:'水下探頭取得水溫與藍綠藻相關的色素訊號。持續累積的紀錄，讓模型有資料可以學習。',note:'色素訊號不是毒素濃度，也不是直接清點藍綠藻；圖中曲線是教學示意。'},
 {id:'device',start:38,end:65,label:'把模型放進裝置',title:'先在電腦訓練，再放進小型裝置',copy:'研究先訓練淺層LSTM，再把模型量化，改用較省空間的數值表示，最後放進微控制器。裝置執行已訓練的模型。',note:'電路板、網路與數值都是原理示意；不代表特定晶片、位元數或壓縮比例。'},
 {id:'forecast',start:65,end:92,label:'推估幾週以後',title:'量測停在現在，預測往前看',copy:'研究比較16、20、24、28天四個預測期。動畫用四個時間點說明這件事；它們是估計，不是已量到的未來資料。',note:'所有曲線與點位都是概念示意；不是作者的量測、預測值或誤差結果。'},
 {id:'check',start:92,end:106,label:'等量測來核對',title:'時間到了，再和實際量測比較',copy:'預測之後，仍要用後來的量測核對誤差。原研究使用MAPE評估；這裡只說明比較方式，不提供虛構的績效分數。',note:'此段為教學對照；色素訊號的預測不能直接當作飲水安全判斷或警報。'},
 {id:'ending',start:106,end:120,label:'提早準備',title:'讓監測端先推估，讓研究者提早準備',copy:'這項研究把量化後的模型放進微控制器，展示小型監測裝置也能提供數週後的估計。長期現場表現與預警成效，仍需要進一步驗證。',note:'研究成果是內嵌預測原型；不是已完成長期驗證的水華預警系統。'}
];
export const HORIZONS=Object.freeze([16,20,24,28]);
export const HISTORY=Object.freeze([.29,.34,.28,.32,.41,.46,.40,.44,.38,.43,.51,.47,.45,.49,.46]);
export const FORECAST=Object.freeze([.61,.69,.64,.73]);
export const LATER=Object.freeze([.57,.74,.69,.67]);
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const interval=(t,a,b)=>clamp((t-a)/(b-a));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
export function stateAt(value,options={}){
 const time=clamp(Number(value)||0,0,DURATION);
 const phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),p=PHASES[phase];
 const deviceStep=time<47?0:time<57?1:2;
 return {time,duration:DURATION,phase,phaseId:p.id,phaseProgress:interval(time,p.start,p.end),
  reducedMotion:Boolean(options.reducedMotion),compact:Boolean(options.compact),
  viewportMode:phase===0||phase===5?'full':phase<3?'right':'left',
  boardOpen:phase===2?smooth(interval(time,40,45)):0,
  boardFocus:phase===2?smooth(interval(time,40,46)):0,
  cutaway:phase===1?smooth(interval(time,18,23)):0,
  cameraProgress:interval(time,p.start,p.end),
  historyProgress:interval(time,19,30),deviceStep,
  forecastCount:phase>=4?4:Math.min(4,Math.floor(interval(time,69,84)*4.999)),
  laterCount:phase>=5?4:phase===4?Math.min(4,Math.floor(interval(time,93,101)*4.999)):0,
  horizons:[...HORIZONS],history:[...HISTORY],forecast:[...FORECAST],later:[...LATER],
  conceptualData:true,forecastModelRun:false,rawResearchDataLoaded:false,proxy:'phycocyanin-related-signal',
  conclusion:PHASES[5].title,hasAudio:false,
  narrative:phase===2?{title:['先在電腦上，學習過去的變化','量化：把數值存得更精簡','裝置使用已訓練好的模型'][deviceStep]}:{}
 };
}
