# 主題二入口：內容與側欄路由覆核

**結果：PASS，沒有必要修正。** 已讀實際template、copy-deck、content-and-assets、topic.js／CSS及sidebar與before的差異。側欄路由另由既有子代理獨立覆核，結論一致。只寫本文件，未操作瀏覽器／播放器／伺服器，未改頁面、四案正文或共用程式。

## 內容與素材

- 主標「照片與聲音，怎麼認出物種？」能涵蓋主題；導讀使用「辨認生物」，沒有宣稱所有分類都能到物種。各案完整限制仍由分頁承接，入口未重列全部限制不構成刪除。
- 四個入口題名去除換行後，逐一等於現行四案h1。四個預覽與研究用途相符：SpeciesNet提出類別候選並回原圖檢查；BirdNET描述森林／火災條件與鳥的關係；Biotwang以同次遭遇的目擊與錄音確認來源；IFCB分清分類與細胞計數。
- 三張生成圖與NOAA布氏鯨實拍的差別，在頁尾常顯說明及圖片alt保留。生成美洲豹沒有冒充SpeciesNet的WCS虎貓照片；來源補充也明說兩者不同。
- NOAA Fisheries／Adam Ü、2010、CC BY2.0與anim2619來源連結常顯；補充保留馬里亞納群島、Permit #14097及照片與案例示範原音非同次觀察。沒有把這張2010主圖當成同次視聽證據，也沒有將NOAA授權套到三張生成圖。
- IFCB主圖明為概念細胞鏈，不提供物種、尺寸或細胞數真值；預覽沒有宣稱本輪已完成分類、分割或計數。BirdNET沒有把觀察關係說成火災或復育的因果效果。
- 四個img路徑以預定站點目錄解析後均存在；實際SHA-256與素材清單一致。入口沒有iframe、video、audio或canvas，不建立第二套播放器或新增同步音軌。

文案整體自然、可直接使用。非必要的微調：IFCB預覽末句「分對類之後，還要數對細胞」可改成「照片裡究竟有幾個細胞，還得另外確認」，讓它更像具體問題，少一點對句口號感。這不是科學修正或交付阻擋。

## 小型側欄變更

- 新增的可選`topic.path`與既有案例路徑一樣，只允許http／https／file，同origin且路徑位於站根內。不存在path的主題仍回首頁錨點。
- 實際template宣告`data-site-page="topic"`與`data-topic-id="topic-02"`。在主題頁路徑下，程式會標示`currentTopic="topic-02"`、`currentCase=null`、`home=false`，並將該主題入口設為目前頁面。
- 與before比較，差異限主題path／目前主題頁辨識／主題入口及狀態欄位。側欄預設收合、焦點、inert還原、媒體互斥與播放控制未改。
- topic.js只在hover／focus時更新預覽文字，沒有攔截連結click或播放操作；無JS時四個正常案例連結仍可使用。列印只暫時展開來源details，之後還原。

以上是源碼及模板檢查；實際站點map生成、建置路徑、裁切、手機排版與瀏覽器互動由root另驗。

## 已核對版本

| 檔案 | SHA-256 |
|---|---|
| `template.html` | `70a892d78e169b6e5baac88e34fb6c2baea73202804ac064e3663b832d55e530` |
| `copy-deck.md` | `000ed8a78b2565a305bc96901abe4afb7d4e15bf5060538dc8d0eeb061973cb4` |
| `sidebar.js` | `26abfc7a2c56f1e86d0e8df464360b104a0652ff25c715f7346ed9752bb91c2d` |
| `topic.js` | `e80593b3d470bf1a82ad8167d3acc7335dad8820ce3c70bca6777025c124bac6` |
| `topic.css` | `6057428e2524d99153ac96d1b8c5d4f5fe3b09dd535c7b042fac102761ae7b9d` |

內容與路由靜態覆核完成，交回寫權。不代表已完成建置、視覺驗收或公開部署。
