(function () {
const body = document.body;
const themeBtn = document.getElementById('themeToggle');


// Theme persistence
const saved = localStorage.getItem('theme') || 'light';
body.dataset.theme = saved;
if (themeBtn) themeBtn.textContent = saved === 'dark' ? 'Dark mode' : 'Light mode';


if (themeBtn) {
themeBtn.addEventListener('click', () => {
const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
body.dataset.theme = next;
localStorage.setItem('theme', next);
themeBtn.textContent = next === 'dark' ? 'Dark mode' : 'Light mode';
});
}


// Robust SVG preview loader with PNG fallback + error badge
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


// Legend overlay toggles
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


// Auto-build Featured strip from cards flagged data-featured="true"
const strip = document.getElementById('featuredStrip');
const cards = Array.from(document.querySelectorAll('.project[data-featured="true"]'));
if (strip && cards.length) {
cards.forEach((card) => {
const id = card.dataset.projectId;
const title = card.querySelector('h3')?.textContent || 'Project';
const link = card.querySelector('.actions a')?.getAttribute('href') || '#';
const img = card.querySelector('img');
const item = document.createElement('a');
item.className = 'strip-item';
item.href = link;
item.innerHTML = `<div class="strip-thumb">${img ? `<img src="${img.getAttribute('src')}" alt="${title}"/>` : ''}</div><div class="strip-label">${title}</div>`;
strip.appendChild(item);
});
}
})();
