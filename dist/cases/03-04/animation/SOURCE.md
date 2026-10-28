# 03-04 素材與研究紀錄

研究：Shermeister、Mor、Levy（2024），[Leveraging camera traps and artificial intelligence to explore thermoregulation behaviour](https://doi.org/10.1111/1365-2656.14139)。84秒是教學節奏，不是蜥蜴的觀察時間。這輪沒有重新執行研究模型、合成聲音或增加人工行為真值。

## 照片與標註

來源：[作者資料 release v1.0.0](https://zenodo.org/records/11406382)，DOI 10.5281/zenodo.11406382，頁面標示 CC BY 4.0。所用檔案從 release 指向的 [GitHub v1.0.0](https://github.com/levyofi/Shermeister_et_al_2024/tree/v1.0.0) 個別取得，commit 03469a5bdeb0cc5238ec0fbd3c33b0e52246cb60，未下載整個封存包。

- `assets/shade.jpg`：原 `Data/training_data/thermoregulation/Shade/Shade-1.jpg`，717×324。
- `assets/sun.jpg`：原 `Data/training_data/thermoregulation/Sun/Sun-1.jpg`，486×195。
- `assets/detection.jpg`：原 `Data/training_data/lizard_detection/Lizards/images/IMAG0007.JPG`，4000×3000。
- `assets/detection-annotation.xml`：對應同名原XML。兩個來源框保留原值，選用index 0的xyxy為1726、503、1853、734。
- `assets/detection-data.json`：來源、雜湊、框座標與核對結果，取自本輪素材查核。

三張 JPEG 與 XML 原bytes不變。日照／陰影例圖的類別來自作者資料夾，不是本輪模型預測。兩張例圖沒有可配對的時間、個體、相機或圍欄鍵，不串成同一隻的前後紀錄。

XML 是偵測訓練標註，不是本輪模型輸出。選定框只有頭身及部分長尾，動畫稱為「來源標註的身體局部」。SVG僅查看相同原圖像素，沒有補畫或放大重建。原圖底部022C是相機印字，不是本案測量的蜥蜴體溫；EXIF時間11:17:32與印字11:17:28有4秒差異，沒有用它拼出連續紀錄。XML未提供日照、色標、個體或分數，相關值保留未知。

影片中的查看框、指引與排版為教學編排，和來源框及來源分類分開；不新增模型熱圖或分數。

## 情境圖

`assets/context.png` 是內建image_gen產生的概念場景，交代粗尾岩鬣蜥、地面及日照／陰影關係。它不是研究現場、研究個體照片或模型輸出。主檔、完整prompt及一次尾尖構圖修正紀錄保存在 `outputs/ecology-ai-rollout-assets/03-04/hero-v01/`。來源研究照片沒有送入生成流程補細節。

## 研究結果的範圍

論文§3.2：以95%為分類信心門檻，約85%的日照／陰影預測達門檻。高信心分類準確率96.52%取自作者對被標記蜥蜴的評估，Figure 4c為4970個正確分類／5149個評估分類；不是這三張例圖的正確率，也不涵蓋未拍到或漏偵測的蜥蜴。原文對準確率使用「高於95%」，對保留比例使用「95%或以上」，本案以門檻描述並保留這個措辭差異。

論文§2.8：同個體、同微環境、10秒內連拍可合併為事件，以起訖估算拍到的活動時段。動作觸發相機仍會漏拍靜止時段；不能延伸成全天／總停留時間或完整轉換路徑。動畫的空白是未知，不表示確認沒有動物。本例裁切圖缺少時間鍵，不另做事件計算。

## 授權與工具

資料影像的CC BY 4.0與GitHub程式的MIT分開。原論文圖版標示CC BY-NC-ND，本片沒有拆裁論文圖版作素材。生成情境圖不沿用研究資料授權。請保留作者、資料DOI、版本及本說明；顯示裁切、縮放及教學排版已於此列明。

字型為Noto Sans TC、Noto Serif TC，OFL檔隨字型提供。GSAP為專案既有本機副本，原始標頭保留。MP4輸出由同一時間線逐幀擷取，不另外改變研究數字或時序。
