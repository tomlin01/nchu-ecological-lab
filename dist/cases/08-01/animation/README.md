# 08-01 eBird：120秒獨立動畫

預覽入口：<http://127.0.0.1:8953/index.html>。本輪為獨立試作，不代表已加入正式網站或取得使用者視覺接受。

六段：先看見鳥（0秒）→觀察方式改變（20秒）→把兩種變化分開估（40秒）→官方地圖（68秒）→方法檢查（94秒）→回到現場（108秒），120秒結束。

播放、重播、進度拖曳、每一幀、淺深色、放大及無聲閱讀由app.mjs控制。model.mjs保存固定示意鳥與來源邊界，scene.mjs以同一時鐘操作暫停的GSAP時間軸及SVG，沒有另一個自行播放的場景計時器。

鳥與灌叢為內建imagegen生成概念；官方地圖是簡報既有PNG原始bytes。人物、觀察時間、距離與2／4隻紀錄是示意。完整來源、版本與限制見[SOURCE.md](SOURCE.md)，提示詞保留為MD。

API：window.EBirdPlayer.getState()、seek(t)、renderAt(t)、play()、pause()、replay()、setTheme('light'|'dark')。renderAt停止播放，直接停在指定時間；#composition為16:9輸出畫面。

本機驗證與成片紀錄分別保存於案例目錄的qa-v01/與film-v01/，不與正式網站整合或使用者接受混為一談。
