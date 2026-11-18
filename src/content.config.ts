/**
 * Esquemas del contenido del portafolio.
 *
 * Todo el contenido vive en src/content/*.json. Al compilar, cada entrada se valida aquí:
 * si falta un campo, un texto es demasiado largo o se referencia una tecnología que no existe,
 * el build falla con un mensaje claro y nada roto llega a producción.
 * Guía para editar: src/content/README.md
 */
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { strictJson } from './lib/strict-json-loader';

const dir = 'src/content';

// ---------- Utilidades ----------

/** Texto en ambos idiomas, con límite de longitud para proteger el diseño. */
const localized = (max = 400) =>
  z.object({
    es: z.string().trim().min(1).max(max),
    en: z.string().trim().min(1).max(max),
  });

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa minúsculas, números y guiones (kebab-case)');

/** Año "2024" o año-mes "2024-03". */
const yearMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Formato YYYY o YYYY-MM');

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color hexadecimal #rrggbb');

const metric = z.object({
  value: z.string().trim().min(1).max(14),
  label: localized(70),
});

const load = (name: string) => strictJson(`${dir}/${name}.json`);

// ---------- Colecciones ----------

export const skillCategories = [
  'language',
  'data',
  'orchestration',
  'database',
  'cloud-devops',
  'ml-ai',
  'automation',
  'web',
] as const;

const skills = defineCollection({
  loader: load('skills'),
  schema: z.object({
    id: slug,
    name: z.string().min(1).max(30),
    category: z.enum(skillCategories),
    /** Nombre de un SVG en src/assets/tech/ (sin extensión). Opcional. */
    icon: z.string().optional(),
    /** Destacar en la sección de stack principal. */
    core: z.boolean().default(false),
  }),
});

const profile = defineCollection({
  loader: load('profile'),
  schema: z.object({
    id: z.literal('main'),
    name: z.string().min(1).max(40),
    headline: localized(80),
    tagline: localized(160),
    summary: z.array(localized(420)).min(1).max(3),
    location: localized(60),
    openTo: localized(120),
    stats: z.array(metric).min(2).max(4),
    languages: z.array(z.object({ name: localized(20), level: localized(30) })),
    education: z.array(
      z.object({
        degree: localized(90),
        institution: z.string().max(60),
        status: z.enum(['completed', 'in-progress']),
        end: yearMonth.optional(),
      }),
    ),
    links: z.object({
      github: z.url().optional(),
      linkedin: z.url().optional(),
      email: z.email().optional(),
      calendar: z.url().optional(),
      cv: z.string().optional(),
    }),
  }),
});

const services = defineCollection({
  loader: load('services'),
  schema: z.object({
    id: slug,
    order: z.number().int().min(0),
    title: localized(40),
    tagline: localized(110),
    description: localized(320),
    /** Logros medibles que respaldan la especialidad (salen de los casos). */
    evidence: z.array(localized(90)).min(2).max(4),
    /** Prácticas técnicas habituales en esta especialidad. */
    practices: z.array(localized(70)).min(2).max(5),
    stack: z.array(reference('skills')).max(8),
    /** Apariencia del planeta que representa la especialidad. */
    planet: z.object({
      color: hexColor,
      glow: hexColor,
      size: z.enum(['sm', 'md', 'lg']).default('md'),
      ring: z.boolean().default(false),
    }),
  }),
});

export const projectCategories = ['data-engineering', 'automation', 'ai', 'web'] as const;

const projects = defineCollection({
  loader: load('projects'),
  schema: z
    .object({
      id: slug,
      order: z.number().int().min(0),
      /** case-study = caso de éxito con página propia en /casos/<id>/ y /en/cases/<id>/. */
      kind: z.literal('case-study'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      category: z.enum(projectCategories),
      title: localized(70),
      summary: localized(220),
      /** Contexto anonimizado, p. ej. "Empresa global de telecomunicaciones". */
      context: localized(60).optional(),
      year: yearMonth.optional(),
      role: localized(60).optional(),
      problem: localized(600).optional(),
      solution: localized(900).optional(),
      highlights: z.array(localized(160)).max(6).default([]),
      results: z.array(metric).max(4).default([]),
      stack: z.array(reference('skills')).min(1).max(10),
    })
    .refine((p) => p.problem && p.solution, {
      message: 'Un "case-study" necesita "problem" y "solution".',
    }),
});

const experience = defineCollection({
  loader: load('experience'),
  schema: z.object({
    id: slug,
    order: z.number().int().min(0),
    role: localized(60),
    /** Organización anonimizada (descripción del sector, no el nombre). */
    org: localized(70),
    location: localized(50).optional(),
    start: yearMonth,
    end: yearMonth.nullable(),
    highlights: z.array(localized(220)).max(6).default([]),
    stack: z.array(reference('skills')).max(10).default([]),
  }),
});

const certifications = defineCollection({
  loader: load('certifications'),
  schema: z.object({
    id: slug,
    order: z.number().int().min(0),
    name: z.string().min(1).max(80),
    issuer: z.string().min(1).max(40),
    status: z.enum(['earned', 'in-progress']),
    url: z.url().optional(),
  }),
});

export const collections = { skills, profile, services, projects, experience, certifications };
