// Misma lista que backend/src/validators/cita.validator.js
export const ESPECIALIDADES = [
  'Medicina general',
  'Pediatría',
  'Odontología',
  'Dermatología',
  'Ginecología',
  'Cardiología',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hoy en la hora local del navegador, formato AAAA-MM-DD
export const hoyLocal = () => new Date().toLocaleDateString('en-CA');

// Devuelve { campo: 'mensaje' } por cada error; un objeto vacío si todo está bien
export function validarCita(valores) {
  const errores = {};

  if (valores.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!EMAIL_RE.test(valores.email.trim())) {
    errores.email = 'Escribe un email válido, por ejemplo ana@correo.com.';
  }

  if (valores.descripcion.trim().length < 10) {
    errores.descripcion = 'Describe el motivo en al menos 10 caracteres.';
  }

  if (!valores.fecha) {
    errores.fecha = 'Elige la fecha de la cita.';
  } else if (valores.fecha < hoyLocal()) {
    errores.fecha = 'La cita no puede ser en una fecha pasada.';
  }

  if (!ESPECIALIDADES.includes(valores.categoria)) {
    errores.categoria = 'Selecciona una especialidad.';
  }

  return errores;
}
