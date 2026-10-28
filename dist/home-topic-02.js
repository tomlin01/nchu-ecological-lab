(() => {
  'use strict';
  const scene=document.getElementById('topic-02');
  const links=[...scene.querySelectorAll('.identification-link')];
  const plates=[...scene.querySelectorAll('.plate-position')];
  const name=document.getElementById('identification-preview-name');
  const copy=document.getElementById('identification-preview-copy');
  let activeCase='02-01';
  function preview(link){
    if(activeCase===link.dataset.case)return;
    activeCase=link.dataset.case;
    name.textContent=link.dataset.previewName;copy.textContent=link.dataset.previewCopy;
    links.forEach(item=>item.classList.toggle('is-previewed',item===link));
    plates.forEach(plate=>plate.classList.toggle('is-selected',plate.dataset.plate===activeCase));
  }
  links.forEach(link=>{
    link.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'||event.pointerType==='pen')preview(link);});
    link.addEventListener('focus',()=>preview(link));
  });
  // Native links preserve first-tap navigation, browser history, and the no-script fallback.
  window.topicTwo={getState:()=>({activeCase,caseCount:links.length,previewName:name.textContent})};
})();
