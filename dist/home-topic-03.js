(() => {
  'use strict';
  const scene=document.getElementById('topic-03');
  if(!scene?.matches('.topic-individuals'))return;
  const links=[...scene.querySelectorAll('.individuals-link[data-case]')];
  const plates=[...scene.querySelectorAll('[data-individual-plate]')];
  const name=document.getElementById('individuals-preview-name');
  const copy=document.getElementById('individuals-preview-copy');
  if(!links.length||!name||!copy)return;
  let activeCase=links.find(link=>link.classList.contains('is-previewed'))?.dataset.case||links[0].dataset.case;
  function preview(link){
    if(link.dataset.case===activeCase)return;
    activeCase=link.dataset.case;
    name.textContent=link.dataset.previewName;
    copy.textContent=link.dataset.previewCopy;
    links.forEach(item=>item.classList.toggle('is-previewed',item===link));
    plates.forEach(plate=>plate.classList.toggle('is-selected',plate.dataset.individualPlate===activeCase));
  }
  links.forEach(link=>{
    link.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'||event.pointerType==='pen')preview(link);});
    link.addEventListener('focus',()=>preview(link));
  });
  // Only hover/focus changes the preview. The first tap, click and Enter remain native navigation.
  window.topicThree={getState:()=>({activeCase,caseCount:links.length,plateCount:plates.length,previewName:name.textContent,previewCopy:copy.textContent})};
})();
