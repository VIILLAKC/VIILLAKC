// Textos fijos de la interfaz. El contenido (proyectos, servicios, etc.) vive en src/content/.
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Texto traducible tal como aparece en los JSON de contenido. */
export type Localized = Record<Lang, string>;

const es = {
  'meta.title': 'Israel Villa · Senior Data Engineer',
  'meta.description':
    'Senior Data Engineer con 4 años en producción: plataformas lakehouse con Databricks, PySpark y Delta Lake, pipelines a escala y ML/GenAI en producción.',
  'a11y.skip': 'Saltar al contenido',
  'nav.label': 'Navegación principal',
  'nav.home': 'Inicio',
  'nav.about': 'Sobre mí',
  'nav.services': 'Especialidades',
  'nav.projects': 'Proyectos',
  'nav.experience': 'Experiencia',
  'nav.stack': 'Stack',
  'nav.contact': 'Contacto',
  'nav.menu': 'Menú',
  'nav.close': 'Cerrar menú',
  'lang.switch': 'Cambiar idioma',

  // Altitudes del viaje (etiqueta superior de cada sección)
  'alt.hero': 'Espacio profundo',
  'alt.about': 'Sistema solar exterior · 4,500M km',
  'alt.services': 'Órbita terrestre · 400 km',
  'alt.projects': 'Cinturón de asteroides · 300M km',
  'alt.experience': 'Gigantes gaseosos · 1,200M km',
  'alt.stack': 'Entrada atmosférica · 100 km',
  'alt.contact': 'Superficie terrestre · 0 km',

  'hero.cta.hire': 'Ver experiencia',
  'hero.cta.projects': 'Ver proyectos',
  'hero.scroll': 'Inicia el descenso',

  'about.title': 'Ingeniería de datos que llega a producción',
  'about.languages': 'Idiomas',

  'services.title': 'Especialidades',
  'services.intro': 'Tres áreas donde aporto desde el primer sprint, cada una respaldada por resultados en producción.',
  'services.evidence': 'Evidencia',
  'services.practices': 'Cómo trabajo',
  'services.more': 'Ver evidencia y cómo trabajo',
  'services.less': 'Ocultar detalle',

  'projects.title': 'Proyectos destacados',
  'projects.intro': 'Mi rol, las decisiones técnicas y el resultado medible de cada proyecto. Las organizaciones se mantienen anónimas por confidencialidad.',
  'projects.problem': 'Problema',
  'projects.solution': 'Solución',
  'projects.results': 'Resultados',
  'projects.cat.data-engineering': 'Data Engineering',
  'projects.cat.automation': 'Automatización',
  'projects.cat.ai': 'IA aplicada',
  'projects.cat.web': 'Web',
  'projects.filter.label': 'Filtrar proyectos por categoría',
  'projects.filter.all': 'Todos',
  'projects.filter.status': 'Mostrando {n} proyectos',
  'projects.view': 'Ver proyecto completo',
  'projects.more': 'Ver {n} proyectos más',
  'projects.less': 'Ocultar proyectos',
  'projects.back': 'Todos los proyectos',
  'projects.context': 'Contexto',
  'projects.role': 'Rol',
  'projects.highlights': 'Puntos clave',
  'projects.stack': 'Tecnologías',
  'projects.prev': 'Proyecto anterior',
  'projects.next': 'Proyecto siguiente',
  'projects.cta.title': '¿Buscas a alguien para tu equipo de datos?',
  'projects.cta.body': 'Estoy abierto a conversar sobre roles Senior Data Engineer y Data Platform. Mi trayectoria completa está en LinkedIn.',
  'projects.cta.button': 'Ver trayectoria',

  'experience.title': 'Trayectoria',
  'experience.present': 'Actual',
  'experience.more.one': 'Ver 1 logro más',
  'experience.more.other': 'Ver {n} logros más',
  'experience.less': 'Ocultar logros',

  'stack.title': 'Stack y formación',
  'stack.certs': 'Certificaciones',
  'stack.education': 'Educación',
  'stack.cert.earned': 'Obtenida',
  'stack.cert.in-progress': 'En preparación',
  'stack.edu.in-progress': 'En curso',
  'stack.cat.language': 'Lenguajes',
  'stack.cat.data': 'Datos',
  'stack.cat.orchestration': 'Orquestación',
  'stack.cat.database': 'Bases de datos',
  'stack.cat.cloud-devops': 'Cloud y DevOps',
  'stack.cat.ml-ai': 'ML e IA',
  'stack.cat.automation': 'Automatización y APIs',
  'stack.cat.web': 'Web',

  'contact.title': 'Aterrizaje',
  'contact.intro': 'Estoy abierto a conversar sobre roles Senior Data Engineer. Escríbeme por LinkedIn; respondo personalmente.',
  'contact.role': 'Rol',
  'contact.role.text': 'Senior Data Engineer · Data Platform · datos para ML/GenAI',
  'contact.mode': 'Modalidad',
  'contact.mode.text': 'Remoto o híbrido en Ciudad de México',
  'contact.languages': 'Idiomas',

  'footer.made': 'Hecho con Astro. Sin rastreadores.',
  'common.external': '(abre en una pestaña nueva)',
};

