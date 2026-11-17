/**
 * Motor del viaje (≈1 KB minificado). Solo lee el scroll y publica variables CSS;
 * todo el movimiento lo hace CSS con transform/opacity (compositor, sin layout).
 *
 *  --p     progreso total del scroll (0 → 1)
 *  --h     progreso dentro del hero (0 → 1)
 *  --flame intensidad del propulsor según la velocidad de scroll (0 → 1)
 *  --dir   1 bajando, -1 subiendo
 *
 * Las variables se escriben solo en los elementos que las usan (no en <html>)
 * para no recalcular estilos de toda la página en cada frame.
 */
const companion = document.querySelector<HTMLElement>('[data-companion]');
const targets = [...document.querySelectorAll<HTMLElement>('[data-journey]')];
if (companion) targets.push(companion);

// Se inicializa en el primer frame (leer scrollY aquí forzaría un layout síncrono).
let lastY = -1;
let lastT = performance.now();
let flame = 0;
let raf = 0;

function update() {
  raf = 0;
  const y = scrollY;
  if (lastY < 0) lastY = y;
  const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  const p = Math.min(Math.max(y / max, 0), 1);
  const h = Math.min(Math.max(y / innerHeight, 0), 1);

  const now = performance.now();
  const dy = y - lastY;
  const speed = Math.min(Math.abs(dy) / Math.max(now - lastT, 1) / 2.5, 1);
  flame += (speed - flame) * 0.2;
  lastY = y;
  lastT = now;

  for (const el of targets) {
    el.style.setProperty('--p', p.toFixed(4));
    el.style.setProperty('--h', h.toFixed(3));
  }
  if (companion) {
    companion.style.setProperty('--flame', flame.toFixed(3));
    if (dy) companion.style.setProperty('--dir', dy > 0 ? '1' : '-1');
  }
  // Sigue animando unos frames tras soltar el scroll para que la llama se apague suave.
  if (flame > 0.01) raf = requestAnimationFrame(update);
}

const schedule = () => {
  if (!raf) raf = requestAnimationFrame(update);
};
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule, { passive: true });
// Primer cálculo en el siguiente frame: leer scrollHeight al ejecutar el módulo forzaría un layout síncrono.
schedule();

// ---- Sección activa: header y altímetro ----
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const marks = document.querySelectorAll<HTMLElement>('[data-alt-mark]');
const altLabel = document.querySelector<HTMLElement>('[data-alt-label]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = (entry.target as HTMLElement).dataset.section;
      navLinks.forEach((a) => (a.dataset.nav === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      marks.forEach((m) => m.classList.toggle('is-active', m.dataset.altMark === id));
      const active = [...marks].find((m) => m.dataset.altMark === id);
      if (altLabel && active) altLabel.textContent = active.dataset.label ?? '';
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
document.querySelectorAll('[data-section]').forEach((s) => sectionObserver.observe(s));

// ---- Aterrizaje en la Tierra ----
const contact = document.getElementById('contact');
const lander = document.querySelector<HTMLElement>('[data-lander]');
const earth = document.querySelector<HTMLElement>('[data-earth]');
if (contact) {
  new IntersectionObserver(
    ([entry]) => {
      const landed = entry.isIntersecting;
      companion?.classList.toggle('is-landed', landed);
      lander?.classList.toggle('is-visible', landed);
    },
    { threshold: 0.35 },
  ).observe(contact);
}
if (earth) {
  // La rotación de la Tierra solo corre mientras se ve.
  new IntersectionObserver(([entry]) => earth.classList.toggle('is-spinning', entry.isIntersecting)).observe(earth);
}
