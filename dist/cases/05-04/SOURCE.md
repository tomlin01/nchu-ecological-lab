# 05-04 Dynamic World：已取得的實證素材

2026-10-27。已取得一個作者公開驗證影像塊的原始九類機率、預測標籤及專家共識標註，並配對同次 Sentinel-2 觀測的 L2A RGB。所有分數直接來自 float32 GeoTIFF；沒有由 PNG 猜分數，沒有執行模型、使用使用者 GEE 憑證或付費 API。

**這組資料可以直接支持「同一個標籤，支持程度不同」。** A、B 都被標為建成區；A 的最高分為78.8%，B為28.6%，B的第二名水面為24.5%。這是兩個教學選點，不是代表性抽樣，也不表示分數等於正確率或建物覆蓋比例。

## 展示檔案

檔案在 prototype-v01/assets/。所有局部圖都由同一512×512、10公尺網格輸出成1536×1536 PNG，使用最近鄰放大，沒有補出新的空間細節。

| 檔案 | 角色與讀法 |
| --- | --- |
| s2-reference-rgb.png | 同次觀測的L2A參考影像，B04／B03／B02真彩色；不是作者原L1C輸入位元組 |
| dw-label.png | 作者封存的Top-1預測標籤，沿用官方九類色碼 |
| dw-top1.png | 九類原始機率的最大值，固定0–1連續色階；沒有hillshade，不表示地形高度 |
| dw-threshold-05.png | 本案教學門檻：只保留原始Top-1至少0.5的標籤；其餘透明 |
| reference-label.png | 保留來檢查的專家共識參考。未標註區透明，不能當成水面或其他類別 |
| disagreement.png | 只在模型與專家參考都有有效值之處，標出「與專家參考不一致」；不是現地真相判定圖 |
| source-data.json | 原生網格、影像身分、九類順序、A/B座標及原始float、顯示文字、遮罩、門檻、來源及檔案雜湊 |
| dw-paper-figure2.png、dw-paper-figure4.png、dw-paper-figure6.png | 論文完整原圖；角色與可裁區見figure-data.json |
| figure-data.json | 原圖URL、完整圖說、來源／展示檔雜湊、尺寸、裁區與授權說明 |

## 原始資料來源與版本

