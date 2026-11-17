/**
 * Planetas interactivos de Servicios (~1 KB minificado).
 * Física de resorte en un bucle rAF que solo corre mientras algún planeta se mueve;
 * todo se aplica con variables CSS que usan transform (compositor, sin layout).
 *  - Cursor fino: el planeta se aleja del cursor cuando se acerca y su luz lo sigue.
 *  - Táctil o clic: un toque le da un impulso y rebota.
 *  - prefers-reduced-motion: no hace nada (los planetas quedan estáticos).
 */
type Body = {
  card: HTMLElement;
  el: HTMLElement;
  stage: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
};

const RADIUS = 190; // px de influencia del cursor
const PUSH = 30; // desplazamiento máximo en px
const STIFFNESS = 160;
const DAMPING = 11;

export function initPlanets(list: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bodies: Body[] = [...list.querySelectorAll<HTMLElement>('.service-card')].flatMap((card) => {
    const el = card.querySelector<HTMLElement>('[data-planet]');
    const stage = card.querySelector<HTMLElement>('[data-planet-stage]');
    return el && stage ? [{ card, el, stage, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }] : [];
  });

  let raf = 0;
  let last = 0;

  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    let moving = false;
    for (const b of bodies) {
      b.vx += ((b.tx - b.x) * STIFFNESS - b.vx * DAMPING) * dt;
      b.vy += ((b.ty - b.y) * STIFFNESS - b.vy * DAMPING) * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (Math.abs(b.tx - b.x) + Math.abs(b.ty - b.y) + Math.abs(b.vx) + Math.abs(b.vy) > 0.05) moving = true;
      b.el.style.setProperty('--sx', `${b.x.toFixed(2)}px`);
      b.el.style.setProperty('--sy', `${b.y.toFixed(2)}px`);
      b.el.style.setProperty('--sr', `${(b.vx * 0.04).toFixed(2)}deg`);
    }
    raf = moving ? requestAnimationFrame(step) : 0;
  };
  const wake = () => {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(step);
  };

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let pending: PointerEvent | null = null;
    let frame = 0;

    const track = () => {
      frame = 0;
      if (!pending) return;
      const { clientX, clientY } = pending;
      for (const b of bodies) {
        const card = b.card.getBoundingClientRect();
        const stage = b.stage.getBoundingClientRect();
        // Centro del planeta en reposo (el escenario no se transforma, así no hay bucle).
        const size = b.el.offsetWidth;
        const cx = stage.left + b.el.offsetLeft + size / 2;
        const cy = stage.top + stage.height / 2;
        const dx = cx - clientX;
        const dy = cy - clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 1 - dist / RADIUS);
        b.tx = (dx / dist) * force * PUSH;
        b.ty = (dy / dist) * force * PUSH;

        const s = b.card.style;
        s.setProperty('--lx', clamp(-dx / 220).toFixed(3));
        s.setProperty('--ly', clamp(-dy / 220).toFixed(3));
        s.setProperty('--mx', `${Math.round(clientX - card.left)}px`);
        s.setProperty('--my', `${Math.round(clientY - card.top)}px`);
      }
      wake();
    };

    list.addEventListener('pointermove', (e) => {
      pending = e;
      if (!frame) frame = requestAnimationFrame(track);
    });
    list.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      for (const b of bodies) {
        b.tx = b.ty = 0;
        b.card.style.setProperty('--lx', '0');
        b.card.style.setProperty('--ly', '0');
      }
      wake();
    });
  }

  // Toque o clic sobre el planeta: impulso en dirección aleatoria y rebote.
  for (const b of bodies) {
    b.stage.addEventListener('pointerdown', () => {
      const angle = Math.random() * Math.PI * 2;
      b.vx += Math.cos(angle) * 420;
      b.vy += Math.sin(angle) * 420;
      wake();
    });
  }
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v));
