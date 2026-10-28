# 05-03：海底的草地，變少了嗎？

116秒獨立動畫，使用實拍與作者公開分類範圍。本頁沒有重跑分類模型，也沒有取得新的現地觀測。

## 實拍情境

- Heather Dine／NOAA Photo Library，Florida Keys海草床，sanc0209。
- [來源頁](https://commons.wikimedia.org/wiki/File:Sanc0209_-_Flickr_-_NOAA_Photo_Library.jpg) · [原始JPEG](https://upload.wikimedia.org/wikipedia/commons/4/45/Sanc0209_-_Flickr_-_NOAA_Photo_Library.jpg) · [CC BY2.0](https://creativecommons.org/licenses/by/2.0/)。來源頁另標為NOAA公有領域作品；本頁依CC BY署名條件記錄。
- `assets/context/seagrass.jpg`保留1780×1136原始位元組；只在展示時裁切、緩慢縮放。詳細hash與來源見同目錄`provenance.json`。
- 這張照片不是Tampa Bay，不是2019／2024的成對觀測，也沒有從照片計算植株數、覆蓋率或物種。

## 兩期海草標示範圍

[Peng等的Global10-meter seagrass maps v1](https://zenodo.org/records/18612240)，DOI10.5281/zenodo.18612240，CC BY4.0。兩期為2019–2020、2023–2024。用公開ZIP的Range下載必要壓縮成員，未下載全球包。

兩期來源TIFF的CRS、transform與bounds完全一致。按Tampa Bay輪廓及可讀性選擇相同AOI，沒有按淨減少的方向挑範圍。從原生網格讀出相同視窗，再以最近鄰製成展示圖。色彩與局部裁切由本頁製作，不是原始衛星照片。

`assets/maps/map-data.json`記錄所有來源與處理：原始TIFF SHA-256／ZIP CRC、原生視窗、座標、投影、類別、像素集合核對、最近鄰處理、出圖尺寸及5公里比例尺的計算。

**來源只有1=有海草標示，0=NoData。** 無法用0分開可靠的非海草、未觀測與背景。差異圖因此只標「兩期有標示／僅前期有標示／僅後期有標示／兩期皆無標示」。它不是現地證實的loss/gain，不能由留白宣稱死亡。

兩個GDAL mask的交集只表示兩期共有的海草標示，不是共同可判讀海床的完整遮罩。本頁不將無資料填成非海草，也不把像素數乘100平方公尺計算地方流失面積。原生EPSG4326角度網格在Tampa Bay中心每格地面寬、高約8.85與9.95公尺，產品名稱的10公尺是名目尺度。

`detail-*`為同一位置的40×40原生格，放大到800×800，沒有插值生成新分類。選取位置為AOI中心附近最近的海草標示點，沒有按變化方向挑點。定位方框與細節地理範圍見map-data.json。

背景線條為[Natural Earth coastline](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-coastline/)，[公有領域](https://www.naturalearthdata.com/about/terms-of-use/)，實際資料版本5.0.0-pre9。這裡的10m指1:1000萬圖幅尺度，不是10公尺精度。海岸線只協助定位，沒有用來判斷水域、海草或有效觀測。

## 方法、結果與限制

[Peng等2026年Nature論文](https://www.nature.com/articles/s41586-026-10704-3)，DOI10.1038/s41586-026-10704-3。本次核對公開摘要、正式補充DOCX／XLSX、公開作者回覆與[公開推論程式](https://zenodo.org/records/18212209)，沒有取得訂閱正文或重現全套研究。

- 方法圖依公開DenseNet程式的20×20影像窗、中心位置影像特徵及推估水深解釋。格子顏色是概念，不是作者影像、模型熱圖或信心值。
- 兩套模型為熱帶／溫帶；熱帶才另分密集／稀疏。覆蓋概念圖沒有精確門檻、株數或地方觀測值。
- 5,969平方公里是作者公布的兩期淨減少，已扣掉新增；不是所有消失斑塊總和。定義經公開作者回覆第20、31頁核對。
- 6,221平方公里是熱帶密集轉稀疏的單方向面積，未扣除變密，不能和淨減少相加當完全消失面積。
- 正式Supplementary Table3列9,383筆分類評估；約85%整體正確率、76.5%海草producer accuracy、93.2%海草user accuracy。原計數可重算，但這不是本頁重驗模型，也不是變化正確率。
- 正式國別表加總與摘要整數有小幅差異，本頁保留作者公布整數與「約」。不使用國別net loss rate欄做百分比動畫，避免該欄比例／百分比標示不一致。

區間、原表位置與公開回覆版本的詳細核對保存在案例工作目錄`source-audit-v01.md`，派生算術核對在`sources/root-matrix-check.json`。分類結果、概念示意、現地觀測與全球研究結果保持分開。
