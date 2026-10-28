(() => {
  'use strict';
  const root=document.documentElement,map=document.getElementById('hero-map');
  const viewButtons=[...document.querySelectorAll('[data-view]')].filter(el=>el.tagName==='BUTTON');
  const pointButtons=[...document.querySelectorAll('button[data-point]')];
  const validationButtons=[...document.querySelectorAll('[data-validation-view]')];
  const heroImages=[...map.querySelectorAll('img[data-map]')],allImages=[...document.querySelectorAll('main img')];
  const error=document.getElementById('image-error'),retry=document.getElementById('image-retry');
  let data,view='compare',point='A',validationView='disagreement';
  try{
    data=JSON.parse(document.getElementById('source-data').textContent);
    if(data.caseId!=='05-04'||data.classes.length!==9||data.points.length!==2)throw Error('來源不符');
    for(const p of data.points){if(p.probabilities.length!==9||p.probabilities.some(v=>!Number.isFinite(v)||v<0||v>1)||Math.abs(p.probabilities.reduce((a,v)=>a+v,0)-1)>2e-6||p.classIndex!==6||p.x!==(p.col+.5)/512||p.y!==(p.row+.5)/512)throw Error('分數或位置不符');}
  }catch{error.hidden=false;error.textContent='分數資料暫時無法讀取。請先閱讀下方文字，或重新開啟本頁。';return;}
  const captions={rgb:'同次觀測的L2A參考影像，保留水面、植被與人工地表的線索。',compare:'相同範圍、方向與網格，左邊看地景，右邊看分類。',label:'作者公布的Top-1標籤。A、B都標成建成區。',top1:'最高分有多高：色越深，九類中的最大分數越高。'};
  function selectView(next){
    if(!Object.hasOwn(captions,next))return false;
    view=next;map.dataset.view=view;
    viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
    document.getElementById('compare-captions').hidden=view!=='compare';
    document.getElementById('top1-key').hidden=view!=='top1';
    document.getElementById('view-caption').textContent=captions[view];return true;
  }
  function selectPoint(id){
    const p=data.points.find(p=>p.id===id);if(!p)return false;point=id;
    pointButtons.forEach(b=>{const active=b.dataset.point===id;b.setAttribute('aria-pressed',String(active));b.classList.toggle('is-selected',active);});
    const order=p.probabilities.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v);
    document.getElementById('score-title').textContent=id==='A'?'A明顯偏向建成區。':'B的前兩名很接近。';
    document.getElementById('score-summary').textContent=id==='A'?'建成區78.8%；第二名裸地3.9%。':'建成區28.6%，水面24.5%；兩者差約4.1個百分點。';
    for(const [i,row] of [...document.querySelectorAll('#score-list .score-row')].entries()){
      row.querySelector('.score-fill').style.setProperty('--score',p.probabilities[i]);
      row.querySelector('.score-number').textContent=`${(p.probabilities[i]*100).toFixed(1)}%`;
      row.classList.toggle('is-top',i===order[0].i);row.classList.toggle('is-second',i===order[1].i);
    }return true;
  }
  const validationCopy={label:['作者的模型標籤。','每個有效格子選出原始的九類分數中最高的一類。'],reference:['保留來檢查的專家共識參考。','沒有人工標記的位置留白，不當成水面或任何一類。'],disagreement:['紫色：與專家參考不一致。','只比較雙方都有有效資料的格子。淺灰為一致，透明區未納入比較。']};
  function selectValidation(next){
    if(!Object.hasOwn(validationCopy,next))return false;validationView=next;
    document.querySelectorAll('[data-validation-map]').forEach(img=>{img.style.display=img.dataset.validationMap===next?'block':'none';});
    validationButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.validationView===next)));
    document.getElementById('validation-caption').textContent=validationCopy[next][0];
    document.getElementById('validation-note').textContent=validationCopy[next][1];return true;
  }
  function imageState(){
    const failed=allImages.filter(img=>img.complete&&!img.naturalWidth),ready=heroImages.every(img=>img.complete&&img.naturalWidth>0);
    error.hidden=!failed.length;retry.hidden=!failed.length;viewButtons.forEach(b=>b.disabled=!ready);
    for(const img of failed){
      const figure=img.closest('figure');if(!figure||figure.querySelector('.local-image-error'))continue;
      const notice=document.createElement('p');notice.className='local-image-error';notice.setAttribute('role','alert');notice.textContent='這張圖片尚未載入。';
      const button=document.createElement('button');button.type='button';button.className='retry-action';button.textContent='重新載入圖片';button.addEventListener('click',retryImages);notice.append(button);figure.append(notice);
    }
    for(const notice of document.querySelectorAll('.local-image-error'))if(![...notice.closest('figure').querySelectorAll('img')].some(img=>img.complete&&!img.naturalWidth))notice.remove();
  }
  function retryImages(){for(const img of allImages.filter(i=>i.complete&&!i.naturalWidth)){const u=new URL(img.src);u.searchParams.set('retry',Date.now());img.src=u.href;}imageState();}
  viewButtons.forEach(b=>b.addEventListener('click',()=>selectView(b.dataset.view)));
  pointButtons.forEach(b=>b.addEventListener('click',()=>selectPoint(b.dataset.point)));
  validationButtons.forEach(b=>b.addEventListener('click',()=>selectValidation(b.dataset.validationView)));
  allImages.forEach(img=>{img.addEventListener('load',imageState);img.addEventListener('error',imageState);});retry.addEventListener('click',retryImages);
  window.LandcoverWeb={selectView,selectPoint,selectValidation,getState:()=>({view,point,validationView,probabilities:[...data.points.find(p=>p.id===point).probabilities],classKey:'built',sourceDataSHA256:data.sourceDataSHA256,imagesReady:heroImages.every(i=>i.complete&&i.naturalWidth>0),imageErrors:allImages.filter(i=>i.complete&&!i.naturalWidth).length,modelRun:false})};
  selectView(view);selectPoint(point);selectValidation(validationView);imageState();
})();
