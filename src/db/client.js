import { neon, neonConfig } from '@neondatabase/serverless';
import getDatabaseUrl from '../lib/secret.js'
import { drizzle } from 'drizzle-orm/neon-http';

// export default async function getdbclient() {
export async function dbclient() { const dburl = await getDatabaseUrl(); neonConfig.fetchConnectionCache = true;
  const sql = neon(dburl);
  return sql;
}

export async function getDrizzleClient() {
  const sql = await dbclient();
  return drizzle(sql)
}

// export const dbclient = getdbclient;

// export const getDbClient = getDbClient;
// export default getDbClient ;
