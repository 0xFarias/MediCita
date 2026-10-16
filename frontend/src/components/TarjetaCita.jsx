// Convierte "2026-10-20" en "20/10/2026" sin usar new Date()
function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

export default function TarjetaCita({ cita }) {
  return (
    <article className="tarjeta">
      <header className="tarjeta-encabezado">
        <h3>{cita.nombre}</h3>
        <span className="etiqueta">{cita.categoria}</span>
      </header>
      <p className="tarjeta-fecha">Fecha: {formatearFecha(cita.fecha)}</p>
      <p>{cita.descripcion}</p>
      <p className="tarjeta-email">{cita.email}</p>
    </article>
  );
}
