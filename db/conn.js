import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
const db_name = 'simone';

let conn;
try {
  conn = await client.connect();
  //console.log('Connected to Mongo')
} catch(e) {
  console.error(e);
}

let db = conn.db(db_name);

export default db;