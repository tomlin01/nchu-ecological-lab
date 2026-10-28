# 03-01：斑鬣狗照片與原始標註

本樣片使用 Hyena ID 2022 的三張真實照片，示範如何比較同一側身的斑點。個體關係依原資料集標註呈現，沒有執行 MiewID、其他再辨識模型、特徵向量計算或相似度評分，也沒有新增人工生物身分鑑定。

本文件在交付包根目錄命名為 `SOURCE.md`；以下相對路徑以該交付包根目錄為準。

## 來源與身分依據

- 資料集：[Hyena ID 2022 · LILA](https://lila.science/datasets/hyena-id-2022/)。提供者為 Botswana Predator Conservation Trust，經 Wild Me／African Carnivore Wildbook 整理。
- 官方原壓縮檔：[GCP · hyena.coco.tar.gz](https://storage.googleapis.com/public-datasets-lila/wild-me/hyena.coco.tar.gz)。同一下載入口由 LILA 原站直接連結。
- 原標註檔為 `hyena.coco/annotations/instances_train2022.json`，本機完整原檔僅留在工作來源資料夾；交付包只附[三張照片的完整原始紀錄](sources/selected-records.json)。
- `individualId` 直接取原 annotation 的 `name`，不是照片檔名、image ID 或我們新編的身分。`individual_ids` 是原資料中的關聯 annotation 編號清單，沒有拿其中某個數字充作新的個體名稱。
- 原圖的 `viewpoint` 三筆均為 `left`，表示斑鬣狗的左側身。沒有鏡像翻轉、旋轉或把左右側混配。

## 三張選用照片

| 用途 | 交付檔案 | 原檔名 | image ID／annotation ID | 原個體 ID | 尺寸 |
| --- | --- | --- | --- | --- | --- |
| 待比對照片 | [query.jpg](assets/query.jpg) | `000000002824.jpg` | 2824／2849 | `bbbaafbc-3889-4d6f-843b-d58fb94fb07c` | 2400 × 1600 |
| 同 ID 的另一張 | [match.jpg](assets/match.jpg) | `000000000612.jpg` | 612／621 | `bbbaafbc-3889-4d6f-843b-d58fb94fb07c` | 2400 × 1600 |
| 不同 ID 的例子 | [other.jpg](assets/other.jpg) | `000000002011.jpg` | 2011／2035 | `34365bcc-5b2d-4f80-b721-ef7039e64fe8` | 2400 × 1600 |

三張皆為資料集發布版本的原 JPEG bytes。LILA 說明資料集影像在發布前已縮放至最長邊不超過 2,400 像素；「原檔」在這裡指下載包提供的版本，不宣稱為相機未處理的 RAW 檔。

query 與 match 的原個體 ID 相同，但它們確實是不同 image ID、不同 JPEG bytes。other 的個體 ID 不同。這個關係來自資料集提供者的標註，不是本樣片跑出的預測或分數。選圖也不是效能測試，不能據此宣稱辨識準確率。

### 視覺選擇與比較目標

三張完整原圖已逐張目視檢查。query 為明亮場景，match 為較暗場景，側腹斑點可見，呈現外觀會隨光線與姿態改變的例子。match 原圖左下有獵物殘骸；比較範圍選在側腹，不將該區域當成身分線索。

**other 的標註目標是背景中側身站立的斑鬣狗。前景另一隻斑鬣狗的頭部不是本筆 annotation 的目標。** 編輯用局部視窗避開前景頭部，不把它混入比對。

## 日期、遭遇與計數範圍

所選三筆原 image 的 `date_captured` 都是 null，`photographer` 為空字串；JPEG 中也沒有讀到拍攝時間的 EXIF 欄位。原資料沒有可用的 encounter ID，因此展示資料的 `capturedAt` 與 `encounterId` 一律保留 null。

不同檔名、image ID、亮暗場景或背景，不足以建立已核實的拍攝日期、時間先後或遭遇次數。樣片可稱「兩筆影像記錄」，不能寫成已證實的兩次遭遇、某日再出現，或根據檔名排列的時間序列。資料集名稱中的 2022 是發布版本，也不是這三張照片已確認的拍攝年份。

## 框與局部視窗

[display-data.json](assets/display-data.json) 的 `bbox` 完整保留原 COCO `annotation.bbox`，順序為像素 `[x, y, width, height]`，原浮點數沒有改成新偵測結果。三筆 `theta` 均為 0。

`detailCrop` 是為方便觀看側腹斑點而人工選定的矩形，**不是偵測器、分割器、注意力圖或再辨識模型的輸出**。它只供介面以同一張 JPEG 設定顯示視窗，沒有另存裁切檔、補畫斑點、調色或生成被遮住的部位。放大後仍是原照片已有的細節。

目前編輯視窗如下，根代理若為版面微調，應同步更新 display-data 及最終成品紀錄：

- query：`[1050, 650, 600, 380]`
- match：`[950, 630, 700, 440]`
- other：`[1000, 580, 720, 450]`

所有視窗都位於原圖內，也位於相應的原 bounding box 內。它們沒有被宣稱為精確對齊的同一組斑點。

## 授權標示衝突

LILA 原站的下載說明指向 CDLA-Permissive-1.0。原 COCO 的 `licenses` 欄位卻列出 CC BY-NC-ND 2.0，三張 image 都引用該 license ID 3。兩個來源的原始標示及完整授權文字保存在 [LICENSES.txt](LICENSES.txt)。

本樣片沒有擅自判定哪一項標示優先，也沒有把它概括成已釐清的公開再利用授權。此處限於本機樣片評閱；公開發布或其他再利用仍需釐清來源標示。保留原 JPEG bytes 並不等於這項衝突已解決。

LILA 的建議引用中出現 *Panthera pardus*，但頁面資料集介紹的是 *Crocuta crocuta*，原 COCO 類別亦為 `hyena`。本文件沿用「Hyena ID 2022」資料集名稱與提供者署名，明示這項引用不一致，不將豹的學名當成斑鬣狗的名稱。

## 有限串流取得與重現

官方壓縮檔大小為 3,441,352,255 bytes。本次沒有下載完整壓縮檔，而是使用 HTTP Range 限制在前 128 MiB，串流解開 tar.gz，找到三張照片後即停止。最後一次可重現的擷取讀取了前 113,704,960 compressed bytes：

```text
Range: bytes=0-113704959
SHA-256: 25c227f82ad5954f3380121d08f8d2c2ac9114fb2813ad15e43a4ad2499f2f6a
```

這是最後一次固定選圖擷取的壓縮前綴雜湊，不是完整 3 GB 壓縮檔的 SHA-256，也不是本次所有探索請求的合計網路流量。較早的有限請求用來取得 metadata 及目視選圖；沒有遍歷全部照片。

工作目錄中的 `acquire-assets.py --selected` 可重現三張原圖。它保留 HTTP 回應的範圍與 archive ETag，核對原始 metadata 及 JPEG bytes；已存在的檔案若不相同會停止，不會默默覆蓋成另一張圖。[provenance.json](sources/provenance.json) 記錄正式三圖、原 metadata 與壓縮前綴雜湊。[selected-records.json](sources/selected-records.json) 保留原 info、licenses、categories 及三筆完整 image／annotation 物件。
