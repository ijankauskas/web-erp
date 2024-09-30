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
    articulos: z.array(articulos).optional(),
    pagos: z.array(pagos).optional(),
    tipo_reci: z.any().optional(),
    num_reci: z.any().optional().transform(val => parseFloat(val)),
    cate_iva: z.any().optional().transform(val => parseFloat(val)),

}).refine(
    (data) => {
        // Si el array de pagos no está vacío, tipo_reci y num_reci deben estar completos
        if (data.pagos && data.pagos.length > 0) {
            return data.tipo_reci 
        }
        // Si no hay pagos o está vacío, no hay problema
        return true;
    },
    {
        message: 'Si hay pagos, tipo_reci son obligatorios',
        path: ['tipo_reci'], // Indica en qué campos se genera el error
    }
).refine(
    (data) => {
        // Si el array de pagos no está vacío, tipo_reci y num_reci deben estar completos
        if (data.pagos && data.pagos.length > 0) {
            return data.num_reci 
        }
        // Si no hay pagos o está vacío, no hay problema
        return true;
    },
    {
        message: 'Si hay pagos, el numero es obligatorios',
        path: ['num_reci'], // Indica en qué campos se genera el error
    }
);