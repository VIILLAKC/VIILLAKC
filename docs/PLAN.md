# Plan de implementación: portafolio "Del espacio a la Tierra"

> Estado: borrador para aprobación · 2026-11-17

## 1. Objetivos

1. **Empleo:** posicionar a Israel Villa como **Senior Data Engineer** (Databricks, PySpark, Delta Lake, Prefect, arquitectura medallion y GenAI en producción).
2. **Freelance:** captar clientes de **automatización empresarial** con servicios claros, casos de éxito con métricas y CTA de contacto.
3. **Técnico:** Lighthouse ≥ 95 (meta 100) en las 4 categorías, en móvil y escritorio; GitHub Pages; contenido 100 % en JSON.

## 2. Diagnóstico del sitio actual

| Problema | Impacto |
|---|---|
| Imágenes de fondo de 3.4 MB y 1.5 MB (JPEG sin optimizar) | LCP muy alto |
| Bootstrap completo + Bootstrap Icons por CDN; Lottie desde `unpkg @latest` (~250 KB + 243 KB de JSON) | Bloqueo de render y TBT |
| `js/script.js` usa `projects.addEventListener` (la variable no existe) | Error de JS: los proyectos no abren |
| `<img href>` como enlaces y alt genéricos | Accesibilidad/SEO |
| Contenido escrito a mano en el HTML | Agregar un proyecto implica tocar maquetado |
| Mensaje "Fullstack + IA" | No coincide con el objetivo Senior Data Engineer |

Se conserva: la idea de viaje espacial (bienvenida en el espacio, despedida en la Tierra), el dominio `viillakc.github.io/VIILLAKC`, los SVG de tecnologías y los badges.

## 3. Stack (decidido)

- **Astro 5** (`output: 'static'`): HTML pre-renderizado, 0 JS por defecto.
- **Tailwind CSS v4** (plugin de Vite), tokens de color propios.
- **Content Collections** con un loader JSON estricto (`src/lib/strict-json-loader.ts`) + esquemas **Zod** + verificación de referencias: un JSON mal formado, un id duplicado o una tecnología inexistente **fallan el build** y nunca llegan rotos a producción.
- **i18n nativo de Astro:** `/es/` (por defecto) y `/en/`, con `hreflang` y selector de idioma.
- **Fuentes self-hosted** (`@fontsource-variable`), subset latin y `font-display: swap`.
- **`astro:assets`** para imágenes AVIF/WebP responsivas.
- **Despliegue:** GitHub Actions (`withastro/action`) → GitHub Pages.
- **Sin** Bootstrap, jQuery, Lottie, Three.js ni GSAP.

## 4. Narrativa visual: el descenso

El scroll es un descenso desde el espacio profundo hasta la superficie de la Tierra. El fondo pasa de negro a azul atmosférico y las estrellas se desvanecen.

| # | Altitud | Sección | Contenido |
|---|---|---|---|
| 0 | Espacio profundo | **Hero** | Nombre, headline, 2 CTA: *"Busco rol Senior DE"* → experiencia; *"Automatiza tu empresa"* → servicios |
| 1 | Órbita alta | **Sobre mí + métricas** | Bio corta y contadores (pipelines, cuentas/corrida, ahorro reportado, etc.) |
| 2 | Sistema planetario | **Servicios** | Cada servicio es un **planeta** interactivo |
| 3 | Estación orbital | **Casos de éxito / proyectos** | Tarjetas desde `projects.json` con filtros (Data Eng · Automatización · IA); página propia por caso |
| 4 | Luna | **Experiencia** | Timeline AT&T → Automata → Daksha (+ BBVA si aplica) |
| 5 | Cinturón | **Stack y certificaciones** | Logos agrupados por categoría; badges; maestría en curso |
| 6 | Reentrada | **CTA final** | Mensaje doble: reclutadores / clientes |
| 7 | **Tierra** | **Contacto** | La Tierra ocupa el fondo y el astronauta "aterriza". Solo enlaces: LinkedIn, GitHub, (correo/CV opcionales) |

