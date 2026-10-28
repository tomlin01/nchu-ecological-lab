# 04-03｜照片與研究資料來源

88秒、無聲、五段：原魚照片 → 板面標記與尺度 → 量測終點 → 人員檢查 → 原研究結果。主片使用單魚測量板；多魚墊只在補充文字交代。本案沒有執行偵測、分類或校正模型，沒有產生這尾魚的新長度、重量或物種結果。

## 動畫裡用了哪些材料

**SPC原照與作者輸出。** Franck Magron／Pacific Community（SPC），*SPC Measuring Board 3 YOLO v4 Model 1.0*（2022）。固定commit：`5701c3ea2962be4eaa403250d565d2e762dc7c91`。[Board 3原始說明](https://github.com/PacificCommunity/cfap-ai-models/blob/5701c3ea2962be4eaa403250d565d2e762dc7c91/YOLO_v4/SPC_Board3/README.md)。

原照與數字偵測圖是同一張照片。後者的T0、T05、T10、B0、B10等框及原有信心值，只表示**板面數字／標記偵測**，不是吻端、尾叉、魚種或魚長的辨識成績。板型是已知標記的版型，不是一尾魚的測量結果。這張2022年範例沒有已確認魚長、魚種或個體紀錄，也沒有證據可將它配到論文869尾驗證魚。

**人工導讀與獨立示意。** 板面點位對應、吻端、尾叉、尾尖及檢查線，由本案製作，用來解釋量法。它們不是作者模型輸出、人工真值或實際更正紀錄，不附新信心值、魚長或成功判定。SPC的原方法會由標記對應計算homography並重投影；本片只在獨立板面示意中解釋對應關係，沒有計算或套用homography，也沒有改造原照片。

SPC照片的等比例放大、平移及導讀層屬本案展示處理；原始檔案bytes保留。尾叉長量至尾鰭叉口，全長量至尾鰭最遠邊緣，依魚的形態選用，不能一律把尾尖當尾叉。論文的2 px/mm是校正後影像尺度，不直接套到這張原照或螢幕縮圖。照片中的秤面也不新增為本片的重量結果。

**原論文結果圖。** Shedrawi等（2024），*Leveraging deep learning and computer vision technologies to enhance management of coastal fisheries in the Pacific region*，Scientific Reports 14, 20915，DOI [10.1038/s41598-024-71763-y](https://www.nature.com/articles/s41598-024-71763-y)。Figure 3完整保留原圖，僅等比例顯示；不裁切、不覆畫、不重建散點，中文解說放在圖外。

## 結尾的數字是怎麼來的

- 東加市場的869尾魚，長度130–720 mm；作者報告AI與人工配對長度的**整體平均絕對誤差（MAE）3.4 mm**。它是平均差的大小，不是每尾魚的誤差上限。
- Figure 3(b)圖內標mat組462尾，3(c)為board組407尾，合計869。分組數來自圖內標註；本片沒有重算各組MAE，3.4 mm仍只對應整體。
- 方法段的same board描述現場人工參考量測，不能解讀成所有AI照片均為board。作者另記6筆人工量測事後更正。
- 圖中的R²不是「99%準確率」。原文分組指標以MSE稱呼2.7／4.2卻使用mm的單位疑點，保留於本機工作紀錄 `../source-check-v01.json`，本片不自行改稱MAE或RMSE。
- 這次比較不是眼前SPC範例魚的成績；原始分析資料受SPC與成員國／地區的協議限制，未公開取得。本片不新增單魚誤差、魚種鑑定或生態結論。

## 圖片出處與使用規定

SPC程式庫的工作採[CC BY-NC 4.0](https://github.com/PacificCommunity/cfap-ai-models/blob/5701c3ea2962be4eaa403250d565d2e762dc7c91/LICENCE.md)。保留Franck Magron／SPC署名、固定來源及本案展示／導讀修改說明，不暗示SPC背書。

論文及Figure 3依出版頁[CC BY-NC-ND 4.0](https://www.nature.com/articles/s41598-024-71763-y#rightslink)。本片採完整原圖展示，沒有將它拆裁成魚照或重新描繪量測結果。兩類授權不同，不能以SPC授權替代論文ND條件，也不把檔案hash相同當成任意視覺改作已獲許可。

## 四個圖檔的來源

以下四檔已逐位元與本案保存的原檔比較，全部相同。SHA-256是檔案完整性證據，不是模型或人工量測驗證。

| 動畫檔案 | 對應本案原檔 | SHA-256 |
|---|---|---|
| `assets/fish-original.jpg` | `../sources/spc-board3-fish-input-original.jpg` | `76b17eb02077e0c559d805e059d1ab7ae1c52f28e833e06434379fe3377a16ec` |
| `assets/board-detection.jpg` | `../sources/spc-board3-fish-output-original.jpg` | `c2bf2b7541ebbe0333572d241bcfb52b5bf00f05f97496e6810be83cc5d5fc5c` |
| `assets/board-template.png` | `../sources/spc-board3-template-original.png` | `9d985bcefdb4f46f75648e72145869174ed543fa845b00fa3a2e5d192c41bb64` |
| `assets/study-figure3.jpg` | `../sources/paper-fig-03-original.jpg` | `a7bc8d16f9a3da18fb9b0232197210f321a2388de503633aecd83a23ce86e8be` |

固定來源：

- [SPC原照](https://raw.githubusercontent.com/PacificCommunity/cfap-ai-models/5701c3ea2962be4eaa403250d565d2e762dc7c91/YOLO_v4/SPC_Board3/samples/fish_on_board1.jpg)
- [SPC板面數字偵測結果](https://raw.githubusercontent.com/PacificCommunity/cfap-ai-models/5701c3ea2962be4eaa403250d565d2e762dc7c91/YOLO_v4/SPC_Board3/output/fish_on_board1.jpg)
- [SPC板型](https://raw.githubusercontent.com/PacificCommunity/cfap-ai-models/5701c3ea2962be4eaa403250d565d2e762dc7c91/YOLO_v4/SPC_Board3/board3.png)
- [Figure 3原始JPEG](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/d9ff/11381547/06df2c268553/41598_2024_71763_Fig3_HTML.jpg)

其他方法、補充圖與授權取得紀錄保存在本機工作目錄的 `../asset-audit-v01.md` 及 `../source-check-v01.json`；這些相對路徑是工作檔對應，不表示已收錄在動畫交付包。公開來源見上方固定URL。本文件這輪只核對本機來源與四檔完整性，未重新上網、執行模型、修改其他案例或部署網站。


## 2026-10-27 網站播放副本

依使用者授權，為符合 Sites 容量上限，以 H.264 CRF 26 重新編碼網站播放影片。保留解析度、影格數、片長與段落，沒有裁切或插補動作；音訊如存在則直接複製。這是有損播放副本，原始檔保存在專案部署紀錄目錄。原作者來源與研究數值不變。
