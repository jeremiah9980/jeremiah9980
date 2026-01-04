/* =========================================================
   Global UI Script – Jeremiah Cargill Portfolio
   Safe for GitHub Pages
   ========================================================= */

/* -------------------------------
   Theme Toggle (Light / Dark)
-------------------------------- */
(function () {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    toggle.textContent = savedTheme === "dark" ? "Light mode" : "Dark mode";
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    toggle.textContent = next === "dark" ? "Light mode" : "Dark mode";
  });
})();

/* -------------------------------
   Fade-in on Scroll
-------------------------------- */
(function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => observer.observe(el));
})();

/* -------------------------------
   Architecture Legend Toggle
-------------------------------- */
(function () {
  document.querySelectorAll("[data-legend-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const legendId = btn.getAttribute("data-legend-toggle");
      const legend = document.getElementById(legendId);
      if (!legend) return;
      legend.classList.toggle("open");
    });
  });
})();
