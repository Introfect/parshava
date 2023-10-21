import { docketValidator } from "@/lib/validators/docketValidator"
import { db } from "../../../lib/db"

export async function POST(req){
    try{
        const body=await req.json()
        const {Cname,startTime,endTime,hours,rate,supplier,po}=docketValidator.parse(body)
      
        await db.docket.create ({
            data:{
                Cname:Cname,
                startTime:startTime,
                endTime:endTime,
                hours:hours,
                rate:rate,
                supplier:supplier,
                po:po
            }
        })
        return new Response('OK')
    }catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid data", { status: 422 })
          }
        console.log(error)
        return new Response('Could not post', { status: 500 })
      }
}