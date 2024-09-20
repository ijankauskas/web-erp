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

export const NotaCreditoSchema = z.object({
    tipo: z.string().min(1, {
        message: "Debe seleccionar un comprobante."
    }),
    numero: z.string().min(1, {
        message: "El numero no puede estar vacio."
    })
        .transform(val => parseFloat(val)),
    fecha: z.string().min(1, {
        message: "La fecha no puede estar vacio."
    }),
    mone: z.string()
        .min(1, {
            message: "Debe completar la moneda.",
        }),
    mone_coti: z.any()
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "Ingrese la cotizacion.",
        }),
    num_cliente: z.any()
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "Debe seleccionar un cliente.",
        }),
    articulos: z.array(articulos).optional(),
})