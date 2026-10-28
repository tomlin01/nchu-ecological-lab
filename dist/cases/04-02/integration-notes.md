# 04-02 混合動畫替換紀錄

只建置新候選與本工作目錄，未寫入主站、未改動已接受的 hybrid-v01。舊頁面快照保存在 `legacy-baseline/`，供重建及逐項比對。

## 呼叫與行為對照

| 舊行為 | 新整合 |
| --- | --- |
| inline GSAP、EcoMotion、場景註冊、生成圖 overlay、progressive controller | 父頁全部移除；只保留歷史 `case-data` JSON。GSAP 僅由已接受動畫在 iframe 中使用。 |
| `EcoMotion.mount/stop/snapshot` 與 IO 返回自動播放 | `WhaleHybrid.pause/beforeMove/afterMove`；沒有任何父頁 play 呼叫。離頁、不可見與列印只暫停。 |
| `WhaleNarrative.layout` 搬移播放器 | 保留同一個 `#method-player`。搬移前同步讀取同源子頁時間、暫停，搬移後用 generation/hello/ready 握手恢復 seek，保持暫停。postMessage state 作備援。 |
| 桌面四頁、手機自然捲動、完整閱讀、hash 路由與頁碼 | 保留原 `narrative.js` 架構和 `WhaleNarrative` API；只接入暫停與搬移快照。 |
| 列印 snapshot/stop/remount | 保存閱讀模式與捲動，暫停並展開 details；列印後還原布局與 details，不重新播放。原列印按鈕的圖片預載仍保留。 |
| 主頁研究原圖 dialog | 保留原行為與鍵盤關閉。 |
| 子頁原圖 dialog | 內嵌包裝攔截使用者來源按鈕，改開同一個本地完整 PNG 新分頁，避免 iframe 裁切。獨立 `animation/index.html` 保留原生 dialog。 |
| iframe 尺寸 | 子頁 ResizeObserver 回報 main 的實際內容高度；父頁驗證來源及 400–3000 px 範圍。embed.css 不使用 vh/dvh 尺寸。 |

## 內容與字型

- 主視覺、其生成圖標示、研究本文與主題 4 返回連結保留。動畫專屬的舊生成圖標示改為作者 Figure 2／3、CC BY 4.0、無新模型推論及無推測公尺數的說明。
- 依根代理確認，只修正四頁與完整閱讀中各一處可見成果句：86 張測試，63 張成功、23 張失敗；主要人工／自動比較使用 63 張成功影像，平均方法間 CV 低於 5%。歷史 JSON 與展開原筆記保持原文。
- 保留完整閱讀 CTA 的 `#exhibit-core` 錨點，位置改到新方法標題。
- 新增兩個 Noto TC 字型子集和 `font-supplement.css`，覆蓋全部可見父頁文字，對原六個 Sans／Serif 字族補足字符。原有字型檔不改寫；完整覆蓋資料見 `font-check.json`。

## 已完成的本地核對

原始碼語法、HTML IDs／錨點、CSS、單一 iframe、父頁舊 runtime 移除、兩處正文修正、歷史筆記保留及字型 cmap 覆蓋已核對。模擬媒體事件檢查涵蓋 49／61 秒搬移、舊 generation 訊息排除、尺寸／來源驗證及只暫停不播放。建置代理未操作瀏覽器；其後根代理已完成主站整合及42項瀏覽器檢查，涵蓋播放、進度保存、列印還原、桌面與手機布局。

## 檔案雜湊

已接受動畫的下列原檔逐一 byte-identical 複製。只額外增加 `animation/embed.html`、`embed.css`、`embed.js`。

| 動畫原檔 | SHA-256 |
| --- | --- |
| `app.bundle.js` | `788278d54282f29e827e455eea42b59e8261409cf08fb42d8a6ba076d889ff30` |
| `index.html` | `079c7c5493b39cdedaa1becfa50ec86fcc9a636431ec53e3c4208385dc467c99` |
| `provenance.json` | `d8f032c1c85b42bfee1185a7a9e19fc8f233f4708d7355598635d6ce401d26a9` |
| `SOURCE.md` | `98bc8e0ac0c8e911774eeab0ea2974a96bad5eacb7dd255444d45d62a8e13fd4` |
| `LICENSES.md` | `7ba763239f01f6b9c3a09a0a4602242025fedddd5b1b29ddab3e4ec8030e722d` |
| `README.md` | `e1021c23d8da3e88bd33aa4c5c048432926fd026ff719cefde2c22808145fd9d` |
| `style.css` | `9331f16106cbdf550f33f812a938557eb58e394c3156ab6d9b9361e1a556826f` |
| `manifest.json` | `f2f02f8ea0590dba1df4c2ffaf7d0f26e6a8a3e53bbc86d5dd0e6fe5e2bdd5ea` |
| `fonts/case-sans.woff2` | `ce4075d7cab298df3056fe3c2d6d966d7f12945ec343843d61e17939e8cf6bb3` |
| `fonts/case-serif.woff2` | `69426ac52afd32a18670ca097eee93b5bd15d282779ee0f500dcacaafbd19f55` |
| `fonts/NotoSans-OFL.txt` | `6a73f9541c2de74158c0e7cf6b0a58ef774f5a780bf191f2d7ec9cc53efe2bf2` |
| `fonts/NotoSerif-OFL.txt` | `6a73f9541c2de74158c0e7cf6b0a58ef774f5a780bf191f2d7ec9cc53efe2bf2` |
| `assets/figure-3.png` | `f0181ca593d8ebf79049e498fb8de6b84e7acc2593f79c659f65230085e9bdb1` |
| `assets/figure-2.png` | `8d64c7e0a3400784e7c1912c6bd04978438ae5adbd086e4f43becd02d126d132` |
| `assets/display-panels.json` | `2cd7548c740cdadb612fdc34c68e35a04e9ba3508d8be2f6b16ddacf9f1a1c6a` |
| `assets/source-provenance.json` | `87379f4d77bfd205886d3a6560d1e919056ef6e5ae6a29a82c18c5609137a30f` |
| `vendor/gsap.min.js` | `96c01b81f44a3290e2b4532f55e2c9534b2adc43273a19f3756b2cb41f0fd0b6` |

新父頁與橋接檔：

| 檔案 | SHA-256 |
| --- | --- |
| `04-02.html` | `332668c0bee7f199860f3e39566e5a0909915fd2959f99b37225feeeda54b7dc` |
| `narrative.js` | `774bec2490cab0892286cfd6f9418b6afd4a62fe02a6cb25bb09a93fb1cc2be6` |
| `hybrid-bridge.js` | `9cb900b0082b74beda4560771e60888910bb79037654c30079f0fbde813b7914` |
| `hybrid.css` | `e2271acd08e9977d91666f41a2e1ccc2a959b8614bd1d6f6c455aa6734d80cf8` |
| `font-supplement.css` | `b5bf05b234330feded5deb882ee5d8279a816344c24676f2f37d48c89b19aebb` |
| `animation/embed.html` | `809b5bdf7ce971c6493d77a92a1ddb3c6568683eeddaddca4c523aea8ee92976` |
| `animation/embed.css` | `9c355ba97f95ba877c2e1c064566052ca36e964e90853fb8b38fb02bdd549576` |
| `animation/embed.js` | `3f3b26289d24ef8ac6fb05238fd2db1375474ee2e8d7cf81420bc7d77f811832` |

基底檔、17個動畫原檔、29個保留區塊及移除script的詳細紀錄在本工作目錄 `integration-checks.json`。建置階段未修改主站；整合完成後，17個接受版動畫原檔與其他215個主站檔案仍保持原雜湊。
