# Contenido del portafolio

Todo lo que se muestra en el sitio sale de estos JSON. No hace falta tocar componentes para agregar o editar proyectos, servicios o experiencia.

| Archivo | Qué contiene |
|---|---|
| `profile.json` | Nombre, headline, bio, métricas del hero, idiomas, educación y enlaces de contacto (una sola entrada con `"id": "main"`) |
| `services.json` | Especialidades (`evidence`: logros medibles; `practices`: cómo trabajo). Cada una se dibuja como un **satélite** en órbita terrestre |
| `projects.json` | Casos de éxito (`case-study`) |
| `experience.json` | Timeline laboral |
| `skills.json` | Catálogo de tecnologías. Los `stack` de los demás archivos usan sus `id` |
| `certifications.json` | Certificaciones obtenidas o en preparación |

Los esquemas (campos, tipos y límites) están en [`src/content.config.ts`](../content.config.ts).

## Reglas generales

- Cada archivo es un **arreglo** `[ ... ]` y cada entrada lleva un `"id"` **único** en kebab-case (`mi-proyecto-nuevo`).
- Los textos visibles van en los dos idiomas: `{ "es": "...", "en": "..." }`.
- `order` define el orden (menor = primero).
- Las fechas son `"2024"` o `"2024-03"`. En experiencia, `"end": null` significa "actual".
- **Anonimización:** no escribas nombres de empresas. Usa el sector, por ejemplo `"Empresa global de telecomunicaciones"`.

## Agregar un proyecto

Copia este bloque al final de `projects.json` (antes del `]`, separado con una coma) y edítalo:

```json
{
  "id": "mi-proyecto",
  "order": 8,
  "kind": "case-study",
  "featured": false,
  "category": "automation",
  "title":    { "es": "Título corto (máx. 70)", "en": "Short title (max 70)" },
  "summary":  { "es": "Resumen para la tarjeta (máx. 220).", "en": "Card summary (max 220)." },
  "context":  { "es": "Sector del cliente", "en": "Client industry" },
  "problem":  { "es": "¿Qué dolía?", "en": "What was the pain?" },
  "solution": { "es": "¿Qué construiste y cómo?", "en": "What did you build and how?" },
  "results": [
    { "value": "-80%", "label": { "es": "tiempo de proceso", "en": "processing time" } }
  ],
  "stack": ["n8n", "python"]
}
```

| Campo | Valores / notas |
|---|---|
| `kind` | `case-study` (tarjeta grande + página propia en `/casos/<id>/` y `/en/cases/<id>/`, generada automáticamente; exige `problem` y `solution`; el `id` es la URL, así que no lo cambies una vez publicado) |
| `category` | `data-engineering` · `automation` · `ai` · `web` (alimenta los filtros) |
| `featured` | `true` lo muestra entre los destacados |
| `draft` | `true` lo oculta sin borrarlo |
| `results` | Máximo 4. `value` corto (máx. 14 caracteres) y **sin palabras de un idioma**, porque se muestra igual en ES y EN: `"3x"`, `"~15 min"`, `"177K USD"`. Las palabras van en `label` |
| `stack` | Ids de `skills.json`. Si usas una tecnología nueva, agrégala primero ahí |

## Agregar una tecnología

En `skills.json`:

```json
{ "id": "airflow", "name": "Airflow", "category": "orchestration" }
```

`category` es uno de: `language`, `data`, `orchestration`, `database`, `cloud-devops`, `ml-ai`, `automation`, `web`.
Para mostrar un logo, guarda el SVG en `src/assets/tech/` y agrega `"icon": "nombre-del-archivo"`. Con `"core": true` aparece en el stack principal.

## Si algo está mal escrito

El build falla y dice qué arreglar, por ejemplo:

```
src/content/projects.json: "id" duplicado → "mi-proyecto"
projects → mi-proyecto: title.es: Too big: expected string to have <=70 characters
projects.json → mi-proyecto: la tecnología "pythn" no existe en skills.json
```

Así nada roto llega a GitHub Pages. Para comprobar antes de subir:

```bash
npm run build
```
