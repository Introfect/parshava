import { db } from "@/lib/db"

export async function GET(req) {

      const createdDocket = await db.docket.findMany()    
    

      return new Response(JSON.stringify(createdDocket))
 
    }
  