### Astronauta acompañante
- Un único **SVG inline** (~6–10 KB), en `position: fixed`, a un lado del contenido.
- Un script de ~1 KB publica el progreso del scroll como variable CSS `--p` (0→1) con `requestAnimationFrame` y listener pasivo; CSS hace el resto: trayectoria en zigzag (`offset-path`), rotación, escala (se agranda al acercarse a la Tierra) y flama del propulsor según la velocidad.
- En la Tierra cambia de pose (aterriza y saluda).
- Móvil: más pequeño, en la esquina, sin tapar texto.
- `prefers-reduced-motion`: queda estático.

### Planetas con interacción del cursor
- Planetas SVG con gradientes radiales, anillos y brillo atmosférico (sin imágenes).
- Script tipo "isla" (~2 KB), cargado solo cuando la sección es visible (`IntersectionObserver`):
  - **Repulsión/parallax:** el planeta se desplaza suavemente alejándose del cursor (con *spring*), solo con `transform`.
  - **Hover/focus:** el planeta crece, gira su anillo y muestra la tarjeta del servicio.
  - **Táctil:** sin cursor, los planetas flotan (CSS) y responden al tap.
- Accesibles: cada planeta es un `<button>` con nombre y la tarjeta también se abre con teclado.
- **Implementado (fase 5):** las tarjetas quedan siempre visibles (mejor para lectura, SEO y lectores de pantalla), así que el planeta es decorativo (`aria-hidden`) en lugar de un botón sin acción. Resorte en `src/scripts/planets.ts` (se inicia al acercarse la sección), luz que sigue al cursor, anillo en dos mitades, luna en órbita y rebote al tocar. Con movimiento reducido quedan estáticos.

### Fondo estelar
- 3 capas de estrellas generadas con `box-shadow` en CSS (sin canvas ni imágenes), con parallax por `--p`. Coste casi cero.

## 5. Datos estructurados (`src/content/`)

```
src/content/
  profile.json      # nombre, headline, bio, enlaces, idiomas, educación
  services.json     # servicios = planetas (color, icono, beneficios, entregables)
  projects.json     # casos de éxito y proyectos
  experience.json   # timeline laboral
  skills.json       # tecnologías agrupadas por categoría
  certifications.json
src/i18n/ui.ts      # textos fijos de la interfaz ES/EN
```

Ejemplo de proyecto (los textos traducibles son `{ es, en }`):

```json
{
  "id": "asignacion-10m-cuentas",
  "order": 1,
  "featured": true,
  "kind": "case-study",
  "category": "data-engineering",
  "title":    { "es": "Asignación auditable de 10M de cuentas", "en": "Auditable allocation of 10M accounts" },
  "summary":  { "es": "...", "en": "..." },
  "problem":  { "es": "...", "en": "..." },
  "solution": { "es": "...", "en": "..." },
  "results": [
    { "value": "10M", "label": { "es": "cuentas por corrida", "en": "accounts per run" } },
    { "value": "~5 min", "label": { "es": "por corrida", "en": "per run" } }
  ],
  "stack": ["python", "numpy", "c", "prefect"],
  "company": "AT&T",
  "links": { "repo": null, "demo": null },
  "image": null
}
```

Reglas para que **agregar un proyecto no rompa el diseño**:
- Zod valida tipos, longitudes máximas (títulos y resúmenes) y slugs únicos.
- `image` opcional: sin imagen se genera una portada SVG con el color de la categoría.
- `stack` referencia ids de `skills.json`; un id inexistente falla el build.
- Grid con `auto-fit`, alturas uniformes y `line-clamp`.
- Los casos con `kind: "case-study"` generan `/es/proyectos/<id>` automáticamente.
- Un README en `src/content/` explica cómo agregar y editar entradas.

## 6. Rendimiento y Lighthouse

| Medida | Presupuesto |
|---|---|
| JS total (gzip) | ≤ 8 KB |
| CSS total (gzip) | ≤ 15 KB, inline crítico |
| LCP | < 1.5 s (4G simulada); el hero es texto + SVG, sin imagen LCP pesada |
| CLS | 0: dimensiones fijas en todo SVG/imagen |
| Fuentes | 1 variable, precargada |

