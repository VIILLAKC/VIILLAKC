/**
 * Imágenes OG estáticas: /og/<lang>/home.png y /og/<lang>/<id-del-caso>.png.
 * Se generan en el build a partir de los mismos JSON que las páginas.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '@/lib/og';
import { getProfile, getProjects } from '@/lib/content';
import { categoryColor } from '@/lib/categories';
import { languages, t, ui, type Lang } from '@/i18n/ui';

export const getStaticPaths = (async () => {
  const cases = await getProjects('case-study');
  return (Object.keys(languages) as Lang[]).flatMap((lang) => [
    { params: { lang, id: 'home' }, props: { lang, project: undefined } },
    ...cases.map((project) => ({ params: { lang, id: project.id }, props: { lang, project } })),
  ]);
}) satisfies GetStaticPaths;

const domain = 'viillakc.github.io/VIILLAKC';

export const GET: APIRoute = async ({ props }) => {
  const { lang, project } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];
  const tr = ui[lang];
  const profile = await getProfile();

  const png = project
    ? await renderOg({
        eyebrow: tr[`projects.cat.${project.data.category}`],
        title: t(project.data.title, lang),
        subtitle: project.data.context ? t(project.data.context, lang) : undefined,
        accent: categoryColor[project.data.category],
        metrics: project.data.results.map((r) => ({ value: r.value, label: t(r.label, lang) })),
        footer: domain,
      })
    : await renderOg({
        eyebrow: lang === 'es' ? 'Datos · Automatización · IA aplicada' : 'Data · Automation · Applied AI',
        title: t(profile.headline, lang),
        subtitle: t(profile.tagline, lang),
        footer: domain,
      });

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
