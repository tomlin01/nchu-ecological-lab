# 05-02：研究、地圖與概念場景

## 研究依據

Lyons 等（2024），[New global area estimates for coral reefs from high-resolution mapping](https://doi.org/10.1016/j.crsus.2024.100015)。研究對30個製圖區的最終地貌圖與底質圖評估：平均整體正確率69%與66%，各區範圍46–89%與49–80%。這些是經模型分類、規則與專家修訂後的地圖表現，不是單一定位點的信心分數。論文圖版沒有裁切或重製於本頁。

資料版本以ACA v2.0與2024論文為基準；不混用後續海草或白化產品。影像拍攝年、2022地圖修訂與2024論文發表年不同。

- [ACA官方方法](https://www.allencoralatlas.org/methods/)
- [ACA資料與使用說明](https://www.allencoralatlas.org/resources/)
- [Google Earth Engine ACA v2.0目錄與圖例](https://developers.google.com/earth-engine/datasets/catalog/ACA_reef_habitat_v2_0)

## 兩張Abaiang分類圖

`assets/reef-map-geomorphic.png`、`assets/reef-map-benthic.png`沿用已驗證的原始繪圖檔，沒有裁切、換色或重畫邊界。依2026-10-26取得的官方WFS向量幾何與類別繪製，使用公布的v2.0色碼。不是衛星照片，也不宣稱與凍結ACA v2.0光柵逐格相同。

兩圖的範圍與投影相同。定位點172.86525°E、1.86975°N，地貌Outer Reef Flat（外礁坪）、底質Rock（岩石）。原始及裁切後幾何都核對該點位於所標類別，PNG像素顏色亦吻合。該點只是教學示例，沒有現地驗證或重新運行分類器。

透明區表示本圖未分類，不可直接視為深海、陸地或沒有珊瑚。約5公里比例尺按投影與定位緯度計算；它與研究產品5公尺網格不同。完整範圍、座標、圖例、來源雜湊見`assets/map-data.json`。

地圖 © Allen Coral Atlas Partnership and Arizona State University，CC BY 4.0。僅呈現必要局部範圍，沒有重新發布全球資料。

## 首屏、v09開場與118秒完整動畫

使用者於2026-10-26接受Three.js v09的海底場景。完整動畫為118秒，前20秒以v09即時渲染，後續以同一模型的渲染圖、官方分類圖與方法示意完成研究敘事。首屏`assets/05-02-reef-hero-v09.webp`是v09在9秒時、1600×900畫布的直接渲染輸出。動畫與首屏皆為概念海床，並非Abaiang地形重建、研究模型輸出或物種觀測。

四件Smithsonian CC0乾燥標本只提供部分外形：Pocillopora USNM81450與USNM44359、Diploria labyrinthiformis USNM74947、Pavona cactus USNM74851。來源連結與取得紀錄見`animation/assets/scans/SOURCE.md`、`animation/assets/scans/extra-SOURCE.md`以及相應provenance JSON。來源紀錄若提到Leptoseris，屬未使用的候選；它未放入網站。

場景顏色、礁床地形、82尾示意魚與水中光線由程式設定。礁床紋理由參考照片輔助生成；不把情境配色當作活體原色、健康判讀或物種鑑定。

使用者提供的[短片](https://www.youtube.com/shorts/XBiB_m8vCTg)僅作光色、距離與構圖參照；未將影片素材放入網站，也未依標題確認拍攝地。

## 網頁整合

`animation/`保留v09核心程式與素材的原始位元組。網頁由embed.html載入story-player.mjs、story-model.mjs與story-scene.mjs，處理118秒的單一時鐘、研究段落與既有網站橋接。核心只接收0–20秒seek，後半不持續重繪隱藏的3D場景。舊embed.js與embed.css屬保留的20秒橋接來源，不再由目前入口載入。沒有重新執行研究模型、計算新正確率，或把概念圖當作實測資料。

環境說明圖 assets/05-02-reef-overview-v09.webp 為相同模型0秒、1600×900畫布的直接輸出。礁坡／礁坪及材料標記依v09原始anchor投影至對應0秒／9秒畫面，不是研究分類器輸出。後半沒有使用早期生成剖面圖。原110秒MP4沒有替換、改標或連結為118秒新版。
