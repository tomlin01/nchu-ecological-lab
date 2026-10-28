# 照片是平的，怎麼估出樹高？

05-01 `prototype-v01`，100 秒無聲動畫。預覽：<http://127.0.0.1:8931/index.html>。

[下載 MP4](film/05-01-canopy-height-v01.mp4)：1600 × 900、24 fps、2,400 幀。

從衛星照片中的樹冠開始，依序說明地面到冠頂的高度、影像／光達配對、GEDI 模型的分工、同區地圖的細節與三組驗證誤差。最後分開一公尺網格和高度誤差，交代影像日期與高樹驗證限制。

播放器提供播放、暫停、重播、跳段、逐幀、同頁放大、深淺色及減少動態。首次進入不自動播放。下方有全文與原圖，無 JavaScript 仍可閱讀；列印保留完整說明。

衛星照片與高度圖取自作者 Figure 7，原 PNG 未改色。所有光達配對、樹形、模型關係與網格均為概念示意；沒有執行模型、從圖像反推樹高或生成新的研究結果。來源與顯示視窗見 [SOURCE.md](SOURCE.md) 與 [source-data.json](assets/source-data.json)。

重開預覽：在本目錄執行 `python3 -m http.server 8931 --bind 127.0.0.1`。模組與來源 JSON 需要 HTTP，不直接以 file URL 開啟。

檢查摘要見 [verification.json](verification.json)。目前為獨立動畫試作，待使用者檢視；沒有製作案例網站、加入主站或部署。
