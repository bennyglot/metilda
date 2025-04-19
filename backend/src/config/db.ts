import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || 'echiov';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ MongoDB connected');
  }

  db = client.db(dbName);
  
  return db;
}
