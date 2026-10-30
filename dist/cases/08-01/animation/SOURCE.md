# 08-01 動畫的研究與素材

## 本動畫在說什麼

「少看到鳥，代表鳥真的變少了嗎？」從觀察方式的差異，帶到eBird區域趨勢估計。影片中的人物、路線與鳥數是教學情境；官方地圖另有明確資料版本。沒有在此重新執行模型、下載原始賞鳥清單，或產生逐格預測值。

## 官方地圖

- 圖檔：assets/official-trends-2022.png，逐位元複製自現有簡報素材，不重新上色。
- 來源：[eBird Trends Data Products](https://ebird.github.io/ebirdst/articles/trends.html)。
- 原圖：[官方R文件的累積趨勢圓點圖](https://ebird.github.io/ebirdst/articles/trends_files/figure-html/spatial-circles-map-1.png)。
- 對象：Sage Thrasher，2022資料版本；2012–2022繁殖季累積相對豐度變化，27公里格網。
- 紅／藍表示下降／上升；圓點面積約與研究期間中段的相對豐度成比例。
- 此範例圖直接以累積趨勢著色，沒有套用逐格信賴區間遮罩。沒有將近白色解釋成方向不確定，也沒有製造逐年地圖或精確的地點百分比。
- 資料出處：Cornell Lab of Ornithology，eBird Status and Trends，Data Version 2022，Released 2023，DOI：[10.2173/ebirdst.2022](https://doi.org/10.2173/ebirdst.2022)。[使用條款](https://science.ebird.org/en/status-and-trends/products-access-terms-of-use)。

本動畫中的解釋及建議由製作者負責，不代表Cornell Lab of Ornithology的立場。

## 研究方法

[Fink et al.（2023），A Double machine learning trend model for citizen science data](https://doi.org/10.1111/2041-210X.14186)。

動畫以情境說明模型會分別學習鳥數紀錄、觀察方式隨年份的差異，再估計區域趨勢。原論文以另外三種鳥的資料與已知趨勢模擬檢查方法：Wood Thrush、Canada Warbler及Long-billed Curlew。Sage Thrasher是官方產品示例，不冒充該篇研究的驗證物種。

94–108秒的線條是「已知答案後檢查方法」的流程示意，沒有展示本輪的模型結果或準確率。方法可減少混淆影響，但偏差與不確定性仍存在。

相對豐度與觀察差異的定義依[eBird FAQ](https://science.ebird.org/en/status-and-trends/faq)核對。相對豐度不能當作區域內的全部鳥隻數；地圖也不能單獨證明下降原因。

## 情境影像

- assets/sagebrush-scene-v01.png：內建imagegen生成的蒿灌叢環境概念影像，非實拍樣區。
- assets/sage-thrasher-cutout-v01.png：內建imagegen生成的Sage Thrasher概念素材，非實際觀察個體。鳥在情境中為放大示意。
- 鳥類外形與環境依[Cornell Sage Thrasher介紹](https://www.allaboutbirds.org/guide/Sage_Thrasher/overview)核對。
- 四個示意位置在兩個比較畫面中保持相同；2／4隻、15／60分鐘及0.5／2公里是教學設定，不是研究紀錄，並非按時間比例換算鳥隻數。
- [生成與透明度檢查紀錄](assets/provenance.json)；[完整提示詞與版本選擇](prompts/scene-assets-v01.md)。v02鳥圖為保留候選，動畫選用v01。

## 程式與字型

GSAP本機檔沿用專案既有版本。畫面由SVG與單一播放時鐘控制；正反向seek不依賴已播放過的事件歷史。字型複用專案Noto子集與OFL，另保留系統繁體字型備援；沒有遠端字型請求。沒有音軌。
