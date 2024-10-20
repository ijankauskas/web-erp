import { z } from 'zod'

const compEmitidos = z.object({
    tipo: z.any().optional(),
    num: z.any().optional(),
    saldo: z.any().optional()
        .transform(val => parseFloat(val)),
    mone: z.any().optional(),
    mone_coti: z.any().optional()
        .transform(val => parseFloat(val)),
});

const pagos = z.object({
    id: z.any().optional(),
    importe: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "La cantidad debe ser un número.",
        }),
    mone: z.any().optional(),
    mone_coti: z.any().optional()
        .transform(val => parseFloat(val)),
});

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
    compEmitidos: z.array(compEmitidos).optional(),
    pagos: z.array(pagos).optional(),
})