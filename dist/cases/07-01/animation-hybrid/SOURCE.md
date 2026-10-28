# 07-01 訪花網絡：素材與資料

論文：Serra-Marin, P. E. 等（2025），Comparative assessment of automated and manual monitoring in comprehensive plant–pollinator communities，Methods in Ecology and Evolution，16，2960–2978。

- [論文 DOI](https://doi.org/10.1111/2041-210X.70165)
- [作者機構典藏](https://digital.csic.es/handle/10261/420456)
- [公開互動資料](https://zenodo.org/records/17130777)
- [公開程式版本](https://zenodo.org/records/17130918)

## 真實研究圖

`assets/figure-1.jpeg` 與 `assets/figure-2.jpeg` 是從作者機構典藏 PDF 提取的原始嵌入 JPEG，直接複製到本片，沒有重新壓縮、改色、補畫昆蟲或新增模型標記。PDF 與 Crossref 均標示 CC BY-NC 4.0。本片作為非商業研究導讀。

Figure 1 含設備、日夜部署、作者保留的辨識範例及研究地點。Figure 2 含正確偵測、誤判及漏檢範例，紅框、分數與紫圈均為作者原有內容。a–d 面板字母是原 PDF 上的向量文字，未包含於嵌入 JPEG；完整圖說仍可從論文回查。

動畫只改變 SVG 顯示範圍，不改動來源影像。不同面板不串成連續影片，不把模型分數說成辨識準確率。本輪沒有模型推論，沒有人工量出真實昆蟲的停留時間。

## 教學圖解

接觸門檻與同一訪客接觸兩朵花，使用獨立 SVG 示意。1 秒是這篇研究的互動定義；圖中位置與時間只是教學設定。它不是影片追蹤座標，不重演下一段 CSV 紀錄，也不宣稱授粉成功。

## 作者公開資料的子網絡

CSV 及原始 README 由 Zenodo 取得，授權 CC BY 4.0。保留原始位元內容。`assets/network-subset.json` 記下篩選條件、來源 SHA-256、每條連線全部對應的原始 CSV 行號與欄位。

篩選 Method=rpi，植物為 Cistus monspeliensis、Cakile maritima、Rosmarinus officinalis；訪客為 Lasioglossum sp.、Eupeodes corollae、Podarcis lilfordi。對指定分類中 N ind > 0 的配對保留一條邊，共 8 條。所有線等粗，表示曾有記錄。圖示跨 2022–2023 的公開 ACS 紀錄彙整，不是單次調查、完整群聚或原論文的標準化加權網絡；沒有記錄不能推論從不互動。

示例為 CSV 實體第 3581 行。其 N ind=1，N visit flowers=2，解讀為一個訪客、接觸兩朵花。CSV 的一列不是固定等於一個訪客、一朵花或整個 census，不以列數作訪客數。

蜥蜴紀錄來自人工判讀的錄影；蜥蜴未納入該昆蟲偵測器訓練。這個分類名稱不代表模型在照片上完成物種辨認。

## 操作與範圍

90 秒，無音訊，預設暫停。可播放、暫停、重播、跳段、拖曳進度與查看完整原圖。無 JavaScript 與列印保留全文及來源。手機網絡以代號與可讀的外部名稱表呈現。

本複本已接回本地主站，沒有公開部署。原獨立候選保留不變；原圖、資料與動畫程式沒有重做。未下載授權未明的作者外連 Drive 範例影片。研究圖與資料授權分別列於 LICENSES.txt。
