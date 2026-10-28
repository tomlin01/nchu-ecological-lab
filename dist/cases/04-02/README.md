# 04-02：已接受混合動畫的網頁整合版

> 2026-10-27 player-theme-v01：內嵌播放器已同步自然史淺色／炭灰；控制列移到圖像上方，加入每步1/24秒的逐幀檢視與同頁放大，原圖改用原頁dialog。第三頁增加直接「看動畫」入口；切色與放大關閉保留時間，Escape回到原控制。88秒核心、原研究PNG及獨立動畫保持原樣。下方是先前整合的歷史紀錄，實際發布狀態見專案根目錄最新DEPLOYMENT_HANDOFF.md。

保留既有灰鯨主視覺、四頁／完整閱讀與研究內容，把舊生成圖 overlay 動畫替換為使用者已接受的 88 秒 hybrid-v01。動畫原檔逐一保持 byte-identical；新增的 embed 包裝只處理內嵌布局、暫停、時間保存、原圖連結與高度。

開啟 `04-02.html`；主題返回連結按主站 `cases/04-02/` 的位置保留 `../../index.html#topic-04`。此版已抽換到本地主站，42項瀏覽器與9項靜態檢查通過；未公開部署。實際預覽為 http://127.0.0.1:8863/cases/04-02/04-02.html 。

製作與比對：`work/ecology-ai-rollout/cases/04-02/web-hybrid-v01/build.py`。該腳本使用工作目錄保存的舊頁快照，不改主站或已接受動畫。

呼叫對照、局部成果句修正、補字型及檔案雜湊見 [integration-notes.md](integration-notes.md)。研究圖與工具權利見 [animation/LICENSES.md](animation/LICENSES.md)。

桌面保留四頁按鈕，手機自然捲動。切換分頁／全文會保存動畫時間並暫停；全文、原圖與列印仍可使用。完整驗證見原專案 `work/ecology-ai-rollout/cases/04-02/web-hybrid-v01/verification.json`。
