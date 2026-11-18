/** Acceso al contenido ya validado y ordenado. Las secciones solo deben leer datos desde aquí. */
import { getCollection, getEntry } from 'astro:content';

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getProfile() {
  const entry = await getEntry('profile', 'main');
  if (!entry) throw new Error('Falta la entrada "main" en src/content/profile.json');
  return entry.data;
}

export async function getServices() {
  return (await getCollection('services')).sort(byOrder);
}

/** Proyectos publicados (sin borradores), ordenados por `order`. */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort(byOrder);
}

export async function getExperience() {
  return (await getCollection('experience')).sort(byOrder);
}

export async function getCertifications() {
  return (await getCollection('certifications')).sort(byOrder);
}

export async function getSkills() {
  return getCollection('skills');
}

let integrity: Promise<void> | undefined;

/**
 * Astro solo registra en consola una referencia rota (p. ej. "stack": ["pythn"]) y el build
 * termina bien. Esta verificación la convierte en error. Se ejecuta una vez por build (BaseLayout).
 */
export function assertContentIntegrity() {
  integrity ??= (async () => {
    const skillIds = new Set((await getSkills()).map((s) => s.id));
    const issues: string[] = [];
    const check = (where: string, refs: { id: string }[]) =>
      refs.forEach((r) => !skillIds.has(r.id) && issues.push(`${where}: la tecnología "${r.id}" no existe en skills.json`));

    for (const s of await getCollection('services')) check(`services.json → ${s.id}`, s.data.stack);
    for (const p of await getCollection('projects')) check(`projects.json → ${p.id}`, p.data.stack);
    for (const e of await getCollection('experience')) check(`experience.json → ${e.id}`, e.data.stack);
    await getProfile();

    if (issues.length) throw new Error(`Contenido inválido:\n  - ${issues.join('\n  - ')}`);
  })();
  return integrity;
}

/** Resuelve las referencias `stack` (ids) a entradas de skills. */
export async function resolveStack(refs: { id: string }[]) {
  const skills = await getSkills();
  const map = new Map(skills.map((s) => [s.id, s.data]));
  return refs.map((r) => map.get(r.id)).filter((s) => s !== undefined);
}
