export const DURATION=118;
export const EXPORT_SIZE={width:1600,height:900};
export const ASSETS={concept:{file:'../assets/05-02-reef-hero-v09.webp'},overview:{file:'../assets/05-02-reef-overview-v09.webp'},geomorphic:{file:'../assets/reef-map-geomorphic.png'},benthic:{file:'../assets/reef-map-benthic.png'}};
export const PHASES=[
 {id:'habitat',start:0,end:20,label:'先看看海床',title:'珊瑚礁裡，都是珊瑚嗎？',copy:'同樣是一片珊瑚礁，海床可能有珊瑚，也可能是岩石、沙地或海草。要描述這片環境，光知道礁區的範圍還不夠。',note:'概念礁區，不是 Abaiang 的實測地形。'},
 {id:'questions',start:20,end:36,label:'分清兩個問題',title:'礁體的哪個部位？\n海床主要是什麼？',copy:'較平坦的礁坪、向外海下降的礁坡，是地貌的差別。沙地、岩石或珊瑚與藻類，則描述海床主要由什麼構成或覆蓋。',note:'這兩個問題需要不同的分類。同一種地貌，也可能有不同的底質。'},
 {id:'maps',start:36,end:56,label:'相同位置，兩種分類',title:'相同的位置，讀出兩個答案。',copy:'到 Abaiang 環礁的實際地圖上看。這個位置的地貌分類是「外礁坪」，主要底質則是「岩石」。兩張圖描述相同區域的不同特徵。',note:'標記只是閱讀用的定位點。類別來自 Atlas 公布的圖資，不是這次現地量測的結果。'},
 {id:'making',start:56,end:82,label:'模型之外，還要檢查',title:'先用資料分類，再看周圍環境。',copy:'隨機森林結合衛星影像、推估水深、波浪等線索，以及專家整理的參考類別，先做分類。研究者再用地貌規則與人工判讀修訂地圖。',note:'畫面中的規則示意依研究方法設計，不是 Abaiang 某個位置實際發生的分類錯誤。'},
 {id:'limits',start:82,end:98,label:'地圖也有看不清楚的地方',title:'分類名稱，不等於看清每一種生物。',copy:'珊瑚和藻類在這類衛星影像中的訊號很相近，因此合併為「珊瑚／藻類」。水越深或越混濁，也越難看清海床。',note:'未製圖不代表沒有珊瑚。這兩張棲地分類圖也不能直接判斷活珊瑚覆蓋或健康狀況。'},
 {id:'validation',start:98,end:110,label:'拿參考資料驗證',title:'地圖畫完，還要比對參考資料。',copy:'作者用另外保留的參考資料檢查最終地圖。30 個製圖區的平均整體正確率，地貌為 69%，底質為 66%；不同地區的表現仍有差異。',note:'這是修訂後地圖的驗證結果，不是定位點的信心分數。5 公尺網格，也不代表每個地方都分類正確。'},
 {id:'ending',start:110,end:118,label:'地圖能回答什麼',title:'先認識環境，再判斷要去哪裡調查。',copy:'這套地圖把淺水珊瑚礁的地貌與主要底質分開整理，讓不同地區有一致的比較依據。哪裡有多少活珊瑚、珊瑚是否健康，仍要另外調查。',note:'「外礁坪」說明地形部位，「岩石」說明主要底質；兩個答案各有用途。'}
];
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const smooth=v=>{const x=clamp(v);return x*x*(3-2*x);};
export const clockText=v=>{const t=Math.floor(clamp(v,0,DURATION));return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;};
export function validateSource(d){
 if(d?.caseId!=='05-02'||d.modelInferenceRun!==false||d.conceptualScene!==true)throw Error('來源資料與這段動畫不符。');
 if(d.results?.geomorphic!==69||d.results.benthic!==66||d.results.regions!==30)throw Error('驗證數字與來源不符。');
 if(d.anchor?.geomorphic!=='Outer Reef Flat'||d.anchor.benthic!=='Rock'||Math.abs(d.anchor.lon-172.86525)>1e-8||Math.abs(d.anchor.lat-1.86975)>1e-8)throw Error('定位點與來源核對不符。');
 if(![d.anchor.x,d.anchor.y].every(n=>Number.isFinite(n)&&n>0&&n<1))throw Error('地圖定位資料不完整。');
 for(const key of Object.keys(ASSETS)){const a=d.assets?.[key];if(!a||!Number.isInteger(a.width)||!Number.isInteger(a.height)||a.width<=0||a.height<=0)throw Error('圖片尺寸資料不完整。');}
 if(d.assets.geomorphic.width!==d.assets.benthic.width||d.assets.geomorphic.height!==d.assets.benthic.height)throw Error('兩張地圖必須使用相同範圍與尺寸。');
 if(d.scaleBar?.metres!==5000||!Number.isFinite(d.scaleBar.normalizedLength)||d.scaleBar.normalizedLength<=0||d.scaleBar.normalizedLength>=.3)throw Error('地圖比例尺資料不完整。');
 return d;
}
export function stateAt(value,data=null,{reducedMotion=false,compact=false,exportMode=false}={}){
 const time=clamp(Number(value),0,DURATION),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start)),local=time-PHASES[phase].start;
 const isStill=reducedMotion;
 const base=PHASES[phase];let narrative={title:base.title,copy:base.copy,note:base.note};
 if(phase===1){narrative=local<8?{title:'先看它在礁體的哪裡。',copy:'比較平坦的一帶是礁坪，向外海下降的是礁坡。這些名稱描述地形部位。',note:'回看同一座概念礁區；標記只用來指引閱讀。'}:{title:'再看海床上主要有什麼。',copy:'珊瑚、裸露岩石和沙地可以出現在同一片礁區。地形部位相同，海床材料也不一定相同。',note:'這是概念場景，沒有對它執行地圖分類。'};}
 if(phase===3){narrative=local<12?{title:'影像之外，還要參考環境。',copy:'研究者結合影像、推估水深、波浪與專家參考標記，為各製圖區分別訓練隨機森林，分出地貌與底質。',note:'這裡說明資料與模型的分工，不是正在執行分類。'}:{title:'分類放在這裡，合理嗎？',copy:'一小塊被分成「礁脊」的區域若被大片內礁坪包圍，就不符合礁脊應在邊緣的關係。研究者用這類規則和人工判讀修訂地圖。',note:'論文規則的概念示意，不是 Abaiang 的實際修改紀錄。'};}
 if(phase===4){narrative=local<8?{title:'這一類，還分不開珊瑚和藻類。',copy:'兩者在這類衛星影像中的訊號相近，因此合成「珊瑚／藻類」。它不是活珊瑚覆蓋率。',note:'示意分類的辨識限制，不是生物變成另一種。'}:{title:'看不清楚，不代表沒有珊瑚。',copy:'水深和混濁都可能讓海床難以辨識。地圖上的留白，不能直接當作沒有珊瑚。',note:'觀察限制的概念示意，不是水質或白化監測結果。'};}
 if(phase===5)narrative={title:'最終地圖，分得準嗎？',copy:'以保留的參考資料檢查，30 個製圖區的平均整體正確率為地貌 69%、底質 66%。各地表現仍有差異。',note:'這是修訂後地圖的結果，不是定位點的信心分數。'};
 if(phase===6)narrative={title:'礁區環境能比較，健康仍要調查。',copy:'把地形和海床材料分開，才能比較礁區環境。活珊瑚有多少、是否健康，仍要另外調查。',note:'外礁坪與岩石，是同一位置的兩種描述。'};
 return {time,duration:DURATION,narrative,phase,phaseId:PHASES[phase].id,local,reducedMotion,compact,exportMode,
  conceptCamera:isStill?[0,0,1672,941]:[32*smooth(local/12),18*smooth(local/12),1672-64*smooth(local/12),941-36*smooth(local/12)],
  questionMode:local<8?'landform':'material',questionReveal:isStill?1:smooth((local%8)/1.4),
  mapMode:isStill?'pair':local<7?'geomorphic':local<14?'benthic':'pair',mapZoom:isStill?2.5:1+1.5*smooth(local/3),
  makingMode:local<12?'inputs':'rule',inputReveal:isStill?1:smooth(local/6),neighborReveal:isStill?1:smooth((local-14)/3),ruleCorrected:local>=20,
  limitMode:local<8?'combined':'visibility',veil:isStill?.68:.68*smooth((local-8)/4),
  modelInferenceRun:false,hasAudio:false,perPointConfidence:null,anchor:data?.anchor||null};
}
