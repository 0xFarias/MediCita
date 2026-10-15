// Dirección de la API: viene del archivo .env (VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// fetch con un mensaje claro cuando el backend no responde
async function pedir(ruta, opciones) {
  try {
    return await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error('No se pudo conectar con el servidor. ¿Está encendido el backend?');
  }
}

// GET /registros → lista de citas (la usa el Integrante 4 en la lista)
export async function obtenerCitas() {
  const res = await pedir('/registros');
  if (!res.ok) throw new Error('No se pudieron cargar las citas.');
  return res.json();
}

// POST /registros → crea una cita y devuelve la cita guardada
export async function crearCita(cita) {
  const res = await pedir('/registros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.mensaje || 'No se pudo registrar la cita.');
    error.errores = data.errores; // errores por campo que envía el servidor (400)
    throw error;
  }

  return data;
}
