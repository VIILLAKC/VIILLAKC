/**
 * Lighthouse CI: audita el build estático servido con `astro preview` (respeta el base /VIILLAKC).
 * Móvil por defecto; `LH_FORM_FACTOR=desktop` audita con el perfil de escritorio.
 * Umbral ≥ 0.95 en las 4 categorías: si no se cumple, el job falla y no se despliega.
 */
const base = 'http://localhost:4321/VIILLAKC';
const desktop = process.env.LH_FORM_FACTOR === 'desktop';

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx astro preview --port 4321',
      startServerReadyPattern: 'localhost:4321',
      startServerReadyTimeout: 60000,
      url: [`${base}/`, `${base}/en/`, `${base}/casos/plataforma-lakehouse/`, `${base}/en/cases/genai-analitica-financiera/`],
      numberOfRuns: 3,
      settings: {
        // Perfil de escritorio de Lighthouse escrito a mano: lhci no acepta `preset` al validar el rc.
        ...(desktop
          ? {
              formFactor: 'desktop',
              screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
              throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
            }
          : {}),
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02, aggregationMethod: 'median-run' }],
      },
    },
    upload: { target: 'filesystem', outputDir: `./lighthouse-reports/${desktop ? 'desktop' : 'mobile'}` },
  },
};
