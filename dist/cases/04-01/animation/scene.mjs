const $=id=>document.getElementById(id);
export function buildSourceGeometry(data){
 const path=data.leaf.points.map((p,i)=>(i?'L':'M')+p.join(' ')).join(' ')+'Z';
 $('sourceOutline').setAttribute('d',path);
 $('leafClipPath').setAttribute('d',path);
}
export function renderScene(state,data){
 // The stage remains mounted while pictureScene is hidden. Measuring the hidden SVG
 // would retain a previous phase's label size when seeking backwards into the ruler scene.
 const cameraBox=$('stage').getBoundingClientRect();
 const picture=[0,1,2,5].includes(state.phase),quality=state.phase===3,batch=state.phase===4;
 for(const [id,active]of [['pictureScene',picture],['qualityScene',quality],['batchScene',batch]]){const n=$(id);n.hidden=!active;n.inert=!active;n.setAttribute('aria-hidden',String(!active));}
 $('sourceCamera').setAttribute('viewBox',state.camera.join(' '));
 const cameraScale=Math.min(cameraBox.width/state.camera[2],(cameraBox.height-(state.exportMode?42:36))/state.camera[3]);
 if(cameraScale>0){const label=document.querySelector('.reference-text');label.style.fontSize=`${(state.exportMode?21:14)/cameraScale}px`;label.setAttribute('y',String(1043+(state.exportMode?31:22)/cameraScale));}
 $('overlayImage').style.opacity=String(state.overlay);
 $('sourceOutline').style.opacity=String(state.trace>0?1:0);
 $('sourceOutline').style.strokeDasharray='1';$('sourceOutline').style.strokeDashoffset=String(1-state.trace);
 $('referenceMeasure').style.opacity=String(state.ruler);
 $('rulerInset').hidden=state.ruler===0;
 $('qualityOutput').style.opacity=String(.25+.75*state.comparison);
 $('batchScene').style.opacity=String(state.batchReveal);
 $('closingPrinciples').hidden=state.phase!==5;
 $('closingPrinciples').style.opacity=String(state.conclusionReveal);
 const captions=['原照｜紐約植物園 NY01212184','原照＋原研究的葉片標記｜2023 D-3FAM #811','尺規來自同張照片｜1 cm 刻度參照','','','同一張標本｜量完再對照原照'];
 $('visualCaption').textContent=captions[state.phase];
}
