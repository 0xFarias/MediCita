import express from 'express';
import cors from 'cors';
import registrosRouter from './routes/registros.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({mensaje: 'API de MediCita Funcionando correctamente'});
});

app.use('/registros', registrosRouter);

app.use((err, req, res, next) => {
    if ( err.type === 'entity.parse.failed') {
        return res.status(400).json({mensaje: 'El cuerpo no es JSON válido'});
    }
    console.error(err);
    res.status(500).json({mensaje: 'Error interno del servidor'});
});

app.listen(PORT, () => {
    console.log('API en http://localhost:' + PORT);
});