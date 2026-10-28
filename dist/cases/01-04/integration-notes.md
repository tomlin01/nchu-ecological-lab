# 整合邊界

Accepted source: `outputs/ecology-ai-rollout/candidates/01-04/hybrid-v02/`。原始 accepted source 全部不改。複製到 `animation-hybrid/` 後，runtime、照片、原標註、模型輸出與既有 provenance 保持原 bytes；僅修正 SOURCE.md、README.md、manifest.json，另加嵌入 adapter。三份文檔的 before/after hash 記錄於父頁 provenance 與工作目錄 doc-amendments.json。

父頁 iframe 保留 `method-frame`。本案實際 API 為 `window.caseAnimation`，含 `getState`、`seek`、`pause`；時間上限 78 秒。原圖依 state.selected 與 state.photos 選取，嵌入版開啟完整 JPEG 新分頁。04-02 的 figure-2／figure-3 選圖規則不適用本案。

既有 case.js 在四頁／全文閱讀間不搬移 iframe，因此切換只暫停並保留時鐘。parent/child message bridge 提供高度、ready/state、pause、seek 與列印前後時間保存。來源點擊只允許 accepted 三張原圖。

複製包 SOURCE.md 明確區分取圖階段尚未執行模型，以及後來本輪已執行物體偵測。assets/model-provenance.json 的 image_inference_executed=false 記錄權重載入階段，保持歷史 bytes。本次方法是否執行偵測，以 accepted provenance.json、assets/sample.json 的 inference.executed=true，以及 assets/detector-results.json 的實際輸出為準。整合沒有再做 forward pass。

舊 animation/ 目錄保留為原版本存檔；目前父頁只連到 animation-hybrid/。主視覺 SVG、case.css、原始 original-notes 原樣保留。父頁沒有 case-data/generated-data script；檢查仍比對其缺席狀態。

本案沒有啟動瀏覽器、伺服器或 CDP。靜態檢查及 adapter 的 Node VM 檢查不代表瀏覽器視覺驗收。
