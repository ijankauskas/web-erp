import { z } from 'zod'

export const VentaSchema = z.object({
    numero: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    fecha: z.string().optional(),
    num_cliente: z.string().optional(),
})