## MediCita - Registro de citas médicas
Aplicación web para registrar solicitudes de citas médicas y consultarlas.
Flujo: formulario en React → petición HTTP → API en Express → archivo JSON → lista en React.



## Integrantes

1. Jose Farias | Repositorio, estructura, servidor Express y rutas GET/POST |
2. Melanie Bermeo | Almacenamiento en archivo JSON, validación en servidor e ID único |
3. Carlos Llivisupa Luis Peñafiel | Rutas de React, conexión con la API y formulario |
4. Carlos Llivisupa | Lista de citas, diseño adaptable, pruebas y README |

## Ejecucion/Requisitos

- Node.js 22 o superior (incluye npm)
- Git

## Instalación y ejecución

1. Clonar el repositorio:

        git clone https://github.com/0xFarias/MediCita.git
        cd MediCita

2. Backend (puerto 3001), en una terminal:

        cd backend
        npm install
        npm run dev

3. Frontend (puerto 5173), en otra terminal:

        cd frontend
        npm install
        cp .env.example .env
        npm run dev

4. Abrir http://localhost:5173

El archivo backend/data/registros.json se crea solo, con una lista vacía, la primera vez que arranca el backend.

## Configuración

frontend/.env define la dirección de la API:

    VITE_API_URL=http://localhost:3001

## API

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | /registros | 200 con la lista de citas |
| POST | /registros | 201 con la cita creada · 400 si los datos son inválidos |

Ejemplo de body para POST /registros:

    {
      "nombre": "Ana Torres",
      "email": "ana@correo.com",
      "descripcion": "Control de presión arterial",
      "fecha": "2026-10-20",
      "categoria": "Cardiología"
    }

Ejemplo de respuesta 400:

    {
      "mensaje": "Datos inválidos.",
      "errores": { "email": "El email no tiene un formato válido." }
    }

Hay ejemplos listos de todas las peticiones en backend/pruebas.http (se envían con la extensión REST Client de VS Code).

Especialidades válidas: Medicina general, Pediatría, Odontología, Dermatología, Ginecología, Cardiología.
La fecha debe ser hoy o posterior, con formato AAAA-MM-DD.

## Pruebas realizadas

(Pegar aquí la tabla del Paso 4 con la columna "Resultado obtenido" completa.)

## Estructura del proyecto

    medicita/
    ├── backend/
    │   └── src/
    │       ├── server.js
    │       ├── routes/registros.routes.js
    │       ├── services/registros.store.js
    │       └── validators/cita.validator.js
    ├── frontend/
    │   └── src/
    │       ├── api/citasApi.js
    │       ├── components/ (Menu, FormularioCita, TarjetaCita, Mensaje)
    │       ├── pages/ (Inicio, Registro, Lista)
    │       ├── utils/validaciones.js
    │       ├── App.jsx
    │       └── main.jsx
    ├── .gitignore
    └── README.md
Commit de este paso:
git add README.md
git commit -m "docs: README con instalación, API, pruebas y estructura"
Paso 6 · Subir tu trabajo y cerrar el proyecto
6.1 Revisa tus commits y súbelos. Ya hiciste cuatro: tarjeta, lista, estilos y README.
git log --oneline -4
git status
git push -u origin feature/lista-estilos-readme
git log debe mostrar tus 4 commits, y git status no debe mostrar .env, registros.json ni node_modules.
