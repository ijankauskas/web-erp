import { z } from 'zod'

export const proveedorSchema = z.object({
    codigo: z.string()
        .refine(val => !isNaN(Number(val)), {
            message: "El codigo de proveedor debe ser numerico.",
        }),
    razon: z.string().min(5, {
        message: "La descripcion debe tener al menos 5 caracteres."
    }),
})