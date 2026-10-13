import { useLocation } from 'react-router-dom';

// PROVISIONAL: el Integrante 4 reemplaza esta página por la lista real
export default function Lista() {
  const { state } = useLocation();

  return (
    <section>
      <h1>Citas registradas</h1>
      {state?.mensaje && <p className="mensaje mensaje-exito">{state.mensaje}</p>}
      <p>La lista se construye en la siguiente etapa.</p>
    </section>
  );
}
