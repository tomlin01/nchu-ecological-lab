# 05-03 網頁來源與呈現

網頁沿用使用者已接受的116秒prototype-v01。`animation/`保留所有接受版原檔與原始雜湊，包括當時的manifest與驗證紀錄；它們是獨立動畫的歷史快照。網站目前狀態以本層manifest及案例工作目錄web-review-v01為準。

完整研究、照片與資料說明見 [animation/SOURCE.md](animation/SOURCE.md)。本頁沒有執行研究模型或建立新現地觀測。

## 主視覺與延伸

- 首屏實拍：Heather Dine／NOAA Photo Library，Florida Keys海草床，CC BY2.0；來源頁亦標為NOAA公有領域作品。[來源](https://commons.wikimedia.org/wiki/File:Sanc0209_-_Flickr_-_NOAA_Photo_Library.jpg) · [授權](https://creativecommons.org/licenses/by/2.0/)。原始JPEG位元組保持，僅CSS裁切；不是Tampa Bay前後照片。
- 首屏地圖：Peng等公開海草圖資v1，DOI10.5281/zenodo.18612240，CC BY4.0。[作者資料](https://zenodo.org/records/18612240)。三態圖使用相同範圍、網格、比例尺及方向。原已驗證PNG不改。
- 第二頁：同一個原生40×40格視窗的兩期資料。定位框、裁切範圍及縮放方式見 `animation/assets/maps/map-data.json`。不是補算細節或模型新輸出。
- 0=NoData不能區分可靠非海草與未觀測／背景。圖上的差異只稱標示差異，不據此計算Tampa Bay生態流失面積。
- 海岸線取自Natural Earth公有領域資料，僅作粗略定位；圖幅1:1000萬不等於10公尺岸線精度。

## 研究數字

[Peng等（2026）](https://www.nature.com/articles/s41586-026-10704-3)比較2019–2020與2023–2024，公開摘要報告減少約5,969平方公里及熱帶約6,221平方公里密轉疏。作者公開回覆進一步說明，5,969是扣除新增後的淨減少，轉疏是單方向而非扣除變密的淨值。

[正式Supplementary Information](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41586-026-10704-3/MediaObjects/41586_2026_10704_MOESM1_ESM.docx)的Table3包含9,383筆評估：76.5%海草檢出、93.2%標成海草後的一致率、約85%整體正確率。原矩陣已重算核對；不是本頁重新驗證模型，也不能稱逐格信心或變化正確率。

完整核對依公開摘要、正式補充DOCX／XLSX、公開推論程式及有版本區別的作者回覆；訂閱正文未取得。正式國別表加總與摘要整數有小量差異，本頁保留作者公布整數與「約」，不自行調整原數據。詳細邊界在工作目錄source-audit-v01.md。

## 接受與發布

使用者回覆「沒問題了，完成案例」，確認既有116秒動畫並授權製作網頁。網頁主視覺及四頁呈現是本輪新增，尚待使用者檢視；本輪只整合本機，未部署。
