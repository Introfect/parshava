import {z} from 'zod'

export const docketValidator=z.object({
    Cname:z.string().min(3,{message:'Name must me more than 2 characters'}),
    startTime:z.string(),
    endTime:z.string(),
    hours:z.string(),
    rate:z.string(),
    supplier:z.string(),
    po:z.string()
})