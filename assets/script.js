(function(){
  const STORAGE_KEY = "jc_theme";
  const root = document.documentElement;
  const btn = () => document.getElementById("themeToggle");

  function setTheme(t){
    root.setAttribute("data-theme", t);
    localStorage.setItem(STORAGE_KEY, t);
    const b = btn();
    if(b) b.textContent = (t === "light") ? "Dark mode" : "Light mode";
  }

  function initTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved){ setTheme(saved); return; }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  function initAnimations(){
    const els = document.querySelectorAll(".fade-in");
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("show"); io.unobserve(e.target); } });
    }, {threshold: 0.1});
    els.forEach(el=>io.observe(el));
  }

  window.addEventListener("DOMContentLoaded", ()=>{
    initTheme();
    initAnimations();
    const b = btn();
    if(b){
      b.addEventListener("click", ()=>{
        const cur = root.getAttribute("data-theme") || "dark";
        setTheme(cur === "dark" ? "light" : "dark");
      });
    }
  });
})();
