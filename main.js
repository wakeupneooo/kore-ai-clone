document.addEventListener('DOMContentLoaded', () => {
requestAnimationFrame(() => document.body.classList.add('ready'));
const heroVideo = document.querySelector('.hero-bg-video');
if (heroVideo) {
const p = heroVideo.play();
if (p) p.catch(() => {
heroVideo.style.display = 'none';
const fb = document.querySelector('.hero-bg-fallback');
if (fb) fb.style.display = 'block';
});
heroVideo.addEventListener('error', () => {
heroVideo.style.display = 'none';
const fb = document.querySelector('.hero-bg-fallback');
if (fb) fb.style.display = 'block';
});
}
const artemisVideo = document.querySelector('.artemis-banner-bg');
if (artemisVideo && artemisVideo.tagName === 'VIDEO') {
artemisVideo.play().catch(() => {});
}
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
mobileMenu.classList.toggle('open');
document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
}
const dropdowns = document.querySelectorAll('[data-dropdown]');
let megaAutoInterval;
let closeTimeout;
function openDropdown(dd) {
clearTimeout(closeTimeout);
dropdowns.forEach(d => d.classList.remove('open'));
dd.classList.add('open');
}
function scheduleClose(dd) {
closeTimeout = setTimeout(() => {
dd.classList.remove('open');
clearInterval(megaAutoInterval);
}, 120);
}
function cancelClose() {
clearTimeout(closeTimeout);
}
dropdowns.forEach(dd => {
const toggle = dd.querySelector('.nav-dropdown-toggle');
const menu = dd.querySelector('.nav-dropdown-menu');
const isMega = dd.classList.contains('nav-dropdown--mega');
if (isMega) {
toggle.addEventListener('mouseenter', () => openDropdown(dd));
if (menu) menu.addEventListener('mouseenter', cancelClose);
toggle.addEventListener('mouseleave', () => scheduleClose(dd));
if (menu) menu.addEventListener('mouseleave', () => scheduleClose(dd));
} else {
toggle.addEventListener('mouseenter', () => openDropdown(dd));
if (menu) menu.addEventListener('mouseenter', cancelClose);
toggle.addEventListener('mouseleave', () => scheduleClose(dd));
if (menu) menu.addEventListener('mouseleave', () => scheduleClose(dd));
toggle.addEventListener('click', e => {
e.stopPropagation();
if (dd.classList.contains('open')) {
dd.classList.remove('open');
} else {
openDropdown(dd);
}
});
}
});
document.addEventListener('click', () => dropdowns.forEach(d => d.classList.remove('open')));
document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.addEventListener('click', e => e.stopPropagation()));
const megaItems = document.querySelectorAll('.mega-product-item');
const megaPanels = document.querySelectorAll('.mega-preview-panel');
function switchMegaProduct(product) {
megaItems.forEach(i => i.classList.toggle('active', i.dataset.megaProduct === product));
megaPanels.forEach(p => {
const isActive = p.dataset.megaPreview === product;
p.classList.toggle('active', isActive);
if (isActive) {
p.querySelectorAll('.mf').forEach(el => {
el.style.animation = 'none';
el.offsetHeight;
el.style.animation = '';
});
}
});
}
megaItems.forEach(item => {
item.addEventListener('click', () => switchMegaProduct(item.dataset.megaProduct));
item.addEventListener('mouseenter', () => switchMegaProduct(item.dataset.megaProduct));
});
const riveInitialized = new Set();
function initRiveInContainer(container) {
if (typeof rive === 'undefined') return;
container.querySelectorAll('.rive-canvas').forEach(canvas => {
if (riveInitialized.has(canvas)) return;
const src = canvas.dataset.riveSrc;
if (!src) return;
riveInitialized.add(canvas);
const parent = canvas.parentElement;
const dpr = window.devicePixelRatio || 1;
const rect = parent.getBoundingClientRect();
const w = Math.max(rect.width, 280);
const h = Math.max(rect.height, 200);
canvas.width = w * dpr;
canvas.height = h * dpr;
canvas.style.width = w + 'px';
canvas.style.height = h + 'px';
new rive.Rive({ src, canvas, autoplay: true, fit: rive.Fit.Contain, alignment: rive.Alignment.Center });
});
}
document.querySelectorAll('.product-tab-btn').forEach(btn => {
btn.addEventListener('click', () => {
const t = btn.dataset.tab;
document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
document.querySelectorAll('.product-tab-panel').forEach(p => {
p.classList.toggle('active', p.dataset.panel === t);
});
const activePanel = document.querySelector(`.product-tab-panel[data-panel="${t}"]`);
if (activePanel) {
requestAnimationFrame(() => initRiveInContainer(activePanel));
}
});
});
const cTabs = document.querySelectorAll('.carousel-tab');
const cSlides = document.querySelectorAll('.carousel-slide');
const peekEl = document.getElementById('carouselPeek');
const peekImg = peekEl ? peekEl.querySelector('img') : null;
let cIdx = 0;
const cTotal = cSlides.length;
const slideImages = [];
cSlides.forEach(s => {
const bg = s.querySelector('.carousel-slide-bg');
slideImages.push(bg ? bg.src : '');
});
function updatePeek() {
if (!peekImg) return;
const nextIdx = (cIdx + 1) % cTotal;
peekImg.src = slideImages[nextIdx];
}
function goSlide(i) {
if (i < 0) i = cTotal - 1;
if (i >= cTotal) i = 0;
cIdx = i;
cTabs.forEach((t, j) => { t.classList.toggle('active', j === i); t.setAttribute('aria-selected', j === i); });
cSlides.forEach((s, j) => s.classList.toggle('active', j === i));
updatePeek();
}
cTabs.forEach((t, i) => t.addEventListener('click', () => goSlide(i)));
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
if (prevBtn) prevBtn.addEventListener('click', () => goSlide(cIdx - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goSlide(cIdx + 1));
let cInterval = setInterval(() => goSlide(cIdx + 1), 6000);
const cMain = document.querySelector('.carousel-main');
if (cMain) {
cMain.addEventListener('mouseenter', () => clearInterval(cInterval));
cMain.addEventListener('mouseleave', () => { cInterval = setInterval(() => goSlide(cIdx + 1), 6000); });
}
updatePeek();
document.querySelectorAll('.analyst-tab').forEach(tab => {
tab.addEventListener('click', () => {
const t = tab.dataset.analyst;
document.querySelectorAll('.analyst-tab').forEach(x => x.classList.remove('active'));
tab.classList.add('active');
document.querySelectorAll('.analyst-panel').forEach(p => {
p.classList.toggle('active', p.dataset.analystPanel === t);
});
});
});
const gbTags = document.querySelectorAll('.gb-tag');
const gbJobDesc = document.getElementById('gbJobDesc');
const gbPhoneTitle = document.getElementById('gbPhoneTitle');
const gbPhInput = document.getElementById('gbPhInput');
const gbJobData = {
sales: { desc: '<strong>Generate pipeline overnight.</strong> Researches accounts, scores contacts with intent, drafts email and LinkedIn in your voice, and leaves a review list for you to approve.', title: 'Sales Outbound', input: 'Message Sales Outbound' },
talent: { desc: '<strong>Source candidates while you sleep.</strong> Scans job boards, scores profiles against your rubric, and drafts personalized outreach sequences.', title: 'Talent Scout', input: 'Message Talent Scout' },
media: { desc: '<strong>Optimize ad spend daily.</strong> Monitors campaigns across platforms, pauses underperformers, and reallocates budget to top performers.', title: 'Paid Media', input: 'Message Paid Media' },
expense: { desc: '<strong>File expenses automatically.</strong> Reads receipts, categorizes spending, flags duplicates, and submits reports for approval.', title: 'Expense Manager', input: 'Message Expense Manager' },
product: { desc: '<strong>Track product metrics.</strong> Monitors usage dashboards, detects anomalies, and sends weekly digests with actionable insights.', title: 'Product Performance', input: 'Message Product Performance' },
bug: { desc: '<strong>Reproduce bugs on demand.</strong> Takes a bug report, spins up the environment, reproduces the issue, and attaches logs and screenshots.', title: 'Bug Reproduction', input: 'Message Bug Reproduction' },
health: { desc: '<strong>See risk and expansion before the QBR.</strong> Reads usage and signals across your book and turns portfolio noise into a clear watch list.', title: 'Account Health', input: 'Message Account Health' },
chief: { desc: '<strong>Run your morning brief.</strong> Aggregates updates from every Bot, prioritizes what needs your attention, and drafts responses.', title: 'Chief of Staff', input: 'Message Chief of Staff' }
};
gbTags.forEach(tag => {
tag.addEventListener('click', () => {
const job = tag.dataset.gbJob;
const data = gbJobData[job];
if (!data) return;
gbTags.forEach(t => t.classList.remove('active'));
tag.classList.add('active');
if (gbJobDesc) gbJobDesc.innerHTML = '<p>' + data.desc + '</p>';
if (gbPhoneTitle) gbPhoneTitle.textContent = data.title;
if (gbPhInput) gbPhInput.textContent = data.input;
});
});
const animEls = document.querySelectorAll('[data-anim], [data-anim-hero-image]');
if ('IntersectionObserver' in window) {
const obs = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
animEls.forEach(el => obs.observe(el));
} else {
animEls.forEach(el => el.classList.add('visible'));
}
const navOuter = document.querySelector('.nav-outer');
let ticking = false;
let scrollTimeout;
function closeAllDropdowns() {
dropdowns.forEach(d => d.classList.remove('open'));
clearInterval(megaAutoInterval);
}
function updateNav() {
const y = window.scrollY;
if (y > 120) {
navOuter.classList.add('pill-mode');
} else {
navOuter.classList.remove('pill-mode');
}
ticking = false;
}
window.addEventListener('scroll', () => {
closeAllDropdowns();
navOuter.classList.add('is-scrolling');
clearTimeout(scrollTimeout);
scrollTimeout = setTimeout(() => {
navOuter.classList.remove('is-scrolling');
}, 150);
if (!ticking) {
requestAnimationFrame(updateNav);
ticking = true;
}
}, { passive: true });
if (typeof rive !== 'undefined') {
document.querySelectorAll('.rive-canvas').forEach(canvas => {
const src = canvas.dataset.riveSrc;
if (src) {
const container = canvas.parentElement;
const dpr = window.devicePixelRatio || 1;
const rect = container.getBoundingClientRect();
const w = Math.max(rect.width, 280);
const h = Math.max(rect.height, 220);
canvas.width = w * dpr;
canvas.height = h * dpr;
canvas.style.width = w + 'px';
canvas.style.height = h + 'px';
new rive.Rive({
src,
canvas,
autoplay: true,
fit: rive.Fit.Contain,
alignment: rive.Alignment.Center,
artboard: undefined,
onLoad: () => {
canvas.style.imageRendering = 'auto';
}
});
}
});
}
});