# 02-04 IFCB 網站：來源與素材說明

本文件說明四頁網站候選的文案與素材。網站沿用已接受的 90 秒無聲動畫；本輪沒有執行新分類器、替原圖產生細胞分割或重算原研究。原始案例筆記另外完整保留，與本輪核對過的公開文案分開。

## 原研究與結果圖

McGaraghan, A., Hayashi, K., Daniel, P., & Kudela, R. M. (2022). *Development and comparison of Imaging FlowCytobot classifiers in coastal California*. Proceedings of the 19th International Conference on Harmful Algae, pp. 220–224. [DOI 10.5281/zenodo.7036182](https://doi.org/10.5281/zenodo.7036182)。[Zenodo 原始紀錄](https://zenodo.org/records/7036182)列明 CC BY 4.0；[授權條款](https://creativecommons.org/licenses/by/4.0/)。

網站使用作者 Figure 1 與 Figure 3，不重繪曲線或補造資料點。

| 網站檔案 | 尺寸 | 內容與讀圖範圍 |
|---|---:|---|
| `assets/paper-figure-1.png` | 507 × 172 px | 兩台 IFCB 調整光學感測設定前後的紀錄。左右日期與縱軸範圍不同，單位同為 cells/mL；不是同批資料的校正前後圖。 |
| `assets/paper-figure-3.png` | 1440 × 1372 px | 分類器時間序列與外部水樣比較。網站保留完整圖，正文聚焦底列 Pseudo-nitzschia；單位 cells/L。動畫另以視窗聚焦原圖，完整原檔仍可開啟。 |
| `animation/assets/ICHA_35.pdf` | 5 頁 | 保存的原論文，供核對圖說與方法。 |

2020 年 5–6 月的雙儀器並列為四週；約八個月是 2020 年分類器比較的另一個時間範圍。網站沒有把兩者合成八個月並列實驗，也沒有把 2024 年的作者網站上傳路徑當作論文年份。

Figure 3 的彩線來自不同分類器，紫色方點是每週另外採集的水樣。Pseudo-nitzschia 的水樣探針針對 P. australis 與 P. multiseries，和影像類群不完全相同。Alexandrium catenella 亦使用探針；Dinophysis 另以自體螢光估計。水樣與影像的時間支援和類群範圍都需要一併考慮，不能將每張顯微照片視為已有外部真值。

原文指出成鏈影像可能低估細胞濃度，沒有提供本網站可套用的固定倍數修正。本頁不將原文的訓練準確率、驗證準確率和並列資料表現混排成模型名次；也不把原文對 chi-square 與「similar」的簡略敘述當成統計等效證明。

## 概念主視覺

`assets/ifcb-cell-chain-concept.png`，1672 × 941 px。使用者提供並選用的 AI 生成概念圖，沿用於四頁背景。圖像用途是介紹細胞與細胞鏈，**不是 IFCB 原始影像、特定物種鑑定或微米尺度的實測圖**。

頁面與列印版都有概念圖標示。圖像沒有承接論文 CC BY 4.0 的授權；不得把生成圖標成作者實拍或與下列顯微影像視為同筆觀察。原始檔案與交付複本的雜湊由網站建置紀錄保存。

## 顯微影像與保存分類列

來源為 [SCCOOS CA IFCB Network](https://sccoos.org/ifcb/)、[官方 dashboard](https://ifcb.caloos.org/dashboard)及 [Santa Cruz Municipal Wharf 資料典藏 DOI 10.6075/J0Z60PDV](https://doi.org/10.6075/J0Z60PDV)。

本案保存的四張來源影像來自 bin `D20200701T002011_IFCB104`，時間為 2020-07-01 00:20:11 UTC。原圖與分類 CSV 按完整 pid 配對，不以列順序猜配。

| 原檔，位於 `animation/assets/` | 尺寸 | 來源最高候選 | 來源分數 |
|---|---:|---|---:|
| `D20200701T002011_IFCB104_00120.png` | 760 × 450 px | Akashiwo | 0.954 |
| `D20200701T002011_IFCB104_00298.png` | 488 × 146 px | Guin_Dact | 0.8354 |
| `D20200701T002011_IFCB104_00216.png` | 472 × 316 px | Mesodinium | 0.676 |
| `D20200701T002011_IFCB104_00732.png` | 443 × 258 px | Chaetoceros | 0.869 |

主動畫使用 00120 與 00298，另外兩張保存在來源區。00298 的次候選 Eucampia 分數為 0.1628。原分類列保存在 `animation/assets/D20200701T002011_IFCB104_class_scores.csv`，配對紀錄在 `animation/assets/selected-roi-records.json`。

分數是官方保存的輸出，不能當作模型整體準確率、人工定種結果或本輪新推論。來源 CSV 的精確模型 checkpoint／處理日期尚未核實；同地點、同年份不證明這些圖是論文使用的特定訓練或驗證影像，也不證明它們來自本文某一個 RF／CNN。00298 沒有被確認為 Pseudo-nitzschia。

這筆影像的獨立微米校準未確認。原圖依原長寬比例呈現，沒有新增比例尺、影像變形或活體游動。動畫的四細胞計數圖是另外製作的教學示意，不是對原圖做出的新分割或人工計數。

## 部署照片與儀器機制

`assets/scw-deployment.png`，812 × 1080 px，來自 [SCCOOS CA IFCB Network](https://sccoos.org/ifcb/)，原圖說為「IFCB Deployed on Santa Cruz Wharf」。拍攝者和日期未明示；它能介紹部署地點，不能被稱為上述 2020 年樣本或四週雙儀器實驗的同步照片。

機制說明依 [McLane IFCB 官方頁](https://mclanelabs.com/imaging-flowcytobot/)與 [Olson & Sosik（2007）作者原文](https://www2.whoi.edu/staff/hsosik/wp-content/uploads/sites/11/2017/03/OlsonSosik_LOM2007.pdf)。海水由管線送入碼頭上的儀器，顆粒通過流通池上游雷射感測區，選定的螢光或散射訊號觸發下游閃光及相機。照片取得後才交給影像分類器。

動畫的 Anatomy 功能剖面將時間、位置與尺度放大以便解說，不宣稱是 2020 年儀器的工程重建或真實延遲時間。示意顆粒不是展示 ROI 的同一個體。原機制與計數示意的完整說明保留在 `animation/SOURCE.md`。

## 授權與使用範圍

- 論文與 Figures 1、3：McGaraghan 等（2022），CC BY 4.0，附作者、來源及用途說明。
- Dashboard 顯微影像與分類資料、SCCOOS 部署照片：來源可追溯，但明確公開重用條款尚未確認。只供本地評閱，不套用論文、資料處理程式或機構其他素材的授權。
- 概念主圖：使用者提供的 AI 生成圖，以概念圖明示，不宣稱為研究證據。
- 動畫工具、字型及其授權：沿用動畫包的 `SOURCE.md`、Anatomy notice 和 Noto OFL 文件。網站字型與來源雜湊由建置程序另行記錄。

[WHOI 的 IFCB 有害藻監測說明](https://northeasthab.whoi.edu/bloom-monitoring/imaging-flowcytobot/)用來支持形態相近時仍需其他採樣方法的解釋。本頁沒有提供毒素濃度、海鮮安全判定或新的人工物種鑑定。

此四頁版本仍是本地網站候選，動畫已獲使用者接受；網站實際整合、畫面驗證與來源檔案雜湊，以 root 的建置和驗證紀錄為準。沒有公開部署。
