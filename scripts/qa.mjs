/**
 * QA de interfaz sobre el build servido (npm run preview): responsive, teclado y reduced motion.
 *
 *   npm run build && npm run preview   # en otra terminal
 *   npm run qa
 *
 * Usa el Chrome/Edge del sistema (CHROME_PATH o la ruta habitual). Sale con código 1 si algo falla.
 */
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = process.env.QA_BASE ?? 'http://localhost:4321/VIILLAKC';
const PAGES = ['/', '/en/', '/casos/plataforma-lakehouse/', '/en/cases/genai-analitica-financiera/', '/404.html'];
const WIDTHS = [360, 768, 1440];

const candidates = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error('No se encontró Chrome/Edge: define CHROME_PATH.');

const failures = [];
const fail = (msg) => failures.push(msg);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox'] });

async function open(path, { width = 1440, height = 900, reduced = false } = {}) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && errors.push(m.text()));
  await page.setViewport({ width, height, isMobile: width < 768, hasTouch: width < 768 });
  if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + path, { waitUntil: 'load' });
  return { page, errors };
}

// ---- 1. Responsive: sin scroll horizontal ni elementos que se salgan del viewport ----
for (const path of PAGES) {
  for (const width of WIDTHS) {
    const { page, errors } = await open(path, { width });
    // Recorre la página para disparar IntersectionObservers y cargas diferidas.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await wait(600);
    const r = await page.evaluate(() => {
      const offenders = [...document.querySelectorAll('body *')]
        .filter((e) => !e.closest('[aria-hidden="true"], [popover]'))
        .filter((e) => {
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && (b.right > innerWidth + 1 || b.left < -1);
        })
        .slice(0, 5)
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`);
      return { sw: document.documentElement.scrollWidth, w: innerWidth, offenders };
    });
    if (r.sw > r.w) fail(`${path} @${width}: scroll horizontal (${r.sw} > ${r.w})`);
    if (r.offenders.length) fail(`${path} @${width}: elementos fuera del viewport: ${r.offenders.join(', ')}`);
    if (errors.length) fail(`${path} @${width}: errores de consola: ${errors.join(' | ')}`);
    await page.close();
  }
}

// ---- 2. Teclado: skip link primero, todo el recorrido con foco visible y sin trampas ----
for (const path of ['/', '/casos/plataforma-lakehouse/']) {
  const { page } = await open(path);
  const stops = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const after = getComputedStyle(el, '::after');
      const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || after.boxShadow !== 'none';
      return { id: el.outerHTML.slice(0, 80), label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40), visible: el.matches(':focus-visible') && ring };
    });
    if (!info || (stops.length && info.id === stops[0].id)) break;
    stops.push(info);
  }
  if (!/saltar|skip/i.test(stops[0]?.label ?? '')) fail(`${path}: el primer Tab no es el skip link (${stops[0]?.label})`);
  for (const s of stops.filter((s) => !s.visible)) fail(`${path}: foco no visible en "${s.label}"`);
  if (stops.length < 10) fail(`${path}: recorrido de teclado demasiado corto (${stops.length})`);
  console.log(`teclado ${path}: ${stops.length} paradas`);
  await page.close();
}

// ---- 3. Reduced motion: sin animaciones infinitas, planetas quietos, astronauta estático ----
{
  const { page, errors } = await open('/', { reduced: true });
  await wait(3500); // deja que el Lottie se monte en idle
  const r = await page.evaluate(async () => {
    const infinite = document
      .getAnimations()
      .filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity)
      .map((a) => a.animationName ?? a.constructor.name);
    // Los planetas no deben reaccionar al puntero.
    const card = document.querySelector('[data-planet-stage]')?.closest('article, li, div');
    const planet = document.querySelector('[data-planet]');
    card?.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 10, clientY: 10, pointerType: 'mouse' }));
    await new Promise((r) => setTimeout(r, 300));
    const moved = planet ? getComputedStyle(planet).getPropertyValue('--sx').trim() : '';
    // El astronauta debe quedarse en un fotograma fijo.
    const svg = document.querySelector('[data-lottie-astronaut="companion"] svg');
    const a = svg?.innerHTML.length && svg.innerHTML;
    await new Promise((r) => setTimeout(r, 500));
    const b = svg?.innerHTML;
    return { infinite, moved, lottieReady: !!svg, lottieStatic: a === b };
  });
  if (r.infinite.length) fail(`reduced motion: animaciones infinitas activas: ${r.infinite.join(', ')}`);
  if (r.moved && r.moved !== '0' && r.moved !== '0px') fail(`reduced motion: los planetas se mueven (--sx=${r.moved})`);
  if (!r.lottieReady) fail('reduced motion: el astronauta no se montó');
  else if (!r.lottieStatic) fail('reduced motion: el astronauta sigue animándose');
  if (errors.length) fail(`reduced motion: errores de consola: ${errors.join(' | ')}`);
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error(`\n✗ ${failures.length} problema(s):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`\n✓ QA ok: ${PAGES.length} páginas × ${WIDTHS.length} anchos, teclado y reduced motion.`);
