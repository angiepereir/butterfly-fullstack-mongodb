🦋 App Butterflies — Full-stack (React + Node/Express + MongoDB + Tests)

Proyecto full-stack para gestionar fichas de mariposas: listar, crear, ver, actualizar y eliminar.
Incluye campos como Estado de Conservación y Periodo de Actividad.

🧰 Stack

Frontend: React (Vite) + Tailwind CSS

Backend: Node.js + Express + Mongoose

Base de datos: MongoDB / MongoDB Atlas

Testing (API): Jest + Supertest + mongodb-memory-server

🗂️ Estructura del repo
butterfly-fullstack-mongodb/
├─ backend/
│  ├─ app.js
│  ├─ database/
│  │  └─ db_connection.js
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ validators/
│  ├─ tests/
│  └─ package.json
├─ frontend/
│  ├─ src/
│  ├─ index.html
│  └─ package.json
└─ README.md

📦 Clonado
git clone https://github.com/angiepereir/butterfly-fullstack-mongodb.git

cd butterfly-fullstack-mongodb

🗄️ Backend — Configuración & ejecución

Crea backend/.env:

PORT=8000

# BD de desarrollo / producción
MONGODB_URI=mongodb+srv://USUARIO:PASS@CLUSTER/asia_butterflies?retryWrites=true&w=majority

# BD de tests (cuando NODE_ENV=test)
MONGODB_URI_TEST=mongodb+srv://USUARIO:PASS@CLUSTER/asia_butterflies_test?retryWrites=true&w=majority


# DB_NAME=asia_butterflies
# DB_NAME_TEST=asia_butterflies_test


Instala dependencias y levanta la API:

cd backend

# npm install

# npm run dev



Recurso principal: http://localhost:8000/butterflies

🖼 Frontend — Configuración & ejecución


Instala y arranca Vite:

cd ../frontend

# npm install

# npm run dev


REPOS:
# MARIANA MORENO: (https://github.com/MarianaMH1195/fullstack-butterflies-SQL)

# LARYSA AMBARTSUMIAN: (https://github.com/ambalari/asian-butterflies-mongodb-2)

# LARYSA AMBARTSUMIAN: (https://github.com/ambalari/butterflies-fullstack-)

# LARYSA AMBARTSUMIAN: (https://github.com/ambalari/butterflies-fullstack-)



