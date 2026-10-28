const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
function svg(tag,attrs={},text=''){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text)e.textContent=text;return e;}
function add(parent,tag,attrs,text){const e=svg(tag,attrs,text);parent.append(e);return e;}
function image(parent,asset,file,x,y,width,height){return add(parent,'image',{'data-asset':asset,href:file,x,y,width,height});}
const COLORS={fork:'#225f7c',tip:'#9a461d',snout:'#225f7c'};
let geometry=null;
function line(parent,attrs){return add(parent,'path',{fill:'none','stroke-linecap':'round','stroke-linejoin':'round','vector-effect':'non-scaling-stroke',...attrs});}
function guide(parent,key,point,label,tx,ty){
 const g=add(parent,'g',{'data-guide':key});
 add(g,'circle',{cx:point[0],cy:point[1],r:7,fill:'none',stroke:'#fff','stroke-width':6,'vector-effect':'non-scaling-stroke'});
 add(g,'circle',{cx:point[0],cy:point[1],r:7,fill:'none',stroke:COLORS[key],'stroke-width':3,'vector-effect':'non-scaling-stroke'});
 line(g,{d:`M${point}L${tx},${ty-6}`,stroke:'#fff','stroke-width':5});
 line(g,{d:`M${point}L${tx},${ty-6}`,stroke:COLORS[key],'stroke-width':2});
 const t=add(g,'text',{x:tx,y:ty,fill:COLORS[key],stroke:'#fff','stroke-width':3,'paint-order':'stroke','stroke-linejoin':'round','font-family':'Fish Sans, sans-serif','font-weight':600,'text-anchor':'middle','data-guide-label':''},label);
 return {group:g,text:t};
}
export function buildSourceGeometry(data){
 const camera=$('sourceCamera');camera.replaceChildren();
 image(camera,'fish','assets/fish-original.jpg',0,0,800,450);
 const p=data.guidePoints;
 const measures=add(camera,'g',{id:'measureGuides'});
 const measureLines=[];
 for(const [key,y,name]of[['fork',305,'尾叉長'],['tip',365,'全長']]){
  const g=add(measures,'g',{'data-measure':key});const end=p[key],start=p.snout;
  const d=`M${start[0]},${start[1]}V${y}H${end[0]}V${end[1]}`;
  line(g,{d,stroke:'#fff','stroke-width':5});line(g,{d,stroke:COLORS[key],'stroke-width':2.5});
  const cap=`M${start[0]-4},${y}h8m-4-5v10M${end[0]-4},${y}h8m-4-5v10`;
  line(g,{d:cap,stroke:COLORS[key],'stroke-width':2.5});
  add(g,'text',{x:(start[0]+end[0])/2,y:y-10,'text-anchor':'middle',fill:COLORS[key],stroke:'#fff','stroke-width':4,'paint-order':'stroke','font-family':'Fish Sans, sans-serif','font-weight':600,'data-guide-label':''},name);
  measureLines.push({key,g});
 }
 const guides={snout:guide(camera,'snout',p.snout,'魚嘴前端',87,115),fork:guide(camera,'fork',p.fork,'尾叉凹處',518,253),tip:guide(camera,'tip',p.tip,'尾鰭末端',681,60)};
 const cal=$('calibrationDiagram');cal.replaceChildren();cal.setAttribute('viewBox','0 0 960 760');
 image(cal,'fish','assets/fish-original.jpg',80,35,800,450);
 const detected=image(cal,'detected','assets/board-detection.jpg',80,35,800,450);
 const target=add(cal,'g',{id:'templateDiagram'});
 add(target,'rect',{x:60,y:555,width:840,height:195,fill:'#fff'});
 image(target,'template','assets/board-template.png',70,555,820,196);
 add(target,'text',{x:80,y:535,fill:'currentColor','font-family':'Fish Sans, sans-serif','font-size':23},'對照標準量測板');
 const links=data.calibrationPairs.map(pair=>{
  const a=[80+pair.source[0],35+pair.source[1]],b=[70+pair.target[0]*820/1590,555+pair.target[1]*196/380];
  const g=add(cal,'g');
  const path=line(g,{d:`M${a}C${a[0]},510 ${b[0]},510 ${b}`,stroke:'#936b2c','stroke-width':1.5,'stroke-dasharray':'5 6',opacity:.8});
  const halo=add(g,'circle',{cx:a[0],cy:a[1],r:11,fill:'none',stroke:'#fff','stroke-width':5});
  const dot=add(g,'circle',{cx:a[0],cy:a[1],r:9,fill:'none',stroke:'#62461a','stroke-width':3});
  const arrival=add(g,'circle',{cx:b[0],cy:b[1],r:11,fill:'none',stroke:'#62461a','stroke-width':3});
  return {a,b,path,halo,dot,arrival,g};
 });
 geometry={camera,measures,measureLines,guides,detected,target,links};
}
function bezier(a,b,t){const u=1-t;return [u*u*u*a[0]+3*u*u*t*a[0]+3*u*t*t*b[0]+t*t*t*b[0],u*u*u*a[1]+3*u*u*t*510+3*u*t*t*510+t*t*t*b[1]];}
function fontScale(camera,view,exportMode){const r=camera.getBoundingClientRect(),scale=Math.min(r.width/view[2],r.height/view[3]);if(scale<=0)return;for(const t of camera.querySelectorAll('[data-guide-label]')){t.setAttribute('font-size',String((exportMode?22:14)/scale));t.setAttribute('stroke-width',String(2/scale));}}
export function renderScene(state,data){
 const isCalibration=state.phase===1,isResult=state.phase===4;
 $('pictureScene').hidden=isCalibration||isResult;$('calibrationScene').hidden=!isCalibration;$('resultScene').hidden=!isResult;
 const review=$('reviewSteps');review.hidden=state.phase!==3;
 for(const e of review.querySelectorAll('[data-review-step]')){const selected=Number(e.dataset.reviewStep)===state.reviewStep;e.classList.toggle('is-current',selected);selected?e.setAttribute('aria-current','step'):e.removeAttribute('aria-current');}
 if(!data||!geometry)return;
 const g=geometry;g.camera.setAttribute('viewBox',state.camera.join(' '));
 const visibleGuide=key=>state.guideMode==='both'||state.guideMode===key;
 for(const[key,item]of Object.entries(g.guides))item.group.setAttribute('opacity',visibleGuide(key)?state.guideOpacity:0);
 g.measures.setAttribute('opacity',state.measureOpacity);
 for(const {key,g:node}of g.measureLines)node.setAttribute('opacity',state.guideMode==='both'||state.guideMode===key||state.guideMode==='snout'?(state.guideMode==='snout'&&key==='tip'?0:1):0);
 fontScale(g.camera,state.camera,state.exportMode);
 g.detected.setAttribute('opacity',state.detectedOpacity);
 g.target.setAttribute('opacity',state.mappingProgress>0||state.reducedMotion?1:0);
 g.links.forEach((link,i)=>{
  const t=Math.max(0,Math.min(1,state.mappingProgress*1.45-i*.18));const point=bezier(link.a,link.b,t);
  link.g.setAttribute('opacity',state.mappingProgress>0||state.reducedMotion?1:0);
  link.path.setAttribute('opacity',t>0?.55:0);link.arrival.setAttribute('opacity',t>=.98?1:0);
  for(const n of [link.halo,link.dot]){n.setAttribute('cx',point[0]);n.setAttribute('cy',point[1]);}
 });
 const captions=['Franck Magron / SPC（2022）｜CC BY-NC 4.0｜範例原照','作者辨認出的板上數字｜連線為人工示意','量測位置示意｜沒有計算這尾魚的長度','對照原照，檢查量測位置｜人工示意','原研究的整體比較｜並非前面範例魚的量測結果'];
 $('visualCaption').textContent=captions[state.phase];
 $('calibrationCaption').textContent=state.mappingProgress>.1?'板上數字與標準板的對照｜人工示意':'彩色框圈出的是板上數字';
 $('conclusionLine').style.opacity=String(state.conclusionProgress);
}
