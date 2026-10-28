# 03-02 素材與計算紀錄

研究：Chan et al. (2025), *YOLO-Behaviour: A simple, flexible framework to automatically quantify animal behaviours from videos*. DOI: https://doi.org/10.1111/2041-210X.14502

影片與既有模型輸出：Chan et al. (2024), *Sample dataset for YOLO-Behaviour*, Edmond V1. DOI: https://doi.org/10.17617/3.EZNKYV 。資料頁明列 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。作者原始檔保留於本機研究工作目錄，不把整個6.18GB資料包放入網站。

## 影片如何處理

原始檔 `Data/JaySampleData/Jay_Sample.mp4` 為1920×1080、25 fps、7,500幀、300秒，沒有音軌。原檔SHA-256：`0270d2329db07a1f6db856ea977ab2a3823f97583cbe62c0d9cf0dc478cba0e9`。

本片取第1500至1849幀，對應原片60.00至74.00秒之前的14秒。來源幀號從0起算。影像縮至1280×720，並以H.264編碼。

- `assets/jay-source-excerpt.mp4`：14秒原速節錄。
- `assets/jay-clip.mp4`：78秒教學播放，加入停格、重播與半速，不生成或插補新動作。文字、候選框及時間列由網頁疊加。
- `assets/display-data.json`：每個教學影片幀對應的來源幀、完整分數、原座標框與所選候選事件。
- `assets/poster.jpg`：來源第1500幀的顯示衍生圖。

原速片與教學片均無聲；沒有添加鳥叫或環境音。

## 模型資料與時間

`sources/`保存作者的原始 `Jay_Sample_YOLO.csv`、`Jay_Sample_OutputEvents.csv`與參數JSON。這輪沒有重新執行模型。

所選14秒含75列模型框，分布於71個來源幀。顯示的是原CSV的 `Eat` 與confidence，分數只在畫面上四捨五入至小數後兩位。缺框不表示確認沒有進食；同一幀的多個框仍保留。

事件表有8列與選段相交。開始與結束幀均包含在區間內，展示時換成半開區間 `[StartFrame, EndFrame + 1)`，先裁到選段範圍，再求聯集。逐列長度加總為111幀，聯集是103幀；103除以25得到 **4.12秒候選事件涵蓋時間**。重疊只計一次。

這個4.12秒是本例對作者候選區間的顯示計算，不是論文Table 5的重新分析、人工確認的進食時長、個體身分或食物攝取量。事件跨度可包含暫時沒有模型框的幀；它與逐幀有框時間不同。

來源事件CSV只有行為與起訖，沒有每一列對應的個體ID或模型框軌跡。圖中的事件列保持獨立，不畫出無來源的「這一框屬於哪一事件」連線。公開包內另有BORIS標註，但尚無證據能與這段sample配對，所以人工覆核維持待確認。

## 參照

- [原始資料與模型](https://doi.org/10.17617/3.EZNKYV)
- [官方逐幀推論及事件文件](https://alexhang212.github.io/YOLO_Behaviour_Repo/inference.html)
- [官方人工覆核文件](https://alexhang212.github.io/YOLO_Behaviour_Repo/human.html)
- [官方適用條件](https://alexhang212.github.io/YOLO_Behaviour_Repo/yologuide.html)

字型為Noto Sans TC與Noto Serif TC，OFL檔在`fonts/`。GSAP使用本專案既有的本機副本；原始標頭保留。頁面與覆蓋層是本案教學製作，不代表作者新增的模型實驗。


## 2026-10-27 網站播放副本

依使用者授權，為符合 Sites 容量上限，以 H.264 CRF 26 重新編碼網站播放影片。保留解析度、影格數、片長與段落，沒有裁切或插補動作；音訊如存在則直接複製。這是有損播放副本，原始檔保存在專案部署紀錄目錄。原作者來源與研究數值不變。
