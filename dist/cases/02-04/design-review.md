# 02-04 網頁視覺檢視

方向沿用 The dark room，seed 495546960。使用者提供的原圖為 1672 × 941 橫版，雖然檔名含 mobile，沒有假稱收到另一張直式圖。原 PNG 保留；桌面與手機的取景由 CSS 處理。

ROUND 1
Seen in one second: 淡銀色細胞鏈由右上延伸至中央下方，左側標題清楚。
Idea (one sentence): 把可辨認相連單元的細胞鏈作為四頁共同的顯微背景，帶出影像與細胞的計數差別。
Live thing: 已接受的 90 秒動畫，提供播放、暫停、進度、跳段與原圖查看。
Layout words by section: hero=滿屏圖像 / method=播放器與解說 / evidence=原圖對照與長圖 / sources=問答與來源
Scores: design 7 · usability 7 · creativity 7 · content 9 → overall 7.2
Caps applied: 未把少量網站入場動態評為強動態設計，design上限7。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. qa-desktop-method.png 初輪：進度條底部超出閱讀列上緣約13px。縮短方法頁標題與播放器上方留白，保留動畫畫面大小。
2. 首頁只有概念圖，讀完開場仍需跳到動畫才見真實微觀影像。於opening-story加入未修改的00298原圖及可核對圖說。
3. 初輪手機存在12種字級。將手機正文、註記與小標合併為較少的尺寸角色，保留兩行主標題。

ROUND 2
Seen in one second: 完整細胞鏈與研究問題分佔視野，手機也保留鏈的兩端。
Idea (one sentence): 同一條鏈延續到內頁，真正的影像和研究圖則保留原貌作為證據。
Live thing: 67項網站互動檢查通過，動畫來源原檔不變；正常全片播放另留紀錄。
Layout words by section: hero=滿屏圖像與真實微觀照片 / method=播放器 / evidence=圖文對照 / sources=問答與來源
Scores: design 7 · usability 8 · creativity 7 · content 9 → overall 7.5
Caps applied: design維持7；入場動態刻意簡短，主要動態在研究動畫中。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. qa-desktop-evidence.png：Figure 1原圖只有507×172，放大後文字偏軟。保留原始圖、不生成補字，提供原圖與全文入口。
2. qa-desktop-sources.png：來源頁較長。保留可收合問答、四頁導覽與完整閱讀，詳細追溯資訊留在該頁。
3. qa-390-method.png：手機上完整方法解說需要向下捲動。iframe依內容增高，避免內外雙捲軸；不壓小字體來硬塞一屏。

## 工具檢查的範圍

- source lint：0 FAIL／0 WARN。兩處中性照片遮罩依skill允許的scrim例外註記。
- inspector：1440、768、390px，0 FAIL／2 WARN；記錄在 `taste-inspect-final/report.json`。
- `few-pictures`明示排除：桌面沿用既有四頁閱讀方式，檢查器只看到當前首頁；完整閱讀的四張不同圖像由瀏覽器檢查另行確認。沒有隱藏來源圖或為湊數加入無關素材。
- `no-footage`保留警告：此案採已接受的HTML／SVG研究動畫，沒有另外編造顯微活體影片。
- `still-page`保留警告：檢查器量得11個入場動態元素；網站不靠持續漂浮的概念細胞解說生物行為。
- 最後調整方法頁上方間距後，67項互動檢查與1440／1280播放控制位置重新核對。檢查器評分不代表使用者接受或科學驗證。

已實看1440桌面四頁、768直式平板、390與320手機、列印樣式與無JavaScript畫面。生成圖、來源原圖與研究結果的界線保留於圖說及SOURCE。
