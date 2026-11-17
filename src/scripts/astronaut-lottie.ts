/**
 * Carga diferida del astronauta Lottie: importa lottie_light (chunk aparte) y el JSON una sola vez
 * cuando la página está inactiva, y monta cada instancia solo cuando hace falta:
 *  - companion: al quedar la página inactiva (se ve desde el hero).
 *  - lander: al acercarse a su contenedor (Contacto o la 404), para no pagar su montaje al cargar.
 * Cada animación se pausa cuando no se ve para no gastar CPU.
 */
type Lottie = typeof import('lottie-web/build/player/lottie_light').default;

const nodes = [...document.querySelectorAll<HTMLElement>('[data-lottie-astronaut]')];
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let assets: Promise<[Lottie, unknown]> | undefined;
const loadAssets = () =>
  (assets ??= Promise.all([
    import('lottie-web/build/player/lottie_light').then((m) => m.default),
    fetch(`${base}lottie/astronaut.json`).then((r) => r.json()),
  ]));

async function mount(el: HTMLElement) {
  const [lottie, data] = await loadAssets();
  const anim = lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    // Lottie modifica los datos al cargarlos: cada instancia recibe su copia.
    animationData: structuredClone(data),
    rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true },
  });
  anim.setSpeed(1.5);
  anim.addEventListener('DOMLoaded', () => {
    el.classList.add('is-ready');
    if (reduced) anim.goToAndStop(0, true);
  });
  if (reduced) return;

  // El acompañante se oculta al llegar al contacto; el aterrizado solo se ve ahí.
  const isCompanion = el.dataset.lottieAstronaut === 'companion';
  const watched = isCompanion ? document.getElementById('contact') : el;
  if (!watched) {
    anim.play();
    return;
  }
  new IntersectionObserver(([entry]) => {
    const visible = isCompanion ? !entry.isIntersecting : entry.isIntersecting;
    visible ? anim.play() : anim.pause();
  }, isCompanion ? { threshold: 0.35 } : undefined).observe(watched);
}

const safeMount = (el: HTMLElement) => mount(el).catch(() => el.remove());

function start() {
  for (const el of nodes) {
    if (el.dataset.lottieAstronaut === 'companion') {
      safeMount(el);
      continue;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        safeMount(el);
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
  }
}

if (nodes.length) {
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200));
  document.readyState === 'complete' ? idle() : addEventListener('load', idle, { once: true });
}
