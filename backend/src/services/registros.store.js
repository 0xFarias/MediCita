import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// Ruta absoluta a backend/data/registros.json, sin importar desde dónde se arranque
const DATA_FILE = path.join(import.meta.dirname, '..', '..', 'data', 'registros.json');

// Crea la carpeta data/ y el archivo con [] si todavía no existen
export async function asegurarArchivo() {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await readFile(DATA_FILE, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(DATA_FILE, '[]');
    } else {
      throw err;
    }
  }
}

// Devuelve el arreglo de citas guardado en el archivo
export async function leerRegistros() {
  await asegurarArchivo();
  const texto = await readFile(DATA_FILE, 'utf-8');
  return texto.trim() ? JSON.parse(texto) : [];
}

// Sobrescribe el archivo con la lista completa (las anteriores + la nueva)
export async function guardarRegistros(lista) {
  await writeFile(DATA_FILE, JSON.stringify(lista, null, 2));
}