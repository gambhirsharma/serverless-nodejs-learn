// import { serial, timestamp } from "drizzle-orm/mysql-core";
import { text, pgTable, timestamp, serial} from "drizzle-orm/pg-core";

export const LeadTable = pgTable('leads', {
  id: serial('id').primaryKey().notNull(),
  email: text('email').notNull(),
  // description: text('description').default("this is my content"),
  createdAt: timestamp('created_at').defaultNow(),
});


