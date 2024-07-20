import { z } from 'zod'

export const compraSchema = z.object({
    numero: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    fecha: z.string().optional(),
    fechaVenci: z.string().optional(),
    fechaPago: z.string().optional(),
    codProveedor: z.string().optional(),
    razonProveedor: z.string().optional(),
})