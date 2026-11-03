// Fig. 1: a brain drawn as a technical drawing. The brainstem is a wire harness whose
// wires branch into neurons, one per revision (career milestone). Seeded, so it draws
// the same every load.

const SVGNS = "http://www.w3.org/2000/svg";

function el(tag, attrs = {}, parent) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}

// Deterministic PRNG so the drawing is the same on every load.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Smooth path through points (Catmull-Rom → cubic Bézier).
function spline(P) {
  const f = (v) => v.toFixed(1);
  let d = `M ${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1[0])} ${f(c1[1])}, ${f(c2[0])} ${f(c2[1])}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}


// Lateral view, frontal lobe to the left.
// One outline for cerebrum + cerebellum; the transverse fissure is drawn inside.
const BRAIN =
  "M 95 300 C 60 260, 55 180, 95 130 C 135 75, 215 40, 300 42 C 395 44, 470 80, 515 150 " +
  "C 548 200, 552 268, 532 312 C 548 336, 552 380, 538 404 C 522 428, 482 435, 452 431 " +
  "C 420 427, 396 412, 389 392 C 385 380, 385 371, 383 366 C 360 372, 310 381, 265 371 " +
  "C 225 362, 205 340, 210 318 C 185 310, 150 312, 125 312 C 110 311, 100 306, 95 300 Z";
// transverse fissure: ends, then control points. The ends get snapped onto the lumpy outline.
const FISSURE = { ends: [[532, 314], [384, 364]], ctrl: "C 502 340, 446 352," };
// region below the fissure (cerebellum): its neurons hang off their own breakout
const CEREBELLUM = "M 386 350 C 446 352, 502 340, 534 318 L 600 318 L 600 470 L 386 470 Z";
const SULCI = [ // landmark folds only, so the wiring stays readable
  "M 212 318 C 255 292, 318 272, 392 262",                 // lateral fissure
  "M 330 62 C 320 110, 304 156, 296 198 C 290 226, 282 246, 276 268", // central
  "M 132 146 C 170 122, 212 110, 256 112",                 // superior frontal
  "M 244 342 C 300 324, 366 308, 440 302",                 // superior temporal
  "M 468 104 C 462 144, 470 182, 490 220",                 // parieto-occipital
];


const TRUNK_TOP = 352;
const TRUNK_BOT = 532;
const trunkX = (y) => 360 + ((y - TRUNK_TOP) / (TRUNK_BOT - TRUNK_TOP)) * 12;

export function buildBrain(host, REVS) {
  const figure = host.closest(".figure");
  const rand = mulberry32(1995);

  // wide screens get extra paper on both sides, so the drawing can run full width.
  // Beside the revision list (split, same breakpoint as the CSS) it stays tight.
  const VIEW = { tight: "-40 -40 700 650", wide: "-270 -40 1180 650" };
  const split = window.matchMedia("(min-width: 901px)");
  const svg = el("svg", { viewBox: VIEW.tight, role: "img",
    "aria-label": "Engineering drawing of a human brain whose brainstem is a wire harness; its wires branch into neurons labeled with career milestones." });
  host.appendChild(svg);
  const fit = () => {
    const wide = host.clientWidth > 760 && !split.matches;
    svg.setAttribute("viewBox", wide ? VIEW.wide : VIEW.tight);
  };
  fit();
  window.addEventListener("resize", fit);

  const defs = el("defs", {}, svg);
  const hatch = el("pattern", { id: "braid", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
  el("line", { x1: 0, y1: 0, x2: 0, y2: 6, class: "b-hatch" }, hatch);
  el("line", { x1: 3, y1: 0, x2: 3, y2: 6, class: "b-hatch", transform: "rotate(90 3 3)" }, hatch);

  const gHarness = el("g", { "clip-path": "url(#occ-clip)" }, svg); // the brain is see-through, so stop the sleeve at its edge
  const gBrain = el("g", {}, svg);
  const gWires = el("g", {}, svg);
  const gPulse = el("g", {}, svg); // under the harness redraw, so a signal comes out of the cable
  const gOcc = el("g", { "clip-path": "url(#occ-clip)" }, svg); // harness redrawn over wires, outside the brain
  const gCover = el("g", {}, svg); // bands + label
  const gSeam = el("g", { "clip-path": "url(#seam-clip)" }, svg); // brain edge redrawn across the sleeve
  const gNodes = el("g", {}, svg);
  const gAnno = el("g", {}, svg);

  /* --- harness (brainstem) --- */
  const sleeveW = 15;
  // cable frame: u across the cable, s down its length from the top; parts drawn in it get rotated onto the cable
  const tilt = (Math.atan2(12, TRUNK_BOT - TRUNK_TOP) * 180) / Math.PI;
  const CX = trunkX(TRUNK_TOP), CLEN = Math.hypot(12, TRUNK_BOT - TRUNK_TOP);
  const cs = Math.cos((tilt * Math.PI) / 180), sn = Math.sin((tilt * Math.PI) / 180);
  const along = (u, d) => [CX + u * cs + d * sn, TRUNK_TOP - u * sn + d * cs];
  const cableG = (layer) => el("g", { transform: `rotate(${-tilt} ${CX} ${TRUNK_TOP})` }, layer);
  const [bl, br] = [along(-sleeveW, CLEN), along(sleeveW, CLEN)];
  const sleeve = `M ${trunkX(TRUNK_TOP) - sleeveW} ${TRUNK_TOP} L ${bl[0]} ${bl[1]} ` +
    `L ${br[0]} ${br[1]} L ${trunkX(TRUNK_TOP) + sleeveW} ${TRUNK_TOP} Z`;
  el("path", { d: sleeve, class: "harness-sleeve" }, gHarness);
  el("path", { d: sleeve, fill: "url(#braid)", opacity: 0.9 }, gHarness);
  // heat-shrink bands + label sleeve, tilted to follow the cable
  [404, 506].forEach((y) => {
    const x = trunkX(y + 4.5);
    const g = el("g", { transform: `rotate(${-tilt} ${x} ${y + 4.5})` }, gCover);
    el("rect", { x: x - sleeveW - 2.5, y, width: 2 * sleeveW + 5, height: 9, rx: 1.5, class: "harness-band" }, g);
  });
  {
    const y = 432, x = trunkX(y + 28);
    const g = el("g", { transform: `rotate(${-tilt} ${x} ${y + 28})` }, gCover);
    el("rect", { x: x - sleeveW - 1.5, y, width: 2 * sleeveW + 3, height: 56, rx: 1, class: "harness-label" }, g);
    const t = el("text", { x: x, y: y + 28, class: "harness-text", "text-anchor": "middle", "dominant-baseline": "central",
      transform: `rotate(-90 ${x} ${y + 28})` }, g);
    t.textContent = "BS-1995";
  }
  // connector J1: backshell, coupling nut (knurled), front shell
  {
    const g = cableG(gHarness), x = CX, y = TRUNK_TOP + CLEN;
    el("path", { d: `M ${x - sleeveW} ${y} L ${x - 22} ${y + 18} L ${x + 22} ${y + 18} L ${x + sleeveW} ${y} Z`, class: "conn-body" }, g);
    el("rect", { x: x - 27, y: y + 18, width: 54, height: 26, rx: 2, class: "conn-body" }, g);
    for (let k = -22; k <= 22; k += 4) el("line", { x1: x + k, y1: y + 21, x2: x + k, y2: y + 41, class: "conn-knurl" }, g);
    el("rect", { x: x - 23, y: y + 44, width: 46, height: 14, rx: 1, class: "conn-body" }, g);
    // J1 leader (stays horizontal, starts on the rotated coupling nut)
    const [lx, ly] = along(27, CLEN + 31);
    el("path", { d: `M ${lx} ${ly} L ${lx + 31} ${ly} L ${lx + 43} ${ly - 12}`, class: "leader" }, gAnno);
    const t = el("text", { x: lx + 47, y: ly - 15, class: "callout-label" }, gAnno);
    t.textContent = "J1";
  }
  // dimension along the trunk: length not final, the work is still going
  {
    const g = cableG(gAnno), dx = CX - 42, y1 = TRUNK_TOP + 26, y2 = TRUNK_TOP + CLEN, ex = CX - sleeveW - 3;
    el("line", { x1: ex, y1, x2: dx - 6, y2: y1, class: "dim" }, g);
    el("line", { x1: ex, y1: y2, x2: dx - 6, y2, class: "dim" }, g);
    el("line", { x1: dx, y1, x2: dx, y2, class: "dim" }, g);
    el("path", { d: `M ${dx - 3} ${y1 + 8} L ${dx} ${y1} L ${dx + 3} ${y1 + 8}`, class: "dim" }, g);
    el("path", { d: `M ${dx - 3} ${y2 - 8} L ${dx} ${y2} L ${dx + 3} ${y2 - 8}`, class: "dim" }, g);
    const my = (y1 + y2) / 2;
    el("rect", { x: dx - 7, y: my - 22, width: 14, height: 44, fill: "var(--paper)" }, g);
    const t = el("text", { x: dx, y: my, class: "dim-text", "text-anchor": "middle", "dominant-baseline": "central", transform: `rotate(-90 ${dx} ${my})` }, g);
    t.textContent = "L = TBD";
  }
  /* --- brain --- */
  // Lumpy outline: gyri of uneven width and height, notches of uneven depth,
  // the odd flat stretch, and a slow wobble along the whole edge.
  const gyrify = (d, amp) => {
    const p = el("path", { d }, svg);
    const L = p.getTotalLength(), n = Math.round(L / 2.5);
    const pts = [];
    for (let i = 0; i < n; i++) { const q = p.getPointAtLength((i / n) * L); pts.push([q.x, q.y]); }
    p.remove();
    const cx = pts.reduce((a, q) => a + q[0], 0) / n, cy = pts.reduce((a, q) => a + q[1], 0) / n;
    const segs = [];
    for (let s0 = 0; s0 < L; ) {
      const len = 12 + rand() * 30, flat = rand() < 0.12;
      segs.push({ s0, len, amp: amp * (flat ? 0.15 : 0.35 + rand() * 0.95), pow: 0.35 + rand() * 0.6, notch: 0.15 + rand() * 0.35 });
      s0 += len;
    }
    const last = segs[segs.length - 1];
    last.len = L - last.s0;                               // close exactly
    last.amp = segs[0].amp; last.notch = segs[0].notch;   // seamless join
    const ph1 = rand() * 6.28, ph2 = rand() * 6.28;
    let k = 0;
    const out = pts.map((q, i) => {
      const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
      let nx = -(b[1] - a[1]), ny = b[0] - a[0];
      const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
      if (nx * (q[0] - cx) + ny * (q[1] - cy) < 0) { nx = -nx; ny = -ny; }
      const s = (i / n) * L;
      while (k < segs.length - 1 && s >= segs[k].s0 + segs[k].len) k++;
      const g = segs[k], u = (s - g.s0) / g.len;
      const wob = 1.8 * Math.sin((2 * Math.PI * 3 * s) / L + ph1) + 1.1 * Math.sin((2 * Math.PI * 8 * s) / L + ph2);
      const o = g.amp * (Math.pow(Math.sin(Math.PI * u), g.pow) - g.notch) + wob;
      return [q[0] + nx * o, q[1] + ny * o];
    });
    return [spline([...out, out[0]]) + " Z", out];
  };
  const [brain, edge] = gyrify(BRAIN, 5.5);
  const brainPath = el("path", { d: brain, class: "b-fill" }, gBrain);
  // Wires vanish into the cable: everything of the harness that lies
  // outside the brain outline is drawn again on top of them.
  el("path", { d: `M -100 -100 H 800 V 800 H -100 Z ${brain}`, "clip-rule": "evenodd" }, el("clipPath", { id: "occ-clip" }, defs));
  el("rect", { x: 320, y: 330, width: 90, height: 70 }, el("clipPath", { id: "seam-clip" }, defs));
  [...gHarness.childNodes].forEach((n) => gOcc.appendChild(n.cloneNode(true)));
  el("path", { d: brain, class: "b-outline" }, gSeam);
  const cbPath = el("path", { d: CEREBELLUM, fill: "none", stroke: "none" }, gBrain);
  // nearest outline point (the spline passes through these)
  const snap = ([x, y]) => edge
    .reduce((b, q) => (Math.hypot(q[0] - x, q[1] - y) < Math.hypot(b[0] - x, b[1] - y) ? q : b))
    .map((v) => v.toFixed(1)).join(" ");
  const [fa, fb] = FISSURE.ends.map(snap);
  el("path", { d: `M ${fa} ${FISSURE.ctrl} ${fb}`, class: "b-fissure draw" }, gBrain);
  // sulci: a gentle wobble so they read as folds, not strokes
  SULCI.forEach((d) => {
    const p = el("path", { d, class: "b-sulcus draw" }, gBrain);
    const L = p.getTotalLength(), n = Math.max(6, Math.round(L / 9)), ph = rand() * 6.28;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const s = (i / n) * L, a = p.getPointAtLength(s), b = p.getPointAtLength(Math.max(0, s - 0.5));
      const tx = a.x - b.x, ty = a.y - b.y, tl = Math.hypot(tx, ty) || 1;
      const w = Math.sin(i * 1.7 + ph) * 1.4 * Math.sin((i / n) * Math.PI);
      pts.push([a.x - (ty / tl) * w, a.y + (tx / tl) * w]);
    }
    p.setAttribute("d", spline(pts));
  });
  el("path", { d: brain, class: "b-outline draw" }, gBrain);

  const inside = (x, y, m = 0, zone = "cortex") => {
    if (!brainPath.isPointInFill) return true;
    const pts = m ? [[x, y], [x + m, y], [x - m, y], [x, y + m], [x, y - m]] : [[x, y]];
    return pts.every(([px, py]) => {
      const q = new DOMPoint(px, py);
      return brainPath.isPointInFill(q) && cbPath.isPointInFill(q) === (zone === "cb");
    });
  };

  /* --- wires: a harness tree. trunk → junctions (tie-wraps) → breakouts → neurons --- */
  const J = {
    root: { p: [trunkX(TRUNK_TOP), TRUNK_TOP] },
    hub: { p: [352, 304], up: "root" },
    temporal: { p: [328, 338], up: "root" },
    frontal: { p: [266, 222], up: "hub" },
    prefrontal: { p: [190, 196], up: "frontal" },
    superior: { p: [322, 180], up: "hub" },
    parietal: { p: [392, 196], up: "hub" },
    posterior: { p: [430, 262], up: "hub" },
    cbarc: { p: [406, 314], up: "root" },                // cerebellar bundle arcs up off the brainstem...
    cerebellar: { p: [458, 362], up: "cbarc" },           // ...then drops across the fissure and fans out
  };
  const chain = (j) => (J[j].up ? [...chain(J[j].up), j] : [j]);
  // dendrites fan out evenly on the far side of the incoming wire; main neurons fork at the tips
  const dendrites = (x, y, inAng, n, len, rev, zone = "cortex", fork = false, angs = null) => {
    const spread = n > 1 ? Math.min(Math.PI * 1.1, (n - 1) * 0.62) : 0;
    const twig = (x0, y0, a, l, fk) => {
      let ex = x0 + Math.cos(a) * l, ey = y0 + Math.sin(a) * l;
      if (!inside(ex, ey, 5, zone)) {
        l *= 0.55; ex = x0 + Math.cos(a) * l; ey = y0 + Math.sin(a) * l;
        if (!inside(ex, ey, 3, zone)) return;
      }
      const p = el("path", { d: `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`, class: "w w--minor" }, gWires);
      if (rev) p.dataset.rev = rev;
      if (fk) { twig(ex, ey, a - 0.42, l * 0.38, false); twig(ex, ey, a + 0.42, l * 0.38, false); return; }
      const dot = el("circle", { cx: ex.toFixed(1), cy: ey.toFixed(1), r: 1.5, class: "n--minor" }, gNodes);
      if (rev) dot.dataset.rev = rev;
    };
    if (angs) return angs.forEach((o) => twig(x, y, inAng + o, len, fork));
    for (let k = 0; k < n; k++) {
      const a = inAng + (n > 1 ? -spread / 2 + (k / (n - 1)) * spread : 0);
      twig(x, y, a, len, fork);
    }
  };

  // ends: one per revision, plus background neurons hung off each breakout
  const ends = REVS.map((r) => ({ p: r.node, via: r.via, rev: r.rev, main: true, r }));
  const hubs = ["temporal", "frontal", "prefrontal", "superior", "parietal", "posterior"];
  const near = (x, y) => hubs.reduce((b, h) => (Math.hypot(J[h].p[0] - x, J[h].p[1] - y) < Math.hypot(J[b].p[0] - x, J[b].p[1] - y) ? h : b));
  const scatter = (box, gap, margin, zone, tries) => {
    for (let t = 0; t < tries; t++) {
      const x = box[0] + rand() * (box[2] - box[0]), y = box[1] + rand() * (box[3] - box[1]);
      if (!inside(x, y, margin, zone)) continue;
      if (ends.some((e) => Math.hypot(e.p[0] - x, e.p[1] - y) < (e.main ? gap * 1.25 : gap))) continue;
      if (Math.hypot(x - J.root.p[0], y - J.root.p[1]) < 46) continue; // keep the cable entry clear
      ends.push(zone === "cb" ? { p: [x, y], via: "cerebellar", main: false, zone } : { p: [x, y], via: near(x, y), main: false });
    }
  };
  scatter([80, 50, 540, 340], 46, 16, "cortex", 900);
  scatter([392, 340, 560, 440], 30, 9, "cb", 300);

  // order wires left→right by destination so bundles don't cross, then rank per junction
  const [rx, ry] = J.root.p;
  ends.forEach((e) => (e.ang = Math.atan2(e.p[1] - ry, e.p[0] - rx)));
  ends.sort((a, b) => a.ang - b.ang);
  const count = {};
  ends.forEach((e) => {
    e.chain = chain(e.via);
    e.rank = {};
    e.chain.forEach((j) => { e.rank[j] = count[j] || 0; count[j] = e.rank[j] + 1; });
  });
  const SP = 2.1;
  ends.forEach((e) => {
    const pts = e.chain.map((j, k) => {
      const [x, y] = J[j].p;
      const next = k + 1 < e.chain.length ? J[e.chain[k + 1]].p : e.p;
      const prev = k > 0 ? J[e.chain[k - 1]].p : [x, y + 40];
      let dx = next[0] - prev[0], dy = next[1] - prev[1];
      const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
      const sp = j === "root" ? Math.min(SP, 22 / count[j]) : SP;
      const o = (e.rank[j] - (count[j] - 1) / 2) * sp;
      return [x - dy * o, y + dx * o];
    });
    pts.unshift([pts[0][0], TRUNK_TOP + 24]); // start down inside the sleeve
    if (e.r && e.r.through) e.r.through.forEach((t) => pts.push(REVS.find((r) => r.rev === t).node));
    e.last = pts[pts.length - 1];
    pts.push(e.p);
    e.d = spline(pts);
  });

  // tie-wraps: one per bundle of 3+ wires, a fixed distance before each junction, sized to the bundle
  const gTies = el("g", {}, gNodes);
  Object.entries(J).forEach(([k, j]) => {
    if (!j.up || count[k] < 3) return;
    const [x, y] = j.p, [px, py] = J[j.up].p;
    const L = Math.hypot(x - px, y - py), back = Math.min(16, L * 0.3);
    const tx = x - ((x - px) / L) * back, ty = y - ((y - py) / L) * back;
    const a = (Math.atan2(y - py, x - px) * 180) / Math.PI;
    const w = (count[k] - 1) * SP + 3;
    el("rect", { x: tx - 1.25, y: ty - w / 2, width: 2.5, height: w, class: "tie", transform: `rotate(${a.toFixed(1)} ${tx} ${ty})` }, gTies);
  });

  ends.forEach((e) => {
    const [nx, ny] = e.p;
    const [qx, qy] = e.last; // direction the wire arrives from
    const inAng = Math.atan2(ny - qy, nx - qx);
    if (!e.main) {
      el("path", { d: e.d, class: "w" }, gWires);
      el("circle", { cx: nx.toFixed(1), cy: ny.toFixed(1), r: 2.4, class: "n--minor" }, gNodes);
      dendrites(nx, ny, inAng, e.zone ? 3 : 4, e.zone ? 12 : 20, null, e.zone);
      return;
    }
    const r = e.r;
    el("path", { d: e.d, class: "w w--main", "data-rev": r.rev }, gWires);
    dendrites(nx, ny, inAng, r.zone ? 4 : 5, r.zone ? 16 : 26, r.rev, r.zone, true, r.relay ? [-1.35, -0.7, 0.7, 1.35] : null);

    const g = el("g", { class: `n-grp ${r.now ? "n-grp--now" : ""}`, "data-rev": r.rev }, gNodes);
    if (r.now) el("circle", { cx: nx, cy: ny, r: 5, class: "halo" }, g);
    el("circle", { cx: nx, cy: ny, r: 5, class: `n n--main ${r.now ? "n--now" : ""}` }, g);

    // balloon + leader
    const [bx, by] = r.balloon;
    const ang = Math.atan2(by - ny, bx - nx);
    const lx1 = nx + Math.cos(ang) * 7, ly1 = ny + Math.sin(ang) * 7;
    const lx2 = bx - Math.cos(ang) * 12, ly2 = by - Math.sin(ang) * 12;
    el("path", { d: `M ${lx1} ${ly1} L ${lx2} ${ly2}`, class: "leader" }, gAnno);
    el("circle", { cx: lx1, cy: ly1, r: 1.6, fill: "var(--ink-2)" }, gAnno);
    // The SVG is one accessible image; the table's native buttons provide keyboard control.
    const b = el("g", { class: `balloon ${r.now ? "balloon--now" : ""}`, "data-rev": r.rev }, gAnno);
    el("path", { d: `M ${bx} ${by - 16} L ${bx + 16} ${by + 11} L ${bx - 16} ${by + 11} Z` }, b);
    const t = el("text", { x: bx, y: by + 3 }, b);
    t.textContent = r.rev;
    const lab = el("text", { class: "callout-label" }, gAnno);
    lab.textContent = r.label;
    const pos = { r: [bx + 21, by, "start"], l: [bx - 21, by, "end"], t: [bx, by - 22, "middle"], b: [bx, by + 27, "middle"] }[r.side];
    lab.setAttribute("x", pos[0]);
    lab.setAttribute("y", pos[1] + 3);
    lab.setAttribute("text-anchor", pos[2]);
  });

  /* --- line-draw intro --- */
  svg.querySelectorAll(".draw").forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.setProperty("--len", len);
    p.style.setProperty("--d", (i * 0.05).toFixed(2) + "s");
  });
  setTimeout(() => figure.classList.add("is-drawn"), 60);

  /* --- signals: now and then one pulse runs up a single wire and its neuron answers; selecting a rev fires a burst --- */
  let burst = () => {};
  if (svg.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const mains = [...gWires.querySelectorAll(".w--main")];
    const pulse = (w, delay = 0, kind = "") => {
      const len = w.getTotalLength();
      const p = el("path", { d: w.getAttribute("d"), class: `pulse ${kind}` }, gPulse);
      p.style.strokeDasharray = `10 ${len + 20}`;
      p.animate([{ strokeDashoffset: 10 }, { strokeDashoffset: 10 - len }], { duration: len * 4.5, delay, fill: "backwards", easing: "cubic-bezier(.4,0,.6,1)" })
        .onfinish = () => {
          p.remove();
          const [x, y] = REVS.find((r) => r.rev === w.dataset.rev).node;
          const ring = el("circle", { cx: x, cy: y, r: 6, class: `pulse-ring ${kind}` }, gPulse);
          ring.animate([{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(2.4)", opacity: 0 }], { duration: 700, easing: "ease-out" })
            .onfinish = () => ring.remove();
        };
    };
    const signal = () => {
      if (!document.hidden) pulse(mains[Math.floor(Math.random() * mains.length)]);
      setTimeout(signal, 1100 + Math.random() * 800);
    };
    setTimeout(signal, 1800); // after the line-draw intro
    burst = (rev) => {
      const w = mains.find((m) => m.dataset.rev === rev);
      const n = 5 + Math.floor(Math.random() * 6);
      for (let i = 0, t = 0; w && i < n; i++, t += 90 + Math.random() * 70) pulse(w, t, "pulse--burst"); // ink, so it shows on the violet stem
    };
  }

  /* --- linking: table rows <-> figure. Hover previews a rev alongside the pinned one; click pins it until you click again. --- */
  const buttons = document.querySelectorAll(".rev-toggle");
  const setHot = (rev) => {
    document.querySelectorAll(".is-hot, .is-pinned").forEach((n) => n.classList.remove("is-hot", "is-pinned"));
    figure.classList.toggle("has-hot", !!(rev || pinned));
    for (const r of new Set([rev, pinned])) {
      if (r) document.querySelectorAll(`[data-rev="${r}"]`).forEach((n) => n.classList.add("is-hot", ...(r === pinned ? ["is-pinned"] : [])));
    }
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.closest("[data-rev]").dataset.rev === pinned)));
  };
  let pinned = null;
  const restore = () => setHot(null);
  const toggle = (rev) => { pinned = pinned === rev ? null : rev; restore(); };
  // scroll the list (not the page) so the row sits just under the sticky header
  const list = document.querySelector(".trace__scroll");
  const reveal = (rev) => {
    const row = list?.querySelector(`tr[data-rev="${rev}"]`);
    if (!row || list.scrollHeight <= list.clientHeight) return;
    const head = list.querySelector("thead")?.offsetHeight || 0;
    list.scrollTo({ top: row.offsetTop - head, behavior: "smooth" });
  };

  document.querySelectorAll("[data-rev]").forEach((n) => {
    if (n.closest("svg") && !n.matches(".balloon, .n-grp")) return;
    const rev = n.dataset.rev, inFig = !!n.closest("svg");
    n.classList.add("is-pickable");
    n.addEventListener("mouseenter", () => setHot(rev));
    n.addEventListener("mouseleave", restore);
    n.addEventListener("focusin", () => setHot(rev));
    n.addEventListener("focusout", restore);
    n.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // links inside a row still just navigate
      e.stopPropagation();
      toggle(rev);
      if (pinned) burst(rev);
      if (inFig && pinned) reveal(rev);
    });
  });
  // Native buttons synthesize clicks for Enter and Space without intercepting nested links.
  buttons.forEach((button) => { button.disabled = false; });
  // start with the current rev selected
  pinned = REVS.find((r) => r.now)?.rev ?? null;
  restore();

  // clicking anywhere else, or Escape, lets go of the pin
  document.addEventListener("click", () => { if (pinned) { pinned = null; restore(); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pinned) { pinned = null; restore(); } });
}
