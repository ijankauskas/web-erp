import { z } from 'zod'

export const clienteSchema = z.object({
    codigo: z.any()
    .optional()
    .refine(val => !isNaN(Number(val)), {
        message: "El codigo de cliente debe ser numerico.",
    }),
    cuit: z.string().min(1, {
        message: "El cuit no puede estar vacio."
    }),
    cate_iva: z.string().min(1, {
        message: "Debe seleccionar la categoria de IVA."
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
    domicilio:z.string().optional(),
    localidad:z.string().optional(),
    observaciones: z.string().optional(),
    activo: z.any().optional(),
})