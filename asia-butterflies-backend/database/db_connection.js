// database/db_connection.js
import 'dotenv/config';
import mongoose from 'mongoose';
export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Define MONGODB_URI en tu .env');
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}