- Animaciones solo con `transform` y `opacity`, `will-change` acotado y `content-visibility: auto` en secciones bajas.
- Scripts diferidos, iniciados por `IntersectionObserver`.
- **Accesibilidad:** contraste AA, foco visible, landmarks, *skip link*, `aria-hidden` en decoración.
- **SEO:** `<title>`/description por idioma, Open Graph con imagen generada, JSON-LD (`Person` + `ProfessionalService`), sitemap, robots y canonical.
- **Implementado (fase 7):** imágenes OG por idioma y por caso generadas en el build (`src/lib/og.ts`, satori + sharp → `/og/<lang>/<id>.png`); JSON-LD `ProfilePage` + `Person` + `ProfessionalService` en portada y `Article` + `BreadcrumbList` en casos (`src/lib/structured-data.ts`); 404 bilingüe con `noindex` fuera del sitemap; axe-core sin violaciones en portada, casos y 404. Nota: `robots.txt` en `/VIILLAKC/` no lo leen los buscadores (solo cuenta el de la raíz del dominio); el sitemap se registra en Google Search Console.
- **Verificación:** Lighthouse CI en GitHub Actions con umbral ≥ 95 que bloquea el despliegue.
- **Implementado (fase 8):** `lighthouserc.cjs` audita portada ES/EN y dos casos (3 corridas, mediana) en móvil y escritorio (`LH_FORM_FACTOR=desktop`); umbral 0.95 en las 4 categorías y CLS ≤ 0.02. `scripts/qa.mjs` (`npm run qa`, puppeteer-core) revisa 5 páginas a 360/768/1440 px (sin scroll horizontal ni elementos fuera del viewport, sin errores de consola), el recorrido con Tab (skip link primero, foco visible en cada parada) y reduced motion (sin animaciones infinitas, astronauta estático). El job `quality` del workflow corre ambos en cada PR y push a `main`; `deploy` depende de él. Resultado local: móvil 97–100 / 100 / 100 / 100, escritorio 100 en todo, CLS 0. Ajustes de la fase: CSS en línea (`inlineStylesheets: 'always'`, ~10 KB gzip; quitó ~260 ms de bloqueo de render), lecturas de `scrollY`/`scrollHeight` movidas al primer frame (eliminan el reflow forzado) y el astronauta aterrizado se monta solo al acercarse a Contacto (TBT de la portada en móvil: ~300 → ~100 ms).

## 7. Fases

1. **Base:** Astro + Tailwind + i18n + Actions → Pages (Pages con *source: GitHub Actions*).
2. **Datos:** esquemas Zod + JSON poblados con el perfil de Notion + README de contenido.
3. **Layout y secciones:** estructura semántica, responsive mobile-first.
4. **Viaje espacial:** fondo, estrellas, Tierra, astronauta con scroll.
5. **Planetas interactivos** de servicios.
6. **Casos de éxito:** grid, filtros y páginas de detalle.
7. **SEO y accesibilidad**, OG image.
8. **QA:** Lighthouse CI, pruebas en 360 px, 768 px y 1440 px, reduced-motion y teclado.

## 8. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Stack | Astro + Tailwind v4 |
| Idioma | Bilingüe ES / EN |
| Contacto | Sin formulario: solo enlaces (LinkedIn, GitHub), para no manejar datos sensibles |
| Estilo | SVG ilustrado + CSS, interacción con JS mínimo |
| Puesto actual | Rol actual desde nov-2026 (Data Developer & GenAI, banca) |
| Empresas | **Todo anonimizado**, también en la experiencia: "Banca global", "Telecom Fortune 500", "Automatización industrial", "Health-tech de imagen médica" |
| Servicios (planetas) | 1) Automatización de procesos · 2) Pipelines y plataforma de datos · 3) IA aplicada / GenAI |
| Proyectos web antiguos | Sección secundaria "Laboratorio" (Batatabit, TODO, FastAPI Template) |

## 9. Contenido: reglas tomadas de Notion

- 80+ pipelines **del equipo**; ~30 de implementación directa. No atribuir los 80 a una sola persona.
- Ahorros como **"reportado"**: 177,141 USD **mensuales**, sin anualizar.
- El ~10 % de ahorro con ML solo se publica cuando se confirme su denominador.
- No atribuir administración de Azure, ni Airflow/AWS avanzado como experiencia productiva.
- Certificaciones AWS DEA y Databricks como **"en preparación"** (o se omiten).
- Maestría en IA (UNIR) **en curso**, fin estimado en mayo de 2027.
