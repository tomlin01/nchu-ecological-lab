export const DURATION = 96;
export const PHASES = [
  {start:0, label:'01 / 先聽見牠', title:'同一種鳥，也有不同的聲音。', copy:'這是縱紋腹小鴞，常見於開闊林緣與果園。先聽兩段叫聲，記住它們的聲音。'},
  {start:10, label:'02 / 再聽一段', title:'這次叫的，還是同一隻嗎？', copy:'現在加入另一段叫聲，和 A、B 反覆聽聽看。即使聽起來相像，也還需要個體紀錄，才能確認是不是同一隻。'},
  {start:22, label:'03 / 把聲音展開', title:'叫聲裡，有哪些細節？', copy:'橫向是時間，縱向是頻率。較深的地方表示那個頻率的聲音較強。游標跟著原速錄音走，三張圖使用相同刻度。'},
  {start:34, label:'04 / 模型怎麼學', title:'用已知身分的錄音練習。', copy:'研究者把錄音屬於哪個類群、物種與個體，一起告訴模型。模型同時學習這些關係，並非先認完物種，才開始認個體。'},
  {start:48, label:'05 / 拿參考聲音來比', title:'新的叫聲，接近哪段參考？', copy:'模型把新叫聲與參考錄音轉成特徵，再找出相近的錄音。這段動畫只說明步驟，沒有重新跑模型，也沒有替這三段聲音打分、排名或判定身分。'},
  {start:60, label:'06 / 看錄音的個體編號', title:'原資料記錄，A 和這段來自同一隻。', copy:'原資料記錄 A 和待比較聲音都來自個體 108，B 則來自 193。知道這三段的身分後，再看論文怎麼測試模型能否認出其他錄音。'},
  {start:72, label:'07 / 研究改善了多少', title:'已知的個體，換段錄音仍認得更準。', copy:'研究把訓練時已見過的小鴞，換成新的錄音來測試。加入類群、物種與個體的資訊後，個體平衡準確率從 44.7% 提升到 70.3%。數字來自論文的這項測試。'},
  {start:84, label:'08 / 還有哪些限制', title:'第一次遇到的個體，還是難認準。', copy:'另一次測試換成訓練時沒見過的個體，每隻只給一段參考錄音。跨七個物種的最佳成績只有 15.3%。加入分類資訊雖有幫助，只靠一段叫聲認陌生個體仍然很難。'}
];
export const clampTime = time => Math.min(DURATION, Math.max(0, Number.isFinite(time) ? time : 0));
export function phaseAt(time) {
  const value = clampTime(time);
  return PHASES.findLastIndex(phase => value >= phase.start);
}
export function cueAt(time, cues) {
  return cues.find(cue => time >= cue.start && time < cue.end) || null;
}
export const clipName = clip => ({a:'參考聲音 A', b:'參考聲音 B', q:'待比較聲音'}[clip]);
export function clockText(time) {
  const seconds = Math.floor(clampTime(time));
  return `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;
}
