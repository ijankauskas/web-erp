import { z } from 'zod'

export const depositosSchema = z.object({
    depo_codi: z.string().min(1, {
        message: "Debe completar el codigo."
    }),
    descrip: z.string().min(1, {
        message: "Debe completar la descripcion."
    }),

    domicilio: z.string().optional(),
    telefono: z.string().optional(),
    provincia: z.string().optional(),
    obser: z.string().optional(),
    activo: z.any().optional(),
})