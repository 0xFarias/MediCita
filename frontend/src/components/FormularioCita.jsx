import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCita } from '../api/citasApi';
import { validarCita, ESPECIALIDADES, hoyLocal } from '../utils/validaciones';
import Mensaje from './Mensaje';

const inicial = { nombre: '', email: '', descripcion: '', fecha: '', categoria: '' };

export default function FormularioCita() {
  const [valores, setValores] = useState(inicial);       // lo que escribe el usuario
  const [errores, setErrores] = useState({});            // mensajes por campo
  const [enviando, setEnviando] = useState(false);       // bloquea el botón mientras espera
  const [errorServidor, setErrorServidor] = useState(''); // error general de la API
  const navigate = useNavigate();

  // Un solo manejador para todos los campos, gracias al atributo name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores({ ...valores, [name]: value });
    setErrores({ ...errores, [name]: undefined }); // borra el error al corregir
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la página

    const nuevosErrores = validarCita(valores);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return; // datos inválidos: no se envía nada
    }

    setEnviando(true);
    setErrorServidor('');

    try {
      await crearCita(valores);
      navigate('/lista', { state: { mensaje: 'Cita registrada correctamente.' } });
    } catch (err) {
      setErrorServidor(err.message);
      if (err.errores) setErrores(err.errores); // errores que devolvió el servidor
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario" noValidate onSubmit={handleSubmit}>
      {errorServidor && <Mensaje tipo="error">{errorServidor}</Mensaje>}

      <label htmlFor="nombre">Nombre del paciente</label>
      <input id="nombre" name="nombre" value={valores.nombre} onChange={handleChange} />
      {errores.nombre && <small className="error">{errores.nombre}</small>}

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={valores.email} onChange={handleChange} />
      {errores.email && <small className="error">{errores.email}</small>}

      <label htmlFor="categoria">Especialidad</label>
      <select id="categoria" name="categoria" value={valores.categoria} onChange={handleChange}>
        <option value="">Selecciona una especialidad</option>
        {ESPECIALIDADES.map((esp) => (
          <option key={esp} value={esp}>{esp}</option>
        ))}
      </select>
      {errores.categoria && <small className="error">{errores.categoria}</small>}

      <label htmlFor="fecha">Fecha de la cita</label>
      <input id="fecha" name="fecha" type="date" min={hoyLocal()}
        value={valores.fecha} onChange={handleChange} />
      {errores.fecha && <small className="error">{errores.fecha}</small>}

      <label htmlFor="descripcion">Motivo de la consulta</label>
      <textarea id="descripcion" name="descripcion" rows="4"
        value={valores.descripcion} onChange={handleChange} />
      {errores.descripcion && <small className="error">{errores.descripcion}</small>}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Registrar cita'}
      </button>
    </form>
  );
}
