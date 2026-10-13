import { Link, NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="menu">
      <Link to="/" className="menu-marca">MediCita</Link>
      <div className="menu-enlaces">
        {/* NavLink agrega la clase "active" a la ruta actual */}
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/registro">Agendar cita</NavLink>
        <NavLink to="/lista">Ver citas</NavLink>
      </div>
    </nav>
  );
}
