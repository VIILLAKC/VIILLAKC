/**
 * Imágenes Open Graph (1200×630) generadas en el build: satori convierte el texto a trazos
 * (no depende de las fuentes instaladas en CI) y sharp lo pasa a PNG.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_SIZE = { width: 1200, height: 630 } as const;

const fontDir = join(process.cwd(), 'node_modules/@fontsource/space-grotesk/files');
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all(
    ([400, 700] as const).map(async (weight) => ({
      name: 'Space Grotesk',
      data: await readFile(join(fontDir, `space-grotesk-latin-${weight}-normal.woff`)),
      weight,
      style: 'normal' as const,
    })),
  ));

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } });

// Estrellas fijas (semilla determinista) para que la imagen sea estable entre builds.
function stars(count: number) {
  let s = 7;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: count }, () =>
    h('div', {
      position: 'absolute',
      left: Math.round(rand() * 1200),
      top: Math.round(rand() * 420),
      width: rand() > 0.85 ? 3 : 2,
      height: rand() > 0.85 ? 3 : 2,
      borderRadius: 9999,
      backgroundColor: `rgba(233,237,249,${(0.25 + rand() * 0.6).toFixed(2)})`,
    }),
  );
}

export interface OgInput {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Color de acento (categoría del caso o el cian de la marca). */
  accent?: string;
  /** Hasta 3 métricas grandes (casos de éxito). */
  metrics?: { value: string; label: string }[];
  footer: string;
}

export async function renderOg({ eyebrow, title, subtitle, accent = '#5ee6ff', metrics = [], footer }: OgInput) {
  const titleSize = title.length > 48 ? 54 : title.length > 30 ? 62 : 80;

  const tree = h(
    'div',
    {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100%',
      fontFamily: 'Space Grotesk',
      color: '#e9edf9',
      backgroundColor: '#04050c',
      backgroundImage: 'linear-gradient(180deg, #04050c 0%, #070a1a 55%, #0e2558 100%)',
      overflow: 'hidden',
    },
    [
      ...stars(70),
      // Nebulosa
      h('div', {
        position: 'absolute',
        right: -160,
        top: -200,
        width: 640,
        height: 640,
        borderRadius: 9999,
        backgroundImage: 'radial-gradient(circle, rgba(139,123,255,0.28), rgba(139,123,255,0) 70%)',
      }),
      // Tierra en el horizonte
      h('div', {
        position: 'absolute',
        left: -300,
        top: 548,
        width: 1800,
        height: 1800,
        borderRadius: 9999,
        backgroundImage: 'radial-gradient(circle at 50% 10%, #5aa8ff, #2463c9 20%, #0f3279 45%, #061636 70%)',
        boxShadow: '0 -18px 90px rgba(94,230,255,0.55)',
      }),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', position: 'relative', padding: '56px 72px', width: '100%' },
        [
          h('div', { display: 'flex', alignItems: 'center', fontSize: 26, fontWeight: 700 }, [
            h('span', {}, 'IV'),
            h('span', { color: '#5ee6ff' }, '.'),
            h(
              'span',
              {
                marginLeft: 24,
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 20,
                color: accent,
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${accent}`,
              },
              eyebrow,
            ),
          ]),
          h(
            'div',
            { display: 'flex', marginTop: 40, fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1000 },
            title,
          ),
          subtitle
            ? h('div', { display: 'flex', marginTop: 24, fontSize: 28, lineHeight: 1.35, color: '#a3acc7', maxWidth: 940 }, subtitle)
            : h('div', {}),
          metrics.length
            ? h(
                'div',
                { display: 'flex', marginTop: 40, gap: 56 },
                metrics.slice(0, 3).map((m) =>
                  h('div', { display: 'flex', flexDirection: 'column' }, [
                    h('span', { fontSize: 48, fontWeight: 700, color: accent }, m.value),
                    h('span', { fontSize: 20, color: '#a3acc7' }, m.label),
                  ]),
                ),
              )
            : h('div', {}),
        ],
      ),
      h(
        'div',
        { position: 'absolute', left: 72, right: 72, bottom: 34, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: 'rgba(233,237,249,0.9)' },
        [h('span', {}, 'Israel Villa · Senior Data Engineer'), h('span', {}, footer)],
      ),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { ...OG_SIZE, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
