# 01-02 混合素材影片來源

這支65.55秒影片以研究照片與獨立教學錄音介紹抹香鯨及現場設備，再接入已接受的47.55秒搜索示意。影像與聲音不是同步海試紀錄；沒有新增鯨群定位或實測結果。

## 研究照片

Bhattacharya等（2025），[arXiv:2512.05808v1](https://arxiv.org/html/2512.05808v1)，Figure 1，[原始圖檔](https://arxiv.org/html/2512.05808v1/ISER_2025_Setup.png)。CC BY 4.0。

影片使用2027×1140原圖的兩個局部：浮出鯨群 `[1450,590,2008,1005]`，船與拖曳陣列 `[15,35,735,470]`（左、上、右、下像素座標）。僅裁切及等比例顯示，保留作者標記，沒有修圖或生成替代研究照片。船頂標示的是VHF天線，船後才是拖曳水聽器陣列。

片頭0–5秒顯示鯨群，5–10秒顯示船與陣列；片尾57.55–65.55秒再次顯示鯨群。照片中的鯨群不對應示意動畫中的A、B或C群。

## 真實點擊聲

[NOAA Fisheries：Sounds in the Ocean – Mammals](https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals)的Sperm Whale點擊聲，署名NOAA Fisheries／Northeast Fisheries Science Center／Passive Acoustics Branch（2023）。[官方MP3](https://www.fisheries.noaa.gov/s3/2023-04/Phma-clicks-NOAA-PAGroup-01-sperm-clip.mp3)、[官方引用文件第21頁](https://www.fisheries.noaa.gov/s3/2023-06/SoundsPageCitations-2023-0.pdf#page=21)、[數位媒體政策](https://sos.noaa.gov/copyright/)。

截取解碼後前6秒，以原增益放在影片1.5–7.5秒；沒有循環、變速或降噪。波形取自同一份WAV，按該片段峰值縮放顯示，遊標與這段聲音對齊。MP4音軌經AAC有損編碼。核心動畫及片尾維持靜音。

這是獨立教學錄音，非本研究海試同步音軌。確切錄音日期、海域、硬體與通道配置未確認；引用年份不當作錄音年份。未據此判定regular clicks、coda或鯨群身分。

## 搜索示意與檢查範圍

10–57.55秒保留原本`manimgx-v05-selection`的全部2853幀與時間順序，只有合成影片所需的重新編碼。這段是簡化教學示意，不是原始研究資料重播；它呈現同一艘船與同一條陣列轉向後的觀測，以及人員選群、選候選航點和最終目視確認。

已核對來源雜湊、全部核心幀、最終影片的六張抽幀及音軌數值。沒有使用瀏覽器或原生播放器，也沒有宣稱完成全片目視播放或人工回聽。

可編輯`scene.py`須在原專案工作目錄使用；合成腳本、完整來源紀錄與檢查資料位於`work/ecology-ai-rollout/cases/01-02/hybrid-v01/`。這個資料夾是影片候選交付，不是獨立的Python執行環境。
