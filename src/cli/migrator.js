import dotenv from "dotenv"
import getDatabaseUrl from "../lib/secret"
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-serverless"
import { LeadTable as schema } from "../db/schemas"
import { migrate } from "drizzle-orm/postgres-js/migrator"

import ws from 'ws';

dotenv.config()

async function performMigration() {
  const dbUrl = await getDatabaseUrl()
  console.log(`DB_URL: ${dbUrl}`)

  // neon serverless pool
  // https://github.com/neondatabase/serverless?tab=readme-ov-file#pool-and-client
  neonConfig.webSocketConstructor = ws;  // <-- this is the key bit
  const pool = new Pool({ connectionString: dbUrl });
  pool.on('error', err => console.error(err));  // deal with e.g. re-connect
  // ...
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const db = await drizzle(client, { schema })
    await migrate(db, { migrationsFolder: 'src/migrations' })
    await client.query('COMMIT');

  } catch (err) {

    await client.query('ROLLBACK');

    throw err;

  } finally {
    client.release();
  }
  await pool.end()

}

if (import.meta.url.endsWith(process.argv[1])) {
  console.log(`Running migrations...`)
  performMigration().then(val => {
    console.log("Migrations done")
    process.exit(0)
  }).catch(err => {
    console.log(`Migration error: ${err}`)
    process.exit(1)
  })
}
