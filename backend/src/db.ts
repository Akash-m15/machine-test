import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

let cached = (globalThis as any)._mongoConnection;

if (!cached) {
  cached = { conn: null, promise: null };
  (globalThis as any)._mongoConnection = cached;
}

export async function connectDB() {
  
const MONGO_URL = process.env.MONGO_DB_URL;
if (!MONGO_URL) throw new Error("MONGO_DB_URL environment variable not set");

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
