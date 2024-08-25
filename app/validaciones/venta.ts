import { z } from 'zod'

const articulos = z.object({
    codigo: z.any().optional(),
    cantidad: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "La cantidad debe ser un número.",
        })
        .refine(val => val >= 0, {
            message: "La cantidad debe ser mayor a cero.",
        }),
    precio_vta: z.any().optional(),
    costo: z.any().optional(),
});

export const VentaSchema = z.object({
    tipo: z.string().optional(),
    numero: z.string().min(1, {
        message: "El numero no puede estar vacio."
    })
    .transform(val => parseFloat(val)),
    fecha: z.string().min(1, {
        message: "La fecha no puede estar vacio."
    }),
    mone: z.string().optional(),
    num_cliente: z.string().min(1, {
        message: "Debe selecciona un cliente."
    })
    .transform(val => parseFloat(val)),
    articulos: z.array(articulos).optional(),
})