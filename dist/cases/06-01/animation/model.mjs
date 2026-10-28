export const DURATION=128;
export const PHASES=[
  {id:'animal',label:'先認識蚊子',start:0,end:14,title:'都是蚊子，要怎麼分種類？',copy:'身體、翅膀和腳的細節能幫助辨認。外觀不容易判斷時，研究者也會比較DNA。',note:'照片是埃及斑蚊，作為對象介紹；不是本研究的採樣照片。'},
  {id:'location',label:'DNA在哪裡',start:14,end:30,title:'先找到粒線體裡的DNA。',copy:'動物的DNA條碼常取自粒線體。把粒線體內的一個DNA環放大，就能指出COI基因，再選其中常用的COI-5P條碼區段。',note:'位置、形狀與比例為教學示意，沒有把這些蚊類條碼定位到完整粒線體基因組。'},
  {id:'laboratory',label:'從結構到字母',start:30,end:46,title:'實驗定序後，DNA就能記成字母。',copy:'研究者先完成DNA萃取、擴增與定序，才取得COI序列。鏡頭把雙股的局部展開，突出其中一股，接到同一串A、C、G、T。',note:'展開雙股是結構與字母對照的示意，不是實際定序儀器，也不是AI在解開DNA。畫面只放大20個字母，並非模型的完整輸入。'},
  {id:'sequence',label:'比較一小段DNA',start:46,end:62,title:'把同一段DNA，放在一起看。',copy:'研究常用COI基因的一小段序列，作為動物的DNA條碼。同一位置上的字母差異，是辨認種類的線索。',note:'這裡使用作者公開的真實參考序列。色底只標出字母不同的位置，不是模型的重要性分數。'},
  {id:'learning',label:'模型先學習',start:62,end:80,title:'先從有名稱的序列學習。',copy:'研究者先用已知分類的參考序列訓練模型。訓練完成後，才送入待分類的序列。模型把相鄰四個字母分成一組，讀取序列中的特徵。',note:'每次送入一條新序列，不會重新訓練整個模型。畫面是機制示意，沒有執行推論。'},
  {id:'classification',label:'提出哪些分類',start:80,end:98,title:'先分大的類群，再看較細的分類。',copy:'先辨認屬於哪個大類群，也就是分類裡的「門」。再由對應模型，同時提出綱、目、科、屬、種的名稱與分數。',note:'這裡只展示輸出格式，沒有執行模型。五個階層不是五次獨立確認，分數也不能直接當成答對的機率。'},
  {id:'results',label:'研究有什麼結果',start:98,end:114,title:'平均較高，還要看分在哪一層。',copy:'研究用四組節肢動物的長讀長定序資料做比較。五個分類階層的平均F1，是DeepCOI較高；只看「種」這一層，則是BLAST較高。',note:'正式論文Table 4，使用各方法指定門檻。F1兼顧漏分與錯分，越高越好；不是正確率。'},
  {id:'ending',label:'最後怎麼使用',start:114,end:128,title:'大量條碼整理得更快，種名仍要核對。',copy:'DeepCOI協助研究者整理大量COI條碼。序列品質、長度與參考庫的涵蓋範圍，都會影響分類能不能採用。',note:'參考庫沒有涵蓋的物種，或過短、品質不佳的序列，仍不能保證得到可靠種名。序列條數也不等於動物隻數。'}
];
export const RESULTS={mean:{title:'五個階層的平均',values:[['DeepCOI',.864],['RDP',.658],['BLAST',.853]]},species:{title:'只看「種」這一層',values:[['DeepCOI',.858],['RDP',.642],['BLAST',.909]]}};
export function stateAt(value,data,options={}){
  const time=Math.max(0,Math.min(DURATION,Number(value)||0));
  const phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start));
  return {time,phase,local:time-PHASES[phase].start,reducedMotion:!!options.reducedMotion,compact:!!options.compact,resultView:time>=106?'species':'mean',newPrediction:false,modelInferenceRun:false};
}
