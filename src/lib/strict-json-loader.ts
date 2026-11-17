/**
 * Loader de colecciones para archivos JSON que FALLA el build ante cualquier problema.
 *
 * El `file()` de Astro solo registra en consola un JSON mal escrito o un archivo inexistente,
 * y el build termina "bien" con datos viejos de la caché (o vacíos en CI). Este loader lanza
 * un error en esos casos y también exige un arreglo con `id` únicos.
 * En `astro dev`, si editas el JSON y queda inválido, se muestra el error sin tumbar el servidor.
 */
import { existsSync, promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { relative } from 'node:path';
import type { Loader, LoaderContext } from 'astro/loaders';

type RawEntry = Record<string, unknown> & { id: string };

function parseStrict(text: string, fileName: string): RawEntry[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`${fileName}: JSON inválido. ${(error as Error).message}`);
  }
  if (!Array.isArray(data)) throw new Error(`${fileName}: debe contener un arreglo [ ... ] de entradas.`);
  const seen = new Set<string>();
  data.forEach((entry, i) => {
    const id = (entry as { id?: unknown })?.id;
    if (typeof id !== 'string' || !id) throw new Error(`${fileName}: la entrada #${i + 1} no tiene "id".`);
    if (seen.has(id)) throw new Error(`${fileName}: "id" duplicado → "${id}". Cada entrada necesita un id único.`);
    seen.add(id);
  });
  return data as RawEntry[];
}

export function strictJson(fileName: string): Loader {
  async function sync(filePath: string, { config, parseData, store, generateDigest }: LoaderContext) {
    const entries = parseStrict(await fs.readFile(filePath, 'utf-8'), fileName);
    const rel = relative(fileURLToPath(config.root), filePath).replaceAll('\\', '/');
    // Valida todo antes de tocar el store, para no dejarlo a medias.
    const parsed = [];
    for (const raw of entries) {
      parsed.push({ id: raw.id, data: await parseData({ id: raw.id, data: raw, filePath }), digest: generateDigest(raw) });
    }
    store.clear();
    for (const entry of parsed) store.set({ ...entry, filePath: rel });
  }

  return {
    name: 'strict-json-loader',
    load: async (context) => {
      const url = new URL(fileName, context.config.root);
      if (!existsSync(url)) throw new Error(`No existe el archivo de contenido: ${fileName}`);
      const filePath = fileURLToPath(url);
      await sync(filePath, context);

      context.watcher?.add(filePath);
      context.watcher?.on('change', async (changed) => {
        if (changed !== filePath) return;
        try {
          await sync(filePath, context);
          context.logger.info(`Recargado ${fileName}`);
        } catch (error) {
          context.logger.error((error as Error).message);
        }
      });
    },
  };
}