[Brown等（2022）論文的Data Records](https://www.nature.com/articles/s41597-022-01307-4)明列409個驗證影像塊與其預測結果封存於[Dynamic World Test Tiles，Zenodo v2](https://zenodo.org/records/4766508)，DOI **10.5281/zenodo.4766508**。該紀錄列CC BY 4.0。此處使用的是該歷史驗證資料，不稱為今天Earth Engine服務即時計算的結果。

公開ZIP大小3,897,915,689 bytes。本輪只用HTTP Range取得ZIP中央目錄、meta.csv及所選影像塊的兩個必要成員；每個成員都驗證解包長度、ZIP CRC32，再記錄SHA-256。沒有下載整個ZIP。

所選影像塊：

- tile ID：dw_-88p4740709175_44p2043471326-20190608。
- 位置：美國威斯康辛州Fox Valley一帶。
- 日期：2019-06-08。
- meta.csv對應Sentinel-2 ID：20190608T164849_20190608T170119_T16TCQ。
- 原始機率檔：probs_dw_-88p4740709175_44p2043471326-20190608.tif，10,627,336 bytes。
- 原始標籤檔：label_dw_-88p4740709175_44p2043471326-20190608.tif，29,598 bytes。
- 完整原檔、成員記錄及雜湊在sources/assets-v01/；source-data.json也直接記錄兩個TIFF的SHA-256。

九個機率band的順序從TIFF自身descriptions讀取，並對照[官方目錄](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1)：water、trees、grass、flooded_vegetation、crops、shrub_and_scrub、built、bare、snow_and_ice。

實際標籤TIFF的兩個band依序叫label、lulc。讀取按名稱，不假設順序：label為0–8的預測類別；lulc為1–9的專家共識類別，0表示沒有人工標註。將lulc減1之前先排除0，沒有把無標註區改成water。

## RGB的身分與配準

RGB來源為[Sentinel-2 Cloud-Optimized GeoTIFFs公開資料](https://registry.opendata.aws/sentinel-2-l2a-cogs/)，由Element 84在AWS提供原始Sentinel-2產品的COG形式，無需帳號。查詢紀錄與選定STAC item已保存在sources/assets-v01/。

選定item為S2B_16TCQ_20190608_0_L2A，完整產品ID：

`S2B_MSIL2A_20190608T164849_N0212_R026_T16TCQ_20190608T210645.SAFE`

觀測時間為2019-06-08T17:01:26.615Z；它與驗證資料meta.csv的MGRS影像塊、觀測日期及datatake相符。使用2019年原處理baseline02.12的產品，沒有拿後來另一日期影像替代。

本輪按window讀取TCI.tif的[col7967,row10186,width512,height512]；沒有下載整幅Sentinel場景。TCI是已由提供方渲染的uint8真彩色，colorinterp為red、green、blue，來源對應B04／B03／B02。本輪不另加gamma、對比、銳化或色調處理。STAC中獨立反射率band的scale=0.0001、offset=0，不應再套到這份已渲染的TCI bytes。

**畫面旁必須保留：同次觀測的L2A參考影像，非作者原L1C輸入位元組。** Dynamic World模型使用L1C；本頁展示現成作者預測，不能用新RGB進入模型的箭頭暗示本頁重新推論。

RGB、機率、預測標籤及專家參考的實際網格完全一致：

- EPSG:32616。
- 10×10公尺。
- transform：[10,0,379670,0,-10,4898180]。
- UTM bounds：[379670,4893060,384790,4898180]。
- 原生大小512×512，實際每邊5120公尺；論文約略稱5.1公里，不把它強改成510像元。

## A、B的真實數字與選點規則

| 項目 | A | B |
| --- | ---: | ---: |
| 原生row、col，從0起算 | 457、351 | 269、258 |
| Top-1類別 | 建成區 | 建成區 |
| 建成區原始分數 | 0.7875185012817383 | 0.28583836555480957 |
| Top-1顯示值 | 78.8% | 28.6% |
| Top-2類別 | 裸地 | 水面 |
| Top-2原始分數 | 0.03870166465640068 | 0.2447221577167511 |
| Top-2顯示值 | 3.9% | 24.5% |
| 教學門檻0.5是否保留 | 是 | 否 |

九類顯示值如下；所有原始float另存source-data.json。

| 類別 | A | B |
| --- | ---: | ---: |
| 水面 | 2.2% | 24.5% |
| 樹木 | 2.2% | 15.2% |
| 草地 | 2.7% | 5.5% |
| 淹水植被 | 2.4% | 6.3% |
| 作物 | 2.4% | 7.2% |
| 灌木與灌叢 | 2.7% | 4.3% |
| 建成區 | 78.8% | 28.6% |
| 裸地 | 3.9% | 3.4% |
| 冰雪 | 2.9% | 5.1% |

各項獨立四捨五入，因此A顯示總和100.2%、B為100.1%；沒有靜默調整其中一類。長條寬度使用原始float，圖說保留四捨五入提醒。

選點規則先由模型分數和空間位置決定：選取含全tile最高有效Top-1的建成區類別；A是該類最大Top-1；B在相同類別、Top-1低於0.55且與第二名差小於0.05的候選中，取最靠近影像中心者。沒有用是否與專家一致來挑點。兩點恰好都有建成區專家標記，這不會把模型分數變成經校準正確率。

此tile的最高分就是0.7875，沒有為符合預設範例而捏造0.9。建議文字為「A的支持較集中；B的前兩名較接近」，不寫「A一定正確、B一定錯誤」。

## 遮罩、專家對照與教學門檻

原機率TIFF沒有設定nodata值，但有2個像元的九個band皆為NaN。先排除非有限值，262,142個有效像元的九類和介於0.9999998807907104至1.0000001192092896；在2e-7容許差內。有效像元的published label與原始九band argmax完全一致，沒有不一致像元。

原檔沒有另一個band說明這2個NaN分別是不是雲或陰影。可說「原始資料無有效分數」，不能另造一張雲遮罩。

專家對照只在expert1–9且模型有效之處進行，共231,771像元；其中199,264與參考一致、32,507不一致。這些是輸出核對計數，不另報成整體資料集準確率，也不混用論文409 tiles的整體測試數字。未標註／無模型分數的30,373像元透明。

0.5門檻完全由本地已取得分數計算，不是重跑模型，也不是論文推薦的通用閾值：

- 保留：174,290像元。
- 模型有效、但被本次門檻排除：87,852像元。
- 原始無有效分數：2像元。

原生mask另存dw-threshold-05-mask.tif：0=原始無效、1=有效但被門檻排除、2=保留。source-data.json保留各數量與定義。PNG的透明同時可能來自篩選排除或原始無效，因此**留白不是沒有土地覆蓋**。

## 論文圖版

主文為CC BY4.0，允許署名後重用與改編；第三方素材依個別credit line處理。已讀各圖圖說並看完整保存圖片，Fig.2、4、6未見另列權利排除。Fig.10含Google Maps Satellite參考影像，本輪不將它當作可任意改編發布的全圖。

| 原圖 | 原始尺寸 | 使用角色／注意事項 |
| --- | --- | --- |
| [Figure 2](https://www.nature.com/articles/s41597-022-01307-4/figures/2) | 1708×648 | Sentinel-2與供訓練解說使用的人工參考標註。不是本輪Wisconsin held-out tile，也不是模型預測 |
| [Figure 4](https://www.nature.com/articles/s41597-022-01307-4/figures/4) | 1689×993 | 方法訓練流程。右下方為synthesized Sentinel-2，不能裁出來冒充真實照片 |
| [Figure 6](https://www.nature.com/articles/s41597-022-01307-4/figures/6) | 1429×1253 | Brazil與Poland的真實RGB及對應DW結果。Poland右圖是Top-1 hillshade呈現，不是海拔或從圖片反算的九分數 |

完整原檔在sources/assets-v01/paper-figure*-full.png，展示檔是逐位元複製。figure-data.json提供像素裁區；裁切時保留原地點、日期、圖例或忠實文字等價物，並註明裁切。不要把原圖色彩重新配成案例UI色票。

完整署名可用：Brown et al. (2022), Scientific Data 9:251, Figure N, CC BY4.0；依實際處理加「裁切」。Dynamic World資料署名依官方目錄可用：

> This dataset is produced for the Dynamic World Project by Google in partnership with National Geographic Society and the World Resources Institute.

RGB另署名Contains modified Copernicus Sentinel data 2019，並列AWS Open Data／Element 84的取得管道。資料和圖版的細節不要只藏在工程檔，頁面至少保留可讀的來源連結。

## 驗證、大小與重跑

sources/assets-v01/verification.json記錄最終66項檢查全部通過，含ZIP成員CRC／SHA、九band順序和值域、機率和、label=argmax、三種資料網格、A/B原始數字、PNG原生像元對應、專家1-index轉換、門檻三種mask狀態，以及論文原圖副本雜湊／裁區界線。

已直接開啟RGB／label／Top-1檢視圖、A/B位置檢視圖、專家參考、不一致圖、門檻圖和三張完整論文圖。這是素材核對，不是使用者接受或重新驗證模型。

資料與展示素材共約22.5 MB；Zenodo Range傳輸約10.35 MB。未使用GEE憑證、未註冊服務、沒有API消費。Google官方模型Notebook只讀未執行；它要求Earth Engine認證，本輪沒有採取該路徑。

在保留的原始資料與STAC紀錄下可重跑：

```sh
uv run --python 3.11 --with rasterio --with pillow --with requests python work/ecology-ai-rollout/cases/05-04/prepare-assets-v01.py
```

source-data.json最終SHA-256：991dfd8efadb9048ca1e94a949fe3bcdc94cdb41786eb9b26e3ff2b641075019。處理腳本與輸出雜湊均綁定在verification.json。本輪未修改其他案例或canonical網站。
