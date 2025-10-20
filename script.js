// ========= Smooth scroll for same-page anchors =========
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
  if (!btn || !panel) return;

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

  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
})();

// ========= Contact form (Formspree AJAX — no redirect) =========
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  const showStatus = (msg, ok = true) => {
    if (!status) return;
    status.textContent = msg;
    status.classList.remove('error', 'success');
    status.classList.add(ok ? 'success' : 'error');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showStatus("Thanks! Your message has been sent. I’ll get back to you within 48 hours.");

        // 🔥 Optional visual feedback: fade form out smoothly
        form.style.transition = "opacity 0.8s ease";
        form.style.opacity = "0.5";

      } else {
        showStatus("Hmm, something went wrong. Please try again or email me directly.", false);
      }
    } catch (err) {
      showStatus("Network error. Please try again in a moment.", false);
    }
  });
})();
