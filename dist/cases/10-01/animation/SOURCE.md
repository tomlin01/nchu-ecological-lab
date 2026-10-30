# 10-01｜湖裡的藍綠藻，幾週後會變多嗎？

這是120秒無聲概念動畫。湖泊、浮標、探頭與電路板由Three.js建模；文字與時間線使用SVG。沒有使用生成圖片、研究現場實拍或作者的預測序列。

## 研究來源

Sandubete-López et al. (2025), *Shallow learning model for long-term cyanobacterial bloom forecasting in real-time monitoring system*, Water Research 287, 124283。

- [論文與DOI](https://doi.org/10.1016/j.watres.2025.124283)
- [出版社頁面](https://www.sciencedirect.com/science/article/pii/S0043135425011893)
- [UCM研究報導](https://www.ucm.es/dispositivo-prediccion-cianobacerias-agua)
- [UCM論文紀錄](https://produccioncientifica.ucm.es/documentos/68a0ccd7ea77332c37537c19?lang=en)
- [機構全文入口](https://hdl.handle.net/20.500.14352/133644)
- [UCM完整系統圖](https://www.ucm.es/file/esquema-de-funcionamiento-del-sistema-completo?ver=n)

本版依已核對的摘要、UCM報導與系統圖製作。找到機構全文入口，但尚未成功讀到PDF，完整方法與逐時距結果表仍未核對。

## 可確認的內容

研究將淺層LSTM訓練、量化後內嵌微控制器。比較16、20、24、28天四個預測期，使用MAPE評估。UCM報導說明水溫與藻藍蛋白螢光，系統圖另列月份。動畫稱為「色素相關訊號」，不自行補成毒素濃度、細胞數或危險機率。

摘要的70% accuracy與MAPE之間的換算方式尚未核實。本片不呈現70%，也不將它解讀為警報命中率。

## 畫面與數值的性質

- 湖泊、水華、浮標及裝置尺度均為概念示意，不是研究現場的重建。水華斑塊只交代背景，沒有隨預測擴散，不能視為空間預報。
- 探頭位於固定水面以下；電路板位於水面以上的乾燥外殼。未聲稱研究使用此浮標或晶片。
- 電腦、網路節點與量化小數說明原理。量化前後保留相同節點與連接，不代表刪除模型層數。沒有指定論文未核實的位元數、硬體型號或壓縮比例。
- 全部歷史曲線、預測點、後續量測點均是教學數值，無實際單位。16、20、24、28天四個預測期來自論文；點位並非作者結果。
- 動畫沒有訓練或執行作者模型。後續量測對照不構成新實驗，也不提供績效分數。
- 成果是裝置內預測研究原型。長期現場表現及可靠預警仍需另外驗證。

## 本機資源

Three.js程式沿用專案已存在的模組與MIT授權。Noto Sans TC、Noto Serif TC字型使用OFL授權，本資料夾附授權檔。所有動畫由同一播放時間控制，沒有外部字型、CDN或自動播放。
