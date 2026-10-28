export const DURATION=96;
export const EXPORT_SIZE={width:1600,height:900};
export const ASSETS={context:{file:'assets/leaf-context.png',width:1672,height:941},density:{file:'assets/observation-density.png',width:4710,height:1615},traits:{file:'assets/trait-maps.png',width:1956,height:2811},transfer:{file:'assets/spatial-transfer.png',width:2757,height:2553}};
export const PHASES=[
 {id:'leaves',start:0,end:12,label:'先看葉子',title:'同樣是葉子，大小差很多。',copy:'做植物調查，不只認物種，也會量葉片大小。這個研究想知道：一個地方常見植物的葉子，平均大約有多大？',note:'開場為生成情境示意，不是研究樣區，也沒有量出圖中葉片的面積。'},
 {id:'community',start:12,end:30,label:'一地植物的平均',title:'占比改變，平均值也會變。',copy:'研究先整理各物種的平均葉面積，再依它們在樣區內的相對覆蓋度加權。覆蓋比例較高的植物，對這個地方的平均特徵影響較大。',note:'這叫群聚加權平均（CWM）。畫面的比例只是教學示意；平均葉片大小也不等於整片地面的葉面積總和。'},
 {id:'coverage',start:30,end:44,label:'哪些地方有資料',title:'哪些地方，還缺調查資料？',copy:'調查樣區提供植物組成與覆蓋度；GBIF彙整的公民觀察及其他出現紀錄，則補到更多地方。觀察紀錄的頻率只能近似植物組成，不能當作實際株數。',note:'兩張作者原圖的色條範圍不同，顏色不能直接比密度。紀錄少，也不代表當地植物少。'},
 {id:'predict',start:44,end:62,label:'推估沒有量到的地方',title:'沒調查的地方，怎麼估？',copy:'LightGBM從已有資料的地點，學習氣候、土壤與遙測訊號和植物特徵的關係，再推估其他地區。這張作者地圖裡，顏色越亮，預測的群聚平均葉面積越大。',note:'這裡只放大美洲局部，保留該區原色條與mm²單位。這是作者的預測，不是逐片葉子的實測。'},
 {id:'scope',start:62,end:78,label:'模型能用在哪裡',title:'環境差太多，就要小心。',copy:'模型遇到和訓練資料差很多的環境，推估可能不穩。作者用適用範圍（AOA）描述這種差異。加入植物出現紀錄後，整體可適用的範圍更廣。',note:'這是多種性狀的彙總比較，不是葉面積專屬圖。範圍外不等於沒有植物；範圍內也不保證每個預測都準。'},
 {id:'results',start:78,end:96,label:'換個地區檢查',title:'換一批地區，還估得準嗎？',copy:'研究把一部分地區的樣區留著，不拿來訓練，再用它們檢查預測。在原文標示的1 km²尺度，31項性狀有15項的相關係數達0.5以上，表現因性狀而異。',note:'這是五折空間交叉驗證，參考值也是樣區的群聚平均。相關係數不是量對幾成；使用前仍要看該性狀的驗證結果與適用範圍。'}
];
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const smooth=v=>{const x=clamp(v);return x*x*(3-2*x);};
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
export const clockText=v=>{const t=Math.floor(clamp(v,0,DURATION));return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;};
export function validateSource(d){
 if(d?.caseId!=='04-04'||d.modelInferenceRun!==false||d.reportedTraitValue!==null||d.conceptualWeightsOnly!==true)throw Error('載入的資料與這段示範不符。');
 if(d.results?.traits!==31||d.results.aboveThreshold!==15||d.results.threshold!==.5||d.results.metric!=='Pearson r')throw Error('研究結果與來源不符。');
 for(const [key,limit]of[['leafMap',[1956,2811]],['leafRegion',[1956,2811]],['leafRegionCompact',[1956,2811]],['leafLegend',[1956,2811]],['scopePanel',[2757,2553]]]){
  const b=d.windows?.[key];if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<0||b[1]<0||b[2]<=0||b[3]<=0||b[0]+b[2]>limit[0]||b[1]+b[3]>limit[1])throw Error('圖版的顯示範圍資料不完整。');
 }
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 let leafCamera=[0,0,1672,941],weight=.75,citizenOpacity=0,mapCamera=(data?.windows.leafMap||[1301,1436,307,1345]).slice(),resultReveal=0;
 if(phase===0&&!reducedMotion)leafCamera=mix(leafCamera,[65,35,1542,867],smooth(local/12));
 if(phase===1)weight=reducedMotion?.75:.75-.5*smooth((local-4)/10);
 if(phase===2)citizenOpacity=reducedMotion?1:smooth((local-5)/3);
 if(phase===3)mapCamera=mix(mapCamera,compact?(data?.windows.leafRegionCompact||[1301,1690,307,550]):(data?.windows.leafRegion||[1301,1920,307,288]),reducedMotion?1:smooth(local/5));
 if(phase===5)resultReveal=reducedMotion?1:smooth(local/4);
 return {time,duration:DURATION,phase,phaseId:PHASES[phase].id,local,leafCamera,mapCamera,exampleWeightA:weight,exampleWeightB:1-weight,citizenOpacity,resultReveal,
  modelInferenceRun:false,reportedTraitValue:null,conceptualWeightsOnly:true,generatedContext:true,hasAudio:false,reducedMotion,compact,exportMode};
}
