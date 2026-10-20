'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-nav');
function closeMenu(){ if(!menu || !menuButton) return; menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Mở menu');document.body.classList.remove('menu-open'); }
if(menuButton && menu){
  menuButton.addEventListener('click',()=>{const open=!menu.classList.contains('is-open');menu.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Đóng menu':'Mở menu');document.body.classList.toggle('menu-open',open);});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>850)closeMenu();});
}
const header=document.querySelector('.site-header');
const backTop=document.getElementById('back-top');
function onScroll(){ if(header) header.classList.toggle('has-shadow',window.scrollY>18);if(backTop)backTop.classList.toggle('is-visible',window.scrollY>380);}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(backTop)backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
// Fallbacks allow the pages to remain visually complete without Internet.
document.querySelectorAll('img[data-fallback]').forEach(image=>{
  image.addEventListener('error',()=>{ if(!image.dataset.didFallback){image.dataset.didFallback='true';image.src=image.dataset.fallback;} });
});
const filterButtons=document.querySelectorAll('[data-filter]');const cards=document.querySelectorAll('.destination-card');const noResults=document.getElementById('no-results');
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;filterButtons.forEach(item=>{const selected=item===button;item.classList.toggle('is-selected',selected);item.setAttribute('aria-pressed',String(selected));});
  let count=0;cards.forEach(card=>{const show=filter==='all'||card.dataset.category===filter;card.hidden=!show;if(show)count++;});
  if(noResults)noResults.hidden=count!==0;
}));
const reveal=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');obs.unobserve(entry.target);}});},{threshold:.06,rootMargin:'0px 0px 35px 0px'});reveal.forEach(el=>obs.observe(el));}else{reveal.forEach(el=>el.classList.add('is-revealed'));}
