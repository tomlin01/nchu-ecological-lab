# 02-03 Biotwang：素材與證據

## 研究

Allen, A. N., Harvey, M., Harrell, L., Wood, M., Szesciorka, A. R., McCullough, J. L. K., & Oleson, E. M. (2024). *Bryde’s whales produce Biotwang calls, which occur seasonally in long-term acoustic recordings from the central and western North Pacific*. Frontiers in Marine Science, 11, 1394695. <https://doi.org/10.3389/fmars.2024.1394695>.

- 10 次已確認布氏鯨的遭遇中，9 次同時錄到 Biotwang；單位是遭遇，不是個體或模型準確率。
- 模型逐一評分非重疊的 5 秒錄音窗；每 75 秒取 15 個短窗分數的最大值，再以各站門檻判定。
- 高分候選交人工確認真偽，另抽隨機片段檢查；沒有只挑 0.5 附近不確定樣本的主張。
- Figure 1 為 13 個搜尋站點，非 13 個皆有檢出。Figure 3 的分圖 A–D 依序顯示較常錄到的 Wake、Pagan、Saipan、Tinian。
- 每日指標使用當天實際錄音的陽性比例。75 秒陽性不等於 75 秒都在發聲；沒有錄音與未檢出也不同。
- 未重新執行 CNN、取得逐窗輸出、重算每日資料或估計個體數。教學頻譜未複製研究模型的 mel／PCEN 前處理。

## 原始影像

`../assets/brydes-whale-mariana-noaa-original.JPG`：NOAA Fisheries／Adam Ü，Permit #14097，2010 年馬里亞納調查。逐圖來源：<https://www.flickr.com/photos/noaaphotolib/34590655782/>，NOAA Photo Library anim2619，CC BY 2.0（<https://creativecommons.org/licenses/by/2.0/>）。保留原始 bytes，畫面顯示尺寸改變。照片不是 2018 年配對調查現場，不能與原音解讀為同次觀察。

`../assets/paper-figure-1.webp`、`../assets/paper-figure-3.webp`：Allen 等（2024），原論文 Figures 1、3；CC BY 4.0（<https://creativecommons.org/licenses/by/4.0/>）。完整原圖 bytes 不變，動畫顯示方式不是新數據。

## 原音與計算頻譜

原音來源為 Google Research 官方文章 *Whistles, songs, boings, and biotwangs: Recognizing whale vocalizations with AI*（2024-09-18）：<https://research.google/blog/whistles-songs-boings-and-biotwangs-recognizing-whale-vocalizations-with-ai/>。

原始檔案：<https://storage.googleapis.com/gweb-research2023-media/media/WhaleBioacoustics-BrydesBiotwang.wav>。

本地 `assets/biotwang-google-original.wav` 保留原始 bytes：SHA-256 `f9db96ae5535307b6110c18331a7cdf625d1acbbebaed24e99898a222ccf41d7`。5.000 秒、24 kHz、單聲道、16-bit PCM、120,000 samples。沒有裁切、濾波、增益、重採樣、變速、合成或循環。0–5 秒及 21–26 秒兩次播放的是同一片段，中間的剪輯間隔不是自然叫聲間隔。

獨立音訊重用授權：**未確認**。官方文章、樣本頁與公開物件 metadata 沒有明示該 WAV 的重用條款或原始錄音 ID。本地試作供評閱，沒有公開發布；不將 Google 模型的授權、NOAA 網站政策或論文圖的 CC 授權套用到這個 WAV。

教學頻譜由同一原音計算，STFT 使用 Hann 窗 2048 samples、步長 256 samples，取樣率 24 kHz。顏色為相對全片最大 STFT 功率的 dB，範圍 −65 至 0；不是校準聲壓、模型分數或注意力圖。低頻版放大 0–1,200 Hz，總覽為 0–8,000 Hz，原音不變。精確座標映射及數值見 `assets/axis-mapping.json`、`assets/audio-provenance.json`。

可解碼、非靜音與原樣原速已由檔案／數值檢查確認；這些檢查不等於人工音質或物種聽辨。原錄音有 1 個滿幅正樣本，沒有據此宣稱完全沒有截幅。瀏覽器的播放與同步證據另見本輪驗證文件。

播放器先完整載入這個小音檔，以原始 bytes 建立記憶體 Blob，避免不支援 HTTP Range 的簡易靜態伺服器讓跳段失效。原生音訊的啟動可能比動畫晚數十毫秒，因此允許最多 0.35 秒的結尾緩衝，讓片段到達真正的 5 秒結尾；沒有變速或延長音檔。使用者暫停、跳段及離頁仍會立即停止聲音。

## 製作工具

- GSAP 本地時間軸與 SVG 圖解；標準授權：<https://gsap.com/standard-license/>。
- NumPy、SciPy 與 Matplotlib 3.10.8 計算和輸出教學頻譜；程式留於工作目錄 `audio/prepare_audio.py`。
- 製作使用 `gsap-timeline`、`matplotlib`、`webapp-testing` skills。Matplotlib skill 的方法參考：Kassis, T., Agarwal, V., He, Y., Patel, D., & Brueckner, A. M. (2026), *Scientific Agent Skills: A Library of Procedural Knowledge for Research Agents*. <https://doi.org/10.48550/arXiv.2609.00065>。這是工具來源，不是鯨類研究的證據。
- Noto Sans TC／Noto Serif TC 子集，OFL 授權副本在 `fonts/`。

## 範圍

獨立動畫試作 `prototype-v01`，88 秒。主站及已接受案例沒有替換；沒有新模型推論或公開部署。

## v02 教學分數與雙重證據

目視先辨認為布氏鯨，聲學端先確認為 Biotwang；兩條同期證據匯合，並以 10 次遭遇中 9 次配對支持物種來源。這不是開場照片與聲音的同步現場重建。

43–58 秒的分數依序為 0.08、0.12、0.09、0.31、0.18、0.14、0.65、0.92、0.43、0.22、0.11、0.27、0.16、0.07、0.10，全為教學設定。以同一陣列計算目前最高與最終最大值，第 8 窗（35–40 秒）為 0.92；示意門檻為 0.70。這些數值不對應前面的 5 秒原音、原論文任何站點或新的模型推論。分數不等於準確率。最後只產生一個 75 秒區段的有聲判定，不新增鯨隻數、叫聲數或真實資料列。
