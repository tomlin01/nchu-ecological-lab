# 12-01｜文字、地區與研究結果來源

130秒無聲動畫，依Castro、Pinto、Reino、Pipek與Capinha（2024），*Large language models overcome the challenges of unstructured text data in ecology*，Ecological Informatics 82:102742製作。

- [正式文章DOI](https://doi.org/10.1016/j.ecoinf.2024.102742)
- [ULisboa正式全文](https://repositorio.ulisboa.pt/server/api/core/bitstreams/33669ed9-fbdd-4b94-bf39-18508e7d4692/content)
- [NOVA全文入口](https://run.unl.pt/server/api/core/bitstreams/e54ef0d0-ffbf-4745-8e9b-29ae81219c74/content)
- [正式機構記錄與CC BY授權](https://repositorio.ulisboa.pt/entities/publication/d7f02fe4-00dd-4d8b-9e98-3dc34e6f6711)

本案以目前可讀的正式出版文字核對Table 1、Table 2及相關方法／結果，不混用預印本數字或授權。本機PDF下載仍回403，沒有宣稱已檢視原始Figure 1；片中統計是依作者數字重排的原生文字。

## 虎頭蜂與報導文字

`assets/hornet-habitat-v01.png`由內建imagegen產生，是黃腳虎頭蜂與植物環境的概念圖，不是Jersey或其他研究現場的實拍、物種鑑定依據或新增出現證據。提示詞為`prompts/hornet-habitat-v01.md`，來源、尺寸及SHA在`assets/provenance-hornet-v01.json`。

Table 2明確把Jersey示例對應到*Vespa velutina*。片中「外來虎頭蜂首次在澤西島被發現」是原表新聞文字的忠實中文轉述，不是本次模型回覆、真實新聞截圖或某次API結果。沒有取得原新聞逐字來源URL及日期，因此未補造媒體品牌、發布日期或網址，也不斷言該示例是虛構新聞。

研究已指定目標物種；模型沒有透過照片辨識昆蟲。片中查找物種與文字來源標籤是講解資訊，不是模型新回傳的額外欄位。

右側「澤西島未來可能適合黃腳虎頭蜂生存」為教學改寫，不是另一則真實新聞或研究預測。它用來說明只談潛在分布的文字，不能直接支持已出現。判斷必須讀上下文；Table 2另有可支持出現的間接描述正例，不能把間接提及一律排除。

## 論文預期欄位

原表欄名為Expected result，第一個示例為YES、Jersey Island、49.214439／−2.131250。動畫沿用這些值，並且將其稱為候選報導紀錄與論文預期輸出。沒有訓練或執行模型，沒有新增野外紀錄，也沒有代替研究者核實當地真實出現。

欄位可指回同一段論文提供的新聞文字；真正使用時仍要回查原始來源、文字內容、日期及地點尺度。本片沒有冒稱已回查到原新聞網站。

## 澤西島邊界與座標

`data/jersey-boundary-v01.json`取自Natural Earth的1:10,000,000行政區資料，保留JEY Polygon原始47個閉合環節點。原始抽出Feature及來源／授權記錄在`source/`。資料為公有領域；原始來源與固定commit見檔內provenance。

SVG以島嶼附近的經緯度、含中央緯度餘弦校正的局部等距圓柱方式顯示，沒有平滑或捏造邊界。它是概略區域輪廓，不是精密海岸測量。

論文座標只需落在報導區域內。給定的預期座標已核對在島嶼多邊形內，但沒有投影成地圖上的發現位置，也沒有建立Point幾何。座標只在文字欄位顯示。陰影表示報導地區，不表示整座島都被物種占據。

## 600筆與92.7%的分母

研究測試兩物種：白線斑蚊*Aedes albopictus*與黃腳虎頭蜂*Vespa velutina*；兩來源：新聞標題／簡短說明，以及論文標題／摘要。每個物種與來源組合150筆，共600筆，部分只有標題。不是600篇新聞或600篇完整文章。

測試為2023-12-11至2024-01-03，以當時GPT-3.5、GPT-4與LLaMA-2-70B的網頁介面，每模型600次新對話，提示提供8正例與8負例。未報具體模型snapshot，不代表現在模型的效能。

片中唯一正確率92.7%來自正式文章§3.1：GPT-4在150筆黃腳虎頭蜂新聞短文的文件分類結果。這150筆包含79正例及71負例。該任務是判斷是否有符合要求的出現紀錄，不是影像物種辨識、精準定位或所有欄位都正確的全流程評分。

地名擷取100%與條件化座標177／186也不能解讀為600筆全部成功。本片不以這些數字作全流程成效。格式正確仍可能漏判或擷取有誤；受控評估也不等於已建立持續營運的監測服務。

## 技術與播放

全片圖片、原句、語意對照、候選欄位、區域及結果都由同一個播放時間控制。GSAP只提供暫停序列；沒有另一個場景時鐘、模型呼叫、外部字型或自動播放。

正式研究為CC BY 4.0，中文轉述與重排保留作者、Table 2及DOI。Natural Earth為公有領域；Noto字型OFL與GSAP原授權標頭隨檔案保留。生成圖不沿用論文或Natural Earth的授權。
