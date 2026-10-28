# DeteX／XtraX：可用的真實鯨影像與作者輸出

2026-10-20。本輪取得 **Bierlich et al.（2024）已發表圖版**，保留原檔並實際看圖。尚未取得同一範例的獨立原始幀畫面、影片、關鍵點／遮罩座標與校正 CSV，因此採作者圖版作可信的混合素材備案；沒有生成、修補或重新執行模型。

## 已取得素材

| 本地檔案 | 內容與尺寸 | 原始來源 |
|---|---|---|
| `sources/figure-2/figure.png` | DeteX → XtraX 的同一鯨影像處理示例，1421 × 2140，847,467 bytes | [Fig.2 紀錄](https://zenodo.org/records/20401245)／[原 PNG](https://zenodo.org/api/records/20401245/files/figure.png/content) |
| `sources/figure-3/figure.png` | 作者列出的失敗與成功輸出範例，1185 × 1043，1,055,395 bytes | [Fig.3 紀錄](https://zenodo.org/records/20401247)／[原 PNG](https://zenodo.org/api/records/20401247/files/figure.png/content) |
| `sources/paper/source.pdf` | 原論文 PDF，含授權、圖說與方法，1,645,643 bytes | [論文保存紀錄](https://zenodo.org/records/20401239)／[PDF](https://zenodo.org/api/records/20401239/files/source.pdf/content) |

來源論文：[Bierlich, Karki, Bird, Fern & Torres（2024），Automated body length and body condition measurements of whales from drone videos for rapid assessment of population health](https://doi.org/10.1111/mms.13137)。上述 Zenodo 檔案由 Plazi 從論文保存／抽取，**不是作者另行發布的 raw 相機資料集**。

三個檔案合計約 3.55 MB，下載後均與各發布紀錄的 MD5 相符；SHA-256、原始檔名及紀錄快照在 `asset-source.json`。Figure 2 比現有本地 1372 × 2080 版本略大；PDF 內嵌影像則為 1408 × 2083。Wiley 直接頁面取用返回 403，未繼續嘗試登入或追逐無法取得的 TIFF；目前使用可直接取得的較高解析 PNG。

## 圖像授權已確認

原 PDF **第 1 頁**明示 Creative Commons Attribution，版權為 **© 2024 The Authors**，並附可解析的 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 連結。Figure 2／3 的獨立圖像紀錄也標示 `cc-by-4.0`。因此重用證據同時來自原論文與圖像紀錄，**沒有把程式碼授權當作影像授權**。證據摘要另存 `sources/license-evidence.json`。

建議署名：**Bierlich et al. (2024), Marine Mammal Science, e13137, DOI: 10.1111/mms.13137. CC BY 4.0. 圖像保存來源：Plazi／Zenodo。**

本輪保存的 PNG 沒有修改。動畫若以顯示裁切、重新編排或加中文導讀框，請標「裁切／重新編排自原文 Figure 2（或 Figure 3）」，並保留完整原圖連結。不可將它們說成本輪新推論的產物。

## Figure 2 如何保持同一來源影像的連續性

已實際查看完整圖，並由鯨體斑紋、朝向、胸鰭及水面特徵比對：作者將同一幅**尾在左、頭在右**的灰鯨影像，用於未加註幀畫面、紅色關鍵點、紅色體長中線、全身遮罩與綠色體況區域的處理示例；圖說亦將這些面板連成流程。這是可用的視覺對應，並沒有獨立原相機檔名可供逐檔配對。

下列是整張 1421 × 2140 PNG 上的**約略顯示裁切範圍**，座標為左上原點的 `[x0,y0,x1,y1]`。只用來讓觀眾看清作者各面板，**不是鯨身關鍵點或原相機影像座標**。

| 面板 | 顯示範圍 | 可用說法 |
|---|---|---|
| 未加註輸出幀畫面 | `[1123,161,1403,324]` | 作者流程圖中的鯨類幀畫面 |
| 關鍵點 | `[407,683,1034,950]` | 作者模型在圖中標出的身體位置 |
| 體長中線 | `[29,1169,629,1510]` | 作者用身體位置建立的量測中線 |
| 全身遮罩 | `[830,1169,1397,1514]` | 作者圖中呈現的鯨體遮罩 |
| 體況量測區 | `[346,1717,1106,2052]` | 作者選定的軀幹面積區域 |

各面板大小不同，動畫可以依序放大導讀，但不要假裝是同一畫面的即時推論、重新分割或量測重播。未加註面板只是已發表圖版的一部分，不能稱為獨立 raw 原始幀畫面。上方疊放的幀畫面是流程圖表達，不能當成已取得的真實時間序列。

## Figure 3 的適當用途

Figure 3 位於原文第 10 頁。左欄是作者列出的失敗例，包含明顯水花／尾流、排便及海藻遮擋；右欄是成功例。適合交代為何人員仍需看圖核對。

**未確認左右欄為同一張原圖或同一個體。** 不要把左圖變形成右圖，或配上「修復後」暗示本輪演算法改好了原圖。應保留「不同影像中的作者失敗／成功示例」的意思。

## 仍缺的資料與量測界線

本輪尚未取得範例原始照片檔名、時間戳、原始影片、獨立 binary mask／keypoint 座標檔、對應 `results.csv`、每一幀高度、起飛高度及可綁定至該幀畫面的相機校正資料。因此，**目前不支持新算出可信的公尺體長或實際面積**。從圖版讀取的像素，也不能當成原相機幀畫面的像素量測。

BAI 可由像素比例計算而不依賴公尺尺度，但這不表示能從已排版、不同縮放的圖版重算精確作者 BAI；本輪仍缺對應的原遮罩與中線數值。

[OSU 官方入口](https://mmi.oregonstate.edu/centers-excellence/codex/software-hardware/detex-xtrax)連到 [作者 repository](https://github.com/karkisa/special-train)，本輪檢視 commit `45b9c7989293519e95dc87e54b4ec6566e12cb84`。其 tree 未含範例 JPG／PNG／CSV／影片；README 提供模型權重及教學影片，但不是原始影像配對資料。固定 README 與 tree 已存於 `sources/official-repository/`，未下載模型。

README 明示：檔名沒有高度時，XtraX 會採用 **50 m 預設值**。這不能當成範例實測高度，也不能填入未知欄位後宣稱完成校正。官方教學影片連結本輪未能透過網頁擷取讀取，未下載影片或假定其另有重用授權。

可交付的內容是**作者同一鯨影像的處理示例與品質核對案例**。原始資料與校正若之後取得，再另行建立可重跑量測的來源鏈。
