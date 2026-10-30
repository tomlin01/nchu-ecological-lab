# 12-01｜網站來源與資訊層級

本頁依Castro等（2024），*Large language models overcome the challenges of unstructured text data in ecology*，Ecological Informatics 82:102742。[DOI](https://doi.org/10.1016/j.ecoinf.2024.102742) · [正式全文](https://repositorio.ulisboa.pt/server/api/core/bitstreams/33669ed9-fbdd-4b94-bf39-18508e7d4692/content) · [正式機構記錄與CC BY授權](https://repositorio.ulisboa.pt/entities/publication/d7f02fe4-00dd-4d8b-9e98-3dc34e6f6711)。

## 主視覺

虎頭蜂圖使用已接受動畫的原檔，是AI生成概念情境，不是原新聞或研究現場照片。研究已指定目標物種*Vespa velutina*，沒有從圖片識別昆蟲。提示詞與來源在`animation/assets/provenance-hornet-v01.json`及`animation/prompts/hornet-habitat-v01.md`。

「外來虎頭蜂首次在澤西島被發現」是表2新聞文字例的忠實中文轉述。原表欄名為Expected result，YES、Jersey Island及49.214439／−2.131250不是本次模型回覆。沒有取得原新聞URL與日期，因此沒有補造品牌、日期或原新聞網址，也不把「首次被發現」當作「首次抵達」。

按地名會連動地區欄位及整島範圍；查看座標時只改變文字欄位與解釋。幾何、虎頭蜂圖片和來源不變，沒有建立Point或投影發現位置。候選資料可指回論文提供的文字，但不表示已回查原新聞或確認新的野外觀察。

澤西島輪廓取自已接受動畫的Natural Earth JEY Polygon，47個閉合環位置，原始幾何保持。使用局部經緯度與中央緯度餘弦校正，僅提供概略區域情境。資料為公有領域，來源與固定commit見`animation/source/jersey-boundary-provenance-v01.md`。

## 語意對照

「澤西島未來可能適合黃腳虎頭蜂生存」是明示的教學改寫，不是真實新聞或研究預測。它說明潛在分布與已出現的不同；間接描述只要支持出現，也可能是正例，不能只依關鍵字判斷。

## 正確率與分母

本頁資料表依正式文章Table 1及§3.1重排。兩物種、兩來源、每組150筆，共600筆；輸入為新聞標題／簡短說明及論文標題／摘要，部分只有標題，不是完整新聞全文。

當時GPT-4的文件分類正確率分別為：白線斑蚊新聞88.0%、論文83.3%；黃腳虎頭蜂新聞92.7%、論文82.0%。每組分母均為150。這是判斷是否有符合要求的出現紀錄，不是物種影像辨識、精準定位或所有欄位都正確的全流程結果。

測試時期為2023-12-11至2024-01-03，經網頁介面逐筆新對話，提示提供正負示例。論文未交代固定模型版本；此處保留當時結果，不外推到現在模型。分類、地區、座標與格式是不同任務；地區座標的評分只要求落在報導區域內。

本案以可讀的正式全文文字核對，沒有取得可本機視覺檢查的原始Figure 1，因此沒有將重排表格標成原研究圖。

## 已接受動畫

130秒、1600×900、24fps、3,120幀、無聲。19個已接受來源與原MP4保持SHA，只加入網站嵌入排版與父子頁訊息橋接。原來源manifest見`animation/accepted-source-manifest.json`，衍生檔見`animation/manifest.json`。

MP4 SHA-256：`32dcb0d90fdc07cd1da7f83eb0eb4ec6bb2fe1e7dc860926efedfaa31f523177`。

正式論文為CC BY 4.0；中文轉述及表格重排保留作者、來源與修改身分。Natural Earth為公有領域，生成圖不沿用論文授權。字型OFL及GSAP原有授權標頭隨檔案保留。本頁沒有呼叫語言模型、執行地理編碼服務或新增分布紀錄。
