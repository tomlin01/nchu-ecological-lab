export const DURATION=130;
export const PHASES=[
 {id:'habitat',start:0,end:18,label:'虎頭蜂與文字線索',title:'讀到虎頭蜂的新聞，就知道牠在哪裡嗎？',copy:'想知道外來物種在哪些地區出現，線索可能散在報導與論文短文裡。這一案先從黃腳虎頭蜂開始，再看文字能提供什麼。',note:'昆蟲與環境為AI生成概念圖，不是研究現場照片、新出現證據或物種鑑定。'},
 {id:'report',start:18,end:38,label:'讀同一段報導',title:'先讀內容：報導了什麼，又在哪裡？',copy:'論文Table 2提供一個新聞文字例，提到外來虎頭蜂首次在澤西島被發現。研究已指定目標物種；模型要判讀是否有符合要求的出現報導。',note:'這是Table 2中文轉述與預期示例，不是本次模型回覆；未加新聞品牌、發布日期或原新聞網址。'},
 {id:'meaning',start:38,end:60,label:'出現與可能不同',title:'已報導出現，和未來可能適合，是兩件事',copy:'兩段話都提到虎頭蜂和地區，提供的證據卻不同。實際出現與潛在分布要分開；仍需讀上下文，間接描述也可能支持出現紀錄。',note:'左側為Table 2中文轉述，右側為教學改寫；不能把所有間接提及一律判成沒有紀錄。'},
 {id:'record',start:60,end:82,label:'整理可回查的欄位',title:'從同一段原句，整理地區線索',copy:'Table 2的預期結果包含YES、Jersey Island及區域地理編碼。欄位可指回同一段文字，供研究者回查；這不是新增的野外觀察。',note:'欄位是論文預期示例，沒有實際呼叫模型。物種已由題目指定，來源標籤是講解資訊。'},
 {id:'region',start:82,end:106,label:'地區不等於採樣點',title:'六位小數，也不代表找到採樣點',copy:'研究的座標評分只要求落在報導區域內。這段文字談的是澤西島，因此先突出整座島；不能把區域地理編碼當作實際發現位置。',note:'陰影表示報導地區，不表示整座島都有虎頭蜂。地圖沒有發現位置圖釘，邊界來自Natural Earth。'},
 {id:'results',start:106,end:130,label:'研究結果與回查',title:'能整理報導地區，仍要核對內容與尺度',copy:'當時GPT-4在150筆黃腳虎頭蜂新聞短文的文件分類上，正確率為92.7%。這只評估是否有符合要求的紀錄，不能當成所有欄位都正確或精準定位率。',note:'測試為2023年12月11日至2024年1月3日；新聞標題／簡短說明，部分僅有標題。不是現在模型的效能。'}
];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const interval=(t,a,b)=>clamp((t-a)/(b-a));
export const EXPECTED=Object.freeze({kind:'paper-expected-example',classification:'YES',region:'Jersey Island',latitude:'49.214439',longitude:'−2.131250',source:'Castro et al. (2024), Table 2',targetSpecies:'Vespa velutina',targetSpeciesGiven:true,modelRun:false,fieldOccurrenceConfirmed:false,preciseSightingKnown:false});
export const DATASET=Object.freeze([{id:'mosquito-news',species:'白線斑蚊',source:'新聞短文',n:150},{id:'mosquito-papers',species:'白線斑蚊',source:'論文短文',n:150},{id:'hornet-news',species:'黃腳虎頭蜂',source:'新聞短文',n:150},{id:'hornet-papers',species:'黃腳虎頭蜂',source:'論文短文',n:150}].map(Object.freeze));
export const METRIC=Object.freeze({model:'GPT-4',species:'Vespa velutina',source:'news title/description',task:'document classification',n:150,accuracyPercent:92.7,testStart:'2023-12-11',testEnd:'2024-01-03',endToEnd:false,currentModelBenchmark:false});
export const CONCLUSION='能整理出報導地區，精確位置仍要另找證據';
export function stateAt(value,options={}){const time=clamp(Number(value)||0,0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),p=PHASES[phase];return {time,duration:DURATION,phase,phaseId:p.id,phaseProgress:interval(time,p.start,p.end),reducedMotion:!!options.reducedMotion,compact:!!options.compact,reportHighlight:time<25?'region':'occurrence',semanticProgress:interval(time,42,48),recordStep:time<64?0:time<69?1:time<75?2:3,expected:{...EXPECTED},region:{name:'Jersey Island',geometryType:'Polygon',markerCount:0,coordinateKind:'regional-geocode-not-sighting',wholeAreaPresenceConfirmed:false,highlightProgress:interval(time,83,89)},dataset:DATASET.map(r=>({...r})),metric:{...METRIC},metricVisible:time>=112,conclusionVisible:time>=119,modelInferenceRun:false,generatedContext:true,hasAudio:false,conclusion:CONCLUSION,narrative:{}};}
