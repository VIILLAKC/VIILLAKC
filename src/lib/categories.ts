import type { projectCategories } from '../content.config';

type Category = (typeof projectCategories)[number];

/** Color de acento por categoría de proyecto (tarjetas, portadas y filtros). */
export const categoryColor: Record<Category, string> = {
  'data-engineering': '#5ee6ff',
  automation: '#ff9a5a',
  ai: '#a99cff',
  web: '#3fcf8e',
};
