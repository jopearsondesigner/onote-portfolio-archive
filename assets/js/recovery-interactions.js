/* Accessible local navigation for archived oNote; no CDN or WordPress runtime needed. */
(() => {
  'use strict';
  const ready = () => {
    const groups = [...document.querySelectorAll('nav.flex.space-x-8 > div[x-data]')].filter(el => el.querySelector(':scope > [x-show="open"]'));
    const closeAll = except => groups.forEach(group => {
      if(group === except) return;
      group.classList.remove('recovery-nav-open');
      const b=group.querySelector(':scope > button');
      if (b) b.setAttribute('aria-expanded','false');
    });
    groups.forEach(group => {
      const button=group.querySelector(':scope > button');
      const panel=group.querySelector(':scope > div[x-show="open"]');
      if(!button||!panel)return;
      button.classList.add('recovery-nav-trigger');
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-haspopup','true');
      panel.setAttribute('role','group');
      function open(){ closeAll(group);group.classList.add('recovery-nav-open');button.setAttribute('aria-expanded','true'); }
      function close(){group.classList.remove('recovery-nav-open');button.setAttribute('aria-expanded','false');}
      button.addEventListener('click',event=>{
        event.preventDefault(); event.stopPropagation();
        open();
      });
      group.addEventListener('mouseenter',open);
      group.addEventListener('mouseleave',close);
      group.addEventListener('focusin',open);
      group.addEventListener('focusout',event=>{if(!group.contains(event.relatedTarget))close();});
    });
    document.addEventListener('click',event => {if(!groups.some(group=>group.contains(event.target)))closeAll();});
    document.addEventListener('keydown',event=> {if(event.key==='Escape'){closeAll();closeMobile();}});

    const mobileContainer=document.querySelector('div[x-data="{ mobile_open: false }"]');
    const mobileDrawer=mobileContainer?.querySelector('div[x-show="mobile_open"]');
    const mobileOpen=mobileContainer?[...mobileContainer.querySelectorAll('button')].find(b=>(b.getAttribute('@click')||'').includes('mobile_open = true')):null;
    const mobileClose=mobileDrawer?[...mobileDrawer.querySelectorAll('button')].find(b=>(b.getAttribute('@click')||'').includes('mobile_open = false')):null;
    function closeMobile(){
      mobileContainer?.classList.remove('recovery-mobile-open');
      mobileOpen?.setAttribute('aria-expanded','false');
    }
    if(mobileOpen&&mobileDrawer&&mobileContainer){
      mobileOpen.classList.add('recovery-mobile-trigger');
      mobileOpen.setAttribute('aria-expanded','false');
      mobileOpen.addEventListener('click',()=>{mobileContainer.classList.add('recovery-mobile-open');mobileOpen.setAttribute('aria-expanded','true');});
      mobileClose?.addEventListener('click',closeMobile);
      document.addEventListener('click',ev=>{if(!mobileContainer.contains(ev.target))closeMobile();});
      mobileDrawer.querySelectorAll('div[x-data="{ open: false }"]').forEach(block=>{
        const toggle=block.querySelector(':scope > button');
        const content=[...block.children].find(c=>c.getAttribute('x-bind:style'));
        if(!toggle||!content)return;
        toggle.setAttribute('aria-expanded','false');
        toggle.addEventListener('click',()=>{
          const open=toggle.getAttribute('aria-expanded')==='true';
          toggle.setAttribute('aria-expanded',String(!open));
          content.style.maxHeight=open?'0px':(content.scrollHeight+15)+'px';
        });
      });
    }
    // The original page used Alpine for light/dark state. Restore simple offline operation.
    try {if(localStorage.getItem('onote-preview-theme')==='dark')document.body.classList.add('dark');}catch(e){}
    [...document.querySelectorAll('button')].filter(b=>(b.getAttribute('@click')||'').includes('darkMode = !darkMode')).forEach(b=>{
      b.addEventListener('click',()=>{
        document.body.classList.toggle('dark');
        try{localStorage.setItem('onote-preview-theme',document.body.classList.contains('dark')?'dark':'light');}catch(e){}
      });
    });
    const featureGroup=document.querySelector('#content [x-data="{active: 0}"]');
    if(featureGroup){
      const buttons=[...featureGroup.querySelectorAll('button')].filter(b=>b.hasAttribute('x-on:click.prevent'));
      const panels=[...featureGroup.querySelectorAll('[x-show^="active ==="]')];
      function select(idx){
        buttons.forEach(b=>{
          const active=b.getAttribute('x-on:click.prevent')?.endsWith(String(idx));
          b.classList.toggle('active',Boolean(active));
          b.setAttribute('aria-selected',String(Boolean(active)));
        });
        panels.forEach(panel=>{
          const shown=panel.getAttribute('x-show')===`active === ${idx}`;
          panel.classList.toggle('recovery-tab-visible',shown);
          panel.classList.toggle('recovery-tab-hidden',!shown);
        });
      }
      buttons.forEach(b=>b.addEventListener('click',e=>{
        e.preventDefault();const index=Number((b.getAttribute('x-on:click.prevent')||'').match(/\d+/)?.[0]??0);select(index);
      }));
      select(0);
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();