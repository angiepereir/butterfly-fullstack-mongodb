// // database/db_connection.js
// import 'dotenv/config';
// import mongoose from 'mongoose';
// export default async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error('Define MONGODB_URI en tu .env');
//   try {
//     await mongoose.connect(uri);
//     console.log('✅ Conectado a MongoDB');
//   } catch (err) {
//     console.error('❌ Error conectando a MongoDB:', err.message);
//     process.exit(1);
//   }
// }
// src/database/db_connection.js
import "dotenv/config";
import mongoose from "mongoose";

const isTest = process.env.NODE_ENV === "test";

export async function connectDB({ uri, dbName } = {}) {

  const envUri = isTest
    ? (process.env.MONGODB_URI_TEST || process.env.MONGODB_URI)
    : process.env.MONGODB_URI;

  const finalUri = uri ?? envUri;
  if (!finalUri) {
    throw new Error("❌ Define MONGODB_URI (y opcionalmente MONGODB_URI_TEST) en tu .env");
  }

  // DB name final
  const envDbName = isTest ? (process.env.DB_NAME_TEST || process.env.DB_NAME)
                           : process.env.DB_NAME;
  const finalDbName = dbName ?? envDbName;

  // Guard-rail en test (evita pegarle a la BD real por error)
  if (isTest && finalDbName && !/test/i.test(finalDbName)) {
    throw new Error(`❌ Abort: DB_NAME_TEST debe contener "test". Valor actual: "${finalDbName}"`);
  }

  // Evita reconectar si ya está conectada
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  // Ajustes Mongoose
  mongoose.set("strictQuery", true);
  const wantDebug = /^(1|true)$/i.test(String(process.env.MONGOOSE_DEBUG || ""));
  mongoose.set("debug", wantDebug && !isTest);

  // Conecta
  const opts = finalDbName ? { dbName: finalDbName } : undefined;
  await mongoose.connect(finalUri, opts);

  if (!isTest) {
    const { name, host, port } = mongoose.connection;
    console.log(`🗄️ Mongo conectado -> db="${name}" @ ${host}:${port ?? "-"}`);
  }
  return mongoose.connection;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    if (!isTest) console.log("🔌 Mongo desconectado");
  }
}

export default connectDB;
