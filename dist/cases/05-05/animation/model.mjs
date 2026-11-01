// ForTy 2020 teaching animation. Source-bound facts, never pixel-wise inference.
export const WIDTH = 1600;
export const HEIGHT = 900;
export const DURATION = 120;
export const FPS = 24;
export const SOURCE = Object.freeze({
  paper: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13686961/',
  doi: 'https://doi.org/10.1038/s41597-026-08299-5',
  catalog: 'https://developers.google.com/earth-engine/datasets/catalog/projects_nature-trace_assets_forest_typology_forest_typology_2020_v1_0_collection',
  study: 'ForTy 2020 v1',
  targetYear: 2020,
  publicationYear: 2026,
  finalStageInputYears: Object.freeze([2019, 2020, 2021, 2022, 2023, 2024]),
  rotationProxyYears: 40,
  rotationProxyCaveat: '40年輪伐門檻是作者區分Planted與Plantation的操作代理，不是各地通用的生態定義。',
  confidenceCaveat: '模型分數未做事後機率校準，0.9不直接等於九成機率正確。',
  credit: 'Neumann et al.（2026），Fig. 3、5，CC BY 4.0；影像 © Google Earth、Maxar Technologies、Airbus',
});

export const CLASSES = Object.freeze([
  {id:'primary', short:'原生林', label:'原生林', english:'Primary Forest', f1:82.9, color:'#477642', example:'加拿大魁北克', description:'以原生樹種為主，沒有明顯人為干擾跡象。'},
  {id:'natreg', short:'自然再生林', label:'自然再生林', english:'Naturally Regenerating Forest', f1:72.6, color:'#92c387', example:'巴布亞紐幾內亞', description:'經干擾後，主要靠自然更新長回來的森林。'},
  {id:'planted', short:'人工栽植林', label:'人工栽植林', english:'Planted Forest', f1:58.2, color:'#5f93b3', example:'德國', description:'主要由人種植或播種；與集約經營人工林分為不同類別。'},
  {id:'plantation', short:'集約經營人工林', label:'集約經營人工林', english:'Plantation Forest', f1:66.7, color:'#c26da7', example:'智利比奧比奧', description:'多為少數樹種、相近樹齡與規律間距，經營週期較短。'},
  {id:'treecrop', short:'樹作物與農林混作', label:'樹作物與農林混作', english:'Tree Crops and Agroforestry', f1:62.1, color:'#c7b35a', example:'中國雲南西雙版納', description:'以作物生產為用途，例如橡膠、油棕、果樹或農林混作。'},
  {id:'other', short:'其他土地', label:'其他土地', english:'Other Land', f1:96.4, color:'#9a9c96', example:null, description:'其餘土地用途及不符本研究森林門檻的地表。'},
].map(Object.freeze));

export const VALIDATION = Object.freeze({
  total:9100, consensus:8190, unresolved:738, uncertain:172,
  totalSites:9100, consensusSites:8190, unresolvedSites:738, uncertainSites:172,
  oa:90.22, overallAccuracy:90.22, se:0.34, standardError:0.34,
  metric:'全球六類分層面積加權整體準確率',
  denominator:'8190個完成專家共識的獨立樣點',
  includesOtherLand:true,
  metricWarning:'整體準確率與類別F1是不同指標；全球結果不是澳洲示例的局部準確率。',
  expertMethod:'高解析影像、歷史觀測與輔助資料判讀；不全部等於現地量測。',
});

export const ASSETS = Object.freeze({figure3:'./assets/figure3.png', figure5:'./assets/figure5.webp'});
export const FIGURES = Object.freeze({
  figure3: Object.freeze({
    src:ASSETS.figure3, width:1600, height:735,
    location:'澳洲東南部', extentKm:Object.freeze([5,3.5]),
    scaleBarKm:1, sameLocation:true, sameDateComparison:false,
    paletteScope:'Colors are display swatches sampled from the published legend, not numerical classification data.',
    satellite:Object.freeze([0,0,533,366]),
    classification:Object.freeze([534,0,532,366]),
    uncertainty:Object.freeze([1067,0,533,366]),
    natregConfidence:Object.freeze([0,366,533,369]),
    plantationConfidence:Object.freeze([534,366,532,369]),
    otherConfidence:Object.freeze([1067,366,533,369]),
    caption:'同一區域的衛星影像與作者推估分類，不是前後年份或地面真值。',
  }),
  figure5: Object.freeze({
    src:ASSETS.figure5, width:1599, height:904, sameLocation:false,
    panels:Object.freeze({
      natreg:Object.freeze({rect:Object.freeze([0,0,529,451]),scaleBarMeters:600,location:'巴布亞紐幾內亞'}),
      primary:Object.freeze({rect:Object.freeze([534,0,535,904]),scaleBarMeters:200,location:'加拿大魁北克'}),
      planted:Object.freeze({rect:Object.freeze([1074,0,525,451]),scaleBarMeters:200,location:'德國'}),
      plantation:Object.freeze({rect:Object.freeze([0,455,529,449]),scaleBarMeters:200,location:'智利比奧比奧'}),
      treecrop:Object.freeze({rect:Object.freeze([1074,455,525,449]),scaleBarMeters:200,location:'中國雲南西雙版納'}),
    }),
    caption:'不同地點的類型示例，各自保留原比例尺；不作同尺度密度比較。',
  }),
});

