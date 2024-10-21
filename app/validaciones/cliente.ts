import { z } from 'zod'

export const clienteSchema = z.object({
    codigo: z.union([z.string(), z.null()]).optional().refine(val => !isNaN(Number(val)), {
        message: "El codigo de cliente debe ser numerico.",
    }),
    cuit: z.union([z.string(), z.null()]).min(1, {
        message: "El cuit no puede estar vacio."
    }),
    cate_iva: z.union([z.string(), z.null()]).min(1, {
        message: "Debe seleccionar la categoria de IVA."
    }),
    razon: z.union([z.string(), z.null()]).min(1, {
        message: "La razon social no puede estar vacia."
    }),
    nombre_fantasia: z.union([z.string(), z.null()]).min(1, {
        message: "El nombre de fantasia no puede estar vacia."
    }),
    mail: z.union([z.string(), z.null()]).optional(),
    agru_1: z.union([z.string(), z.null()]).optional(),
    agru_2: z.union([z.string(), z.null()]).optional(),
    agru_3: z.union([z.string(), z.null()]).optional(),
    telefono: z.union([z.string(), z.null()]).optional(),
    celular: z.union([z.string(), z.null()]).optional(),
    domicilio: z.union([z.string(), z.null()]).optional(),
    localidad: z.union([z.string(), z.null()]).optional(),
    observaciones: z.union([z.string(), z.null()]).optional(),
    activo: z.union([z.boolean(), z.null()]).optional(),
});
