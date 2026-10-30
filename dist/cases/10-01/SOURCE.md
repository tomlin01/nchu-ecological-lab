# 10-01｜研究、數值與畫面來源

研究：Sandubete-López等（2025），*Shallow learning model for long-term cyanobacterial bloom forecasting in real-time monitoring system*，Water Research 287，124283。[DOI](https://doi.org/10.1016/j.watres.2025.124283)。

## 已核對與尚未核對

論文摘要支持淺層LSTM經訓練與量化後內嵌微控制器；預測期為16、20、24、28天，評估指標為MAPE。[出版社入口](https://www.sciencedirect.com/science/article/pii/S0043135425011893)。

[UCM研究報導](https://www.ucm.es/dispositivo-prediccion-cianobacerias-agua)明列水溫與藻藍蛋白螢光。[系統圖](https://www.ucm.es/file/esquema-de-funcionamiento-del-sistema-completo?ver=n)另列月份。系統圖用於理解結構，沒有當作網站背景或聲稱其具備已核實的開放再利用授權。

[UCM論文紀錄](https://produccioncientifica.ucm.es/documentos/68a0ccd7ea77332c37537c19?lang=en)提供[機構全文入口](https://hdl.handle.net/20.500.14352/133644)。本案尚未成功讀到PDF，完整方法與逐預測期結果表未核對。摘要中的70%與MAPE如何換算尚未確認，因此網頁和動畫不呈現70%，也不稱為警報命中率。

本頁只把成果稱為內嵌預測研究原型。沒有已核對的長期現場預警成效或跨水域適用證據。

## 圖像與互動

- 湖泊、浮標、探頭與電路板由Three.js建模，是概念場景，不是現場實拍、實測尺寸或作者實際設備的重建。
- 首屏使用已接受動畫的同一場景模組，固定於水下探頭剖面。WebGL畫面沒有獨立播放時鐘，切換預測期只改變時間標記與文字。
- 首屏的16、20、24、28天依共同時間尺度布點。實心「現在」與空心未來點表示時間位置，沒有藻量、預測值或績效分數。
- 備援圖片為同一Three.js模組直接渲染的800×410 JPEG。檔名`assets/10-01-lake-concept-v01.jpg`，來源模組、時間、尺寸與SHA見[素材紀錄](assets/provenance.json)。它也提供無JavaScript或WebGL無法使用時的畫面。
- 量化表格中的0.183／0.614與0.2／0.6只是精度變化的原理示例，不是作者模型權重、位元數或儲存格式。
- 動畫裡的曲線、預測點與後續量測點都是教學數值。本頁沒有訓練或執行作者模型。
- 色素訊號、細胞數與毒素濃度不是同一個量。此頁不提供飲水安全或處置建議。

## 已接受動畫

120秒、1600×900、24fps、2,880幀、無聲。使用者確認後保留原播放器、場景、模型、字型與MP4；網站只新增嵌入版面及父子頁訊息橋接。原檔SHA記錄於`animation/accepted-source-manifest.json`，網站衍生檔記錄於`animation/manifest.json`。

MP4 SHA-256：`8b5e4dc4a14192d10d245983a02f4185a616bdb7e1b3c0c5923ad4fd3f6f852d`。

Three.js使用MIT授權，Noto Sans TC與Noto Serif TC使用OFL授權，相關授權檔隨網站附上。沒有新生成圖片，也沒有把概念畫面標成研究實拍。
