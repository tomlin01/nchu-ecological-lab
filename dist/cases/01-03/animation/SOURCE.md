# 01-03 混合動畫的照片與示意

這版保留原82秒教學動畫，插入7秒設備參考照，最後再接兩段各7秒的顯微照片。共103秒。照片提供設備與生物的實際樣貌；原動畫的航線、預測與分數仍是教學模型，不是現場資料重播。

## 設備照片

[Berild等，2024，Efficient 3D real-time adaptive AUV sampling of a river plume front，Figure 9](https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2023.1319719/full#f9)。[完整文章與版權說明](https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2023.1319719/full)採[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。

圖中為LAUV Roald，來自另一場Nidelva河口研究，不是本案Svalbard海試。這裡只用來認識載具外形，沒有移用另一篇研究的方法、資料或任務配置。原始2500×1406 WebP完整保存，播放器顯示設備局部，未修圖或改色。

[官方原圖](https://www.frontiersin.org/files/Articles/1319719/xml-images/fmars-10-1319719-g009.webp)。本地原圖為`assets/sources/auv-figure-9.webp`。

## 顯微照片

[Mo-Bjørkelund等，2024，Multi-vehicle adaptive 3D mapping for targeted ocean sampling](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0302514)，[Figure 7](https://doi.org/10.1371/journal.pone.0302514.g007)，CC BY 4.0。

- Panel b：*Phaeocystis pouchetii*的群體。攝影：Ane Cecilie Kvernvik。
- Panel c：藻華中的浮游植物群聚。攝影：Anette Wold。

原始2013×673 PNG完整保存於`assets/sources/figure-7.png`。播放器只顯示照片局部，沒有新增標記、修圖、估算尺度、細胞計數或影像分類。照片並非AUV拍攝，也不與開場的5 µm代表細胞或動畫中的特定瓶樣逐一對應。

顯微照片讓觀眾看見外形；前段瓶樣的葉綠素分析則是另一種量測，用來核對螢光與模型剖面。不能把顯微照片本身當作數值模型已驗證的證據。

## 顯示與時間

所有裁切均使用原始影像座標的viewport，原檔bytes保持不變；座標及雜湊見`assets/sources/display-panels.json`與`assets/sources/source-provenance.json`。沒有在照片上套用動畫的比例尺，也沒有推測原圖中無法判讀的尺度。

| 新時間 | 內容 | 原動畫時間 |
| --- | --- | --- |
| 0–35秒 | 細胞、尺度與海中分布 | 0–35秒 |
| 35–42秒 | LAUV設備參考照 | 暫停在35秒 |
| 42–89秒 | 沿路量測、資料交換、選點與採水 | 35–82秒 |
| 89–96秒 | Figure 7b顯微照片局部 | 暫停在82秒 |
| 96–103秒 | Figure 7c顯微照片局部 | 暫停在82秒 |

原先的260個生物參考點、光團縮放、25秒後隱去的位置標記，以及航點評分與抵達後更新的規則保留。照片期間只是顯示另一個圖層，沒有把參考點當成模型已知的真值。全片無音訊。
