(() => {
  'use strict';
  const root=document.documentElement;
  const assetBase=new URL('./',document.currentScript.src);
  const sections=[...document.querySelectorAll('.topic[data-topic]')];
  const topicIds=sections.map(section=>section.dataset.topic);
  let pager=null,habitatMotion=null;
  const traitSection=sections.find(section=>section.dataset.topic==='04')||null;
  const field=document.getElementById('topic-01');
  const fieldStage=field.querySelector('.field-stage');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const compact=matchMedia('(max-width: 900px)');
  const shortLandscape=matchMedia('(max-width: 900px) and (max-height: 560px) and (orientation: landscape)');
  const isCompact=()=>compact.matches&&!shortLandscape.matches;
  const selectedCases=Object.fromEntries(topicIds.map(id=>[id,null]));
  let chapters=new Map(),cases=new Map(),assets=new Map(),elements=new Map();
  let initialized=false,initError=null,assetsReady=false,activeTopic='01'; // taste-skill-ignore: internal chapter route key
  let printing=false,printSnapshot=null,layoutFrame=0,scrollFrame=0,hashFrame=0,resizeTimer=0,retryCount=0;
  let pendingHash=location.hash;
  let configuredReduced=reduced.matches,configuredWidth=innerWidth,configuredHeight=innerHeight;
  let traitEntrancePlayed=false,traitEntranceDismissed=false,traitEntrance=null,traitGeometry=null;
  const failedImages=new Set();
  const imageList=[...document.querySelectorAll('img')];
  const initialImageSources=new Map(imageList.map(image=>[image,image.getAttribute('src')]));
  const guidePaths=new Map(sections.filter(section=>section.dataset.topic!=='01').map(section=>[section.dataset.topic,section.querySelector('.selection-guide path')])); // taste-skill-ignore: internal chapter route key
  const $=selector=>document.querySelector(selector);
  const topicId=value=>{const match=String(value).match(/^(?:#?topic-)?(\d{1,2})$/);const id=match?match[1].padStart(2,'0'):null;return topicIds.includes(id)?id:null;};
  const sectionFor=id=>document.getElementById(`topic-${id}`);
  const galleryFor=id=>sectionFor(id).querySelector('.asset-gallery');
  const caseButtons=id=>[...sectionFor(id).querySelectorAll('.case-choice')];
  const assetButtons=id=>[...galleryFor(id).querySelectorAll('.asset-button')];

  function status(message){const node=document.getElementById('load-status');if(node.textContent!==message)node.textContent=message;node.parentElement.classList.toggle('is-visible',Boolean(message));}
  function getState(){
    return {initialized,initError,activeTopic,selectedCases:{...selectedCases},fieldMode:'click',assetsReady,
      assetErrors:[...failedImages].map(image=>initialImageSources.get(image)),reducedMotion:reduced.matches,compact:isCompact(),printing,
      selectedAssets:Object.fromEntries(topicIds.map(id=>[id,selectedCases[id]?[...cases.get(selectedCases[id]).assetIds]:[]])),
      mountedAssetCount:document.querySelectorAll('.asset-button img').length,
      traitEntrancePlayed,traitEntrancePlaying:Boolean(traitEntrance?.isActive()),
      traitEntranceDismissed,habitatMotion:habitatMotion?.getState()||null,topicNavigationPlaying:Boolean(pager?.isTurning()),navigationTarget:pager?.state().to||null,
      pageTurn:pager?.state()||{active:false},gesture:pager?.gesture()||{wheelLocked:false},
      activeEnvironment:selectedCases['01'],microInsetVisible:selectedCases['01']==='01-03'&&isEnvironmentLoaded('01-03')}; // taste-skill-ignore: internal chapter route key
  }
  function replaceHash(hash){
    if(location.hash===hash)return;
    const url=new URL(location.href);url.hash=hash;
    history.replaceState(history.state,'',url);
  }
  function writeTitle(node,lines){
    const key=lines.join('|');if(node.dataset.text===key)return;
    node.replaceChildren();lines.forEach((line,index)=>{if(index)node.append(document.createElement('br'));const span=document.createElement('span');span.textContent=line;node.append(span);});node.dataset.text=key;
  }
  function syncControls(id){
    const section=sectionFor(id),chosen=selectedCases[id],current=chosen?cases.get(chosen):null;
    section.dataset.selectedCase=chosen||'';
    caseButtons(id).forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.case===chosen)));
    const read=section.querySelector('.read-case');
    if(current){read.href=current.href;read.textContent=`閱讀：${current.label}`;read.tabIndex=0;}
    else{read.removeAttribute('href');read.textContent='閱讀案例';read.tabIndex=-1;}
    const message=id==='01'?(current?'點選其他案例，切換環境。':'點選案例名稱或插畫，走進環境。'): // taste-skill-ignore: internal chapter route key
      id==='03'?(current?'研究使用的照片、影片與錄音，都在案例裡。':'選一個問題，看看兩張圖的差別。'): // taste-skill-ignore: internal chapter route key
      id==='05'?(current?(current.hint||'研究中的製圖方法與來源，都在案例裡。'):'點選案例名稱或插畫，看看研究怎麼描繪棲地。'):
      id==='04'?(current?.id==='04-04'?'群聚平均是推估，圖中植物不是研究樣區':current?(current.hint||'研究中的量測方法與來源，都在案例裡。'):'點選案例名稱或插畫，放大查看。'):
      current?'對應的圖片已標示出來，也可以直接選擇其他案例。':'點選案例名稱或插畫，查看對應的圖片。';
    const hint=current?message+' 點空白處可回到總覽。':message;
    const live=section.querySelector('.selection-status');if(live.textContent!==hint)live.textContent=hint;
    if(id==='01')writeTitle(document.getElementById('title-01'),current?.question||chapters.get('01').title); // taste-skill-ignore: internal chapter route key
  }
  function cssSlot(button){
    const style=getComputedStyle(button),prefix=isCompact()?'--m':'--';
    return {x:parseFloat(style.getPropertyValue(`${prefix}x`))/100,y:parseFloat(style.getPropertyValue(`${prefix}y`))/100,
      w:parseFloat(style.getPropertyValue(`${prefix}w`))/100,h:parseFloat(style.getPropertyValue(`${prefix}h`))/100,
      rotation:parseFloat(style.getPropertyValue(isCompact()?'--mturn':'--turn'))||0};
  }
  function fit(asset,slot,width,height){
    const rotation=slot.rotation||0,radians=rotation*Math.PI/180,c=Math.cos(radians),s=Math.sin(radians);
    const corners=[[0,0],[asset.width*c,asset.width*s],[-asset.height*s,asset.height*c],
      [asset.width*c-asset.height*s,asset.width*s+asset.height*c]];
    const minX=Math.min(...corners.map(point=>point[0])),maxX=Math.max(...corners.map(point=>point[0]));
    const minY=Math.min(...corners.map(point=>point[1])),maxY=Math.max(...corners.map(point=>point[1]));
    const scale=Math.min(width*slot.w/(maxX-minX),height*slot.h/(maxY-minY));
    const bounds={x:width*slot.x+(width*slot.w-(maxX-minX)*scale)/2,
      y:height*slot.y+(height*slot.h-(maxY-minY)*scale)/2,w:(maxX-minX)*scale,h:(maxY-minY)*scale};
    return {x:bounds.x-minX*scale,y:bounds.y-minY*scale,scale,rotation,w:asset.width*scale,h:asset.height*scale,bounds};
  }
  function overviewTargets(id){
    const gallery=galleryFor(id),width=gallery.clientWidth,height=gallery.clientHeight;
    return assetButtons(id).map(button=>{const asset=assets.get(button.dataset.assetId);return {button,asset,...fit(asset,cssSlot(button),width,height),opacity:1,visible:true,selected:false};});
  }
  function selectionTargets(id){
    const targets=overviewTargets(id),chosen=selectedCases[id];if(!chosen)return targets;
    const selected=cases.get(chosen).assetIds,gallery=galleryFor(id),width=gallery.clientWidth,height=gallery.clientHeight;
    let boxes;
    if(id==='03')boxes=isCompact()?[{x:.03,y:.03,w:.94,h:.44},{x:.03,y:.53,w:.94,h:.44}]:[{x:.01,y:.12,w:.48,h:.76},{x:.51,y:.12,w:.48,h:.76}]; // taste-skill-ignore: internal chapter route key
    else if(id==='04'||id==='05')boxes=[{x:.04,y:.04,w:.92,h:.92}];
    else if(selected.length===3)boxes=isCompact()?[{x:.02,y:.02,w:.48,h:.43},{x:.52,y:.02,w:.46,h:.43},{x:.15,y:.53,w:.7,h:.43}]:[{x:.00,y:.19,w:.49,h:.59},{x:.51,y:.02,w:.47,h:.44},{x:.51,y:.54,w:.47,h:.44}];
    else boxes=[{x:.04,y:.04,w:.92,h:.89}];
    return targets.map(target=>{
      const index=selected.indexOf(target.asset.id);
      if(index>=0)return {...target,...fit(target.asset,boxes[index],width,height),opacity:1,visible:true,selected:true};
      const hideOthers=id==='03'||id==='04'||id==='05';
      return {...target,opacity:hideOthers?0:.15,visible:!hideOthers,selected:false};
    });
  }
  function setTarget(target,animate){
    const {button,opacity,visible,selected}=target;
    gsap.killTweensOf(button);
    button.style.zIndex=selected?'6':'1';button.style.pointerEvents=visible?'auto':'none';
    button.inert=!visible;button.tabIndex=visible?0:-1;
    button.setAttribute('aria-hidden',String(!visible));button.setAttribute('aria-pressed',String(selected));
    button.classList.toggle('is-dimmed',opacity<1&&visible);
    const properties={x:target.x,y:target.y,scale:target.scale,rotation:target.rotation,autoAlpha:opacity,transformOrigin:'0 0',overwrite:true};
    if(animate&&!reduced.matches&&!printing)gsap.to(button,{...properties,duration:visible ? .24 : .14,ease:'power2.out'});
    else gsap.set(button,properties);
  }
  function drawGuide(id,targets){
    const path=guidePaths.get(id);if(!path)return;
    const svg=path.ownerSVGElement,chosen=selectedCases[id];
    if(!chosen||isCompact()||printing){svg.style.opacity='0';path.removeAttribute('d');return;}
    const section=sectionFor(id),button=caseButtons(id).find(node=>node.dataset.case===chosen);
    const group=targets.filter(target=>target.selected);
    if(!button||!group.length){svg.style.opacity='0';return;}
    const s=section.querySelector('.topic-stage').getBoundingClientRect(),b=button.getBoundingClientRect(),g=galleryFor(id).getBoundingClientRect();
    const bounds={left:g.left-s.left+Math.min(...group.map(item=>item.bounds.x)),
      right:g.left-s.left+Math.max(...group.map(item=>item.bounds.x+item.bounds.w)),
      top:g.top-s.top+Math.min(...group.map(item=>item.bounds.y)),
      bottom:g.top-s.top+Math.max(...group.map(item=>item.bounds.y+item.bounds.h))};
    const bx=b.left-s.left+b.width/2,by=b.top-s.top+b.height/2,gx=(bounds.left+bounds.right)/2,gy=(bounds.top+bounds.bottom)/2;
    let startX,startY,endX,endY,vertical;
    if(b.bottom-s.top<=bounds.top){startX=bx;startY=b.bottom-s.top+8;endX=gx;endY=bounds.top-12;vertical=true;}
    else if(b.top-s.top>=bounds.bottom){startX=bx;startY=b.top-s.top-8;endX=gx;endY=bounds.bottom+12;vertical=true;}
    else if(bx<gx){startX=b.right-s.left+10;startY=by;endX=bounds.left-12;endY=gy;vertical=false;}
    else{startX=b.left-s.left-10;startY=by;endX=bounds.right+12;endY=gy;vertical=false;}
    const bend=vertical?(startY+endY)/2:(startX+endX)/2;
    const values=vertical?[startX,startY,startX,bend,endX,bend,endX,endY]:[startX,startY,bend,startY,bend,endY,endX,endY];
    const [sx,sy,c1x,c1y,c2x,c2y,ex,ey]=values.map(value=>value.toFixed(2));
    svg.setAttribute('viewBox',`0 0 ${s.width} ${s.height}`);
    path.setAttribute('d',`M${sx} ${sy}C${c1x} ${c1y},${c2x} ${c2y},${ex} ${ey}`);svg.style.opacity='.48';
  }
  function layoutSelection(id,animate=false){
    if(pager?.isTurning())return;
    if(!initialized||printing)return;
    if(id==='04'){stopTraitEntrance();animate=animate&&traitVisible();}
    const targets=selectionTargets(id),chosen=selectedCases[id];
    if(id==='04')traitGeometry={width:galleryFor(id).clientWidth,height:galleryFor(id).clientHeight,compact:isCompact()};
    const focused=targets.find(target=>!target.visible&&target.button===document.activeElement);
    if(focused&&chosen)caseButtons(id).find(button=>button.dataset.case===chosen)?.focus({preventScroll:true});
    targets.forEach(target=>setTarget(target,animate));drawGuide(id,targets);
    if(id==='04')renderTraitCue(animate);
  }
  function traitVisible(){
    if(!traitSection||document.hidden)return false;
    const rect=traitSection.getBoundingClientRect();return rect.bottom>0&&rect.top<innerHeight;
  }
  function stopTraitEntrance(){traitEntrance?.kill();traitEntrance=null;}
  function traitAssetsReady(){
    return traitSection&&[...traitSection.querySelectorAll('img')].every(image=>image.complete&&image.naturalWidth>0&&!failedImages.has(image))&&(!document.fonts||document.fonts.status==='loaded');
  }
  function renderTraitCue(animate=false){
    if(!traitSection)return;
    const chosen=selectedCases['04'];
    traitSection.querySelectorAll('.asset-button').forEach(button=>{
      const cue=button.querySelector('.trait-cue');if(!cue)return;
      const paths=[...cue.querySelectorAll('.trait-cue-line')];gsap.killTweensOf([cue,...paths]);
      const active=!printing&&chosen===button.dataset.case&&chosen!=='04-04'&&
        (cue.dataset.cue||button.dataset.cue)!=='none'&&paths.length>0;
      cue.style.opacity=active?'1':'0';cue.setAttribute('aria-hidden','true');
      paths.forEach(path=>{
        const length=path.getTotalLength();if(!Number.isFinite(length)||length<=0)return;
        path.style.strokeDasharray=`${length} ${length}`;
        if(active&&animate&&!reduced.matches&&traitVisible()){
          gsap.fromTo(path,{strokeDashoffset:length},{strokeDashoffset:0,duration:.55,ease:'power1.out',overwrite:true});
        }else gsap.set(path,{strokeDashoffset:active?0:length});
      });
    });
  }
  function playTraitEntrance(){
    if(!initialized||printing||!traitAssetsReady()||selectedCases['04']||!traitVisible())return false;
    stopTraitEntrance();layoutSelection('04',false);
    traitEntrancePlayed=false;
    if(reduced.matches){traitEntrancePlayed=true;return getState();}
    const targets=overviewTargets('04');
    const animation=gsap.timeline({onComplete:()=>{
      if(traitEntrance!==animation)return;
      traitEntrance=null;traitEntrancePlayed=true;layoutAll();
    }});
    traitEntrance=animation;
    targets.forEach((target,index)=>animation.fromTo(target.button,
      {x:target.x,y:target.y+24,rotation:target.rotation+(index%2?3:-3)},
      {x:target.x,y:target.y,rotation:target.rotation,duration:.65,ease:'power2.out',overwrite:true},index*.08));
    return getState();
  }
  function replayEntrance(){
    if(!initialized||printing||!traitSection)return false;
    selectCase('04',null,{animate:false});traitEntranceDismissed=false;return playTraitEntrance();
  }
  function checkTraitEntrance(){
    if(pager?.isTurning())return;
    if(!initialized||printing||!traitSection)return;
    if(traitEntrance&&(!traitVisible()||activeTopic!=='04'))layoutSelection('04',false);
    if(!traitAssetsReady()||traitEntrance||traitEntrancePlayed||traitEntranceDismissed||selectedCases['04']||activeTopic!=='04'||document.hidden)return;
    const section=traitSection.getBoundingClientRect(),gallery=galleryFor('04').getBoundingClientRect();
    const header=document.querySelector('.site-header').getBoundingClientRect().bottom;
    const visible=Math.max(0,Math.min(gallery.bottom,innerHeight)-Math.max(gallery.top,header));
    // Start when the destination and its pictures are in view, not at the first sliver of the next chapter.
    if(section.top<=innerHeight*.2&&gallery.height>0&&visible>=Math.min(gallery.height,innerHeight-header)*.75)playTraitEntrance();
  }
  function traitGeometryUnchanged(){
    if(!traitGeometry)return false;
    const gallery=galleryFor('04');
    return traitGeometry.compact===isCompact()&&Math.abs(traitGeometry.width-gallery.clientWidth)<=2&&Math.abs(traitGeometry.height-gallery.clientHeight)<=2;
  }
  function cancelTopicNavigation(){pager?.finish();}
  function skipKeyboardEntrance(id){
    if(id==='04'){traitEntrancePlayed=true;if(traitEntrance)layoutSelection('04',false);}
    if(id==='05')habitatMotion?.skipEntrance();
  }

  function measureFieldPanel(){
    if(!isCompact())return;
    const panel=fieldStage.querySelector('.topic-panel').getBoundingClientRect(),stage=fieldStage.getBoundingClientRect();
    const footerHeight=Math.ceil(fieldStage.querySelector('.topic-footer').getBoundingClientRect().height);
    const bottom=Math.ceil(panel.bottom-stage.top+10),value=`${bottom}px`;
    if(fieldStage.style.getPropertyValue('--field-ui-bottom')!==value)fieldStage.style.setProperty('--field-ui-bottom',value);
    if(fieldStage.style.getPropertyValue('--field-footer-height')!==`${footerHeight}px`)fieldStage.style.setProperty('--field-footer-height',`${footerHeight}px`);
  }
  function isEnvironmentLoaded(caseId){
    if(!caseId)return false;
    const image=fieldStage.querySelector(`[data-environment="${caseId}"] img`);
    return Boolean(image?.complete&&image.naturalWidth>0&&!failedImages.has(image));
  }
  function renderField(animate=false){
    if(pager?.isTurning())return;
    if(!initialized||printing||reduced.matches!==configuredReduced||innerWidth!==configuredWidth)return;
    const chosen=selectedCases['01']; // taste-skill-ignore: internal chapter route key
    const loaded=isEnvironmentLoaded(chosen),duration=animate&&!reduced.matches?.6:0;
    const source=chosen?elements.get(cases.get(chosen).assetIds[0]):null;
    const sourceRect=source?.getBoundingClientRect();
    const credit=fieldStage.querySelector('.topic-footer p');
    const creditText=chosen&&loaded?(chosen==='01-03'?'AI 生成環境示意・細胞為放大示意':'AI 生成環境示意・非研究現場'):'AI 生成概念插畫・各場景獨立・微觀形態放大';
    if(credit.textContent!==creditText)credit.textContent=creditText;
    fieldStage.classList.toggle('has-environment',loaded);
    measureFieldPanel();
    const targets=overviewTargets('01'),stage=fieldStage.getBoundingClientRect(),gallery=galleryFor('01').getBoundingClientRect(); // taste-skill-ignore: internal chapter route key
    const clipFor=(caseId,actual=false)=>{
      const target=targets.find(item=>item.asset.caseId===caseId);
      const rect=actual&&sourceRect?{x:sourceRect.left-stage.left,y:sourceRect.top-stage.top,w:sourceRect.width,h:sourceRect.height}:
        {x:gallery.left-stage.left+target.bounds.x,y:gallery.top-stage.top+target.bounds.y,w:target.bounds.w,h:target.bounds.h};
      return `inset(${Math.max(0,rect.y)}px ${Math.max(0,stage.width-rect.x-rect.w)}px ${Math.max(0,stage.height-rect.y-rect.h)}px ${Math.max(0,rect.x)}px)`;
    };
    fieldStage.querySelectorAll('.environment-layer').forEach(layer=>{
      const active=loaded&&layer.dataset.environment===chosen,wasActive=layer.dataset.active==='true';
      gsap.killTweensOf(layer);layer.dataset.active=String(active);
      if(active){
        if(duration&&!wasActive)gsap.set(layer,{opacity:0,clipPath:clipFor(chosen,true)});
        if(duration)gsap.to(layer,{opacity:1,clipPath:'inset(0px)',duration,ease:'power2.out',overwrite:true});
        else gsap.set(layer,{opacity:1,clipPath:'inset(0px)'});
      }else{
        const properties={opacity:0};
        if(!chosen&&wasActive)properties.clipPath=clipFor(layer.dataset.environment);
        if(duration)gsap.to(layer,{...properties,duration:.4,ease:'power2.out',overwrite:true});
        else gsap.set(layer,{opacity:0,clipPath:'inset(50%)'});
      }
    });
    let microTarget=null;
    targets.forEach(target=>{
      const isChosen=target.asset.caseId===chosen,isMicro=chosen==='01-03'&&isChosen&&loaded;
      let next={...target,selected:isChosen,opacity:loaded?0:1,visible:!loaded};
      if(isMicro){
        const box=isCompact()?{x:.34,y:.36,w:.64,h:.57}:{x:.47,y:.49,w:.5,h:.44};
        next={...next,...fit(target.asset,box,gallery.width,gallery.height),opacity:1,visible:true,rotation:0};microTarget=next;
      }
      if(!next.visible&&target.button===document.activeElement&&chosen)caseButtons('01').find(button=>button.dataset.case===chosen)?.focus({preventScroll:true}); // taste-skill-ignore: internal chapter route key
      target.button.classList.toggle('is-micro-inset',isMicro);setTarget(next,animate);
    });
    const label=document.getElementById('micro-label');gsap.killTweensOf(label);
    if(microTarget){
      label.style.left=`${gallery.left-stage.left+microTarget.x}px`;label.style.top=`${gallery.top-stage.top+microTarget.y+microTarget.h+4}px`;label.style.width=`${microTarget.w}px`;
      label.setAttribute('aria-hidden','false');
    }else label.setAttribute('aria-hidden','true');
    if(duration)gsap.to(label,{opacity:microTarget?1:0,duration:.35,overwrite:true});
    else gsap.set(label,{opacity:microTarget?1:0});
  }
  function updateActiveTopic(animate=true){
    if(pager?.isTurning())return;
    if(printing||reduced.matches!==configuredReduced||innerWidth!==configuredWidth)return;
    const scan=Math.max(parseFloat(getComputedStyle(root).getPropertyValue('--header-height'))+35,innerHeight*.36);
    let current='01'; // taste-skill-ignore: internal chapter route key
    sections.forEach(section=>{if(section.getBoundingClientRect().top<=scan)current=section.dataset.topic;});
    if(document.getElementById('topics').getBoundingClientRect().top<=scan)current='topics';
    activeTopic=current;
    document.querySelectorAll('.site-header nav a').forEach(link=>link.getAttribute('href')===(current==='topics'?'#topics':`#topic-${current}`)?link.setAttribute('aria-current','location'):link.removeAttribute('aria-current'));
    habitatMotion?.sync({animate});
  }
  function selectCase(topic,value,{url=true,animate=true}={}){
    const id=topicId(topic);if(!initialized||!id||!(value===null||(cases.has(value)&&cases.get(value).topic===id)))return false;
    cancelTopicNavigation();
    if(id==='04'&&(url||value!==null))traitEntranceDismissed=true;
    if(url){cancelAnimationFrame(hashFrame);hashFrame=0;pendingHash=null;}
    if(innerWidth!==configuredWidth)refreshGeometry();
    selectedCases[id]=value;syncControls(id);
    if(id==='01')renderField(animate); // taste-skill-ignore: internal chapter route key
    else layoutSelection(id,animate);
    if(url)replaceHash(value?`#case-${value}`:`#topic-${id}`);
    updateActiveTopic(animate);return getState();
  }
  function scrollToTopic(topic,{url=true,focus=false,animate=false,keyboard=false}={}){
    const id=topic==='topics'?'topics':topicId(topic);if(!initialized||!id)return false;
    if(url){cancelAnimationFrame(hashFrame);hashFrame=0;pendingHash=null;}
    if(innerWidth!==configuredWidth)refreshGeometry();
    pager.go(id,{url,focus,animate,keyboard});return getState();
  }
  function applyHash(hash=pendingHash??location.hash){
    cancelAnimationFrame(hashFrame);hashFrame=0;if(!initialized||printing)return;
    try{
      const chapter=hash==='#topics'?'topics':['#home','#main-content','#cases'].includes(hash)?'01':topicId(hash);
      if(chapter){scrollToTopic(chapter,{url:false});return;}
      const match=hash.match(/^#case-(\d{2}-\d{2})$/);
      if(!match||!cases.has(match[1]))return;
      const item=cases.get(match[1]);
      scrollToTopic(item.topic,{url:false});
      selectCase(item.topic,item.id,{url:false,animate:false});
    }finally{pendingHash=null;}
  }
  function queueHash(){
    const hash=location.hash;pendingHash=hash;
    cancelAnimationFrame(hashFrame);hashFrame=requestAnimationFrame(()=>applyHash(hash));
  }
  function layoutAll(){
    if(pager?.isTurning())return;
    if(!initialized||printing)return;
    renderField(false);topicIds.filter(id=>id!=='01').forEach(id=>{
      if(id==='04'&&traitEntrance&&traitGeometryUnchanged())return;
      layoutSelection(id,false);
    });updateActiveTopic();checkTraitEntrance();
  }
  function refreshGeometry(){
    clearTimeout(resizeTimer);resizeTimer=0;configuredWidth=innerWidth;configuredHeight=innerHeight;
    layoutAll();
  }
  function scheduleLayout(){cancelAnimationFrame(layoutFrame);layoutFrame=requestAnimationFrame(()=>{layoutFrame=0;layoutAll();});}
  function checkAssetStatus(){
    assetsReady=imageList.every(image=>image.complete&&image.naturalWidth>0&&!failedImages.has(image))&&(!document.fonts||document.fonts.status==='loaded');
    document.getElementById('retry-assets').hidden=failedImages.size===0;
    status(failedImages.size?'部分插畫尚未載入，仍可選擇或閱讀案例。':assetsReady?'':'正在準備環境插畫。');
  }
  function watchImage(image){
    return new Promise(resolve=>{
      const finish=async failed=>{
        if(failed)failedImages.add(image);
        else{failedImages.delete(image);try{await image.decode();}catch{if(!image.naturalWidth)failedImages.add(image);}}
        checkAssetStatus();scheduleLayout();resolve();
      };
      if(image.complete){finish(!image.naturalWidth);return;}
      image.addEventListener('load',()=>finish(false),{once:true});image.addEventListener('error',()=>finish(true),{once:true});
    });
  }
  async function retryImages(){
    const pending=[...failedImages];if(!pending.length)return;
    retryCount++;failedImages.clear();assetsReady=false;
    for(const image of pending){image.src=`${initialImageSources.get(image)}?retry=${retryCount}`;}
    await Promise.all(pending.map(watchImage));checkAssetStatus();scheduleLayout();
  }
  function validate(content,metadata){
    if(!Array.isArray(content?.chapters)||content.chapters.length!==topicIds.length||
      new Set(content.chapters.map(chapter=>chapter.id)).size!==topicIds.length||!Array.isArray(metadata?.assets)||
      metadata.assets.length!==document.querySelectorAll('.asset-button[data-asset-id]').length)throw new Error('案例與插畫資料不完整。');
    const map=new Map(metadata.assets.map(asset=>[asset.id,asset]));
    if(map.size!==metadata.assets.length)throw new Error('插畫資料重複。');
    for(const chapter of content.chapters){
      if(!topicIds.includes(chapter.id)||chapter.cases.length!==4||!Array.isArray(chapter.title))throw new Error('主題資料不符。');
      for(const item of chapter.cases){
        if(!item.id.startsWith(`${chapter.id}-`)||!Array.isArray(item.assetIds)||!item.assetIds.length||item.href!==`cases/${item.id}/${item.id}.html`)throw new Error('案例資料不符。');
        if(item.assetIds.some(id=>!map.has(id)||map.get(id).caseId!==item.id))throw new Error('案例與圖組對應不符。');
        if(chapter.id==='03'&&item.assetIds.length!==2)throw new Error('比較圖組必須有兩張。'); // taste-skill-ignore: internal chapter route key
        if(chapter.id==='04'&&item.assetIds.length!==1)throw new Error('性狀案例須各有一張插畫。');
        if(chapter.id==='05'&&item.assetIds.length!==1)throw new Error('棲地案例須各有一張插畫。');
        if(item.id==='02-01'&&item.assetIds.length!==3)throw new Error('相機照片須包含三個場景。');
        if(chapter.id==='01'&&(!item.environment?.startsWith('assets/environments/')||!Array.isArray(item.question)))throw new Error('環境與問題資料缺漏。'); // taste-skill-ignore: internal chapter route key
      }
    }
    for(const asset of metadata.assets){
      if(!asset.file.startsWith('assets/')||asset.file.includes('..')||![asset.width,asset.height].every(value=>Number.isInteger(value)&&value>0))throw new Error('插畫資料不符。');
      if(!document.querySelector(`[data-asset-id="${CSS.escape(asset.id)}"]`))throw new Error('插畫版位缺漏。');
    }
  }
  async function init(){
    try{
      if(!window.gsap)throw new Error('互動程式未能載入。');
      const [content,metadata]=await Promise.all(['content.json','assets.json'].map(async path=>{const response=await fetch(new URL(path,assetBase));if(!response.ok)throw new Error('主題資料未能載入。');return response.json();}));
      validate(content,metadata);
      chapters=new Map(content.chapters.map(chapter=>[chapter.id,chapter]));assets=new Map(metadata.assets.map(asset=>[asset.id,asset]));
      for(const chapter of content.chapters)for(const item of chapter.cases)cases.set(item.id,{...item,topic:chapter.id});
      for(const asset of metadata.assets){const button=document.querySelector(`[data-asset-id="${CSS.escape(asset.id)}"]`);elements.set(asset.id,button);button.style.width=`${asset.width}px`;button.style.height=`${asset.height}px`;button.disabled=false;}
      root.classList.add('atlas-ready','atlas-book-ready');configuredReduced=reduced.matches;configuredWidth=innerWidth;configuredHeight=innerHeight;initialized=true;
      pager=createAtlasPager({ready:()=>initialized&&!printing&&!document.hidden,
        beforeTurn:()=>{stopTraitEntrance();habitatMotion?.suspend();},
        afterTurn:(id,options)=>{
          if(options.keyboard)skipKeyboardEntrance(id);
          if(options.url!==false)replaceHash(id==='topics'?'#topics':`#topic-${id}`);layoutAll();
        }
      });
      const habitatSection=sectionFor('05');
      if(habitatSection&&window.createHabitatCoverMotion)habitatMotion=createHabitatCoverMotion({section:habitatSection,reduced,
        getState:()=>({initialized,printing,active:activeTopic==='05',selectedCase:selectedCases['05'],turning:Boolean(pager?.isTurning())})});
      for(const id of topicIds){caseButtons(id).forEach(button=>button.disabled=false);syncControls(id);}
      layoutAll();
      sections.forEach(section=>{
        const id=section.dataset.topic;
        section.querySelectorAll('.case-choice,.asset-button').forEach(button=>button.addEventListener('click',event=>{if(!pager.ignoreClick())selectCase(id,button.dataset.case,{animate:event.detail!==0});}));
        let press=null,moved=false;
        section.addEventListener('pointerdown',event=>{press={x:event.clientX,y:event.clientY};moved=false;},{passive:true});
        section.addEventListener('pointermove',event=>{if(press&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>7)moved=true;},{passive:true});
        section.addEventListener('pointercancel',()=>{moved=true;press=null;},{passive:true});
        section.addEventListener('click',event=>{
          const dragged=moved;press=null;moved=false;
          if(!selectedCases[id]||dragged||pager.ignoreClick()||event.target.closest('a,button,input,textarea,select,[role="button"]')||getSelection()?.toString())return;
          selectCase(id,null,{animate:event.detail!==0});
        });
        section.querySelector('.read-case').addEventListener('click',()=>{if(selectedCases[id])replaceHash(`#case-${selectedCases[id]}`);});
        const replay=section.querySelector('.replay-entrance');
        if(id==='04'&&replay){replay.hidden=false;replay.disabled=false;replay.addEventListener('click',()=>{if(!pager.ignoreClick())replayEntrance();});}
        const habitatReplay=section.querySelector('.replay-habitat');
        if(id==='05'&&habitatReplay&&habitatMotion){habitatReplay.hidden=false;habitatReplay.disabled=false;habitatReplay.addEventListener('click',()=>{if(!pager.ignoreClick()){selectCase('05',null,{animate:false});habitatMotion.replay();}});}
      });
      document.querySelectorAll('a[href^="#topic-"],a[href="#topics"]').forEach(link=>link.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const id=link.getAttribute('href')==='#topics'?'topics':topicId(link.getAttribute('href'));if(id){event.preventDefault();const keyboard=event.detail===0;scrollToTopic(id,{focus:keyboard||link.classList.contains('skip-link'),animate:!keyboard&&!link.classList.contains('skip-link'),keyboard});}}));
      applyHash();
      const fontsReady=document.fonts?.ready||Promise.resolve();
      fontsReady.then(()=>{checkAssetStatus();scheduleLayout();});
      await Promise.all([fontsReady,...imageList.map(watchImage)]);
      checkAssetStatus();layoutAll();
      checkTraitEntrance();
      // Asset loading never re-applies a stale hash or takes over native scrolling.
    }catch(error){initError=error.message||'互動未能啟動。';status(`${initError} 下方仍有全部案例連結。`);}
  }
  addEventListener('scroll',()=>{
    if(document.hidden)return;
    if(scrollFrame)return;
    scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateActiveTopic();checkTraitEntrance();});
  },{passive:true});
  addEventListener('keydown',event=>{
    if(event.key!=='Escape'||event.defaultPrevented||document.body.classList.contains('ecology-sidebar-drawer-open')||event.target.closest?.('[role="dialog"],input,textarea,select'))return;
    if(pager?.isTurning()){pager.finish();return;}
    if(selectedCases[activeTopic]){event.preventDefault();const id=activeTopic,chosen=selectedCases[id];selectCase(id,null,{animate:false});caseButtons(id).find(button=>button.dataset.case===chosen)?.focus({preventScroll:true});}
  });
  addEventListener('resize',()=>{
    pager?.finish();habitatMotion?.suspend();clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{const topic=activeTopic,widthChanged=innerWidth!==configuredWidth;refreshGeometry();if(widthChanged&&topicIds.includes(topic))scrollToTopic(topic,{url:false});},100);
  });
  compact.addEventListener('change',scheduleLayout);
  shortLandscape.addEventListener('change',scheduleLayout);
  reduced.addEventListener('change',()=>{
    if(!initialized||printing)return;
    const target=pager?.state().to;cancelTopicNavigation();
    if(target)scrollToTopic(target,{url:false});
    if(reduced.matches&&traitEntrance){stopTraitEntrance();traitEntrancePlayed=true;}
    configuredReduced=reduced.matches;layoutAll();
  });
  addEventListener('hashchange',queueHash);addEventListener('popstate',queueHash);
  document.addEventListener('focusin',event=>{
    const target=event.target,section=target.closest?.('.topic[data-topic]');
    if(section&&!pager?.isTurning()&&target.matches(':focus-visible')){
      skipKeyboardEntrance(section.dataset.topic);
      const r=section.getBoundingClientRect();if(r.bottom<=0||r.top>=innerHeight)scrollToTopic(section.dataset.topic,{url:false,keyboard:true});
    }
  });
  addEventListener('pageshow',event=>{if(event.persisted&&initialized){layoutAll();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelTopicNavigation();if(initialized&&traitSection&&!printing)layoutSelection('04',false);habitatMotion?.suspend();}else{updateActiveTopic();checkTraitEntrance();}});
  addEventListener('pagehide',()=>{cancelTopicNavigation();if(initialized&&traitSection&&!printing)layoutSelection('04',false);habitatMotion?.suspend();});
  addEventListener('beforeprint',()=>{
    if(!initialized||printing)return;cancelTopicNavigation();printSnapshot={scrollY,selectedCases:{...selectedCases},activeTopic};printing=true;
    stopTraitEntrance();habitatMotion?.suspend();renderTraitCue(false);
    root.classList.add('is-printing');
    for(const button of elements.values()){gsap.killTweensOf(button);button.inert=false;button.setAttribute('aria-hidden','false');button.style.visibility='visible';}
  });
  addEventListener('afterprint',()=>{
    if(!printSnapshot)return;const saved=printSnapshot;printSnapshot=null;root.classList.remove('is-printing');printing=false;
    Object.assign(selectedCases,saved.selectedCases);activeTopic=saved.activeTopic;
    for(const id of topicIds)syncControls(id);
    configuredReduced=reduced.matches;layoutAll();
    requestAnimationFrame(()=>{scrollTo({top:saved.scrollY,behavior:'instant'});layoutAll();});
  });
  document.getElementById('retry-assets').addEventListener('click',retryImages);
  window.AtlasHome={getState,selectCase:(topic,id)=>selectCase(topic,id),scrollToTopic:topic=>scrollToTopic(topic),replayEntrance};
  init();
})();
