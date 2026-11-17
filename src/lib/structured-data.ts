/**
 * Datos estructurados (schema.org / JSON-LD) generados desde los mismos JSON de contenido.
 * Portada: ProfilePage + Person. Casos: Article + BreadcrumbList.
 */
import type { CollectionEntry } from 'astro:content';
import { getProfile, getSkills, resolveStack } from './content';
import { casePath, localizePath, t, ui, type Lang } from '@/i18n/ui';

const SITE = 'https://viillakc.github.io';
const abs = (path: string) => new URL(path, SITE).href;
const homeUrl = (lang: Lang) => abs(localizePath('', lang));
const personId = () => `${homeUrl('es')}#person`;

async function person(lang: Lang) {
  const profile = await getProfile();
  const core = (await getSkills()).filter((s) => s.data.core).map((s) => s.data.name);
  return {
    '@type': 'Person',
    '@id': personId(),
    name: profile.name,
    jobTitle: t(profile.headline, lang),
    description: t(profile.tagline, lang),
    url: homeUrl(lang),
    sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
    knowsAbout: core,
    knowsLanguage: ['es', 'en'],
    address: { '@type': 'PostalAddress', addressLocality: lang === 'es' ? 'Ciudad de México' : 'Mexico City', addressCountry: 'MX' },
    alumniOf: [...new Set(profile.education.map((e) => e.institution))].map((name) => ({ '@type': 'CollegeOrUniversity', name })),
  };
}

export async function homeJsonLd(lang: Lang) {
  return {
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${homeUrl(lang)}#page`,
        url: homeUrl(lang),
        name: ui[lang]['meta.title'],
        description: ui[lang]['meta.description'],
        inLanguage: lang,
        mainEntity: { '@id': personId() },
      },
      { ...(await person(lang)), image: abs(`${localizePath('', 'es')}og/${lang}/home.png`) },
    ],
  };
}

export async function caseJsonLd(project: CollectionEntry<'projects'>, lang: Lang) {
  const p = project.data;
  const url = abs(casePath(project.id, lang));
  const stack = await resolveStack(p.stack);
  return {
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: t(p.title, lang),
        description: t(p.summary, lang),
        url,
        inLanguage: lang,
        image: abs(`${localizePath('', 'es')}og/${lang}/${project.id}.png`),
        author: { '@id': personId() },
        about: ui[lang][`projects.cat.${p.category}`],
        keywords: stack.map((s) => s.name).join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Israel Villa', item: homeUrl(lang) },
          { '@type': 'ListItem', position: 2, name: ui[lang]['projects.title'], item: `${homeUrl(lang)}#projects` },
          { '@type': 'ListItem', position: 3, name: t(p.title, lang), item: url },
        ],
      },
      await person(lang),
    ],
  };
}
