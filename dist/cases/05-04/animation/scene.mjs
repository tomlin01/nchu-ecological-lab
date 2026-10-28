const $=id=>document.getElementById(id);
const scenes=['landscapeScene','labelsScene','scoresScene','referenceScene','thresholdScene','updatesScene','validationScene','endingScene'];
const show=(id,value)=>$(id).toggleAttribute('hidden',!value);
const text=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=String(value);};
let lastPoint=null;
export function buildSourceGeometry(d){
 const bars=$('scoreBars');bars.replaceChildren();
 for(const c of d.classes){const row=document.createElement('div');row.className='score-row';row.dataset.class=String(c.index);const name=document.createElement('span');name.className='score-name';name.textContent=c.label;const track=document.createElement('span');track.className='score-track';const fill=document.createElement('span');fill.className='score-fill';fill.style.background=c.color;fill.dataset.class=String(c.index);track.append(fill);const value=document.createElement('output');value.className='score-value';row.append(name,track,value);bars.append(row);}
 for(const list of document.querySelectorAll('[data-class-legend]')){list.replaceChildren();for(const c of d.classes){const item=document.createElement('span'),swatch=document.createElement('i');swatch.style.background=c.color;swatch.setAttribute('aria-hidden','true');item.append(swatch,document.createTextNode(c.label));list.append(item);}}
 for(const p of d.points)for(const mark of document.querySelectorAll(`[data-point="${p.id}"]`)){mark.style.left=`${p.x*100}%`;mark.style.top=`${p.y*100}%`;mark.dataset.row=p.row;mark.dataset.col=p.col;}
 document.querySelectorAll('[data-date]').forEach(n=>n.textContent=d.date);
 lastPoint=null;
}
export function renderScene(s,d){
 scenes.forEach((id,i)=>show(id,s.phase===i));
 $('labelOverlay').style.clipPath=`inset(0 ${(1-s.labelReveal)*100}% 0 0)`;
 $('wipeLine').style.left=`${s.labelReveal*100}%`;
 if(d&&lastPoint!==s.pointIndex){const p=d.points[s.pointIndex];text('pointName',`位置${p.id} · 九類估計機率`);text('topLabel',`最高類別：${p.classLabel}`);$('topSwatch').style.background=d.classes[p.classIndex].color;for(const row of $('scoreBars').children){const i=Number(row.dataset.class),v=p.probabilities[i];row.classList.toggle('is-top',i===p.classIndex);row.querySelector('.score-fill').style.width=`${v*100}%`;row.querySelector('.score-fill').dataset.raw=String(v);row.querySelector('.score-value').textContent=p.scores[i].display;}
  document.querySelectorAll('#scoresScene [data-point]').forEach(n=>n.classList.toggle('selected',n.dataset.point===p.id));lastPoint=s.pointIndex;
 }
 show('referencePair',s.referenceMode==='pair');show('referenceDifference',s.referenceMode==='difference');
 show('unfilteredMap',s.thresholdMode==='all');show('filteredMap',s.thresholdMode==='filtered');
 text('thresholdTitle',s.thresholdMode==='all'?'原始標籤：每個有效位置選最高類別':'教學篩選：最高機率至少0.5才保留');
 show('thresholdKept',s.thresholdMode==='filtered');
 for(const step of document.querySelectorAll('[data-update-step]')){const index=Number(step.dataset.updateStep);step.classList.toggle('active',s.updateStep===index);step.setAttribute('aria-current',s.updateStep===index?'step':'false');}
 text('updateMessage',s.updateStep===0?'有合適的新影像，產生新的分數與標籤。':s.updateStep===1?'判定為雲或雲影的位置，不提供新分類。':'下一次可用觀測，才再更新判讀。');
}
