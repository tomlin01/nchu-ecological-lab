export const DURATION = 130;
export const PHASES = [
 {id:'habitat',start:0,end:14,label:'清晨的燕群',title:'鳥群每天飛出，整季的紀錄怎麼估？',copy:'美國五大湖周邊，有些燕科鳥類會聚在一起過夜。清晨，鳥群離開棲地覓食，天氣雷達也可能記錄到牠們向外散開的訊號。',note:'棲地照片為AI生成情境。畫面不指定單一物種，也不是原研究現場。'},
 {id:'radar',start:14,end:30,label:'雷達看到什麼',title:'雷達上的環，來自向外飛散的鳥群',copy:'連續掃描中的環狀訊號，能幫研究者找到鳥群離開棲地的過程。電腦先找出並追蹤這些訊號，再由雷達反射率換算計數；一個亮點並不等於一隻鳥。',note:'這是訊號形成的概念示意。人工參考計數也來自雷達資料，不是現場逐隻清點。'},
 {id:'archive',start:30,end:44,label:'電腦也會數錯',title:'資料很多，但電腦的計數不能直接照單全收',copy:'作者公開的KBUF雷達站2010年資料中，自動計數與人工覆核後的參考計數仍有差異。研究利用12座雷達站、約20年的資料，檢查能否少覆核一些天，仍估出整季的累積計數。',note:'圖線依作者公開的92個日序值重畫，沒有重新執行偵測模型。每個站點與年份分開估計。'},
 {id:'proposal',start:44,end:62,label:'每一天都有機會',title:'先讓預估較多的日子，有較高機率被抽到',copy:'先看四天的教學範例。電腦預估分別為10、20、30、40，抽樣機率就設為10%、20%、30%、40%。這是依已知機率抽樣，不是直接挑最大的幾天。',note:'數字為教學用計數單位。每一天都有非零機率；真實應用不能把可能有鳥的日子排除。'},
 {id:'screen',start:62,end:80,label:'抽到才人工覆核',title:'同一天可以重抽，已做的覆核可以沿用',copy:'一次可能的抽樣依序是D、B、D、C。人工參考計數為44、18、44、36。D雖然出現兩次，只需覆核一次；計算估計值時，仍保留四次抽取。',note:'這是有放回抽樣的一個可能結果。四次抽取、三個不同日子，不是四個獨立的實際覆核工作。'},
 {id:'estimate',start:80,end:99,label:'把抽樣機率算回去',title:'被抽到的機率不同，不能直接取平均',copy:'先算每次的「人工參考計數 ÷ 電腦預估」。四次比值平均為1.075，再乘整批電腦總量100，得到107.5。這是估計值；範例中四天全部覆核後的總量是110。',note:'這是DISCount的單一集合估計。抽樣機率與加權必須配套，不能只挑高計數日再直接平均。'},
 {id:'variation',start:99,end:114,label:'一次仍可能有誤差',title:'換一組抽樣，估計值也會改變',copy:'四天各抽四次，共有256種順序。把所有可能結果按機率加權，DISCount的平均估計等於已知總量110。單次結果仍可偏高或偏低；這組範例的估計分布比均勻抽樣集中。',note:'圖為教學範例的完整枚舉，不是論文實驗、模擬跑分或95%信賴區間。集中程度取決於電腦計數是否有幫助。'},
 {id:'results',start:114,end:130,label:'研究得到什麼',title:'少覆核一些天，也能改善整季總量的估計',copy:'論文鳥群實驗中，達平均相對誤差20%時，DISCount需要覆核的抽樣日約為均勻隨機抽樣的三分之一。這是1000次試驗的平均結果；研究的95%信賴區間仍有涵蓋不足的問題。',note:'累積計數可能重複包含不同天的同一批鳥，不能解作整區不重複的鳥隻總數。結果不保證每次估計都在20%誤差內。'}
];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const interval=(t,a,b)=>clamp((t-a)/(b-a));
export const DAYS=Object.freeze([{id:'A',g:10,f:12,q:.1},{id:'B',g:20,f:18,q:.2},{id:'C',g:30,f:36,q:.3},{id:'D',g:40,f:44,q:.4}].map(Object.freeze));
export const DRAW_ORDER=Object.freeze(['D','B','D','C']);
export function stateAt(value,options={}) {
 const time=clamp(Number(value)||0,0,DURATION), phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),p=PHASES[phase];
 const drawCount=time<64?0:Math.min(4,Math.floor((time-64)/3.5)+1), order=DRAW_ORDER.slice(0,drawCount);
 return {time,duration:DURATION,phase,phaseId:p.id,phaseProgress:interval(time,p.start,p.end),reducedMotion:!!options.reducedMotion,compact:!!options.compact,
  drawCount,drawOrder:[...DRAW_ORDER],visibleDraws:order,uniqueDayCount:new Set(order).size,proposalVisible:time>=49,referenceVisible:time>=64,estimateVisible:time>=85,truthVisible:time>=93,
  estimate:107.5,knownToyTotal:110,detectorToyTotal:100,meanRatio:1.075,samplingWithReplacement:true,toy:true,modelInferenceRun:false,generatedContext:true,hasAudio:false,
  conclusionVisible:time>=122,narrative:{}};
}
