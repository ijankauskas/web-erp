import { z } from 'zod'

export const compSchema = z.object({
    tipo: z.string().min(1, {
        message: "Debe completar el codigo."
    }),

    letra: z.string().min(1, {
        message: "Debe completar la letra."
    }),

    prox_num: z.any().optional() .transform(val => parseFloat(val)),
    

    descrip:z.string().min(1, {
        message: "Debe completar la descripcion."
    }),


    
    porcentaje: z.any().optional() .transform(val => parseFloat(val)),

    prefijo:z.string().min(1, {
        message: "Debe completar el prefijo."
    }).transform(val => parseFloat(val)),
    activo: z.any().optional(),
})