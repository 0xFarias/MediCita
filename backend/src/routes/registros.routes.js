import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { leerRegistros, guardarRegistros } from '../services/registros.store.js';
import { validarCita } from '../validators/cita.validator.js';

const router = Router();


// GET /registros → todas las citas guardadas en el archivo
router.get('/', async (req, res) => {
  try {
    const registros = await leerRegistros();
    res.status(200).json(registros);
  } catch (err) {
    console.error('Error al leer registros:', err);
    res.status(500).json({ mensaje: 'No se pudieron leer los registros.' });
  }
});


// POST /registros → valida, crea el ID y guarda sin perder las anteriores
router.post('/', async (req, res) => {
  const { valido, errores, limpio } = validarCita(req.body);
  if (!valido) {
    return res.status(400).json({ mensaje: 'Datos inválidos.', errores });
  }

  try {
    const registros = await leerRegistros();
    const nueva = {
      id: randomUUID(),
      ...limpio,
      creadoEn: new Date().toISOString(),
    };
    registros.push(nueva);
    await guardarRegistros(registros);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error al guardar la cita:', err);
    res.status(500).json({ mensaje: 'No se pudo guardar la cita.' });
  }
});

export default router;