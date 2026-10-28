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


# 05-04 Dynamic World：獨立來源稽核

2026-10-27。已閱讀 Brown 等人 2022 年完整開放論文 HTML、17 頁 PDF、分類及驗證表格，以及目前 Earth Engine 官方資料目錄。沒有執行研究模型、下載全球資料集或存取其他案例。來源與小型表格抽取約 5.6 MB，低於本輪 20 MB 限制。

研究：[Dynamic World, Near real-time global 10 m land use land cover mapping](https://www.nature.com/articles/s41597-022-01307-4)，Scientific Data 9，251，2022-06-09，DOI `10.1038/s41597-022-01307-4`。

目前產品：[Earth Engine Dynamic World V1 目錄](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1)，集合 `GOOGLE/DYNAMICWORLD/V1`。2022 年論文的測試結果與持續新增的產品資料分開記錄，不能把歷史驗證當成每一張新圖都重新驗證過。

## 提案最值得保留的三件事

1. **一格不只有一個顏色。** 模型為九個類別各估一個機率，再把最大者選成地圖標籤。保留整組機率，可以看出哪些分類接近、哪些差別較明顯。
2. **換日期，標籤可能改變，原因要再看。** 每張合格 Sentinel-2 影像各自產生分類。季節、積雪、可見條件與分類混淆，都可能改變畫面的標籤；不是每次變色都等於土地永久轉換。
3. **結果仍要與參考標記比較。** 作者的主要測試中，模型單景 Top-1 標籤與 Expert Consensus 的整體一致率為 73.8%。這不是每格都具有 73.8%的正確機率，也不是所有地區、年份的全球固定精度。

適合一般讀者的主句：

> 衛星每拍到一張可用影像，模型就判斷這片地當時較像哪一類。顏色是最可能的答案；其他類別的機率，提醒我們哪些地方還不容易分清。

這是科普用的概括；下列內容保留完整定義與限制。

## 九類機率與 label

### 已確認的資料結構

官方目錄明列九個 0–1 的機率波段，以及一個 0–8 的 `label` 波段。對未被遮罩的有效像素，九類機率合計為 1；`label`是機率最高波段的索引，也就是 argmax。`label`不是第十種機率。[官方目錄 Description、Bands](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1)；論文 PDF 第 9 頁 Data Records、Table 2。

| label | 波段名稱 | 建議中文 | 官方顏色 |
| ---: | --- | --- | --- |
| 0 | water | 水域 | `#419bdf` |
| 1 | trees | 樹木與密集高大植被 | `#397d49` |
| 2 | grass | 草地 | `#88b053` |
| 3 | flooded_vegetation | 淹水植被 | `#7a87c6` |
| 4 | crops | 農作地 | `#e49635` |
| 5 | shrub_and_scrub | 灌叢與疏生植被 | `#dfc35a` |
| 6 | built | 建成區與人工地表 | `#c4281b` |
| 7 | bare | 裸地 | `#a59b8f` |
| 8 | snow_and_ice | 雪與冰 | `#b39fe1` |

中文是對讀者的解說，不改動原始類別。圖例應保留英文名稱或來源對應。**本案的 label=0 是有效的水域類別，不能沿用前案海草檔案「0=NoData」的處理。** 缺值、雲與雲影遮罩要另外保存，不能補成水域或其他類別。

### Top-1 機率不能怎麼說

- Top-1 是該格九個模型機率中的最大值；它不等同 Trees 的面積覆蓋率、森林健康程度或實測比例。
- 本論文及官方目錄沒有提供把每個 Top-1 值轉成已驗證、校準正確率的證據。不能說「這格顯示 0.8，所以有經驗證的 80%機率判對」。這是對可見證據的界定，不是宣稱作者做過校準且證明失敗。
- 九類機率相加為 1，不代表一格中九種地表的實際面積比例相加為 100%。
- 最大值仍可能不高，或第一、第二名很接近。選出一個標籤，不等於其他可能性消失。
- 官方建議可依 Top-1 機率設定篩選門檻，但沒有提供適用所有地區及目的的單一保證門檻。篩掉低值會改變保留範圍，不能把剩下的格子稱為全部已確認正確。

論文的機率討論位於 PDF 第 12–14 頁 Usage Notes；官方目錄特別指出，農作等需要時間資訊才容易定義的類別，在單張影像缺少明顯線索時，最高機率可能較低。乾旱地區的高反射地表、沙地與日光反射也可能出現類似情形。[官方機率說明](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1#description)

如果動畫需要一組數字示範加總與最大值，必須二選一：從實際資料讀出並保存像素位置、影像 ID 與九類值；或明標「概念數值」。不能把自行填的機率疊到正式影像上，當作作者對該位置的輸出。

## 單景、雲遮與更新頻率

| 項目 | 來源已確認內容 | 不能延伸成 |
| --- | --- | --- |
| 單景對應 | 每個 Dynamic World 影像資產對應一個 Sentinel-2 L1C 資產，名稱可配對。模型利用單張影像的光譜與周圍空間線索進行分類。 | 先把整年影像看完，才給每一天同一種永久土地類別。 |
| 開始日期 | 官方目錄從 2015-06-27 起提供歷史與持續新增資料。 | 每個地點自該日開始都有同樣密度的有效觀測。 |
| 重訪 | Sentinel-2 約每 2–5 天重訪，會隨緯度改變。 | 每天都有新圖，或每 2–5 天每格一定都有可用分類。 |
| 整景篩選 | 目前官方目錄使用 `CLOUDY_PIXEL_PERCENTAGE <= 35%` 的影像。 | 影像中所有像素都沒有雲，或分類信心至少為 65%。 |
| 像素遮罩 | 結合 S2 Cloud Probability、Cloud Displacement Index 與 Directional Distance Transform 排除雲及雲影。 | 能把每個殘留雲、雲影和錯誤都消除。 |
| 持續更新 | 新的合格 Sentinel-2 影像與雲資料到達後，可自動產生輸出。 | 對現地即時直播，或對任何地區承諾固定延遲。 |

依據：[官方目錄](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1)，論文 PDF 第 3–4 頁遮罩方法、第 7–9 頁推論與資料紀錄。論文第 8 頁說當時 Dynamic World 的產出頻率因整景雲量篩選約為衛星重訪的一半；這是當時全球流程描述，不能據此替每個地點排出固定 4–10 天日程。

論文第 3 頁的 65%是 S2 Cloud Probability 用於雲遮罩的門檻，與地表 Top-1 機率、整景 35%雲量篩選是三件不同的事。它們不應共用「可信度」一個籠統標籤。

後續素材至少保存日期、配對的 Sentinel-2 ID、地理範圍、有效遮罩，以及產品的 `dynamicworld_algorithm_version`、`qa_algorithm_version`。若用月或年彙整，明示採平均機率、眾數標籤或其他方式，不能把彙整圖說成某一天的原始輸出。

## 訓練與獨立測試究竟是什麼

- 訓練資料蒐集以全球三個大區及生物群系分層，影像區塊為 510 × 510 像素，主要取自 2019 年。論文記錄 25 位具影像判讀／遙測經驗的專家標註約 4,000 塊，另 45 位受訓非專家標註約 20,000 塊。圖 1 說這些區塊用於訓練及期間測試，不包括最後的 409 塊驗證資料。依據：PDF 第 2 頁 Training dataset collection、Fig. 1。
- 每個最終測試區塊由三位專家與一位非專家各自標註，共 409 塊、1,636 份標註。這不是 409 個現地樣點，也不是四人投票後才送進模型。依據：PDF 第 9 頁 Technical Validation。
- 論文明載，最終測試影像及相同位置的其他影像，都沒有提供給訓練；409 塊也排除於訓練及 online validation。測試的重點是模型對未見過影像的表現。依據：PDF 第 9、11 頁。
- 人工標註是多邊形密集描繪，最小標註單位為 50 × 50 公尺，即 5 × 5 個 10 公尺格子；這和模型輸出的 10 公尺格子不同。標註者也參考高解析衛星圖、可用的街景、影像日期及座標，不能全部稱為水準一致的現地真值。依據：PDF 第 2 頁與 Fig. 2。
- 使用全卷積神經網路 FCNN，結合人工標註及合成影像的弱監督途徑；標註時看的是 Sentinel-2 L2A，模型訓練／推論配對使用 L1C。不能移用前案 DenseNet 或隨機森林的名稱。依據：PDF 第 3、5–7 頁。

原始論文方法：[全文 Methods](https://www.nature.com/articles/s41597-022-01307-4#Sec2)。本案未重跑模型，也未逐筆重驗標註；上述為作者方法與公開表格的核對。

## 驗證主要數字及加權問題

### 可以放進科普主結論的 73.8%

**比較對象是 Dynamic World 單張影像的 Top-1 標籤，對照作者定義的 Expert Consensus 參考。** 它不是三位專家百分之百一致的最嚴格子集，也不是非專家與專家之間的比較。

正式 Table 7 共 68,137,571 個納入比較的像素，對角線一致計數為 50,299,775。兩者相除為 73.82091%，與作者報告的 73.8%一致。[Table 7](https://www.nature.com/articles/s41597-022-01307-4/tables/8)；PDF 第 10 頁表格、第 11 頁解釋。

**73.8%是將測試矩陣的像素計數合在一起算的一致率。** 每個納入計數的像素等重；類別出現較多的像素，也在總體比率中占較大份量。它不是九個類別等權平均，不是把 409 塊各自精度等權平均，也不是依全球真實土地面積比例做設計權重校正。從同表重算，九類 recall 的等權平均約為 67.71485%，可確認不是 73.8%的計算法。這個額外平均只作本次核算，不建議新增為網站研究指標。

68,137,571 是納入比較的像素總數，不是同樣多個統計獨立現地樣本。來源的空間群聚、排除遮罩與專家標記選擇不能消失在「樣本數很大」的說法中。

建議可見文字：

> 在保留的 409 塊影像中，作者比較模型標籤與專家共識。納入比較的像素，整體一致率約為 73.8%；不同地表類別的表現仍有差異。

註記：

> 單景分類與參考標記的一致率，不是全球每格的正確機率。

### 相近數字不能混在一起

| 正式表號 | 比較對象 | 作者報告的一致率 | 本次由矩陣重算 | PDF 頁 |
| --- | --- | ---: | ---: | ---: |
| Table 5 | 非專家標記 vs Expert Consensus | 77.8% | 77.77047% | 9 |
| Table 6 | 模型 Top-1 vs Three Expert Strict | 88.4% | 88.37381% | 9 |
| Table 7 | 模型 Top-1 vs Expert Consensus，主要指標 | 73.8% | 73.82091% | 10–11 |
| Table 8 | 模型 Top-1 vs Expert Majority | 71.3% | 71.33059% | 10 |
| Table 9 | 模型 Top-1 vs Expert Simple Majority | 77.8% | 77.75672% | 11 |

其中最嚴格的 Three Expert Strict 指三位專家都有標註且一致。它只保留較容易達成一致的參考像素，所以 88.4%不宜用來替換主要 73.8%，更不能演成模型經改進從 73.8%升到 88.4%。[Tables 5–9 原始頁](https://www.nature.com/articles/s41597-022-01307-4/tables/6)

非專家與三專家嚴格一致子集的 91.5%則在 Table 4，仍不是模型表現。[Table 4](https://www.nature.com/articles/s41597-022-01307-4/tables/5)

### 若要延伸到 Trees，兩個比例要成對解釋

Table 7 中，Trees 的 precision／user's agreement 為 70.2%，recall／producer's agreement 為 93.2%。前者以模型標成 Trees 的像素為分母，後者以參考標成 Trees 的像素為分母。不能挑 93.2%就說「辨認森林準確率 93.2%」。Grass 的兩值為 30.1%與 33.8%，也顯示整體 73.8%不能代表每一類。

這些細節適合結果頁展開表，不建議與主動畫的九類機率同幕堆放。機率值、分類一致率與生態變化判斷是不同層次。

### 跨產品比較的條件

Table 10 的 ESA CGLS ProbaV 2019 為 66.3%、Dynamic World 為 73.8%，差為 **7.5 個百分點**；不要改成相對增加 7.5%。比較前做了類別對應與最近鄰放大，不代表 100 公尺原圖真的增加為 10 公尺細節。

LCMAP 2017 的 75.0%只用 48 塊區域影像，且類別對應需合併 grass／shrub；不能和 409 塊的 73.8%畫成完全同條件競賽。首輪科普不需要加入這組排名。[Table 10](https://www.nature.com/articles/s41597-022-01307-4/tables/11)；PDF 第 11–12 頁。

## 不能把測試混淆矩陣直接拿來校正地方或全球面積

論文 PDF 第 14–15 頁 Usage Notes 的原句核心是：

> “our confusion matrices are not population confusion matrices and thus cannot be used to estimate population parameters.”

限制有具體原因：Dynamic World 是持續新增的影像集合，使用者可以選日期、做月／年彙整、重新合併類別或設定門檻。不同選擇會形成不同的最終地圖與目標像素母體。因此，測試中的 409 塊與 Table 7 不能自動代表任一地方、任一月份或任一重新分類後的完整母體。[Usage Notes](https://www.nature.com/articles/s41597-022-01307-4#Sec13)

若要估計使用者衍生地圖的精度或校正類別面積，需要先明確定義該張地圖、時間與分類方式，再依對應母體設計機率抽樣及參考判讀。若借用其他地圖的分層參考樣本，估計方法還要處理原抽樣分層圖與新地圖之間的差異。這是作者第 15 頁提出的條件，不是說 Dynamic World 永遠不能做面積統計。

因此，本案可以展示作者已公布的分類與實際像素機率；若本輪未另做適當的誤差與抽樣設計，就不能拿 Table 7 直接算「校正後森林面積」、宣稱全球面積有 73.8%準確，或將數個像素變色換算為已證實的森林流失量。

## Trees 與生態解釋的界線

[正式 Table 1](https://www.nature.com/articles/s41597-022-01307-4/tables/2)，PDF 第 3 頁，將 Trees 描述為明顯聚集、通常具閉合或密集冠層的較高大植被。例子包括樹木植被、密集綠色灌叢、稀樹草原中的高大植被群、蘋果／香蕉／柑橘／橡膠等種植區、沒有明顯水面的高密植被沼澤，以及這些區域燒過後的情況。

因此 Trees 不能直接改名為「天然森林」「完整森林生態系」或「健康森林」。它不是逐株樹木計數、樹種辨識、樹高、樹齡或碳量。相反地，一處生態上仍是森林的地方，在單景影像中也可能因積雪或當時可見狀態被分到其他類別。

論文 Fig. 9 給出美國麻薩諸塞州落葉林的實際例子：生長季較可能標為 Trees，積雪時可變為 Snow & Ice，春季未展葉時 Shrub & Scrub 機率提高。這正適合解釋「標籤變了，要看原因」，不能演成樹林每季被砍掉再長回來。來源：PDF 第 12–13 頁 Usage Notes、Fig. 9。[原論文 Fig. 9](https://www.nature.com/articles/s41597-022-01307-4/figures/9)

Flooded vegetation 也描述影像中植被與水明顯混合的狀態，不等於所有長期濕地。Table 1 明說不能因另一張影像有水，就認定目前影像也淹水。這個區別可用來說明單景分類與長期棲地定義的差別。

## 已發現的原文／表格不一致

以下不影響 Table 7 的 73.8%算術核對，但需要避免把有歧義的細節改寫成動畫規則。

1. **專家投票方案的文字。** PDF 第 10 頁正文對 Expert Consensus、Expert Majority、Expert Simple Majority 的描述，與 Tables 7–9 表題不完全一致。尤其正文的 Expert Consensus 包括僅一人有意見的情況，但 Table 7 表題寫至少兩人標註且一致。本次不自行選一種說法修正作者；主文稱「作者定義的 Expert Consensus」並保留表號，不演示逐票邏輯。Three Expert Strict 的三人皆標且一致則清楚。
2. **Table 5 的 n。** PDF 第 9 頁 Table 5 註記寫 n=58,963,662，但正式表格內全部 10×10 計數加總為 67,404,017，對角為 52,420,419；其比率 77.77047%與報告 77.8%相符。不要引用註記 n 作新推論，差異原因未查明。Table 7 的 n=68,137,571與加總一致。
3. **名目分層數與實際測試塊數。** 第 9 頁的 140＋130＋140名目抽取數合為410，但正文多處、1,636份標註與資料紀錄一致使用409。本文採409，不補造少一塊的原因。
4. **網址編號與正式表號不同。** Nature 的 `/tables/1`是文章前方未編號的量測摘要，因此正式 Table 1位於`/tables/2`，正式 Table 7位於`/tables/8`。本地原件檔名的數字沿網址路徑，抽取JSON另外記正式表題；引用時不能只看檔名數字。

## 可直接使用的簡短說法

| 用途 | 建議文字 |
| --- | --- |
| 研究問題 | 同一片地，這次衛星拍到的樣子，和上次一樣嗎？ |
| 九類與機率 | 模型為九種地表各估一個機率，再把最高的一類畫成地圖顏色。 |
| 保留猶豫 | 最高的一類不一定很明確；第二、第三種可能性也值得看。 |
| 時間 | 有新的可用衛星影像，才有新的判讀。雲和雲影遮住的地方，不能當作每天都有觀測。 |
| 結果 | 在作者保留的409塊影像中，模型與專家共識的整體一致率約為73.8%。 |
| 限制 | 顏色改變，可能是地表真的變了，也可能與季節、積雪或分類混淆有關；需要回看影像與其他資料。 |
| 結論 | 地圖讓我們更快注意到可能的變化，機率與原始影像則幫助判斷哪些地方還要查證。 |

避免「AI每天監控全球」「每10公尺都量過」「0.8就是80%判對」「Trees等於天然森林」「把樹木數出來」「73.8%可校正所有面積」等說法。

## 授權與保存證據

- 論文為 CC BY 4.0；圖版及第三方內容原則上適用文章授權，除非個別 credit 另有說明。重製或改編時仍須查看該圖署名、標出出處與修改。尤其含 Google Maps 參考影像的圖，不只憑論文開放狀態就略過圖中第三方來源。
- Dynamic World 資料為 CC BY 4.0，官方要求署名：`This dataset is produced for the Dynamic World Project by Google in partnership with National Geographic Society and the World Resources Institute.` 並保留 modified Copernicus Sentinel data 的說明及實際使用年份。[官方使用條款](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1#terms-of-use)
- 已保存完整論文 HTML／PDF、官方目錄 HTML、必要原始表格頁。`audit-tables-extract.json`保留原表逐格文字；`audit-matrix-check.json`保留 Tables 5–9 的計數矩陣、對角和、總數與比例重算。
- `audit-acquisition.json`記錄實際取得網址、日期、檔案大小與SHA-256。本次只有小型文件與表格，沒有資料集影像、全球光柵、模型權重或重新推論結果。

來源名稱均以 `sources/audit-`開頭。本報告未新增未經來源支持的模型分數；沒有 TeX 公式。
