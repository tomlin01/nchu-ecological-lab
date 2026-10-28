# 04-01：這頁的圖片從哪裡來

本輪使用真實標本及作者已公布的輸出。沒有生成植物圖片、執行 LeafMachine2 或新增單葉量測結果。

## 原照片和作者標出的範圍

| 檔案 | 來源及角色 | 授權 |
| --- | --- | --- |
| `assets/specimen.jpg`，800×1200 | NY01212184，*Begonia glabra*，The New York Botanical Garden。[GBIF 1929553354](https://www.gbif.org/occurrence/1929553354) 的原影像媒體記錄，經 GBIF 官方快取取得。 | 影像 multimedia 欄為 CC BY 4.0。Occurrence資料本身的CC0不能代替影像授權。 |
| `assets/second-specimen.jpg`，789×1200 | BR0000010808771，*Impatiens noli-tangere*，Meise Botanic Garden。[GBIF 1839652692](https://www.gbif.org/occurrence/1839652692)。 | 影像 CC BY 4.0。 |
| `assets/author-overlay.png`，1980×2970 | 作者2023年PDF第11頁，對應D-3FAM第811張；標題與GBIF ID、標本條碼一致。從PDF的image XObject 73原樣擷取。 | William Weaver，[Zenodo 7764379](https://zenodo.org/records/7764379)，CC BY 3.0 US。 |
| `assets/second-overlay.png`，1980×3010 | 同份PDF第4頁，對應D-3FAM第804張，image XObject 31。 | 同上。 |
| `assets/ruler-qc.png`，1321×327 | 第811張旁的獨立尺規QC圖，image XObject 74。只放來源區，不拿其展示像素校正標本。 | 同上。 |

兩張原照是GBIF的1200px顯示副本，不是館藏全解析度原檔。Publisher影像端點此次回傳403，因此依[GBIF官方影像API](https://techdocs.gbif.org/en/openapi/images)取得已授權公開媒體的快取。請求採單一連線。下載網址、原媒體identifier、授權及SHA-256保存在上層 `sources/specimen-acquisition.json`，GBIF原始metadata另存。

下載後的原照及PDF擷取圖均逐位元複製到播放器，沒有改色、重繪或補細節。SVG只改顯示視窗、比例與透明度。秋海棠原照與作者疊圖的兩軸比例同為2.475；條碼、尺規、色卡、葉洞與枝條位置相符。只讀SIFT配準另存於 `sources/alignment-verification.json`，用於核對畫面位置，不當作分割效能指標。

## 畫面上的描線和刻度

最下方的綠色區域來自作者的分割疊圖。為局部揭露及解說描邊，`prepare-assets-v01.py`讀取該區域，依顏色建立分析遮罩，再以7px opening排除細框線，擷取可見色塊邊界。這不會修改任何原圖，也不是作者的原始polygon檔。重疊色塊下的隱藏部分無法據此還原，因此這條顯示輪廓**不作長度、面積或模型品質計算**。完整作者疊圖仍可在來源區打開。

原照片2至3cm刻度的顯示參照約為26.7像素。它只解釋縮放與單位的關係；動畫中的1cm線與原照共用座標並同步縮放。文字保持可讀大小。作者獨立QC圖上的「1cm: 123.06」屬於另一解析度／處理脈絡，**沒有套用到此800×1200縮圖**。播放器的`physicalLeafMeasurement`與`reportedLeafMeasurement`皆為null，不提供這片葉子的實測長度或面積。

回查段落並列同一位置的原照與作者輸出：中間大褐葉在該摘要圖未見獨立輪廓。這是可見差異，不推斷缺漏原因、是否符合作者完整葉定義，也不聲稱本輪修正了模型。

## 採用的資料版本與研究結果

本例固定使用2023原論文：[Weaver與Smith，10.1002/aps3.11548](https://doi.org/10.1002/aps3.11548)。作者輸出固定為Zenodo `7764379`，不使用會跳到2024年LM2 v-2-3的latest網址。

原始PDF為`D-3FAM_Custom_Overlay_801to831.pdf`，152,663,196 bytes，MD5 `df479bf5799b22a245568e04a63755e6`。本機已核對。PDF與完整來源metadata在上層`sources/`保留，播放器不載入這份大檔。

此展示紀錄採PCD門檻0.5，並包含完整與部分葉片；原論文的D-3FAM評估描述僅對完整葉候選進行相關處理。故不能把這兩張展示圖稱為953片抽樣評估的精確重現。

- 原研究報告：預設設定下，8GB顯存GPU與至少8個CPU核心約處理150–200張影像／小時；速度受解析度與葉片數影響。這不是每小時完成同數量已人工確認的量測。
- 隨機抽查100張影像時，953個真陽性葉片遮罩中200片取得至少四個偽地標，約21%。另有118個遮罩不完整或超出葉緣。這兩項結果不互補，也不能相加當成全流程總錯誤率。

研究結果與本頁兩張例圖分開呈現。沒有使用後續模型的結果支撐原版效能，沒有把照片中的時間、地點或物種標籤自動推成新的生態結論。


## 2026-10-27 網站播放副本

依使用者授權，為符合 Sites 容量上限，以 H.264 CRF 26 重新編碼網站播放影片。保留解析度、影格數、片長與段落，沒有裁切或插補動作；音訊如存在則直接複製。這是有損播放副本，原始檔保存在專案部署紀錄目錄。原作者來源與研究數值不變。
