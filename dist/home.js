(() => {
  'use strict';
  const links=[...document.querySelector('.topic-home').querySelectorAll('.case-link[data-case]')];
  const name=document.getElementById('preview-name');
  const copy=document.getElementById('preview-copy');
  let activeCase=links[0]?.dataset.case??null;

  function preview(link){
    if(!link||link.dataset.case===activeCase)return;
    activeCase=link.dataset.case;
    name.textContent=link.dataset.previewName;
    copy.textContent=link.dataset.previewCopy;
    links.forEach(item=>item.classList.toggle('is-previewed',item===link));
  }

  links.forEach(link=>{
    link.addEventListener('pointerenter',event=>{
      if(event.pointerType==='mouse'||event.pointerType==='pen')preview(link);
    });
    link.addEventListener('focus',()=>preview(link));
  });

  // Navigation remains native: touch and keyboard activation go straight to the case.
  window.topicHome={getState:()=>({activeCase,previewName:name.textContent,previewCopy:copy.textContent,caseCount:links.length})};
})();
