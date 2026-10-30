/* The book owns paging only. Case selection remains in app.js. */
window.createAtlasPager = ({ready, beforeTurn, afterTurn}) => {
  const root=document.documentElement;
  const pages=[...document.querySelectorAll('.topic[data-topic]'),document.getElementById('topics')];
  const idOf=p=>p.dataset.topic||'topics', pageFor=id=>pages.find(p=>idOf(p)===id);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let turn=null,wheelLocked=false,wheelAmount=0,lastWheel=0,wheelTimer=0,scrollTimer=0;
  let touch=null,ignoreClickUntil=0;
  const idle=220,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const blocked=target=>document.body.classList.contains('ecology-sidebar-drawer-open')||!!target?.closest?.('input,textarea,select,[contenteditable],[role="dialog"],.ecology-sidebar-ui');
  // The official calendar renderer uses transposed coordinates for a top binding.
  function calendarSheet(face,item,width,height){
    const paper=getComputedStyle(item.page.querySelector('.topic-stage')||item.page).backgroundColor;
    face.style.setProperty('--grabfold-paper',paper);
    const axis=document.createElement('div');axis.className='calendar-axis';
    Object.assign(axis.style,{width:`${height}px`,height:`${width}px`});
    const sheet=new AtlasCalendarFold.FoldingSheet(document,{shadow:.4,gutter:0,lift:45});
    sheet.place(0,height,width);
    const upright=document.createElement('div');upright.className='calendar-content';
    Object.assign(upright.style,{width:`${width}px`,height:`${height}px`});
    upright.append(item.page);sheet.restingSlot.append(upright);axis.append(sheet.root);face.append(axis);sheet.show();
    return {render(progress){
      sheet.draw({spine:'left',width:height,height:width,progress,grabY:width/2,lift:0});
      return {binding:'top',progress,depth:AtlasCalendarFold.foldDepth(progress)};
    }};
  }
  function range(p){const r=p.getBoundingClientRect(),top=scrollY+r.top;return {top,bottom:top+Math.max(0,r.height-innerHeight),height:r.height};}
  function current(){let p=pages[0];for(const candidate of pages)if(candidate.getBoundingClientRect().top<=innerHeight*.35)p=candidate;return p;}
  function unlock(){
    clearTimeout(wheelTimer);
    const remaining=idle-(performance.now()-lastWheel);
    if(!turn&&remaining<=0){wheelLocked=false;wheelAmount=0;return;}
    wheelTimer=setTimeout(unlock,turn?idle:Math.max(16,remaining));
  }
  function restore(item){item.placeholder.replaceWith(item.page);if(item.style===null)item.page.removeAttribute('style');else item.page.setAttribute('style',item.style);}
  function finish(){
    if(!turn)return;
    const done=turn;turn=null;done.timeline?.kill();done.items.forEach(restore);done.layer.remove();root.classList.remove('atlas-turning');
    const r=range(done.target),top=done.edge==='end'?r.bottom:r.top;
    scrollTo({top,behavior:'instant'});
    if(done.focus)done.target.focus({preventScroll:true});
    afterTurn(idOf(done.target),done.options);unlock();
  }
  function go(id,options={}){
    const target=pageFor(id);if(!target||!ready())return false;
    let animate=options.animate!==false&&!reduced.matches&&!!window.AtlasCalendarFold;
    if(turn){finish();animate=false;}
    const source=current(),r=range(target),edge=options.edge||'start';
    if(!animate||source===target){
      scrollTo({top:edge==='end'?r.bottom:r.top,behavior:'instant'});
      if(options.focus)target.focus({preventScroll:true});afterTurn(id,options);return true;
    }
    beforeTurn(id);clearTimeout(scrollTimer);
    const direction=pages.indexOf(target)>pages.indexOf(source)?1:-1;
    const width=root.clientWidth,sourceRange=range(source),sourceOffset=clamp(scrollY-sourceRange.top,0,Math.max(0,sourceRange.height-innerHeight));
    const targetOffset=edge==='end'?Math.max(0,r.height-innerHeight):0;
    const layer=document.createElement('div');layer.className='page-turn-layer';layer.style.width=`${width}px`;
    const back=document.createElement('div');back.className='page-turn-back';
    const face=document.createElement('div');face.className='page-turn-face';
    layer.append(back,face);document.body.append(layer);
    const mount=(page,host,offset)=>{
      const box=page.getBoundingClientRect(),style=page.getAttribute('style'),placeholder=document.createElement('div');
      placeholder.className='page-turn-placeholder';placeholder.style.height=`${box.height}px`;placeholder.setAttribute('aria-hidden','true');
      page.replaceWith(placeholder);host.append(page);
      Object.assign(page.style,{position:'relative',top:`${-offset}px`,left:'0',width:`${width}px`,height:`${box.height}px`,margin:'0'});
      return {page,placeholder,style,offset};
    };
    const items=direction>0?[mount(target,back,targetOffset),mount(source,face,sourceOffset)]:[mount(source,back,sourceOffset),mount(target,face,targetOffset)];
    const sheet=calendarSheet(face,items[1],width,innerHeight),initial=direction>0?0:1;
    turn={source,target,layer,face,items,edge,focus:options.focus,options,direction,progress:0,fold:sheet.render(initial),timeline:null};
    root.classList.add('atlas-turning');
    const active=turn,fold={amount:initial};
    active.timeline=gsap.timeline({onUpdate:()=>{if(turn!==active)return;active.progress=active.timeline.progress();active.fold=sheet.render(fold.amount);},onComplete:()=>finish()});
    active.timeline.to(fold,{amount:direction>0?1:0,duration:.68,ease:'power2.out'});
    return true;
  }
  function adjacent(page,sign){return pages[pages.indexOf(page)+sign];}
  function atEdge(page,sign){const r=range(page);return sign>0?scrollY>=r.bottom-2:scrollY<=r.top+2;}
  function wheel(event){
    if(!ready()||blocked(event.target)||event.ctrlKey||event.metaKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY)return;
    const now=performance.now(),fresh=now-lastWheel>idle;lastWheel=now;
    if(fresh&&!turn){wheelLocked=false;wheelAmount=0;}unlock();
    if(turn||wheelLocked){event.preventDefault();return;}
    if(fresh)wheelAmount=0;
    const page=current(),sign=Math.sign(event.deltaY),next=adjacent(page,sign);
    if(idOf(page)==='topics'&&!(sign<0&&atEdge(page,-1)))return;
    event.preventDefault();
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1),r=range(page);
    if(!atEdge(page,sign)){scrollTo({top:clamp(scrollY+delta,r.top,r.bottom),behavior:'instant'});wheelAmount=0;return;}
    if(!next)return;
    if(Math.sign(wheelAmount)!==sign)wheelAmount=0;
    wheelAmount+=delta;
    if(Math.abs(wheelAmount)>=32){wheelLocked=true;wheelAmount=0;go(idOf(next),{animate:true,edge:sign<0?'end':'start'});}
  }
  function touchStart(event){
    if(event.touches.length!==1||!ready()||blocked(event.target)){touch=null;return;}
    const t=event.touches[0],page=current();touch={page,x:t.clientX,y:t.clientY,lastY:t.clientY,top:atEdge(page,-1),bottom:atEdge(page,1),used:false,paged:false};
  }
  function touchMove(event){
    if(!touch||event.touches.length!==1)return;
    const t=event.touches[0],dy=touch.y-t.clientY,dx=touch.x-t.clientX;
    if(Math.abs(dx)>Math.abs(dy))return;
    const sign=Math.sign(dy);if(!sign)return;
    if(idOf(touch.page)==='topics'&&!(sign<0&&touch.top))return;
    event.preventDefault();
    if(Math.abs(dy)>8)touch.used=true;
    if(turn||touch.paged)return;
    const r=range(touch.page),startedAtEdge=sign>0?touch.bottom:touch.top;
    if(startedAtEdge&&Math.abs(dy)>=50){const next=adjacent(touch.page,sign);if(next){touch.paged=true;go(idOf(next),{animate:true,edge:sign<0?'end':'start'});}}
    else if(!startedAtEdge){scrollTo({top:clamp(scrollY+touch.lastY-t.clientY,r.top,r.bottom),behavior:'instant'});}
    touch.lastY=t.clientY;
  }
  function touchEnd(){if(touch?.used)ignoreClickUntil=performance.now()+400;touch=null;}
  function key(event){
    if(event.defaultPrevented||!ready()||blocked(event.target)||event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key===' '&&event.target.closest?.('button,a,[role="button"]'))return;
    const sign=['PageDown','ArrowDown',' '].includes(event.key)?1:['PageUp','ArrowUp'].includes(event.key)?-1:0;
    if(event.key==='Home'||event.key==='End'){event.preventDefault();if(!event.repeat)go(event.key==='Home'?'01':'topics',{animate:false,focus:true,keyboard:true});return;}
    if(!sign)return;
    if(turn){event.preventDefault();if(event.repeat)return;finish();}
    const page=current();if(idOf(page)==='topics'&&!(sign<0&&atEdge(page,-1)))return;
    event.preventDefault();if(event.repeat)return;
    if(atEdge(page,sign)){const next=adjacent(page,sign);if(next)go(idOf(next),{animate:false,focus:true,keyboard:true,edge:sign<0?'end':'start'});}
    else{const r=range(page);scrollTo({top:clamp(scrollY+sign*(event.key.startsWith('Arrow')?90:innerHeight*.8),r.top,r.bottom),behavior:'instant'});}
  }
  // Scrollbar dragging and assistive navigation also settle on a readable page.
  function settleNative(){
    clearTimeout(scrollTimer);if(turn||touch||!ready())return;
    scrollTimer=setTimeout(()=>{
      if(turn||touch||blocked(document.activeElement))return;
      const page=current();if(idOf(page)==='topics')return;
      const r=range(page);if(scrollY>=r.top-2&&scrollY<=r.bottom+2)return;
      const nearest=pages.reduce((best,p)=>Math.abs(range(p).top-scrollY)<Math.abs(range(best).top-scrollY)?p:best,page);
      go(idOf(nearest),{animate:false});
    },180);
  }
  addEventListener('wheel',wheel,{passive:false});
  addEventListener('touchstart',touchStart,{passive:true});addEventListener('touchmove',touchMove,{passive:false});
  addEventListener('touchend',touchEnd,{passive:true});addEventListener('touchcancel',touchEnd,{passive:true});
  addEventListener('keydown',key);addEventListener('scroll',settleNative,{passive:true});
  addEventListener('resize',finish);
  addEventListener('beforeprint',finish);
  addEventListener('pagehide',finish);
  addEventListener('ecologythemechange',finish);
  reduced.addEventListener('change',finish);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();});
  return {
    go,finish,isTurning:()=>!!turn,ignoreClick:()=>!!turn||performance.now()<ignoreClickUntil,
    state:()=>({active:!!turn,from:turn?idOf(turn.source):null,to:turn?idOf(turn.target):null,progress:turn?.progress||0,renderer:'grabfold-calendar',binding:'top',fold:turn?.fold||null,dragEnabled:false,soundEnabled:false,direction:turn?.direction||0,pendingTarget:null}),
    gesture:()=>({wheelLocked,wheelIdleMs:performance.now()-lastWheel,wheelAmount,touchActive:!!touch,touchUsed:!!touch?.used,nativeScrollPage:touch?idOf(touch.page):null})
  };
};
