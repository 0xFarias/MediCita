import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section>
      <h1>Bienvenido a MediCita</h1>
      <p>Registra solicitudes de citas médicas y consulta las que ya están agendadas.</p>
      <div className="acciones">
        <Link to="/registro" className="boton">Agendar una cita</Link>
        <Link to="/lista" className="boton boton-secundario">Ver citas registradas</Link>
      </div>
    </section>
  );
}
