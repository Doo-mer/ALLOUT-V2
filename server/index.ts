import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.POSTGRE_URL) {
  throw new Error('POSTGRE_URL environment variable is not defined');
}

const sql = neon(process.env.POSTGRE_URL);
const db = drizzle(sql);

// const result = await db.select().from(your_table_name);