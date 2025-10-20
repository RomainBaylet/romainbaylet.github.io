// ========= Smooth scroll for same-page anchors (optional) =========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========= Hamburger menu (robust) =========
(function () {
  const btn = document.querySelector('.hamburger');
  const panel = document.querySelector('#menu-panel');

  if (!btn || !panel) return; // header might differ on some pages

  const closeMenu = () => {
    panel.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    panel.classList.add('show');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  btn.addEventListener('click', () => {
    const isOpen = panel.classList.contains('show');
    isOpen ? closeMenu() : openMenu();
  });

  // close when clicking a link inside panel
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
