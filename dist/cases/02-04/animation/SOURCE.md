# 02-04 IFCB：來源與教學範圍

## 研究

McGaraghan, A., Hayashi, K., Daniel, P., & Kudela, R. M. (2022). *Development and comparison of Imaging FlowCytobot classifiers in coastal California*. Proceedings of the 19th International Conference on Harmful Algae, pp. 220–224. <https://doi.org/10.5281/zenodo.7036182>。Zenodo 記錄為 CC BY 4.0。

本片使用原文 Figure 1 及 Figure 3，原始圖檔 bytes 保留。Figure 1 是不同日期的調整前／後觀測，兩邊縱軸不同，單位 cells/mL。Figure 3 聚焦 Pseudo-nitzschia 的時間圖與原圖圖例，單位 cells/L；不是從圖中重新擷取、估算或補造資料點。原論文 PDF 也一併保留。

2020 年 5–6 月的雙儀器並列部署為四週；2020 年八個月的分類器比較是另一個時間範圍。當時兩台儀器放在碼頭水面上，由管線送入海水。光學感測設定會影響取得哪些影像，不能只把所有差異歸因於分類器。

影像分類濃度與每週外部採樣的時間支援、類群範圍不完全相同。原文探針包含 Alexandrium catenella、Pseudo-nitzschia australis、P. multiseries，Dinophysis 另用自體螢光。原文對 chi-square 與「similar」的措辭細節不足，本片不宣稱統計等效或普遍相同準確率。

## 原始顯微影像與分數

來源入口：<https://sccoos.org/ifcb/>、<https://ifcb.caloos.org/dashboard>。資料集為 Santa Cruz Municipal Wharf：<https://doi.org/10.6075/J0Z60PDV>。

四張 PNG 均來自 bin `D20200701T002011_IFCB104`，時間為 2020-07-01 00:20:11 UTC。影像、metadata 與分類 CSV 以完整 pid 配對，不按列順序猜配。原始資料與來源列在 `assets/selected-roi-records.json`，原 CSV 為 `assets/D20200701T002011_IFCB104_class_scores.csv`。

| ROI | 來源最高候選 | 來源分數 | 本片用途 |
|---|---|---:|---|
| 00120 | Akashiwo | 0.954 | 一個主要輪廓的真實影像 |
| 00298 | Guin_Dact | 0.8354 | 鏈狀外形與來源候選比較；次候選 Eucampia 為 0.1628 |
| 00216 | Mesodinium | 0.676 | 備存來源影像，不作人工定種 |
| 00732 | Chaetoceros | 0.869 | 備存含多個影像物件的原圖 |

上述是官方保存的分類輸出，不是本輪推論、準確率或人工確認的物種。來源 CSV 沒有可核對的模型 checkpoint／處理日期；它與論文有相同地點和觀測年份，不證明這些 ROI 是論文選用的特定訓練／驗證樣本，也不證明使用本文的某一個 RF 或 CNN。

原 PNG 沒有比例尺。這筆影像的獨立微米校準尚未確認；dashboard 的 mosaic 縮放值不能當成微米／像素。本片只依原長寬比例放大觀看，不加入假尺規，不變形或把靜照畫成活體游動。

## 部署照片

`../assets/scw-deployment.png` 來自 SCCOOS CA IFCB Network，圖說為「IFCB Deployed on Santa Cruz Wharf」。可追溯部署地點，但拍攝者和日期未明示；不能把它稱為上述 2020 樣本或四週並列實驗的同步照片。

## 儀器與四細胞示意

Anatomy 圖呈現已核對的功能：取水／鞘流 → 流通池內上游雷射感測 → 選定螢光或散射訊號觸發 → 下游閃光與相機 → 照片交給分類器。感測雷射與拍照照明分開，圖解的尺寸、位置和時間為解說配置，沒有假稱 2020 年儀器的工程圖或真實延遲時間。

原理依據 McLane 的官方說明 <https://mclanelabs.com/imaging-flowcytobot/> 及 Olson & Sosik（2007）作者原文 <https://www2.whoi.edu/staff/hsosik/wp-content/uploads/sites/11/2017/03/OlsonSosik_LOM2007.pdf>。逐零件與幾何檢查在工作目錄 `instrument/`；圖中的示意顆粒不是某張真實 ROI 的逐事件拍攝重建。

計數段先展示真實鏈狀影像，再切換獨立的四細胞圖。4 是教學設定；沒有在真實 ROI 上產生新的分割或人工計數，也不將每條鏈固定乘 2／4。原論文指出 Pseudo-nitzschia 鏈狀影像可能低估細胞濃度，本片沒有宣稱已修正作者資料。ROI 00298 不是已確認的 Pseudo-nitzschia 圖。

## 授權與工具

- 論文與 Figures 1、3：McGaraghan 等（2022），CC BY 4.0，<https://creativecommons.org/licenses/by/4.0/>。
- Dashboard 的 ROI／CSV 及 SCCOOS 部署照片：來源已確認，明確公開重用條款尚未確認。保留原檔供本地評閱；不把論文的 CC BY、程式授權或研究資助關係套用到這些媒體。
- Anatomy kit：MIT；用於固定斜角 SVG 功能圖。來源為本機安裝的 `anatomy` skill，版本與來源紀錄由 `instrument/` 保存。
- GSAP：既有本地版本，<https://gsap.com/standard-license/>。
- Noto Sans TC／Noto Serif TC：OFL，副本在 `fonts/`。

本輪交付是 90 秒無聲獨立動畫候選。沒有新的分類器執行、人工物種鑑定、完整研究重算、網站整合或公開部署。最終測試證據由 `verification.json` 記錄，建置成功本身不代表已完成播放驗證。
