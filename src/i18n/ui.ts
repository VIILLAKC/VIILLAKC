// Textos fijos de la interfaz. El contenido (proyectos, servicios, etc.) vive en src/content/.
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Texto traducible tal como aparece en los JSON de contenido. */
export type Localized = Record<Lang, string>;

const es = {
  'meta.title': 'Israel Villa · Senior Data Engineer y automatización empresarial',
  'meta.description':
    'Senior Data Engineer: pipelines con Databricks, PySpark y Delta Lake, GenAI en producción y automatización de procesos para empresas.',
  'a11y.skip': 'Saltar al contenido',
  'nav.label': 'Navegación principal',
  'nav.home': 'Inicio',
  'nav.about': 'Sobre mí',
  'nav.services': 'Servicios',
  'nav.projects': 'Casos',
  'nav.experience': 'Experiencia',
  'nav.stack': 'Stack',
  'nav.contact': 'Contacto',
  'nav.menu': 'Menú',
  'nav.close': 'Cerrar menú',
  'lang.switch': 'Cambiar idioma',

  // Altitudes del viaje (etiqueta superior de cada sección)
  'alt.hero': 'Espacio profundo',
  'alt.about': 'Órbita alta · 36,000 km',
  'alt.services': 'Sistema planetario',
  'alt.projects': 'Estación orbital · 400 km',
  'alt.experience': 'Órbita lunar',
  'alt.stack': 'Cinturón de herramientas',
  'alt.contact': 'Superficie terrestre · 0 km',

  'hero.cta.hire': 'Ver experiencia',
  'hero.cta.client': 'Automatiza tu empresa',
  'hero.scroll': 'Inicia el descenso',

  'about.title': 'Ingeniería de datos que llega a producción',
  'about.languages': 'Idiomas',

  'services.title': 'Servicios para tu empresa',
  'services.intro': 'Tres planetas, un objetivo: que tus datos y procesos trabajen por ti.',
  'services.outcomes': 'Lo que ganas',
  'services.deliverables': 'Entregables',
  'services.cta': 'Hablemos de tu proyecto',

  'projects.title': 'Casos de éxito',
  'projects.intro': 'Resultados medibles en producción. Las organizaciones se mantienen anónimas por confidencialidad.',
  'projects.problem': 'Problema',
  'projects.solution': 'Solución',
  'projects.results': 'Resultados',
  'projects.lab.title': 'Laboratorio',
  'projects.lab.intro': 'Proyectos personales y de aprendizaje.',
  'projects.repo': 'Código',
  'projects.demo': 'Demo',
  'projects.cat.data-engineering': 'Data Engineering',
  'projects.cat.automation': 'Automatización',
  'projects.cat.ai': 'IA aplicada',
  'projects.cat.web': 'Web',
  'projects.filter.label': 'Filtrar casos por categoría',
  'projects.filter.all': 'Todos',
  'projects.filter.status': 'Mostrando {n} casos',
  'projects.view': 'Ver caso completo',
  'projects.back': 'Todos los casos',
  'projects.context': 'Contexto',
  'projects.role': 'Rol',
  'projects.highlights': 'Puntos clave',
  'projects.stack': 'Tecnologías',
  'projects.prev': 'Caso anterior',
  'projects.next': 'Caso siguiente',
  'projects.cta.title': '¿Tienes un reto parecido?',
  'projects.cta.body': 'Cuéntame tu caso: datos, automatización o IA aplicada. Respondo por LinkedIn.',
  'projects.cta.button': 'Ir a contacto',

  'experience.title': 'Trayectoria',
  'experience.present': 'Actual',

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
  'contact.intro': '¿Buscas un Senior Data Engineer o quieres automatizar tu operación? Escríbeme por cualquiera de estos canales.',
  'contact.recruiters': 'Para reclutadores',
  'contact.recruiters.text': 'Roles Senior Data Engineer, Data Platform y datos para IA.',
  'contact.clients': 'Para empresas',
  'contact.clients.text': 'Automatización de procesos, plataformas de datos e IA aplicada.',

  'footer.made': 'Hecho con Astro. Sin rastreadores.',
  'common.external': '(abre en una pestaña nueva)',
};

const en: Record<keyof typeof es, string> = {
  'meta.title': 'Israel Villa · Senior Data Engineer & business automation',
  'meta.description':
    'Senior Data Engineer: Databricks, PySpark and Delta Lake pipelines, GenAI in production, and process automation for businesses.',
  'a11y.skip': 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.projects': 'Case studies',
  'nav.experience': 'Experience',
  'nav.stack': 'Stack',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close menu',
  'lang.switch': 'Change language',

  'alt.hero': 'Deep space',
  'alt.about': 'High orbit · 22,000 mi',
  'alt.services': 'Planetary system',
  'alt.projects': 'Orbital station · 250 mi',
  'alt.experience': 'Lunar orbit',
  'alt.stack': 'Tool belt',
  'alt.contact': 'Earth surface · 0 mi',

  'hero.cta.hire': 'See experience',
  'hero.cta.client': 'Automate your business',
  'hero.scroll': 'Begin descent',

  'about.title': 'Data engineering that reaches production',
  'about.languages': 'Languages',

  'services.title': 'Services for your business',
  'services.intro': 'Three planets, one goal: make your data and processes work for you.',
  'services.outcomes': 'What you get',
  'services.deliverables': 'Deliverables',
  'services.cta': "Let's talk about your project",

  'projects.title': 'Case studies',
  'projects.intro': 'Measurable results in production. Organizations stay anonymous for confidentiality.',
  'projects.problem': 'Problem',
  'projects.solution': 'Solution',
  'projects.results': 'Results',
  'projects.lab.title': 'Lab',
  'projects.lab.intro': 'Personal and learning projects.',
  'projects.repo': 'Code',
  'projects.demo': 'Demo',
  'projects.cat.data-engineering': 'Data Engineering',
  'projects.cat.automation': 'Automation',
  'projects.cat.ai': 'Applied AI',
  'projects.cat.web': 'Web',
  'projects.filter.label': 'Filter case studies by category',
  'projects.filter.all': 'All',
  'projects.filter.status': 'Showing {n} case studies',
  'projects.view': 'Read the case study',
  'projects.back': 'All case studies',
  'projects.context': 'Context',
  'projects.role': 'Role',
  'projects.highlights': 'Highlights',
  'projects.stack': 'Technologies',
  'projects.prev': 'Previous case',
  'projects.next': 'Next case',
  'projects.cta.title': 'Facing a similar challenge?',
  'projects.cta.body': 'Tell me about it: data, automation or applied AI. I reply on LinkedIn.',
  'projects.cta.button': 'Go to contact',

  'experience.title': 'Career path',
  'experience.present': 'Present',

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
  'contact.intro': 'Looking for a Senior Data Engineer, or want to automate your operations? Reach me on any of these channels.',
  'contact.recruiters': 'For recruiters',
  'contact.recruiters.text': 'Senior Data Engineer, Data Platform and data-for-AI roles.',
  'contact.clients': 'For businesses',
  'contact.clients.text': 'Process automation, data platforms and applied AI.',

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
