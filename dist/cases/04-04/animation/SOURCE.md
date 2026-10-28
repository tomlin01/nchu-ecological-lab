# 04-04 影片來源與呈現說明

本版為 96 秒、六幕的獨立動畫，以葉面積說明植物性狀地圖。研究依據是 Lusk 等人於 2026-01-30 發表的 [Crowdsourced biodiversity monitoring fills gaps in global plant trait mapping](https://www.nature.com/articles/s41467-026-68996-y)，Nature Communications 17，1203，DOI：10.1038/s41467-026-68996-y。

影片使用作者既有圖版與本次製作的教學示意。沒有重跑研究模型、量測葉片、產生新的性狀預測或單性狀 AOA 圖層。完整科學核對見 source-check-v01.json（工作檔 `../source-check-v01.json`），原始素材盤點見 asset-audit-v01.md（工作檔 `../asset-audit-v01.md`）。

## 四項素材

| 影片資產 | 來源原檔 | 尺寸 | 證據角色 |
|---|---|---|---|
| [leaf-context.png](assets/leaf-context.png) | 專案生成圖 master，見下方紀錄 | 1672 × 941 | imagegen 生成的植物情境。不是作者樣區、物種鑑定、訓練影像或葉面積量測。 |
| [observation-density.png](assets/observation-density.png) | author-observation-density-original.png（工作檔 `../sources/author-observation-density-original.png`） | 4710 × 1615 | 作者公開的兩類資料分布圖。呈現紀錄與調查的分布，不表示植物株數或性狀大小。 |
| [trait-maps.png](assets/trait-maps.png) | author-trait-maps-original.png（工作檔 `../sources/author-trait-maps-original.png`） | 1956 × 2811 | 作者公開的 COMB 性狀預測圖版。影片聚焦葉面積下方美洲切片，保留該區段的原色條。 |
| [spatial-transfer.png](assets/spatial-transfer.png) | author-spatial-transfer-original.png（工作檔 `../sources/author-spatial-transfer-original.png`） | 2757 × 2553 | 作者公開的空間適用性比較圖版。影片只顯示面板 e 的多性狀 AOA 範圍比較。 |

三張作者圖的影片副本均與上述本地來源檔逐 bytes 相同。生成圖與專案 master 也逐 bytes 相同。沒有裁切、改色或重新編碼這四張 PNG；局部顯示由動畫的 SVG 視窗完成。

生成圖 master：`outputs/ecology-ai-rollout-assets/04-04/context-v01/04-04-leaf-context-v01.png`，相對專案根目錄。相同資料夾的 `provenance.json` 與 `prompt.md` 記錄生成工具、提示與來源。工具原始輸出為 `/Users/tom/.codex/generated_images/01a14eb3-724c-7cf1-bbf8-1792efb4a702/exec-80b6f6e4-422e-4758-a67b-accf3aca9b0a.png`。本圖沒有研究攝影者或研究樣區的來源身分，不套用下述作者圖版授權。

## 作者圖版的版本、授權與署名

作者程式庫固定為 [dluks/cit-sci-trait-maps，commit 001df3006f81335c4489553b9900741e0bb611be](https://github.com/dluks/cit-sci-trait-maps/tree/001df3006f81335c4489553b9900741e0bb611be)，commit 日期 2026-01-16。根目錄 [LICENSE](https://github.com/dluks/cit-sci-trait-maps/blob/001df3006f81335c4489553b9900741e0bb611be/LICENSE) 為 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，本地副本見 author-LICENSE-original.txt（工作檔 `../sources/author-LICENSE-original.txt`）。

原始取得位置：

- 資料分布圖：[results/figures/obs_density.png](https://raw.githubusercontent.com/dluks/cit-sci-trait-maps/001df3006f81335c4489553b9900741e0bb611be/results/figures/obs_density.png)
- 性狀預測圖：[results/figures/trait-maps.png](https://raw.githubusercontent.com/dluks/cit-sci-trait-maps/001df3006f81335c4489553b9900741e0bb611be/results/figures/trait-maps.png)
- 空間適用性圖：[results/figures/spatial-transfer.png](https://raw.githubusercontent.com/dluks/cit-sci-trait-maps/001df3006f81335c4489553b9900741e0bb611be/results/figures/spatial-transfer.png)

署名可用「圖版：Daniel Lusk 等人，作者公開程式庫，CC BY 4.0；本片以局部視窗與中文導讀呈現」。這是呈現方式的改編，應保留論文、固定版本與完整原圖連結，不暗示作者替本片背書。這些 repo PNG 未與出版社圖檔逐 bytes 比對，因此稱為「作者公開圖版」，不稱為出版社原始圖檔。

## 葉面積與群聚示意

主線是 Leaf area，TRY 3113，單位 mm²。原始定義以單葉計，複葉以小葉計，是否包含葉柄未統一。[論文 Table 1](https://www.nature.com/articles/s41467-026-68996-y#Tab1)

地圖呈現由物種平均性狀建立的群聚性狀估計。sPlot 依物種相對覆蓋率計算群聚加權平均；GBIF 多來源的物種出現紀錄則形成觀察頻率加權的近似值。GBIF 包含公民觀察，也包含其他資料來源，不能把全部紀錄描述為手機照片或公民科學。觀察次數不等於植物株數。兩來源重疊時，COMB 優先使用 sPlot 的網格值。[Methods：性狀配對與空間彙整](https://www.nature.com/articles/s41467-026-68996-y#Sec14)

群聚教學舞台的兩種葉片與 0.75、0.25 比例，只用來說明權重改變會影響群聚平均。它們是自訂概念示意，不是原樣區、原始物種組成、人工標註或模型結果。畫面不提供葉面積數值，也不從生成圖推算物理面積。

「群聚平均葉面積」不能改稱單株葉面積、最大葉片、樹冠面積、葉面積指數，或一個網格內全部葉子的總面積。模型使用既有性狀與氣候、土壤、衛星等環境資料，沒有逐片讀取本片葉子照片來量面積。

## 地圖視窗與解析度

葉面積位於作者圖版第五欄。影片只用下半部美洲狹長切片，並顯示該切片原有的 mm² 色條。其範圍約為經度 −86 至 −62、緯度 49 至 −56，不是完整全球或整個南美洲。SVG 局部視窗是版面聚焦，原 PNG 保持完整。

作者 [trait_maps.py](https://github.com/dluks/cit-sci-trait-maps/blob/001df3006f81335c4489553b9900741e0bb611be/src/visualization/figures/trait_maps.py) 對上、下兩個區段各自取第 2 至第 98 百分位設定色階。因此本片不跨區段直接比色，也不把下方色條套到上方區段。

論文將原模型產品標為 1 km²。作者圖版顯示時另重投影為 EPSG:4326、0.04°，並作 average resampling。PNG 像素和影片像素不等於地面 1 km²，畫面放大也不增加模型解析度。本片不讀色反推出新的數值，不將來源資料的 Yeo–Johnson 轉換值或 int16 像素直接標為 mm²。[正式 Fig. 3 的產品與範圍說明](https://www.nature.com/articles/s41467-026-68996-y/figures/3)

## AOA 圖能說明什麼

影片使用作者公開圖版的面板 e，呈現「表現較好的多種性狀彙總」。作者圖題稱為 median AOA 的差異。其 [繪圖程式](https://github.com/dluks/cit-sci-trait-maps/blob/001df3006f81335c4489553b9900741e0bb611be/src/visualization/figures/spatial_transferability.py) 選取 SCI 與 COMB 在 1 km、power transformation、Pearson r ≥ 0.5 條件下都通過的性狀。此交集數量不在本片另作推定，也不把它直接稱為結尾的 15 種。

圖例的 SCI outside、COMB outside、Both outside 分別表示作者彙總後，只有 SCI、只有 COMB，或兩者都在適用範圍外的區域。空白處不等於沒有植物。這是跨性狀比較，不能覆到葉面積圖上假裝是葉面積專屬遮罩。

AOA 描述新地點的環境條件是否接近模型訓練資料，並不是預測正確率。範圍內也不保證預測正確。原圖其他面板的 COV 是交叉驗證模型之間的預測差異；本片未使用其色條，也不把它換成信心百分比。沒有重算 AOA 像素或驗證此 PNG 的產生過程。[正式 Fig. 4 與方法說明](https://www.nature.com/articles/s41467-026-68996-y/figures/4)

## 片末結論的分母

「31 種性狀中有 15 種達 Pearson r ≥ 0.5」指 COMB 在 1 km² 尺度的研究結果。作者用五折空間交叉驗證，將一折地理區域留出，再與該區的 sPlot 群聚平均性狀比較。15 是性狀模型數，31 是受評估性狀數；不是觀測點數，也不是 50% 準確率。[Results 與 Fig. 5](https://www.nature.com/articles/s41467-026-68996-y#Sec5)

摘要使用「exceeding 0.50」，Results 使用 r ≥ 0.5；本片依 Results 保留 ≥。不另放作者網站的葉面積 r = 0.59，以免混入未逐列核對的版本或設定。主文沒有提供可直接套用到每個性狀的單一驗證點數，本片不補出 n。

COMB 與只用 sPlot 的 SCI 整體預測表現相近。加入 GBIF 的主要好處是擴大環境適用範圍並降低不同訓練分組的預測差異，不能宣稱所有性狀都更準、所有空白都已實測，或地圖代表每片葉的真值。

## 資料可取得性

作者的 [1 km 地圖產品](https://doi.org/10.5281/zenodo.14646322) 與 [圖表來源資料](https://doi.org/10.5281/zenodo.18108765) 皆標 CC BY 4.0。本片沒有下載大型 GIS 全包，也沒有從原始資料生成新地圖。[程式碼版本 DOI](https://doi.org/10.5281/zenodo.18269446) 與本文採用的 Git commit 分別保留，不視為同一版 bytes。

TRY 與 sPlot 原始資料須依各自程序申請；公開論文和圖版不等於已取得全部原始樣區資料。本片沒有使用未取得的樣區數值。

## 檔案核對

SHA-256 以影片實際使用的資產計算：

| 資產 | SHA-256 |
|---|---|
| leaf-context.png | `f0736bf3322fbcbf1baef3176e3a53808203eb6d9029cc6888bc1efacb99ff44` |
| observation-density.png | `abdaede8b554902d3e01d148bb6df8ccc4b241efd8adb1310cb2fc9703915c49` |
| trait-maps.png | `9495027e848d134b1d558079ae1e77c710811c9e2a521b7d8e1843b81ba6adf8` |
| spatial-transfer.png | `5b6b8bb4cce3ef97648c486663bb44cedb3811408344dde96bad222b2bcd054f` |

核對日期：2026-10-24。本文件記錄來源與本版呈現條件，不代表已完成動畫畫面、播放器或 MP4 的驗收。



## 2026-10-27 網站播放副本

依使用者授權，為符合 Sites 容量上限，以 H.264 CRF 26 重新編碼網站播放影片。保留解析度、影格數、片長與段落，沒有裁切或插補動作；音訊如存在則直接複製。這是有損播放副本，原始檔保存在專案部署紀錄目錄。原作者來源與研究數值不變。
