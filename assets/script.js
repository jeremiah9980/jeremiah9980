(function () {
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');

  // Resolve saved theme; default to dark
  const saved = localStorage.getItem('theme') || 'dark';
  body.dataset.theme = saved;

  function updateThemeLabel(theme) {
    if (!themeBtn) return;
    themeBtn.textContent = theme === 'dark' ? '☀ Light' : '◑ Dark';
  }
  updateThemeLabel(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
      body.dataset.theme = next;
      localStorage.setItem('theme', next);
      updateThemeLabel(next);
    });
  }

  // ── Fade-in via IntersectionObserver ──
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  // ── Image preview fallback ──
  function armPreview(img) {
    if (!img) return;
    img.addEventListener('error', () => {
      const fallback = img.getAttribute('data-fallback');
      if (fallback && !img.dataset.fellBack) {
        img.dataset.fellBack = '1';
        img.src = fallback;
      } else {
        img.replaceWith(Object.assign(document.createElement('div'), {
          className: 'preview-missing',
          textContent: 'Preview unavailable',
        }));
      }
    });
  }
  document.querySelectorAll('img.svg-preview').forEach(armPreview);

  // ── Legend overlay ──
  document.querySelectorAll('.legend-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-legend');
      const panel = document.getElementById(id);
      if (panel) panel.hidden = false;
    });
  });
  document.querySelectorAll('.legend-overlay .close-legend').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const panel = e.target.closest('.legend-overlay');
      if (panel) panel.hidden = true;
    });
  });
  document.querySelectorAll('.legend-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.hidden = true;
    });
  });

  // ── Featured strip (dynamic) ──
  const strip = document.getElementById('featuredStrip');
  const cards = Array.from(document.querySelectorAll('.project[data-featured="true"]'));
  if (strip && cards.length) {
    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent || 'Project';
      const link = card.querySelector('.actions a')?.getAttribute('href') || '#';
      const item = document.createElement('a');
      item.className = 'strip-item';
      item.href = link;
      item.innerHTML = `<div class="strip-label">${title}</div>`;
      strip.appendChild(item);
    });
  }
})();