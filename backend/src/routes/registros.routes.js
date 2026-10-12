import { Router } from 'express';

const router = Router();

const registros = [];

router.get('/', (req, res) => {
    res.status(200).json(registros);
});

router.post('/', (req, res) => {
    const { nombre, email, descripcion, fecha, categoria } = req.body ?? {};

    if (!nombre || !email || !descripcion || !fecha || !categoria) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    };

    const nueva = {id: registros.length + 1, nombre, email, descripcion, fecha, categoria };
    registros.push(nueva);
    res.status(201).json(nueva);
});

export default router;