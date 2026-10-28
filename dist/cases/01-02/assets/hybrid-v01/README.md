# 01-02 混合方法影片 v01

65.55 秒，1920×1080，60 fps。10 秒真實研究圖局部與 NOAA 聲音示例，接完整 47.55 秒已接受方法動畫，再接 8 秒真實研究圖收尾。

原核心共 2,853 幀，完整保留於第 600–3452 幀；僅作影片重新編碼，沒有重畫幾何或更動時間。研究圖片與原核心檔案未修改。

點擊聲僅在 1.5–7.5 秒播放。NOAA Fisheries / NEFSC / Passive Acoustics Branch (2023)。這是獨立教學錄音，非本研究海試同步音軌，未用於定位計算；核心及片尾無音訊。

研究影像：Bhattacharya et al. (2025), Fig. 1，CC BY 4.0，https://arxiv.org/html/2512.05808v1#S0.F1 。圖片只裁切與等比例顯示。圖中的鯨群不代表方法示意中的 A、B 或 C 群。

編輯來源為 scene.py。完整建置腳本與量化驗證位於 `work/ecology-ai-rollout/cases/01-02/hybrid-v01/build_film.py` 及 `film-verification.json`。scene.py 需放在本專案內，讀取已保存原圖和來源 WAV。

本輪未開啟任何 01-02 網頁、伺服器或原生播放器；影片 QA 使用 ffprobe、音訊數值與抽幀。

已完成最終影片六個時間點的抽幀讀圖，未見字幕重疊或debug標記。核心2,853幀逐幀SSIM最低0.999160、平均0.999735。這是檔案與抽幀驗證，不宣稱已開啟網頁或完整播放影片。

來源連結、照片裁切與音訊使用界線見 [SOURCE.md](SOURCE.md)；素材及時間軸紀錄見 [provenance.json](provenance.json)。此版為獨立候選，尚未抽換主站01-02。
