
// script.js — small UX touches
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
// Hamburger toggle
const btn = document.querySelector('.hamburger');
const panel = document.querySelector('#menu-panel');

if (btn && panel) {
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('show');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close when clicking a link
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      panel.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      panel.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}
