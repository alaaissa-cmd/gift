/* =====================================================
   ✏️ هون بتعدلي كل شي: الصور، الجمل، الألوان، العنوان
   ===================================================== */

const SETTINGS = {
  title: "our 1st date",          // العنوان فوق المنطادين 4 و 5
  subtitle: " ",
  // الصور: بدّلي الصورة الافتراضية في مجلد images بصورتك وبنفس الاسم (photo1.jpg ... photo10.jpg)
  // بتشتغل كمان: .png / .jpeg / .webp
};

/* ترتيب الألوان: [فاتح، غامق] لكل منطاد */
const BALLOONS = [
  { photo: "images/photo1",  caption: "22/9/2025",         label: "our 1st hangout ❤️",  colors: ["#ff9ab8", "#ff5c8a"] },
  { photo: "images/photo2",  caption: "22/10/2025",   label: "our 2nd hangout ❤️",    colors: ["#ffc08a", "#ff8f6b"] },
  { photo: "images/photo3",  caption: " 3/2/2025",     label: "❤️ ",    colors: ["#d9a7ff", "#a86be0"] },
  { photo: "images/photo4",  caption: "3/2/2025",     label: " ❤️",    colors: ["#ffd1de", "#ff8fb1"] },
  { photo: "images/photo5",  caption: "20/6/2026",         label: "ur graduation ❤️",    colors: ["#ffe29a", "#ffb35c"] },
  { photo: "images/photo6",  caption: "26/4/2026",      label: "my beautiful doctor ❤️",     colors: ["#ff8fb1", "#e0457b"] },
  { photo: "images/photo7",  caption: " ",                label: "IDK ❤️ ",     colors: ["#c9b3ff", "#8f6fe0"] },
  { photo: "images/photo8",  caption: " ",      label: "ur AI pic ❤️",    colors: ["#ffb89a", "#ff7a70"] },
  { photo: "images/photo9",  caption: " ",         label: "ur trends ❤️",     colors: ["#ffa6c4", "#f0508a"] },
  { photo: "images/photo10", caption: "",   label: "our fav pic ❤️",   colors: ["#ffd48f", "#ff9a5c"] },
];

/* ترتيب الصفوف: عدلي الأرقام (رقم المنطاد - 1) و align = left/center/right */
const LAYOUT = [
  { items: [0], align: "right" },
  { items: [1], align: "left" },
  { title: true, items: [2, 3] },             // 3 و 4 جنب بعض مع العنوان
  { items: [4], align: "center" },
  { items: [5], align: "left" },
  { items: [6], align: "right" },
  { items: [7], align: "center" },
  { items: [8], align: "left",  big: true },  // 9 أكبر
  { items: [9], align: "right", big: true },  // 10 أكبر
];

/* ===================== الكود (ما بتحتاجي تعدلي تحته) ===================== */

function balloonSVG(i, [light, dark]) {
  const id = "g" + i;
  return `
  <svg viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="${id}" cx="35%" cy="30%" r="80%">
        <stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/>
      </radialGradient>
      <clipPath id="c${i}"><path d="M100 8C150 8 188 46 188 96c0 44-34 82-70 112H82C46 178 12 140 12 96 12 46 50 8 100 8Z"/></clipPath>
    </defs>
    <path d="M100 8C150 8 188 46 188 96c0 44-34 82-70 112H82C46 178 12 140 12 96 12 46 50 8 100 8Z" fill="url(#${id})"/>
    <g clip-path="url(#c${i})" fill="#fff" opacity=".28">
      <path d="M100 0C70 40 62 120 90 215h20C138 120 130 40 100 0Z"/>
      <rect x="0" y="88" width="200" height="14" opacity=".6"/>
    </g>
    <path d="M100 8C150 8 188 46 188 96c0 44-34 82-70 112H82C46 178 12 140 12 96 12 46 50 8 100 8Z" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <ellipse cx="62" cy="52" rx="14" ry="26" fill="#fff" opacity=".35" transform="rotate(32 62 52)"/>
    <path d="M100 138c-14-10-26-22-26-34a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 12-12 24-26 34Z" fill="#fff" opacity=".9"/>
    <path d="M82 208 L88 238 M118 208 L112 238 M96 210 L96 238 M104 210 L104 238" stroke="#7a3d5a" stroke-width="2" opacity=".7"/>
    <rect x="84" y="236" width="32" height="24" rx="5" fill="#b9714f"/>
    <rect x="84" y="236" width="32" height="7" rx="3" fill="#8f5238"/>
  </svg>`;
}

const world = document.getElementById("world");
world.insertAdjacentHTML("beforeend",
  `<h2 class="title">${SETTINGS.title}</h2><p class="subtitle">${SETTINGS.subtitle}</p>`);

LAYOUT.forEach((row) => {
  const div = document.createElement("div");
  div.className = "row " + (row.items.length > 1 ? "pair" : row.align || "center");
  row.items.forEach((idx) => {
    const b = BALLOONS[idx];
    const btn = document.createElement("button");
    btn.className = "balloon" + (row.big ? " big" : "");
    const isPair = row.items.length > 1;   // المنطادان المتجاوران يتحركان معاً بنفس المستوى
    btn.style.setProperty("--dur", isPair ? "6s" : (5 + (idx % 4)) + "s");
    btn.style.setProperty("--delay", isPair ? "0s" : (-idx * 0.7) + "s");
    btn.innerHTML = balloonSVG(idx, b.colors) + `<span class="label">${b.label}</span>`;
    btn.addEventListener("click", () => openModal(b));
    div.appendChild(btn);
  });
  world.appendChild(div);
});

/* العنوان الثاني (SETTINGS.title) موجود بالأعلى؛ لنقله فوق 4 و 5 انقليه هون: */
(function moveTitle() {
  const t = world.querySelector(".title"), s = world.querySelector(".subtitle");
  const pairRow = world.querySelector(".row.pair");
  pairRow.before(t, s);
})();

/* النافذة */
const modal = document.getElementById("modal");
const EXTS = ["png", "jpeg", "webp", "jpg"];   // يجرب بالترتيب، والافتراضية jpg
function loadPhoto(img, base) {
  let n = 0;
  img.onerror = () => { if (++n < EXTS.length) img.src = `${base}.${EXTS[n]}?v=${Date.now()}`; };
  img.src = `${base}.${EXTS[0]}`;
}
function openModal(b) {
  loadPhoto(document.getElementById("modalImg"), b.photo);
  document.getElementById("modalCap").textContent = b.caption;
  modal.classList.remove("hidden");
}
const closeModal = () => modal.classList.add("hidden");
document.getElementById("closeBtn").onclick = closeModal;
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

/* الموسيقى */
const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
song.volume = 0.6;
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("intro").classList.add("gone");
  song.play().catch(() => musicBtn.classList.add("paused"));
});
musicBtn.addEventListener("click", () => {
  if (song.paused) { song.play(); musicBtn.classList.remove("paused"); }
  else { song.pause(); musicBtn.classList.add("paused"); }
});

/* نجوم صغيرة */
const sp = document.getElementById("sparkles");
for (let i = 0; i < 28; i++) {
  const s = document.createElement("i");
  s.className = "sparkle";
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3.5}s;animation-duration:${2.5+Math.random()*3}s`;
  sp.appendChild(s);
}
