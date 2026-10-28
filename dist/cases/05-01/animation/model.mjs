export const DURATION=100;
export const EXPORT_SIZE={width:1600,height:900};
export const ASSETS={figure:{file:'assets/figure7.png',width:2614,height:1144}};
export const PHASES=[
 {id:'photo',start:0,end:12,label:'從上方看樹冠',title:'看得見樹冠，還不知道樹高。',copy:'從衛星照片看，綠色一團團地散在空地上。它們是樹的冠頂。但只看這張照片，怎麼知道它們離地面多高？',note:'衛星照片取自作者 Figure 7；後面會回到同一個地點。'},
 {id:'height',start:12,end:24,label:'高度怎麼量',title:'要量的是地面到冠頂。',copy:'從側面看就清楚了：樹冠高度是地面到冠頂的垂直距離。航空光達用雷射取得地面和冠頂的高程，兩者相減，便能提供高度參考。',note:'這是高度關係示意，不代表開場地點的實測結果。'},
 {id:'learn',start:24,end:42,label:'讓照片和高度接起來',title:'照片裡的線索，要向量測資料學。',copy:'模型先從沒有高度標籤的照片學習形狀與紋理，再用衛星照片和航空光達高度資料的配對，學習預測高度。',note:'先學影像特徵，再學預測高度。畫面的配對只用來說明這個關係。'},
 {id:'gedi',start:42,end:56,label:'再用 GEDI 調整',title:'另一組雷射觀測，幫助調整估計。',copy:'研究者另用太空光達 GEDI 的觀測訓練一個模型。它從照片估計高度，再用來調整前一個模型的細緻高度圖。',note:'GEDI 沒有直接量遍每一格；這個調整也不保證各地的誤差都會降低。'},
 {id:'compare',start:56,end:74,label:'同一片地，三張高度圖',title:'零散的樹冠，能分得更清楚。',copy:'回到同一片地。照片裡的樹冠，在作者高度圖中仍有清楚的分布。和較粗的地圖對照，小樹冠與樹間空地更容易分開看。',note:'三張高度圖使用相同的 0–20 公尺色階。這能比較空間細節，還不能證明每棵樹都估得準。'},
 {id:'test',start:74,end:90,label:'拿量測資料檢查',title:'換一組資料，誤差也不同。',copy:'研究者用保留的測試資料，把估計高度和光達參考值逐格比較。三組資料的平均絕對誤差不同，表示同一方法的表現會隨資料而變。',note:'平均絕對誤差：每格估計值與參考值的差距取絕對值，再取平均。這不是逐棵樹的誤差，也不是全球精度。'},
 {id:'conclude',start:90,end:100,label:'細緻，也要確認準確',title:'照片能估樹高，仍要靠量測檢查。',copy:'向光達資料學習後，模型能把照片裡的線索轉成高度估計。細緻地圖讓零散樹冠更容易被看見；估得準不準，仍須拿當地量測資料確認。',note:'2024 全球產品的網格為一公尺；這和高度誤差是兩件事。影像來自 2009–2020 年，並非同一天的全球森林。'}
];
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const smooth=v=>{const x=clamp(v);return x*x*(3-2*x);};
export const clockText=v=>{const t=Math.floor(clamp(v,0,DURATION));return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;};
export function validateSource(d){
 if(d?.caseId!=='05-01'||d.modelInferenceRun!==false||d.rawALSLoaded!==false)throw Error('來源資料與這段動畫不符。');
 if(d.results?.model!=='SSL + GEDI'||JSON.stringify(d.results.rows)!==JSON.stringify([{dataset:'NEON test',mae:2.7},{dataset:'CA-Brande',mae:.6},{dataset:'São Paulo',mae:5.1}]))throw Error('驗證數字與論文不符。');
 for(const key of ['photo','model','lang','potapov','legend']){
  const b=d.windows?.[key];if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<0||b[1]<0||b[2]<=0||b[3]<=0||b[0]+b[2]>2614||b[1]+b[3]>1144)throw Error('原圖顯示範圍不完整。');
 }
 if(d.globalProduct?.gridMetres!==1||d.globalProduct.imageYears?.join('–')!=='2009–2020')throw Error('全球產品資訊不符。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const reveal=(start,duration)=>reducedMotion?1:smooth((local-start)/duration);
 return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,reducedMotion,compact,exportMode,
  photoFocus:reveal(3,4),heightReveal:reveal(1,4),learningStep:local>=8?1:0,learningReveal:reveal(local>=8?8:0,2.5),
  gediReveal:reveal(3,5),compareMode:local<7?'wipe':local<12?'lang':'potapov',wipe:reveal(1,4),
  resultRows:reducedMotion?3:Math.min(3,1+Math.floor(local/3)),
  modelInferenceRun:false,rawALSLoaded:false,perTreeHeight:null,hasAudio:false};
}
