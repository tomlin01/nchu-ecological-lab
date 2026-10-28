# 03-03 動畫來源與處理

本地獨立試作 v02，96 秒。題目「這次叫的，還是同一隻嗎？」。尚未加入案例網站或部署，等待使用者視聽確認。

## 研究

Nolasco 等人，*Acoustic identification of individual animals with hierarchical contrastive learning*。敘事方法以 [2024 年預印本 v1](https://arxiv.org/html/2409.08673v1) 核對；2025 年 ICASSP 收錄由 [作者研究中心公告](https://c4dm.eecs.qmul.ac.uk/news/2025-03-24.C4DM-at_ICASSP_2025/) 確認。DOI：10.1109/ICASSP49660.2025.10890076。

輸入是切好的叫聲。類群、物種和個體標籤共同引導訓練，不是三道依序通過的分類關卡。此動畫沒有執行 HC／HCE 模型，沒有對這三段錄音產生特徵座標、相似度、排名或推論結果。第 60 至 72 秒揭露原資料個體標籤，第 72 秒起另外呈現論文已發表的實驗結果。

## 新增結論的依據

72 至 84 秒：已知小鴞個體的新錄音測試，SC 的個體平衡準確率為 44.7%，HC 為 70.3%。兩者來自同一個測試設定，可並列比較。[Table II](https://arxiv.org/html/2409.08673v1#S5.T2)

84 至 96 秒：訓練時未見過的個體，每個只提供一段參考聲音。跨 7 個物種、21 個新個體的整體個體平衡準確率，SC 為 6.0%，最佳 HCλ 為 15.3%。原有訓練例子也加入參考集合，作為干擾。[Table III](https://arxiv.org/html/2409.08673v1#S5.T3)

以上兩幕的測試對象與設定不同，沒有把 70.3% 和 15.3% 畫成同一批小鴞的前後變化。平衡準確率是各個體召回率的平均，不改寫成「100 段錄音認對 15 段」。數字與條長始終顯示論文結果；動畫只改變條的顯示亮度。

結論：在這份資料中，共同學習類群、物種及個體關係能改善個體辨識；陌生個體只給一段參考錄音時，辨識仍不可靠。這與作者[Discussion](https://arxiv.org/html/2409.08673v1#S6)一致。三段示範的來源配對與論文實驗結果分開，不表示此播放器執行了模型。

## 原始聲音

Dan Stowell、Tereza Petrusková、Martin Šálek、Pavel Linhart 的[鳥類個體聲音資料集](https://zenodo.org/records/1413495)，DOI 10.5281/zenodo.1413495，採 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授權，原錄音著作權屬記錄者。

| 角色 | 檔案 | 來源個體 ID |
| --- | --- | --- |
| 參考 A | littleowl2017fg_train_108_0000.wav | 108 |
| 待比較聲音 | littleowl2017fg_test_108_0000.wav | 108 |
| 參考 B | littleowl2017fg_test_193_0000.wav | 193 |

三段為縱紋腹小鴞 Athene noctua 的資料集錄音。原檔保存於上一層的 `sources/review/`，完整 CSV 列與下載驗證在 `../sources/sample-review.json`。來源檔案的 train／test 不代表本研究的實驗切分。檔名不同也不證明不同日期、獨立遭遇或跨年紀錄。這些聲音重播時，仍是同一筆紀錄。

## 播放與圖像

原 WAV 不改。播放衍生檔只施加線性增益，使三段完整錄音的 RMS 接近 0.035；增益分別約 A 0.88251、待比較 0.99568、B 2.59254。沒有降噪、動態壓縮、改速、移調、剪叫聲或配樂。保留 44,100 Hz、單聲道、16-bit PCM。播放音量不作為個體身分證據。

`teaching.wav` 是精確 96 秒的單一音軌。前 72 秒 PCM 與 v01 完全相同，之後新增 24 秒靜音供閱讀研究結果。14 個時間點插入原速播放衍生檔，其他部分為數位靜音。原生音訊的 `currentTime` 是動畫唯一主時鐘；畫面與游標依這個時間更新。重聽某段會暫停動畫，結束後由使用者按「繼續動畫」。兩個音訊元素不會同時播放。

聲譜由實際播放 PCM 計算，三段使用相同參數：Hann 1024 samples、hop 256、FFT 2048；頻率 0 至 8 kHz、時間 0 至 1.5 秒、共同色標 −90 至 −20 dB，相對 full-scale amplitude 1。每段結束後的空白只是共同圖幅，不是額外錄音。聲譜與波形不逐張調整對比，保留共同尺度。精確數值、雜湊與 cue 座標見 `audio-data.json`；原 72 秒素材重建腳本為 `../scripts/build_audio.py`，v02 延長音軌為 `../scripts/build_conclusion_v02.py`。

開場小鴞與果園為內建 imagegen 生成情境圖，不是研究現場或 ID 108／193 的照片。母圖及完整提示詞保存於 `outputs/ecology-ai-rollout-assets/03-03/hero-v01/`。生成圖不沿用原錄音的 CC BY 4.0 聲明。羽毛外形及環境依[生物多樣性知識平台](https://wiki.biodiversity.cern.ac.cn/index.php/%E7%BA%B5%E7%BA%B9%E8%85%B9%E5%B0%8F%E9%B8%AE) 核對。

## 驗證界線

已做 PCM 解碼、原檔雜湊、增益、共同圖軸、精確 cue 與靜音區段檢查。客觀音訊檢查不能代替人工聽辨。本工具環境不支援模型聽取音訊輸入，故不宣稱已人工聽辨物種或個體；使用者可從播放頁直接試聽。瀏覽器操作與渲染檢查另存 `../prototype-review-v02/`。