export const CHAPTERS = Object.freeze([
  {id:'forests',start:0,end:18,label:'先認識林地',title:'同樣一片綠，裡面都是一樣的森林嗎？',copy:'自然長回來的森林、經營木材的人工林，以及樹作物農地，從空中看都可能是一片綠，形成過程和用途卻不同。',note:'研究圖5的異地示例。保留各自比例尺，不是同一片森林的前後變化。'},
  {id:'question',start:18,end:32,label:'一片綠還不夠',title:'看見樹，還不能確定這片土地怎麼被利用',copy:'進入澳洲東南部的同一區域。道路和林地邊界提供位置參照；真正的類型還牽涉過往干擾和經營歷史。',note:'研究圖3衛星面板；範圍5公里×3.5公里。沒有由圖片反推地面真值。'},
  {id:'evidence',start:32,end:60,label:'AI根據什麼',title:'把多年觀測和已知例子一起看',copy:'AlphaEarth先整理多來源、多期衛星特徵。ForTy從可靠例子學習，再擴大資料、加入多年觀測資訊，推估六種森林與土地利用類型。',note:'訓練與年份列是方法示意，不是本輪執行模型，也不聲稱圖5照片就是實際訓練樣本。'},
  {id:'classification',start:60,end:83,label:'同位置的判讀',title:'同一片地表，顯示出不同的林地類型',copy:'把衛星影像與作者的分類結果對齊。自然再生林、集約經營人工林等類型有了不同標示；這是模型推估，不是換了一個年份。',note:'研究圖3作者推估分類。完整六類保留，沒有從PNG顏色計算面積或像元分數。'},
  {id:'validation',start:83,end:105,label:'結果怎麼核對',title:'全球整體表現不等於每一類都一樣好分',copy:'獨立驗證以8190個完成專家共識的樣點估計精度。全球六類整體準確率為90.22%，包含其他土地；人工栽植林仍比較難分。',note:'來源為論文Table 5、7。738點未完成共識、172點不確定而排除；F1與整體準確率不同。'},
  {id:'conclusion',start:105,end:120,label:'回到這片森林',title:'先分清森林類型，再討論如何利用與保護',copy:'ForTy讓「哪裡有樹」接上「這片樹可能屬於哪種林地」。它提供一致的判讀起點，難分的地方仍須核對經營歷史與參考資料。',note:'2020基線；10公尺是輸出網格，不是誤差保證。森林類型不直接等於碳量或生物多樣性。'},
].map(Object.freeze));

// Aliases keep scene and player code explicit without coupling them to a UI framework.
export const PHASES = CHAPTERS;
export const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
export const interval=(t,start,end)=>clamp((t-start)/(end-start));
export const lerp=(a,b,p)=>a+(b-a)*p;
export function getSceneState(value,options={}) {
  const numeric=Number(value);
  const time=clamp(Number.isFinite(numeric)?numeric:0,0,DURATION);
  const index=Math.max(0,CHAPTERS.findLastIndex(chapter=>time>=chapter.start));
  const chapter=CHAPTERS[index];
  const progress=interval(time,chapter.start,chapter.end);
  return {
    time,duration:DURATION,chapterIndex:index,chapterId:chapter.id,chapter,
    phase:index,phaseId:chapter.id,phaseProgress:progress,chapterProgress:progress,
    reducedMotion:!!options.reducedMotion,compact:!!options.compact,
    hasAudio:false,modelInferenceRun:false,figure3SameLocation:true,
    figure5DifferentLocations:true,comparisonIsTemporal:false,
    trainingSchematic:time>=32&&time<60,
    classificationVisible:time>=60,validationVisible:time>=83,
    conclusionVisible:time>=105,classes:CLASSES,validation:VALIDATION,
  };
}
export const stateAt=getSceneState;
