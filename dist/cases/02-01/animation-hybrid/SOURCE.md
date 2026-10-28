# SpeciesNet：真實照片與本輪推論

本片保留原先60秒的敘事順序，將生成照片與手工教學框換成四張官方測試原圖，以及本輪實際執行取得的模型輸出。本版已經使用者接受，接回本地主站；尚未公開部署。

## 照片來源

官方程式庫固定於 `08ba498e833a15e95e72021c4308908e8b44709d`。

- [逐圖來源與授權](https://github.com/google/cameratrapai/blob/08ba498e833a15e95e72021c4308908e8b44709d/test_data/README.md)
- P01 `ocelot.jpg`：WCS Camera Traps，Wildlife Conservation Society。
- P02 `american_black_bear.jpg`：North American Camera Trap Images，NACTI data contributors。
- P03 `african_elephants.jpg`：Snapshot Serengeti，Snapshot Serengeti data contributors。
- P04 `blank.jpg`：North American Camera Trap Images，NACTI data contributors。

四張照片皆在官方來源表列為 Original，照片授權為 [CDLA-Permissive-1.0](https://cdla.dev/permissive-1-0/)，與程式的 Apache-2.0 授權分開。原始 JPEG 位元內容保留，沒有重壓、改色、抹去相機資訊或生成新細節。這些是不同資料來源的例圖，不是同一地點連拍，也不是 WWF 秘魯調查的原始照片。

## 實際推論

使用固定版 SpeciesNet 程式5.0.6、4.0.3a裁切分類器及 MegaDetector md_v5a.0.1。在本案隔離環境執行，未修改全域套件。執行輸入只含四張照片的相對路徑，未提供國家或座標，並停用地理篩選；保留每個分類框的前五個候選。原始輸出保存在 `assets/predictions.json`。

該次指令正常結束，exit code 0。分類器和偵測器都使用 MPS。這是本輪新推論，不是原研究作者保存的結果，也不是目前 Wildlife Insights 服務端的重新執行。網頁播放保存結果，不在瀏覽器即時運行模型。

`assets/display-data.json` 只整理顯示欄位與中文標籤。原始分數、來源框索引和完整分類代碼仍保留。動畫顯示 conf≥0.1 的框，與本輪分類門檻相同；完整輸出另外保留較低分的偵測。

## 結果與限制

虎貓和黑熊的主要分類候選分數分別為0.9938與0.9899。象群照片有15筆偵測，其中7個框達到分類門檻；整理後分別為5個非洲象、1個動物及1個空景。這是候選框的處理結果，不能直接當成真實個體數或經人工確認的標籤。

象群第6個分類框的分類器首選為 blank，分數0.3645；整合結果保留 animal，分數0.6329來自偵測器。第7個框整理為 blank，分數0.9809。這些不同結果保留原樣，沒有為了配合劇本改成同一物種。框序從1開始，對應顯示資料的索引5與6。

空景照片的輸出 detections 為空，沒有分類器候選、blank 分數或物種名稱。動畫保留這個空缺，不把「未產生分類」改成「模型證實空景」。

偵測分數、分類器softmax分數與整合後分數不是同一概念。它們不是辨識正確率、族群比例或現地出現率。四張官方示例不能作為模型整體表現的評估；本片沒有進行獨立物種驗證、個體辨識、跨圖去重或族群計數。

## 畫面如何對應原始資料

位置框使用原 JSON 的 normalized x、y、width、height，按同一張原圖尺寸換算。局部放大採該框、padding=0，維持來源照片比例。模型本身另外將裁切影像縮放至480×480；展示中的等比例放大圖不是直接擷取模型張量。

象群各框分開處理，畫面以選定框的候選與整理結果作對照。四筆照片紀錄全部標為待人工覆核，不把播放結束當成專家已確認。

## 方法資料

- [官方固定版說明](https://github.com/google/cameratrapai/blob/08ba498e833a15e95e72021c4308908e8b44709d/README.md)
- [Gadot等，2024：To crop or not to crop](https://doi.org/10.1049/cvi2.12318)

本地程式、模型來源與完整執行紀錄位於 `work/ecology-ai-rollout/cases/02-01/hybrid-v01/inference/`。候選附來源與輸出，不將模型權重放入網頁壓縮包。60秒、無音訊，可暫停、跳段及開原圖；手機、無JavaScript和列印保留可讀內容。
