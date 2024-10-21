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
    mail: z.any().optional(),
    agru_1: z.any().optional(),
    agru_2: z.any().optional(),
    agru_3: z.any().optional(),
    telefono: z.any().optional(),
    celular: z.any().optional(),
    domicilio:z.any().optional(),
    localidad:z.any().optional(),
    observaciones: z.any().optional(),
    activo: z.any().optional(),
})