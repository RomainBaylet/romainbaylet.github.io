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

        // Optional visual feedback: fade form out smoothly
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

// ========= Reveal on load/scroll (luxury fade) =========
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
})();

// === Smooth page fade-in/out (with safeguards) ===
document.addEventListener("DOMContentLoaded", () => {
  // fade in on load
  document.body.classList.add("fade-in");

  // ensure visible when restored from bfcache (back/forward)
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      document.body.style.opacity = "1";
      document.body.classList.add("fade-in");
    }
  });

  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const url = new URL(href, window.location.href);

    // ignore: hash links, mailto/tel/js, downloads, target=_blank, other hosts
    const isHash      = href.startsWith('#');
    const isMailTel   = href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:');
    const isDownload  = link.hasAttribute('download');
    const isBlank     = link.target === '_blank';
    const otherHost   = url.host !== window.location.host;

    if (isHash || isMailTel || isDownload || isBlank || otherHost) return;

    link.addEventListener('click', (e) => {
      // allow modifier clicks to open new tab/window
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      e.preventDefault();
      // start fade out
      document.body.style.opacity = '0';
      // navigate halfway through the CSS transition (1.5s / 2 = 750ms)
      setTimeout(() => { window.location = url.href; }, 750);
    });
  });
});
