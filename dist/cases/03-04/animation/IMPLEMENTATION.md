# 03-04 播放器實作

獨立 84 秒、無聲。六段起點為 0／12／26／40／54／68 秒。HTML／SVG 呈現照片與來源矩形；GSAP 只推動一個 `clock.time`，`stateAt(time)` 決定全部畫面，可前進、倒回與直接跳段。

## 入口與 API

- 一般入口：`index.html`。預設自然史淺色，可切炭灰；主題設定使用既有 `ecology-color-theme` key。
- 匯出入口：`index.html?export=1&theme=light`。viewport 設 1600×900，截取 `#composition`；元素固定在 `(0,0)`、1600×900，包含照片與本段解說，不含控制列。
- 先等待 `window.EcologyThermoPlayer.getState().ready === true`。此狀態已等待四圖解碼、來源 metadata 及 `document.fonts.ready`。
- `seek(t)` 在設定 GSAP 時間後，把時鐘重新指定為原始請求值，避免 GSAP 小數捨入影響 24 fps 定位；同步更新 DOM、SVG 並回傳 state。截圖前等一次 `requestAnimationFrame` 即可，沒有場景 CSS transition 或分段 `setTimeout`。
- API：`seek(t)`、`getState()`、`play()`、`pause()`、`replay()`、`retry()`、`setTheme(mode)`、`setExpanded(boolean)`。
- State 包含 `time`、`duration`、`phase`、`phaseId`、`ready/loading/error`、`playing`、`sourceRect`、空分類欄位、論文指標與 export 尺寸。

## 主要 DOM

`#composition`／`#stage`／`.scene[data-scene="0".."5"]`；外側解說 `#phaseLabel/#phaseTitle/#phaseCopy/#phaseNote`。原圖與裁切為 `#detectionImage/#detectionCrop`，作者 XML 框為 `#sourceBoxes`。

控制為 `#playButton/#replayButton/#seekRange/#timeReadout/#expandButton/#themeButton`。段落按鈕使用 `[data-seek]`。`#status` 是狀態訊息，`#error/#errorCopy/#retryButton` 提供失敗重試。沒有 JavaScript 時控制保持停用，原圖與完整文字仍在文件中。

## 狀態與失敗處理

首次載入停在 0 秒，不自動播放。載入中也可選擇時間；成功或重試後維持所選時間並暫停。四圖尺寸、XML 矩形及來源界線通過驗證後才顯示已核對的局部窗。網路 timeout 只用於載入，不控制動畫。

同頁放大保留同一份 DOM 與時間，並暫停；Escape 收起。視窗改變、隱藏頁籤、離頁、查看來源及列印皆暫停。一般瀏覽模式下，舞台完全離開可視範圍也會暫停；export 不受這項觀察器影響。列印前開啟完整文字，列印後還原 details 與播放位置，不自動續播。減少動態偏好直接呈現當段的照片對照與局部，不必等進場。

若未來嵌入同源父頁：接收 `ecology-control` 的 pause/play/seek/retry/state，檢查 parent 與 origin；發送 `ecology-thermo-state`、`ecology-thermo-ready`。本輪未建立網站或 embed 橋接。

## 來源邊界

`assets/detection-data.json` 沿用來源配對契約。選中框是 `[1726,503,127,231]` 的身體局部，未含完整長尾；未調整 XML 起算，不新增日照、色標、個體或分數。原圖底部相機印字保留，畫面明說它不是蜥蜴體溫。

Sun／Shade 的例圖記錄分開，時間與圍欄／個體均未提供，不套用作者的連拍事件規則。結尾說的是不能補成全天／總停留時間，不否認作者曾估算被拍到的活動時段。95% 門檻、約 85% 達門檻比例及 96.52% 高信心分類準確率使用不同標籤，數字不做假計分動畫。

## 已做與交接

`node --check app.mjs`、`node --check model.mjs`、`node model.test.mjs` 通過。測試涵蓋六段邊界、時間狀態可逆、原框幾何、來源缺值、指標定義及減少動態。另核對六個場景、唯一 DOM ID、本地 HTML 引用、三張原照片 bytes／雜湊及 GSAP 原副本均相符。未在本子任務開瀏覽器或宣稱影片已輸出。

根代理提供素材、字型與 SOURCE.md。CSS 已在初版完成後交回根代理調整；根代理接續視覺／操作驗收及真正的 MP4 逐幀輸出。原始素材、其他案例、主站、STATE 與 manifest 未由本子任務更動。
