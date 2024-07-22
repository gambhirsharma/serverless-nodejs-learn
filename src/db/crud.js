import { desc, eq } from "drizzle-orm"
import { getDrizzleClient } from "./client.js"
import { LeadTable } from "./schemas.js"

export async function newLead({ email }) {
  const db = await getDrizzleClient()
  const result = await db.insert(LeadTable).values({
    email: email,
  }).returning({ timestamp: LeadTable.createdAt })
  if (result.length === 1) {
    return result[0]
  }
  return result
}


export async function listLeads() {

  const db = await getDrizzleClient()
  const result = await db.select().from(LeadTable).orderBy(desc(LeadTable.createdAt))

  return result
}

export async function getLead(id){
  const db = await getDrizzleClient()
  const result = await db.select().from(LeadTable).where(eq(LeadTable.id, id))
  return result
}
