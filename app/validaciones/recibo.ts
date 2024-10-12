import { z } from 'zod'


export const ReciboSchema = z.object({
    tipo: z.string().min(1, {
        message: "Debe seleccionar un comprobante."
    }),
    numero: z.string().min(1, {
        message: "El numero no puede estar vacio."
    }).transform(val => parseFloat(val)),
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
})