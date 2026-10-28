# 沒量過的地方，植物特徵怎麼估？

04-04 `prototype-v01`，96 秒無聲動畫。預覽：<http://127.0.0.1:8919/index.html>。

影片：[04-04-plant-traits-v01.mp4](film/04-04-plant-traits-v01.mp4)，1600×900、24 fps、2,304 幀。播放器支援暫停、跳段、同頁放大、深淺色與減少動態；載入失敗可重試。

從葉片大小開始，依序說明群聚平均、觀測分布、環境推估、適用範圍與空間驗證。植物情境由 imagegen 製作並有標示；地圖及色條採作者公開圖版。教學占比不代表研究樣區或株數，沒有產生新葉面積、模型預測或 AOA 遮罩。

葉面積視窗與原色條都取自同一美洲切片；SVG 明確裁切，避免透出旁邊其他性狀。手機與桌機使用同一切片內不同大小的視窗。多性狀 AOA 圖與結尾 15／31 的驗證統計分開說明。

來源、授權與版本限制見 [SOURCE.md](SOURCE.md)，生成紀錄見 [context-provenance.json](assets/context-provenance.json)，檢查摘要見 [verification.json](verification.json)。

重開預覽：在本目錄執行 `python3 -m http.server 8919 --bind 127.0.0.1`，再開上方網址。使用 HTTP 提供模組與 JSON，不直接以 file URL 開啟。

本輪只完成獨立動畫，待使用者檢視。未製作案例網站、未加入主站，也未部署。
