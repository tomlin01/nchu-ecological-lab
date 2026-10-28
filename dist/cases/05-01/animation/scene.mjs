const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const sceneIds=['photoScene','heightScene','learnScene','gediScene','compareScene','testScene','endScene'];
function el(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
function sourceWindow(target,box){
 const id=target.id;target.replaceChildren();target.setAttribute('viewBox',box.join(' '));
 const defs=el('defs'),clip=el('clipPath',{id:`clip-${id}`,clipPathUnits:'userSpaceOnUse'});
 clip.append(el('rect',{x:box[0],y:box[1],width:box[2],height:box[3]}));defs.append(clip);target.append(defs);
 const group=el('g',{'clip-path':`url(#clip-${id})`});
 group.append(el('image',{'data-asset':'figure',href:'assets/figure7.png',width:2614,height:1144}));target.append(group);
}
let prepared=false,lastComparison='';
export function buildSourceGeometry(data){
 for(const target of document.querySelectorAll('[data-window]'))sourceWindow(target,data.windows[target.dataset.window]);
 prepared=true;lastComparison='';
}
export function renderScene(s,data){
 for(const[i,id]of sceneIds.entries())$(id).hidden=s.phase!==i;
 $('photoFocus').style.opacity=String(s.photoFocus);
 $('heightMeasure').style.strokeDashoffset=String(1-s.heightReveal);
 $('heightWords').style.opacity=String(s.heightReveal);
 $('features').hidden=s.learningStep===1;$('pairs').hidden=s.learningStep===0;
 $('learnTitle').textContent=s.learningStep?'再把照片與高度配對':'先認識照片中的形狀與紋理';
 $('featureWindows').style.setProperty('--reveal',String(s.learningReveal));
 $('pairLink').style.strokeDashoffset=String(1-s.learningReveal);
 $('gediLink').style.strokeDashoffset=String(1-s.gediReveal);
 $('gediAdjust').style.opacity=String(.22+.78*s.gediReveal);
 $('wipeView').hidden=s.compareMode!=='wipe';$('comparisonPair').hidden=s.compareMode==='wipe';
 $('wipeMap').style.clipPath=`inset(0 ${100*(1-s.wipe)}% 0 0)`;
 $('wipeLine').style.left=`${100*s.wipe}%`;
 $('wipeLine').style.opacity=s.wipe>0&&s.wipe<1?'1':'0';
 $('wipeLeftLabel').style.opacity=s.wipe>0?'1':'0';
 $('wipeRightLabel').style.opacity=s.wipe<1?'1':'0';
 $('comparisonTitle').textContent=s.compareMode==='wipe'?'照片與高度圖，對照同一片地':'同一範圍、同一高度色階';
 if(prepared&&data&&lastComparison!==s.compareMode&&s.compareMode!=='wipe'){
  sourceWindow($('otherMap'),data.windows[s.compareMode]);
  $('otherMap').setAttribute('aria-label',s.compareMode==='lang'?'Lang 等人的高度圖':'Potapov 等人的高度圖');
  $('otherName').textContent=s.compareMode==='lang'?'Lang 等人的高度圖':'Potapov 等人的高度圖';lastComparison=s.compareMode;
 }
 document.querySelectorAll('.result-row').forEach((row,i)=>{row.style.visibility=i<s.resultRows?'visible':'hidden';});
}
