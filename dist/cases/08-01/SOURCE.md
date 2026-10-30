# 08-01 網頁來源與數字核對

## 情境與資料分開

首頁的灌叢、Sage Thrasher與路線是教學情境。四隻鳥的位置與可見性不變；15／60分鐘、0.5／2公里和2／4隻都是示意設定，不是野外紀錄，也不是模型校正前後的結果。圖片由內建imagegen製作，原檔及提示詞在animation/assets/provenance.json與animation/prompts/scene-assets-v01.md。

## eBird趨勢圖

[官方圖資教學與R程式](https://ebird.github.io/ebirdst/articles/trends.html)的Sage Thrasher範例，2022資料版本，2012–2022繁殖季（5月17日至7月12日），27公里格網。官方PNG的原始SHA為8e6ebdd19dcd1bf96dc8ed738e91cdfa4b7e8e49bca0af33bf3d06c3bc24c3d4，與簡報、動畫及此頁保持相同。

此圖以累積相對豐度變化著色，圓點面積約反映研究期間中段的相對豐度。示範R程式未套用各格信賴區間遮罩；本頁不把近白色解釋成方向不確定。沒有逐年地圖、特定地點百分比或新增推論。

資料引用：Fink等（2023），eBird Status and Trends，Data Version2022，Released2023。DOI：[10.2173/ebirdst.2022](https://doi.org/10.2173/ebirdst.2022)。[使用條款](https://science.ebird.org/en/status-and-trends/products-access-terms-of-use)。網頁的解釋與建議不代表Cornell Lab of Ornithology的立場。

## 方法驗證

[Fink等（2023），A Double machine learning trend model for citizen science data](https://doi.org/10.1111/2041-210X.14186)，正式14頁版本，Table2「All」列。網頁的2.4／6.8／3.4%是Wood Thrush、Canada Warbler與Long-billed Curlew的平均方向誤判率；47／49／61%是標示80%區間的實際涵蓋率。

方向誤判依論文定義，模型判為非零的趨勢與模擬設定方向相反；平均率按變化幅度分組再彙整。涵蓋率是模擬的已知真實趨勢落入區間的比例。這不是鳥隻數的準確率，也不是Sage Thrasher的驗證結果。資料另存data/validation.json，未重新執行模型。

[eBird官方FAQ](https://science.ebird.org/en/status-and-trends/faq)支持觀察方式、相對豐度和趨勢解讀。相對豐度是在標準觀察條件下的估計記錄量，不能當成區域內所有鳥隻數；變化原因仍須另外調查。

## 動畫

原120秒動畫與MP4已獲使用者接受。動畫原型工作目錄與MP4不改動；網站另加嵌入配色、尺寸、控制與同iframe放大的橋接。動態場景、時鐘、資料、字型及PNG保持接受版原始bytes。影片SHA：462993edb816109bf82cb3f40413072312862f7523b77eddc0e63e3dae8a4fcf。

嵌入版index只增加兩個橋接資源；原始source manifest另以accepted-source-manifest.json保留，嵌入版manifest記錄網站衍生檔。完整動畫來源見animation/SOURCE.md。