const en: Record<keyof typeof es, string> = {
  'meta.title': 'Israel Villa · Senior Data Engineer',
  'meta.description':
    'Senior Data Engineer with 4 years in production: lakehouse platforms with Databricks, PySpark and Delta Lake, pipelines at scale and ML/GenAI in production.',
  'a11y.skip': 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.services': 'Specialties',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.stack': 'Stack',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close menu',
  'lang.switch': 'Change language',

  'alt.hero': 'Deep space',
  'alt.about': 'Outer solar system · 2.8B mi',
  'alt.services': 'Earth orbit · 250 mi',
  'alt.projects': 'Asteroid belt · 190M mi',
  'alt.experience': 'Gas giants · 750M mi',
  'alt.stack': 'Atmospheric entry · 62 mi',
  'alt.contact': 'Earth surface · 0 mi',

  'hero.cta.hire': 'See experience',
  'hero.cta.projects': 'See projects',
  'hero.scroll': 'Begin descent',

  'about.title': 'Data engineering that reaches production',
  'about.languages': 'Languages',

  'services.title': 'Specialties',
  'services.intro': 'Three areas where I contribute from the first sprint, each backed by results in production.',
  'services.evidence': 'Evidence',
  'services.practices': 'How I work',
  'services.more': 'See evidence and how I work',
  'services.less': 'Hide details',

  'projects.title': 'Featured projects',
  'projects.intro': 'My role, the technical decisions and the measurable outcome of each project. Organizations stay anonymous for confidentiality.',
  'projects.problem': 'Problem',
  'projects.solution': 'Solution',
  'projects.results': 'Results',
  'projects.cat.data-engineering': 'Data Engineering',
  'projects.cat.automation': 'Automation',
  'projects.cat.ai': 'Applied AI',
  'projects.cat.web': 'Web',
  'projects.filter.label': 'Filter projects by category',
  'projects.filter.all': 'All',
  'projects.filter.status': 'Showing {n} projects',
  'projects.view': 'Read the full project',
  'projects.more': 'See {n} more projects',
  'projects.less': 'Hide projects',
  'projects.back': 'All projects',
  'projects.context': 'Context',
  'projects.role': 'Role',
  'projects.highlights': 'Highlights',
  'projects.stack': 'Technologies',
  'projects.prev': 'Previous project',
  'projects.next': 'Next project',
  'projects.cta.title': 'Hiring for your data team?',
  'projects.cta.body': "I'm open to conversations about Senior Data Engineer and Data Platform roles. My full career history is on LinkedIn.",
  'projects.cta.button': 'See career path',

  'experience.title': 'Career path',
  'experience.present': 'Present',
  'experience.more.one': 'See 1 more achievement',
  'experience.more.other': 'See {n} more achievements',
  'experience.less': 'Hide achievements',

  'stack.title': 'Stack & education',
  'stack.certs': 'Certifications',
  'stack.education': 'Education',
  'stack.cert.earned': 'Earned',
  'stack.cert.in-progress': 'In preparation',
  'stack.edu.in-progress': 'In progress',
  'stack.cat.language': 'Languages',
  'stack.cat.data': 'Data',
  'stack.cat.orchestration': 'Orchestration',
  'stack.cat.database': 'Databases',
  'stack.cat.cloud-devops': 'Cloud & DevOps',
  'stack.cat.ml-ai': 'ML & AI',
  'stack.cat.automation': 'Automation & APIs',
  'stack.cat.web': 'Web',

  'contact.title': 'Touchdown',
  'contact.intro': "I'm open to conversations about Senior Data Engineer roles. Reach me on LinkedIn; I reply personally.",
  'contact.role': 'Role',
  'contact.role.text': 'Senior Data Engineer · Data Platform · data for ML/GenAI',
  'contact.mode': 'Work mode',
  'contact.mode.text': 'Remote or hybrid in Mexico City',
  'contact.languages': 'Languages',

  'footer.made': 'Built with Astro. No trackers.',
  'common.external': '(opens in a new tab)',
};

export const ui = { es, en } as const;

export type UiKey = keyof typeof es;

const months = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/** "2026-11" → "nov 2026" / "Nov 2026"; "2024" → "2024". */
export function formatYearMonth(value: string, lang: Lang): string {
  const [year, month] = value.split('-');
  return month ? `${months[lang][Number(month) - 1]} ${year}` : year;
}

export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const [, first] = url.pathname.slice(base.length).split('/');
  return first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Elige el idioma correcto de un campo traducible de los JSON. */
export const t = (value: Localized, lang: Lang): string => value[lang] ?? value[defaultLang];

/** Ruta interna con base de GitHub Pages y prefijo de idioma (es no lleva prefijo). */
export function localizePath(path: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+/, '');
  const prefix = lang === defaultLang ? '' : `${lang}/`;
  return `${base}/${prefix}${clean}`.replace(/\/{2,}/g, '/');
}

/** Segmentos de URL traducidos (el resto de la ruta, como el id del caso, es igual en ambos idiomas). */
const segments = {
  cases: { es: 'casos', en: 'cases' },
} satisfies Record<string, Record<Lang, string>>;

/** Página de detalle de un caso de éxito: /casos/<id>/ o /en/cases/<id>/. */
export const casePath = (id: string, lang: Lang): string => localizePath(`${segments.cases[lang]}/${id}/`, lang);

/** Ruta equivalente de la página actual en otro idioma. */
export function translatePath(url: URL, to: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let rest = url.pathname.slice(base.length).replace(/^\/+/, '');
  const [first] = rest.split('/');
  if (first in languages) rest = rest.slice(first.length + 1);
  const parts = rest.split('/');
  for (const map of Object.values(segments)) {
    if ((Object.values(map) as string[]).includes(parts[0])) parts[0] = map[to];
  }
  return localizePath(parts.join('/'), to);
}
