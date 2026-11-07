(() => {
  'use strict';
  const section=document.getElementById('topic-12'),host=section.querySelector('.map-art-host');
  const data=JSON.parse(document.getElementById('map-motion-data').textContent),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const articleData=JSON.parse(document.getElementById('map-article-data').textContent);
  const puzzleData=JSON.parse(document.getElementById('map-puzzle-data').textContent);
  const DURATION=17,ease=gsap.parseEase('power2.inOut'),out=gsap.parseEase('power2.out');
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),mix=(a,b,p)=>a+(b-a)*p;
  const mode='motion';
  let ready=false,started=false,time=reduce.matches?DURATION:0,wantedPlaying=!reduce.matches,frame=0,lastFrame=0,scene=null,canvas=null,ctx=null;
  let width=0,height=0,papers=[],textures=[],colors={},nodes={},phase='',active=false,wasOnTopic=false;
  function statePhase(){return time<1.8?'articles':time<3.2?'compress':time<8.2?'assemble':time<9.2?'world':time<12?'zoom':time<DURATION?'traces':'complete';}
  function isActive(){const state=window.AtlasHome?.getState();return ready&&!document.hidden&&state?.initialized&&state.activeTopic==='12'&&!state.topicNavigationPlaying;}
  function compression(){return out(clamp((time-1.8)/1.4));}
  function arrival(paper){return clamp((time-3.2-paper.piece.order*.13)/.95);}
  function camera(){const p=ease(clamp((time-9.2)/2.8)),focus=data.europeFocus;return{p,scale:mix(1,focus.suggestedScale,p),x:focus.translateX*p,y:focus.translateY*p};}
  function wrap(ink,text,maxWidth){
    const lines=[];let line='';for(const word of text.split(/\s+/)){const next=line?line+' '+word:word;if(line&&ink.measureText(next).width>maxWidth){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);return lines;
  }
  function articleTexture(article,mapPrint){
    const surface=document.createElement('canvas');surface.width=360;surface.height=500;
    const ink=surface.getContext('2d');ink.fillStyle=mapPrint?colors.land:colors.paper;ink.fillRect(0,0,360,500);
    ink.textBaseline='top';ink.fillStyle=colors.ink;ink.font='600 25px "Atlas Sans",sans-serif';
    let y=30;for(const line of wrap(ink,article.headline,302)){ink.fillText(line,29,y);y+=30;}
    y+=18;ink.font='400 14px "Atlas Sans",sans-serif';
    for(const paragraph of article.paragraphs){for(const line of wrap(ink,paragraph,302)){ink.fillText(line,29,y);y+=18;}y+=13;}
    if(!mapPrint){ink.strokeStyle=colors.border;ink.lineWidth=1;ink.strokeRect(.5,.5,359,499);}
    return surface;
  }
  function palette(){
    const css=getComputedStyle(section.querySelector('.topic-stage')),dark=document.documentElement.dataset.theme==='dark';
    colors={word:css.getPropertyValue('--map-word').trim(),ink:css.getPropertyValue('--ink').trim(),land:css.getPropertyValue('--map-land').trim(),paper:dark?'#26343c':'#ffffff',border:dark?'#526771':'#d6e0e5'};
    // Only twelve reusable page textures are rasterized. During playback the
    // same articles are compressed and clipped into their own map pieces.
    textures=articleData.articles.map(article=>({page:articleTexture(article,false),print:articleTexture(article,true)}));
  }
  function fit(){const scale=Math.min(width/1000,height/600);return{scale,x:(width-1000*scale)/2,y:(height-600*scale)/2};}
  function resize(){
    if(!scene)return;
    const rect=scene.getBoundingClientRect();if(!rect.width||!rect.height)return;
    width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const mobile=width<500;let seed=734;
    function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
    papers=puzzleData.pieces.map((piece,i)=>({piece,path:new Path2D(piece.path),article:i%articleData.articles.length,
      x:width*(.15+random()*.7),y:height*(.13+random()*.74),w:(mobile?width*.78:width*.39)*(1+random()*.16),angle:(random()-.5)*.48,
      waitX:width*(.1+random()*.8),waitY:height*(.16+random()*.72),stripW:mobile?54+random()*22:77+random()*24,
    }));
    const f=fit(),p=data.europeFocus.jerseyAtSuggestedZoom;
    nodes.label.style.left=(f.x+p[0]*f.scale)+'px';nodes.label.style.top=(f.y+p[1]*f.scale)+'px';
    palette();render();
  }
  function renderArticles(){
    ctx.clearRect(0,0,width,height);if(time>=10.1)return;
    const f=fit(),cam=camera(),flat=compression(),fade=1-out(clamp((time-9.2)/.9));
    function draw(paper){
      const raw=arrival(paper),p=ease(raw),[bx,by,bw,bh]=paper.piece.bounds;
      const targetX=f.x+((bx+bw/2)*cam.scale+cam.x)*f.scale,targetY=f.y+((by+bh/2)*cam.scale+cam.y)*f.scale;
      const cx=mix(mix(paper.x,paper.waitX,flat),targetX,p),cy=mix(mix(paper.y,paper.waitY,flat),targetY,p);
      const w=mix(mix(paper.w,paper.stripW,flat),bw*f.scale*cam.scale,p),h=mix(mix(paper.w*500/360,8,flat),bh*f.scale*cam.scale,p);
      const angle=paper.angle*(1-flat)*(1-p),clip=out(clamp((raw-.55)/.45)),texture=textures[paper.article];
      const entry=out(clamp((time-paper.piece.order*.014)/.45));
      ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.scale(w/bw,h/bh);ctx.translate(-bx-bw/2,-by-bh/2);
      if(clip<1){ctx.globalAlpha=fade*entry*(1-clip);ctx.drawImage(texture.page,bx,by,bw,bh);}
      if(clip>0){ctx.save();ctx.clip(paper.path,'evenodd');ctx.globalAlpha=fade*entry*clip;ctx.drawImage(texture.print,bx,by,bw,bh);ctx.restore();
        ctx.globalAlpha=fade*clip*.38;ctx.strokeStyle=colors.word;ctx.lineWidth=.65/f.scale;ctx.stroke(paper.path);}
      ctx.restore();
    }
    // Landed pieces stay visible behind the remaining article strips. Moving
    // pages are drawn last, so their individual arrivals can be followed.
    for(const paper of papers)if(arrival(paper)>=1)draw(paper);
    for(const paper of papers)if(arrival(paper)===0)draw(paper);
    for(const paper of papers)if(arrival(paper)>0&&arrival(paper)<1)draw(paper);
    ctx.globalAlpha=1;
  }
  function render(){
    if(!scene)return;
    renderArticles();
    const zoom=camera().p,focus=data.europeFocus;
    nodes.camera.setAttribute('transform',`translate(${mix(0,focus.translateX,zoom)} ${mix(0,focus.translateY,zoom)}) scale(${mix(1,focus.suggestedScale,zoom)})`);
    nodes.geography.style.opacity=String(out(clamp((time-8.35)/.85)));
    const detail=out(clamp((zoom-.12)/.75));
    nodes.world.style.opacity=String((1-detail)*mix(.35,1,zoom));
    nodes.world.style.fillOpacity=String(zoom);
    nodes.europe.style.opacity=String(detail);
    const region=out(clamp((time-11.8)/1.3));
    nodes.wash.style.opacity=String(region*.75);
    nodes.label.style.opacity=String(region);
    const traces=out(clamp((time-12.2)/1.8));nodes.traces.style.opacity=String(traces*.7);
    nodes.traces.setAttribute('transform',`translate(${mix(-38,0,traces)} ${mix(26,0,traces)})`);
    const hornet=out(clamp((time-12.7)/1.4));nodes.hornet.style.opacity=String(hornet);
    nodes.hornet.style.transform=`translateY(${mix(12,0,hornet)}px) scale(${mix(.95,1,hornet)})`;
    nodes.caption.style.opacity=String(out(clamp((time-14.1)/1.6)));
    const next=statePhase();
    if(next!==phase){phase=next;section.dataset.motionPhase=phase;}
  }
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
  function tick(now){
    frame=0;active=isActive();if(!active||!wantedPlaying||reduce.matches)return;
    if(lastFrame)time=Math.min(DURATION,time+(now-lastFrame)/1000);lastFrame=now;render();
    if(time>=DURATION){wantedPlaying=false;lastFrame=0;return;}
    frame=requestAnimationFrame(tick);
  }
  function syncPlayback(){
    const state=window.AtlasHome?.getState(),onTopic=!!state?.initialized&&state.activeTopic==='12';
    if(onTopic&&!wasOnTopic&&time>=DURATION&&!reduce.matches){time=0;wantedPlaying=true;render();}
    wasOnTopic=onTopic;
    if(reduce.matches&&time!==DURATION){time=DURATION;wantedPlaying=false;render();}
    if(onTopic&&!started&&!document.hidden&&!state.topicNavigationPlaying)initialize().catch(console.error);
    active=isActive();
    if(active&&wantedPlaying&&!reduce.matches&&time<DURATION){if(!frame){lastFrame=0;frame=requestAnimationFrame(tick);}}
    else stop();
  }
  function pause(){wantedPlaying=false;stop();return getState();}
  function play(){if(reduce.matches)return seek(DURATION);if(time>=DURATION)time=0;wantedPlaying=true;render();syncPlayback();return getState();}
  function seek(seconds){wantedPlaying=false;stop();time=reduce.matches?DURATION:clamp(Number(seconds)||0,0,DURATION);render();return getState();}
  function replay(){stop();time=reduce.matches?DURATION:0;wantedPlaying=!reduce.matches;render();syncPlayback();return getState();}
  function getState(){return{mode,ready,time,duration:DURATION,phase:statePhase(),playing:!!frame,active:isActive(),wantedPlaying,reducedMotion:reduce.matches,articleCount:papers.length,uniqueArticleCount:articleData.articles.length,pieceCount:papers.length,settledPieces:papers.filter(paper=>arrival(paper)>=1).length,compression:compression(),puzzleMode:'stacked-articles-to-pieces',sceneWidth:width,sceneHeight:height};}
  let observer=null;
  async function initialize(){
    started=true;
    scene=host.querySelector('.map-scene');canvas=scene.querySelector('canvas');ctx=canvas.getContext('2d');
    nodes={camera:scene.querySelector('.map-camera'),world:scene.querySelector('.map-land-world'),europe:scene.querySelector('.map-land-europe'),geography:scene.querySelector('.map-geography'),wash:scene.querySelector('.map-region-wash'),label:scene.querySelector('.map-region-label'),traces:scene.querySelector('.map-word-traces'),hornet:scene.querySelector('.map-hornet'),caption:scene.querySelector('.map-final-caption')};
    resize();observer=new ResizeObserver(resize);observer.observe(scene);
    const images=[...host.querySelectorAll('img')];images.forEach(image=>{image.loading='eager';});
    await Promise.all(images.map(image=>image.decode()));
    await document.fonts.load('16px "Atlas Sans"',articleData.articles.map(article=>article.headline).join(''));await document.fonts.ready;
    palette();render();ready=true;
    dispatchEvent(new Event('resize'));syncPlayback();return true;
  }
  addEventListener('ecologythemechange',()=>{if(scene){palette();render();}});
  document.addEventListener('visibilitychange',syncPlayback);
  document.addEventListener('atlas-hover-reset',()=>{stop();setTimeout(syncPlayback,0);});
  reduce.addEventListener('change',syncPlayback);
  setInterval(syncPlayback,180);
  window.MapMotionCover={getState,play,pause,seek,replay};
  syncPlayback();
})();
