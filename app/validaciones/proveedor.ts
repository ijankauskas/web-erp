import { z } from 'zod'

export const proveedorSchema = z.object({
    codigo: z.string()
        .min(1, {
            message: "El codigo no puede estar vacio."
        })
        .refine(val => !isNaN(Number(val)), {
            message: "El codigo de proveedor debe ser numerico.",
        }),
    razon: z.string().min(1, {
        message: "La razon social no puede estar vacia."
    }),
    nombre_fantasia: z.string().min(1, {
        message: "El nombre de fantasia no puede estar vacia."
    }),
    mail: z.string().optional(),
    agru_1: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 1."
    }),
    agru_2: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 1."
    }),
    agru_3: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 1."
    }),
})