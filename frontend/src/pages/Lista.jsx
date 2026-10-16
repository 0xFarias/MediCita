import { Link,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerCitas } from '../api/citasApi';
import TarjetaCita from '../components/TarjetaCita';
import Mensaje from '../components/Mensaje';


export default function Lista() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const { state } = useLocation(); // mensaje que envía el formulario al registrar

  // Pide las citas a la API (GET /registros)
  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerCitas();
      setCitas(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Se ejecuta una vez, cuando la página se muestra
  useEffect(() => {
    cargar();
  }, []);

  // Estado 1: cargando
  if (cargando) {
    return <Mensaje tipo="info">Cargando citas…</Mensaje>;
  }

  // Estado 2: error (por ejemplo, backend apagado)
  if (error) {
    return (
      <Mensaje tipo="error">
        {error} <button onClick={cargar}>Reintentar</button>
      </Mensaje>
    );
  }

  // Las más próximas primero (las fechas AAAA-MM-DD se ordenan como texto)
  const ordenadas = [...citas].sort((a, b) => a.fecha.localeCompare(b.fecha));

  return (
    <section>
      <h1>Citas registradas</h1>
      {state?.mensaje && <Mensaje tipo="exito">{state.mensaje}</Mensaje>}

      {ordenadas.length === 0 ? (
        // Estado 3: lista vacía
        <Mensaje tipo="info">
          Aún no hay citas. <Link to="/registro">Registra la primera</Link>.
        </Mensaje>
      ) : (
        // Estado 4: con datos
        <div className="grid">
          {ordenadas.map((cita) => (
            <TarjetaCita key={cita.id} cita={cita} />
          ))}
        </div>
      )}

      <p><Link to="/registro">+ Agendar otra cita</Link></p>
    </section>
  );
}

