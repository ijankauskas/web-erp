import { z } from 'zod'

const articulos = z.object({
    codigo: z.any().optional(),
    cantidad: z.any()
        .transform(val => parseFloat(val))
        .refine(val => !isNaN(Number(val)), {
            message: "La cantidad debe ser un número.",
        })
        .refine(val => val >= 0, {
            message: "La cantidad debe ser mayor a cero.",
        }),
    precio_vta: z.any().optional(),
    costo_uni: z.any().optional(),
});

const pagos = z.object({
    id: z.any().optional(),
    importe: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "La cantidad debe ser un número.",
        })
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
    num_cliente: z.any()
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "Debe seleccionar un cliente.",
        }),
    articulos: z.array(articulos).optional(),
    pagos: z.array(pagos).optional(),
})