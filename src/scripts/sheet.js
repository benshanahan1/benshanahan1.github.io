// Shared page behavior: drawing-frame zone markers, reveal on scroll,
// the theme toggle, and number keys for the sheet tabs.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function buildFrame() {
  const frame = document.querySelector(".frame");
  if (!frame) return;
  const draw = () => {
    frame.querySelectorAll(".zone, .tick").forEach((n) => n.remove());
    const w = frame.clientWidth;
    const h = frame.clientHeight;
    const cols = Math.max(4, Math.min(10, Math.round(w / 170)));
    const rows = Math.max(3, Math.min(8, Math.round(h / 170)));
    const add = (cls, style, text) => {
      const d = document.createElement("div");
      d.className = cls;
      Object.assign(d.style, style);
      if (text) d.innerHTML = `<span>${text}</span>`;
      frame.appendChild(d);
    };
    for (let i = 0; i < cols; i++) {
      const x = ((i + 0.5) / cols) * w;
      const label = String(cols - i);
      add("zone zone--h", { left: x + "px", top: "0" }, label);
      add("zone zone--h", { left: x + "px", bottom: "0" }, label);
      if (i > 0) {
        const tx = (i / cols) * w;
        add("tick", { left: tx + "px", top: "0", width: "1px", height: "14px" });
        add("tick", { left: tx + "px", bottom: "0", width: "1px", height: "14px" });
      }
    }
    for (let j = 0; j < rows; j++) {
      const y = ((j + 0.5) / rows) * h;
      const label = String.fromCharCode(65 + (rows - 1 - j));
      add("zone zone--v", { top: y + "px", left: "0" }, label);
      add("zone zone--v", { top: y + "px", right: "0" }, label);
      if (j > 0) {
        const ty = (j / rows) * h;
        add("tick", { top: ty + "px", left: "0", height: "1px", width: "14px" });
        add("tick", { top: ty + "px", right: "0", height: "1px", width: "14px" });
      }
    }
  };
  draw();
  window.addEventListener("resize", draw);
}

function buildReveal() {
  const items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        e.target.classList.remove("is-pending");
        io.unobserve(e.target);
      }
    }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  const pending = [];
  items.forEach((n) => {
    // anything already on screen shows immediately; the rest waits for scroll
    if (n.getBoundingClientRect().top < window.innerHeight * 0.92) n.classList.add("is-in");
    else { io.observe(n); pending.push(n); }
  });
  // Opt in to hiding only after the observer has successfully registered every item.
  pending.forEach((n) => n.classList.add("is-pending"));
}

// Theme: auto (follow device) → light → dark. Saved per visitor.
function buildTheme() {
  const btn = document.getElementById("theme-btn");
  if (!btn) return;
  const order = ["auto", "light", "dark"];
  let mode = "auto";
  try { mode = localStorage.getItem("theme") || "auto"; } catch (e) { /* private mode */ }
  const apply = () => {
    if (mode === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
    btn.setAttribute("aria-label", `Theme: ${mode}. Change theme`);
    btn.title = `Theme: ${mode}`;
  };
  apply();
  btn.addEventListener("click", () => {
    mode = order[(order.indexOf(mode) + 1) % order.length];
    try {
      if (mode === "auto") localStorage.removeItem("theme");
      else localStorage.setItem("theme", mode);
    } catch (e) { /* private mode */ }
    apply();
  });
}

// Number keys jump between sheets, matching the tab numbers
function buildKeys() {
  const pages = { 1: "/", 2: "/projects/" };
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.("input, textarea, select, [contenteditable]")) return;
    const go = pages[e.key];
    if (go && location.pathname !== go) location.href = go;
  });
}

buildFrame();
buildReveal();
buildTheme();
buildKeys();
