const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const sceneIds=['leafScene','communityScene','coverageScene','predictionScene','scopeScene','resultScene'];
function el(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
function image(target,key,file,w,h){const e=el('image',{'data-asset':key,href:file,x:0,y:0,width:w,height:h});target.append(e);return e;}
function windowImage(id,box,key,file,w,h){
 const target=$(id);target.replaceChildren();target.setAttribute('viewBox',box.join(' '));
 // SVG letterboxing otherwise exposes neighboring traits outside the source window.
 const defs=el('defs'),clip=el('clipPath',{id:`clip-${id}`,clipPathUnits:'userSpaceOnUse'});
 clip.append(el('rect',{x:box[0],y:box[1],width:box[2],height:box[3]}));defs.append(clip);target.append(defs);
 const group=el('g',{'clip-path':`url(#clip-${id})`});target.append(group);image(group,key,file,w,h);return target;
}
let prepared=false,locatorRect=null;
export function buildSourceGeometry(data){
 windowImage('traitMapCamera',data.windows.leafMap,'traits','assets/trait-maps.png',1956,2811);
 const locator=windowImage('traitLocator',data.windows.leafMap,'traits','assets/trait-maps.png',1956,2811);
 locatorRect=el('rect',{x:data.windows.leafMap[0],y:data.windows.leafMap[1],width:data.windows.leafMap[2],height:data.windows.leafMap[3],fill:'none',stroke:'#f0c778','stroke-width':2,'vector-effect':'non-scaling-stroke'});locator.append(locatorRect);
 windowImage('traitLegend',data.windows.leafLegend,'traits','assets/trait-maps.png',1956,2811);
 windowImage('scopeCamera',data.windows.scopePanel,'transfer','assets/spatial-transfer.png',2757,2553);
 const density=$('densityCamera');density.replaceChildren();density.setAttribute('viewBox','0 0 2355 1615');
 const sci=el('svg',{id:'surveyLayer',x:0,y:0,width:2355,height:1615,viewBox:'2355 0 2355 1615'});image(sci,'density','assets/observation-density.png',4710,1615);density.append(sci);
 const cit=el('svg',{id:'citizenLayer',x:0,y:0,width:2355,height:1615,viewBox:'0 0 2355 1615',opacity:0});image(cit,'density','assets/observation-density.png',4710,1615);density.append(cit);
 const ticks=$('traitTicks');ticks.replaceChildren();
 for(let i=0;i<data.results.traits;i++){const tick=document.createElement('span');tick.className=i<data.results.aboveThreshold?'is-met':'';tick.dataset.met=String(i<data.results.aboveThreshold);tick.setAttribute('aria-hidden','true');ticks.append(tick);}
 prepared=true;
}
export function renderScene(state,data){
 for(const[i,id]of sceneIds.entries())$(id).hidden=state.phase!==i;
 $('leafCamera').setAttribute('viewBox',state.leafCamera.join(' '));
 $('weightLarge').style.width=`${state.exampleWeightA*100}%`;$('weightSmall').style.width=`${state.exampleWeightB*100}%`;
 $('communityMeaning').textContent=state.exampleWeightA>=.5?'大葉型的覆蓋比例較高，對平均值影響較大。':'小葉型的覆蓋比例較高，對平均值影響較大。';
 $('coverageLabel').textContent=state.citizenOpacity>=.5?'植物出現紀錄（CIT／GBIF）':'調查樣區（SCI／sPlot）';
 if(!prepared||!data)return;
 $('citizenLayer').setAttribute('opacity',state.citizenOpacity);
 $('traitMapCamera').setAttribute('viewBox',state.mapCamera.join(' '));
 const clip=$('traitMapCamera').querySelector('clipPath rect');
 ['x','y','width','height'].forEach((a,i)=>clip.setAttribute(a,state.mapCamera[i]));
 ['x','y','width','height'].forEach((a,i)=>locatorRect.setAttribute(a,state.mapCamera[i]));
 $('traitTicks').querySelectorAll('[data-met="true"]').forEach((e,i)=>{e.style.opacity=String(.18+.82*Math.max(0,Math.min(1,state.resultReveal*1.5-i/30)));});
}
