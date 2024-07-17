import { z } from 'zod'

export const articuloSchema = z.object({
    codigo: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    descripcion: z.string().min(5, {
        message: "La descripcion debe tener al menos 5 caracteres."
    }),
    descripcion_adicional: z.string().optional(),
    costo: z.string()
        .refine(val => !isNaN(Number(val)), {
            message: "El costo debe ser un número.",
        })
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "El costo debe ser mayor a cero.",
        }),
    stock: z.string()
        .optional()
        .refine(val => !isNaN(Number(val)), {
            message: "El stock debe ser un número.",
        })
        .nullable().transform(val => (val == '' ? null : val)),
    precio_vta: z.string()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de venta debe ser un número.",
        })
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "El precio de venta debe ser mayor a cero.",
        }),
    precio_oferta: z.string()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de oferta debe ser un número.",
        })
        .transform(val => parseFloat(val)),
    oferta: z.string().optional(),
    destacado: z.string().optional(),
    activo: z.object({
        file: z.instanceof(File)
    }),
})