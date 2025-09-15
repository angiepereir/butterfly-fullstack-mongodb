import 'dotenv/config';
import express from 'express';
import connectDB from './database/db_connection.js';
import butterflyRoutes from './routes/butterflyRoutes.js';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(express.json());

// 1) Conecta a Mongo ANTES de levantar el servidor
await connectDB();

// 2) Rutas
app.get('/', (_req, res) => res.send('API OK'));
app.use('/butterflies', butterflyRoutes); // <-- monta el router

// 3) Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server on http://localhost:${PORT}/butterflies`)
);
