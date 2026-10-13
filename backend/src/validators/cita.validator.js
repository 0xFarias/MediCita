// Lista cerrada de especialidades (el Integrante 3 usa la misma en React)
export const ESPECIALIDADES = [
  'Medicina general',
  'Pediatría',
  'Odontología',
  'Dermatología',
  'Ginecología',
  'Cardiología',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fecha de hoy en Ecuador con formato AAAA-MM-DD
const hoyLocal = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'America/Guayaquil' });

export function validarCita(datos = {}) {
  // Limpia los datos: todo a texto y sin espacios sobrantes
  const limpio = {
    nombre: String(datos.nombre ?? '').trim(),
    email: String(datos.email ?? '').trim(),
    descripcion: String(datos.descripcion ?? '').trim(),
    fecha: String(datos.fecha ?? ''),
    categoria: String(datos.categoria ?? ''),
  };

  const errores = {};

  if (limpio.nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }
  if (!EMAIL_RE.test(limpio.email)) {
    errores.email = 'El email no tiene un formato válido.';
  }
  if (limpio.descripcion.length < 10) {
    errores.descripcion = 'Describe el motivo en al menos 10 caracteres.';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(limpio.fecha)) {
    errores.fecha = 'La fecha es obligatoria (AAAA-MM-DD).';
  } else if (limpio.fecha < hoyLocal()) {
    errores.fecha = 'La cita no puede ser en una fecha pasada.';
  }
  if (!ESPECIALIDADES.includes(limpio.categoria)) {
    errores.categoria = 'Selecciona una especialidad válida.';
  }
  
  return { valido: Object.keys(errores).length === 0, errores, limpio };
}