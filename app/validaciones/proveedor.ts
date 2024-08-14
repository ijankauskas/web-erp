import { z } from 'zod'

export const proveedorSchema = z.object({
    codigo: z.any()
        .optional()
        .refine(val => !isNaN(Number(val)), {
            message: "El codigo de proveedor debe ser numerico.",
        }),
    cuit: z.string()
        .min(1, {
            message: "El cuit no puede estar vacio."
        }),
    razon: z.string().min(1, {
        message: "La razon social no puede estar vacia."
    }),
    nombre_fantasia: z.string().min(1, {
        message: "El nombre de fantasia no puede estar vacia."
    }),
    mail: z.string().optional(),
    agru_1: z.string().optional(),
    agru_2: z.string().optional(),
    agru_3: z.string().optional(),
    telefono: z.string().optional(),
    celular: z.string().optional(),
    activo: z.any().optional(),
})