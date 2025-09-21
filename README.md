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

# (opcionales si tu URI no incluye el nombre)
# DB_NAME=asia_butterflies
# DB_NAME_TEST=asia_butterflies_test


Instala dependencias y levanta la API:

cd backend
npm install
# recomendado: forzar entorno dev para asegurar MONGODB_URI (no la de test)
npx cross-env NODE_ENV=development node app.js
# o, si tienes script:
# npm run dev



Recurso principal: http://localhost:8000/butterflies

Nota: si ves datos de test, revisa que estés en NODE_ENV=development y que el log de conexión apunte a asia_butterflies (no a asia_butterflies_test).

🖼 Frontend — Configuración & ejecución


Instala y arranca Vite:

cd ../frontend
npm install
npm run dev
