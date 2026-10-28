export const DURATION = 80;
export const clamp = (value, lo=0, hi=1) => Math.min(hi,Math.max(lo,value));
export const smooth = value => {const p=clamp(value);return p*p*(3-2*p);};
const mix = (a,b,t) => a.map((value,index)=>value+(b[index]-value)*t);
export const PHASES = [
  {start:0,end:10,label:'先看兩張照片',title:'姿勢變了，還是同一隻嗎？',description:'光線、背景和姿勢會改變。先看兩張斑鬣狗照片，留意身體外觀有什麼相似、又有什麼不同。',detail:'照片來自公開資料集。這裡先保留問題，原有的個體標籤在最後一段才揭露。'},
  {start:10,end:22,label:'放大同側細節',title:'放大同側斑紋，保留完整照片',description:'局部放大讓同一側身體的斑紋更容易比較。看不清楚或被遮住的地方，放大也不會補出新的細節。',detail:'框線標出為解說而選的範圍，放大內容全部取自原照片。這裡沒有執行模型偵測，也沒有產生注意力圖或新的個體鑑定。'},
  {start:22,end:36,label:'整理外觀特徵',title:'把照片轉成可比較的數字',description:'2024年的方法先裁出動物，再由同一個模型把外觀轉成一組數字。新照片與圖錄照片都用相同方式處理，才能互相比較。',detail:'原文使用2,048維的特徵向量，並以餘弦距離找候選。畫面符號只作示意，並非這些照片實際算出的特徵；每一格也不能直接當成耳朵或鼻子的量測值。'},
  {start:36,end:50,label:'找出候選照片',title:'先縮小需要比對的範圍',description:'模型從同一物種的圖錄找出相似照片，交給研究人員仔細核對。這裡並列兩張候選照片，看看哪些細節還需要確認。',detail:'這兩張候選照片為解說而選，大小相同，沒有實際模型分數或排名。多個物種可以一起訓練，查找時仍只比對同一物種。'},
  {start:50,end:66,label:'回到原圖核對',title:'可以比較，也可以先不決定',description:'研究人員要對照完整照片，確認同側斑紋與看得見的部位。動畫拿一對照片示範核對，另一張先保留待確認，不勉強歸為同一隻。',detail:'這裡只示範人工核對的方法，沒有請專家重新鑑定。第三張照片在動畫中一直保留待確認。'},
  {start:66,end:80,label:'揭露來源標籤',title:'資料集把這兩張照片標為同一隻',description:'資料集把這兩張照片標為同一隻。這裡揭露原有標註，說明不同照片如何歸到同一個體；沒有另外執行模型或請人員重新判定。',detail:'沒有可核對的拍攝日期或遭遇編號時，只能稱為兩張照片或兩筆影像記錄。後續若有日期、地點與其他觀測，才可再整理遭遇；不從兩張照片畫出完整移動路線。'},
];

export function frameAt(value,{compact=false}={}) {
  const time=clamp(Number.isFinite(value)?value:0,0,DURATION);
  const phase=Math.max(0,PHASES.findLastIndex(item=>time>=item.start));
  const local=time-PHASES[phase].start;
  const panels=[];
  const add=(key,photoId,rect,crop='full',opacity=1,label='')=>panels.push({key,photoId,rect,crop,opacity:clamp(opacity),label});
  const pair=compact?[[30,30,940,480],[30,660,940,480]]:[[20,80,465,455],[515,80,465,455]];
  if(phase===0){
    const p=smooth((local-3)/3.4);
    add('query','query',mix(compact?[30,130,940,800]:[100,45,800,535],pair[0],p),'full',1,'照片一');
    add('match','match',mix(compact?[30,920,940,480]:[1050,80,465,455],pair[1],p),'full',p,'照片二');
  }else if(phase===1){
    const p=smooth(local/2),zoom=smooth((local-2)/2.5);
    const full=compact?[[30,40,450,430],[30,660,450,430]]:[[30,30,440,260],[530,30,440,260]];
    const detail=compact?[[520,90,450,350],[520,710,450,350]]:[[70,355,360,230],[570,355,360,230]];
    ['query','match'].forEach((id,index)=>{
      add(id,id,mix(pair[index],full[index],p),'full',1,index?'照片二':'照片一');
      add(`${id}-detail`,id,mix([full[index][0]+full[index][2]/2,full[index][1]+full[index][3]/2,1,1],detail[index],zoom),'detail',zoom,'原圖局部');
    });
  }else if(phase===2){
    add('query','query',compact?[30,30,450,320]:[25,40,300,245],'bbox',1,'照片一裁切');
    add('match','match',compact?[520,30,450,320]:[25,365,300,245],'bbox',1,'照片二裁切');
  }else if(phase===3){
    const p=smooth(local/2.3);
    add('query','query',compact?[30,35,940,430]:[20,175,360,300],'full',1,'待比對照片');
    const candidates=compact?[[30,620,450,400],[520,620,450,400]]:[[430,165,260,300],[720,165,260,300]];
    ['other','match'].forEach((id,index)=>add(id,id,mix(compact?[275,620,450,400]:[580,165,260,300],candidates[index],p),id==='other'?'bbox':'full',smooth(local/1.2),id==='other'?'圖錄：後方這隻':'圖錄照片'));
  }else if(phase===4){
    add('query','query',compact?[30,20,450,330]:[20,25,440,290],'full',1,'照片一');
    add('match','match',compact?[520,20,450,330]:[540,25,440,290],'full',1,'照片二');
    const p=smooth(local/2.5);
    add('query-detail','query',compact?[30,430,450,300]:[40,380,285,210],'detail',p,'原圖局部');
    add('match-detail','match',compact?[520,430,450,300]:[375,380,285,210],'detail',p,'原圖局部');
    add('other','other',compact?[280,890,440,270]:[735,385,235,180],'bbox',1,'後方這隻，待確認');
  }else{
    add('query','query',compact?[30,40,450,330]:[25,55,305,260],'full',1,'影像記錄一');
    add('match','match',compact?[520,40,450,330]:[365,55,305,260],'full',1,'影像記錄二');
    add('other','other',compact?[280,890,440,270]:[735,250,235,195],'bbox',1,'後方這隻，待確認');
  }
  return {time,phase,local,progress:clamp(local/(PHASES[phase].end-PHASES[phase].start)),viewBox:[0,0,1000,compact?1280:650],panels,
    photoIDs:[...new Set(panels.filter(p=>p.opacity>0).map(p=>p.photoId))],
    showDetail:phase===1||phase===4,showEncoder:phase===2,encoderProgress:smooth((local-1)/10),
    candidateSet:phase===3?['other','match']:[],candidateRanking:null,candidateScores:null,
    showIdentity:phase===5,identityProgress:phase===5?smooth(local/2):0,
    workflow:{query:phase===5?'source-label-shown':'unreviewed',match:phase===5?'source-label-shown':'unreviewed',other:'pending'},
    modelInferenceRun:false,newHumanReview:false,hasAudio:false};
}
