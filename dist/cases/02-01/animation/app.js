(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const PHASES=[
    {start:0,end:8,title:'相機留下照片，判讀才開始',description:'清楚的動物、被遮住的身體、夜間影像與空景，都是研究人員要整理的照片。',detail:'先看完整照片，再決定哪些地方值得仔細查看。',takeaway:'照片保持原樣，後面的判斷另行記錄。'},
    {start:8,end:16,title:'從一批照片，挑一張仔細看',description:'先以 P01 為例。其他照片仍留在這一批裡，等著逐張查看。',detail:'AI 處理的是已收集的影像，不是在森林裡追蹤動物。',takeaway:'照片編號，連著後面的每一步。'},
    {start:16,end:27,title:'框出位置，再取出框內影像',description:'框先告訴我們動物在哪裡，還沒說是哪一種。接著把同一張照片的框內內容交給分類器。',detail:'裁切只是放大已有細節，不會補出被遮住的身體。',takeaway:'位置框和物種名稱，是不同工作。'},
    {start:27,end:39,title:'有時能說到種，有時只能到科',description:'先看清楚照片的建議，再換另一張被枝葉遮住的照片。這次只保留較粗的分類。',detail:'遮蔽不一定都得到同樣結果。這裡是在示範保留不確定性，沒有顯示實測分數。',takeaway:'不急著把每張照片都填成確定種名。'},
    {start:39,end:51,title:'名稱是建議，人員還要看照片',description:'示意人員確認清楚的照片。遮蔽與夜間照片先保留較粗分類，空景也留在清單裡。',detail:'確認、保留不確定與保留空景，各有不同狀態。',takeaway:'模型建議不會自動變成人工確認。'},
    {start:51,end:60,title:'整理好了，也能回頭看原圖',description:'每筆結果都連著同一張照片，並保留原先附帶的相機與時段資訊。',detail:'四張影像只是四張資料；這裡沒有辨認個體、去重或計算動物總數。',takeaway:'空景仍保留，待確認的結果也不消失。'}
  ];
  const compact=matchMedia('(max-width: 760px)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const stage=$('stage'),clock={time:0};
  let duration=60,photos=[],timeline=null,lastPhase=-1,lastSelection='',selectedOriginal=null,printState=null;
  let cards=[],crops=[],recordButtons=[],stripButtons=[];
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const progress=(t,a,b)=>clamp((t-a)/(b-a));
  const smooth=p=>{p=clamp(p);return p*p*(3-2*p);};
  const mix=(a,b,p)=>({x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p,w:a.w+(b.w-a.w)*p});
  const timeText=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
  const stateLabels={unreviewed:'尚未分類',candidate:'模型建議，待核對',confirmed:'示意人員已確認',uncertain:'保留不確定',retained:'空景影像保留'};
  const modelTimes=[27,34,37,38],reviewTimes=[43,47,49,50];
  function frameAt(t){const time=clamp(Number(t)||0,0,duration),phase=Math.max(0,PHASES.findLastIndex(p=>time>=p.start));return{time,phase,progress:progress(time,PHASES[phase].start,PHASES[phase].end)};}
  function reviewState(photo,index,t){return t<modelTimes[index]?'unreviewed':t<reviewTimes[index]?'candidate':photo.state;}
  function activeIndex(t){if(t>=51||(t>=32.2&&t<34))return null;if(t>=45)return 1;if(t>=39)return 0;return t>=34?1:0;}
  function isPlaying(){return !!timeline&&!timeline.paused()&&clock.time<duration;}
  function show(element,visible){element.hidden=!visible;}
  function image(src,alt){const img=document.createElement('img');img.src=src;img.alt=alt;img.draggable=false;img.addEventListener('error',()=>show($('load-notice'),true));return img;}
  function meta(photo){return[photo.cameraLabel,photo.timeLabel].filter(Boolean).join(' · ');}
  function makeCard(photo,index){
    const figure=document.createElement('figure');figure.className='photo-card';figure.dataset.photo=photo.id;
    const window=document.createElement('div');window.className='image-window';window.style.aspectRatio=`${photo.width}/${photo.height}`;window.append(image(photo.src,photo.alt||`${photo.code||index+1} 完整原圖`));
    let box=null,label=null;
    if(photo.box){box=document.createElement('div');box.className='bbox';box.style.left=`${photo.box.x*100}%`;box.style.top=`${photo.box.y*100}%`;box.style.width=`${photo.box.w*100}%`;box.style.height=`${photo.box.h*100}%`;label=document.createElement('span');label.className='bbox-label';label.textContent='動物';box.append(label);window.append(box);}
    const caption=document.createElement('figcaption'),code=document.createElement('span'),info=document.createElement('span');code.className='photo-code';code.textContent=photo.code||`照片 ${index+1}`;info.className='photo-meta';info.textContent=meta(photo);caption.append(code,info);figure.append(window,caption);$('photo-layer').append(figure);return{figure,box,label};
  }
  function makeCrop(photo,index){
    if(!photo.box)return null;
    const figure=document.createElement('figure');figure.className='crop-card';figure.dataset.photo=photo.id;
    const window=document.createElement('div');window.className='crop-window';window.style.aspectRatio=String(photo.box.w*photo.width/(photo.box.h*photo.height));
    const img=image(photo.src,`${photo.code||index+1} 的同一張照片，框內影像`);
    img.style.width=`${100/photo.box.w}%`;img.style.height=`${100/photo.box.h}%`;img.style.left=`${-photo.box.x/photo.box.w*100}%`;img.style.top=`${-photo.box.y/photo.box.h*100}%`;window.append(img);
    const caption=document.createElement('figcaption'),code=document.createElement('span'),kind=document.createElement('span');code.className='photo-code';code.textContent=photo.code||`照片 ${index+1}`;kind.textContent='框內影像';caption.append(code,kind);figure.append(window,caption);$('crop-layer').append(figure);return figure;
  }
  function openOriginal(index){
    pause('已暫停，正在查看原始照片。');selectedOriginal=index;const photo=photos[index];
    $('original-title').textContent=`${photo.code||`照片 ${index+1}`} · 完整原圖`;
    $('original-image').src=photo.src;$('original-image').alt=photo.alt||photo.title||'完整原圖';
    $('original-caption').textContent=[meta(photo),photo.title].filter(Boolean).join(' · ');
    if(!$('original-dialog').open)$('original-dialog').showModal();
  }
  function makeRecord(photo,index){
    const button=document.createElement('button');button.type='button';button.className='record-row';button.dataset.photo=photo.id;
    const img=image(photo.src,`${photo.code||index+1} 原圖縮圖`),main=document.createElement('span'),code=document.createElement('span'),label=document.createElement('span'),info=document.createElement('span'),status=document.createElement('span');
    main.className='record-main';code.className='record-code';code.textContent=photo.code||`照片 ${index+1}`;label.className='record-label';label.textContent='尚未分類';info.className='record-meta';info.textContent=meta(photo);status.className='record-status';status.textContent='尚未核對';main.append(code,label,info);button.append(img,main,status);button.addEventListener('click',()=>openOriginal(index));$('record-rows').append(button);return{button,label,status};
  }
  function makeThumb(photo,index){
    const button=document.createElement('button');button.type='button';button.dataset.photo=photo.id;button.setAttribute('aria-label',`查看 ${photo.code||index+1} 完整原圖`);
    const text=document.createElement('span');text.textContent=photo.code||`照片 ${index+1}`;const kind=document.createElement('small');kind.textContent=photo.label||'';text.append(kind);button.append(image(photo.src,''),text);button.addEventListener('click',()=>openOriginal(index));$('source-strip').append(button);return button;
  }
  function layout(frame){
    const small=compact.matches,t=frame.time;
    const H=small?(frame.phase<=1?760:frame.phase===4?1280:frame.phase===5?1240:1180):680;
    const grid=small?[{x:30,y:10,w:440},{x:530,y:10,w:440},{x:30,y:400,w:440},{x:530,y:400,w:440}]:[{x:50,y:20,w:420},{x:530,y:20,w:420},{x:50,y:355,w:420},{x:530,y:355,w:420}];
    const hero=small?{x:35,y:40,w:930}:{x:60,y:35,w:880};
    const main=small?{x:55,y:35,w:890}:{x:30,y:90,w:470};
    const thumb=i=>({x:75+(i%3)*215,y:520,w:180});
    const focus=smooth(progress(t,13.3,16));
    const switchPhoto=smooth(progress(t,32.5,34));
    const review=smooth(progress(t,38.5,40));
    const positions=grid.map((g,i)=>{
      let p=i===0?mix(hero,g,smooth(progress(t,5.2,8))):g;
      const target=i===0?main:thumb(i-1);
      p=mix(p,target,focus);
      if(i===0)p=mix(p,thumb(0),switchPhoto);
      if(i===1){p=mix(p,{...thumb(0),y:main.y},smooth(progress(t,32.5,33.2)));p=mix(p,main,smooth(progress(t,33.2,34)));}
      const reviewed=small?(i===0?{x:100,y:20,w:800}:i===1?{x:100,y:650,w:800}:thumb(i-2)):(i===0?{x:35,y:45,w:440}:i===1?{x:525,y:45,w:440}:{x:200+(i-2)*350,y:485,w:220});
      return mix(p,reviewed,review);
    });
    return{H,positions,main};
  }
  function place(element,rect,opacity){
    const scale=stage.clientWidth/1000;
    element.style.left=`${rect.x*scale}px`;element.style.top=`${rect.y*scale}px`;element.style.width=`${rect.w*scale}px`;element.style.opacity=String(clamp(opacity));element.style.visibility=opacity>.001?'visible':'hidden';
    element.classList.toggle('is-small',rect.w*scale<170);
  }
  function renderPhotos(frame){
    const t=frame.time,L=layout(frame);stage.style.aspectRatio=`1000/${L.H}`;
    const resultFade=smooth(progress(t,51,53));
    cards.forEach((card,i)=>{
      let alpha=i===0?1:smooth(progress(t,5.5+i*.2,7.6+i*.1));
      if(i===0)alpha*=t<34?1-smooth(progress(t,32.2,32.75)):smooth(progress(t,34,34.4));
      if(compact.matches&&frame.phase>=2&&frame.phase<=3){const switching=smooth(progress(t,32.5,34));alpha*=i===0?1-switching:i===1?switching:0;}
      if(compact.matches&&frame.phase===4&&i>1)alpha=0;
      alpha*=1-resultFade;place(card.figure,L.positions[i],alpha);
      if(card.box){
        const detection=i===0?smooth(progress(t,17,19)):i===1?smooth(progress(t,33,34.5)):0;
        const visible=detection>0&&alpha>.01&&t<51;
        card.box.style.opacity=String(detection);card.box.hidden=!visible;
        card.box.style.clipPath=detection>=1?'none':`inset(0 ${(1-detection)*100}% 0 0)`;
        const state=reviewState(photos[i],i,t);card.box.dataset.state=state;
        card.label.textContent=t>=modelTimes[i]?photos[i].modelLabel:'動物';
      }
    });
    crops.forEach((crop,i)=>{
      if(!crop)return;
      let alpha=0,reveal=0;
      if(i===0){reveal=smooth(progress(t,20,24));alpha=reveal*(1-smooth(progress(t,32.2,32.75)));}
      if(i===1){reveal=smooth(progress(t,34.4,36.2));alpha=reveal*(1-smooth(progress(t,38.5,39.5)));}
      const photo=photos[i],box=photo.box,original=L.positions[i];
      const start={x:original.x+box.x*original.w,y:original.y+box.y*original.w*photo.height/photo.width,w:box.w*original.w};
      const ratio=box.w*photo.width/(box.h*photo.height);
      const width=compact.matches?Math.min(710,360*ratio):Math.min(400,320*ratio);
      const target=compact.matches?{x:(1000-width)/2,y:740,w:width}:{x:570,y:155,w:width};
      place(crop,mix(start,target,reveal),alpha);
    });
    show($('records'),frame.phase===5);
    if(frame.phase===5){$('records').style.opacity=String(resultFade);$('records').style.transform=`translateY(${18*(1-resultFade)}px)`;}
    show($('source-strip'),frame.phase>=2&&frame.phase<=4);
  }
  function renderCopy(frame){
    const t=frame.time,p=PHASES[frame.phase];
    if(lastPhase!==frame.phase){
      lastPhase=frame.phase;stage.dataset.phase=String(frame.phase);
      $('phase-title').textContent=p.title;$('phase-description').textContent=p.description;$('phase-detail').textContent=p.detail;$('phase-takeaway').textContent=p.takeaway;
      $('phase-position').textContent=`${frame.phase+1} / 6`;$('phase-time').textContent=`${timeText(p.start)}–${timeText(p.end)}`;
      document.querySelectorAll('[data-phase]').forEach(button=>{if(button.tagName!=='BUTTON')return;Number(button.dataset.phase)===frame.phase?button.setAttribute('aria-current','step'):button.removeAttribute('aria-current');});
    }
    const selected=activeIndex(t);show($('selection-info'),frame.phase>=2&&selected!==null);
    if(selected!==null){const photo=photos[selected],state=reviewState(photo,selected,t),key=`${selected}:${state}`;if(key!==lastSelection){lastSelection=key;$('selected-code').textContent=photo.code||photo.id;$('selected-model').textContent=t>=modelTimes[selected]?photo.modelLabel:'位置框先標成動物';$('selected-status').textContent=stateLabels[state];$('selected-status').dataset.state=state;}}
    stripButtons.forEach((button,i)=>button.dataset.selected=String(i===selected));
    recordButtons.forEach((row,i)=>{const state=reviewState(photos[i],i,t);row.button.dataset.state=state;row.status.textContent=stateLabels[state];row.label.textContent=state==='unreviewed'?'尚未分類':state==='candidate'?photos[i].modelLabel:photos[i].reviewLabel;});
  }
  function updateControls(){
    $('play-toggle').textContent=isPlaying()?'暫停動畫':'播放動畫';$('clock').textContent=`${timeText(clock.time)} / 01:00`;
    $('timeline').value=String(clock.time);$('timeline').setAttribute('aria-valuetext',`${clock.time.toFixed(1)} 秒，共 60 秒`);
  }
  function render(){if(!photos.length)return;const frame=frameAt(clock.time);renderPhotos(frame);renderCopy(frame);updateControls();}
  function pause(message){timeline?.pause();render();if(message)$('player-status').textContent=message;}
  function seek(value){const t=clamp(Number(value)||0,0,duration);timeline?.pause();timeline?.time(t,false);clock.time=t;render();$('player-status').textContent=`已停在「${PHASES[frameAt(t).phase].title}」，按播放繼續。`;}
  function play(){
    if(!timeline||document.hidden)return;
    if($('original-dialog').open)$('original-dialog').close();
    if(clock.time>=duration)seek(0);
    const rect=stage.getBoundingClientRect();if(rect.bottom<=0||rect.top>=innerHeight)stage.scrollIntoView({block:'center',behavior:'instant'});
    timeline.play();updateControls();$('player-status').textContent='正在播放。離開畫面會暫停，回來後不會自動續播。';
  }
  window.caseAnimation={seek,play,pause:()=>pause('已暫停，按播放繼續。'),getState:()=>{const frame=frameAt(clock.time),active=selectedOriginal??activeIndex(clock.time);return{...frame,duration,playing:isPlaying(),reducedMotion:reduced.matches,selectedPhoto:active===null?null:photos[active]?.id??null,reviewStates:Object.fromEntries(photos.map((photo,index)=>[photo.id,reviewState(photo,index,clock.time)])),photoSources:Object.fromEntries(photos.map(photo=>[photo.id,photo.src])),cropBoxes:Object.fromEntries(photos.filter(photo=>photo.box).map(photo=>[photo.id,photo.box])),originalOpen:$('original-dialog').open};}};

  try{
    const data=window.caseData;
    if(!data||data.duration!==60||!Array.isArray(data.photos)||data.photos.length!==4)throw new Error('Expected four supplied photos and a 60-second duration.');
    if(!window.gsap)throw new Error('Local GSAP library unavailable.');
    for(const photo of data.photos){
      if(!photo.id||!photo.src||!(photo.width>0)||!(photo.height>0)||!['confirmed','uncertain','retained'].includes(photo.state))throw new Error('Photo metadata is incomplete.');
      if(photo.box){const b=photo.box;if(![b.x,b.y,b.w,b.h].every(Number.isFinite)||b.x<0||b.y<0||b.w<=0||b.h<=0||b.x+b.w>1||b.y+b.h>1)throw new Error('Photo box must use supplied, bounded normalized coordinates.');}
    }
    photos=data.photos;duration=data.duration;
    cards=photos.map(makeCard);crops=photos.map(makeCrop);recordButtons=photos.map(makeRecord);stripButtons=photos.map(makeThumb);
    timeline=window.gsap.timeline({paused:true,onUpdate:render,onComplete:()=>{updateControls();$('player-status').textContent='播放完畢。可以點選紀錄查看原圖，或選一段重新觀看。';}});
    PHASES.forEach((p,i)=>timeline.addLabel(`phase-${i}`,p.start));timeline.to(clock,{time:duration,duration,ease:'none'},0);
    show(stage,true);show($('fallback-gallery'),false);document.querySelectorAll('.js-only').forEach(el=>show(el,true));
    $('story-text').open=reduced.matches;
    if(reduced.matches){timeline.time(duration,false);clock.time=duration;$('player-status').textContent='已啟用減少動態，目前顯示完整整理清單。下方文字已展開；按播放可從頭觀看。';}
    else $('player-status').textContent='60 秒，無音訊。按播放開始，拖曳進度或選取段落會停在該處。';
    $('play-toggle').addEventListener('click',()=>isPlaying()?pause('已暫停，按播放繼續。'):play());$('replay').addEventListener('click',()=>{seek(0);play();});$('timeline').addEventListener('input',()=>seek($('timeline').value));
    document.querySelectorAll('.phase-navigation [data-phase]').forEach(button=>button.addEventListener('click',()=>{seek(PHASES[Number(button.dataset.phase)].start);stage.scrollIntoView({block:'start',behavior:'instant'});}));
    $('close-original').addEventListener('click',()=>$('original-dialog').close());$('original-dialog').addEventListener('close',()=>{selectedOriginal=null;});
    document.addEventListener('keydown',event=>{if(event.code!=='Space'||event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||$('original-dialog').open||event.target.closest('button,a,input,textarea,select,summary,[contenteditable]'))return;event.preventDefault();isPlaying()?pause('已暫停，按播放繼續。'):play();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('視窗已切到背景，動畫保持暫停。');});
    const visibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&isPlaying())pause('動畫已離開可見範圍，保持暫停。');},{threshold:0});visibility.observe(stage);
    const sizing=new ResizeObserver(render);sizing.observe(stage);compact.addEventListener('change',render);reduced.addEventListener('change',()=>{pause('動態偏好已變更，動畫保持暫停。');$('story-text').open=true;});
    addEventListener('pagehide',()=>pause());
    addEventListener('beforeprint',()=>{pause();printState=[...document.querySelectorAll('details')].map(el=>({el,open:el.open}));printState.forEach(({el})=>el.open=true);});
    addEventListener('afterprint',()=>{printState?.forEach(({el,open})=>el.open=open);printState=null;pause();});
    addEventListener('unload',()=>{timeline.kill();visibility.disconnect();sizing.disconnect();},{once:true});
    document.documentElement.classList.add('enhanced');render();
  }catch(error){show($('load-notice'),true);show(stage,false);show($('fallback-gallery'),true);$('player-status').textContent='互動播放器暫時無法啟動，下方照片和完整文字仍可閱讀。';console.error(error);}
})();
