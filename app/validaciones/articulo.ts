import { z } from 'zod'


const componenteSchema = z.object({
    cod_articulo: z.any().optional(),
    cod_articulo_compo: z.any().optional(),
    cantidad: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de oferta debe ser un número.",
        }),
    costo_uni: z.any().optional()
});

export const articuloSchema = z.object({
    codigo: z.any().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    descripcion: z.any().min(5, {
        message: "La descripcion debe tener al menos 5 caracteres."
    }),
    descripcion_adicional: z.any().optional(),
    costo: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "El costo debe ser un número.",
        })
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "El costo debe ser mayor a cero.",
        }),
    stock: z.any()
        .optional()
        .refine(val => !isNaN(Number(val)), {
            message: "El stock debe ser un número.",
        })
        .nullable().transform(val => (val == '' ? null : val))
        .transform(val => parseFloat(val)),
    precio_vta: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de venta debe ser un número.",
        })
        .transform(val => parseFloat(val))
        .refine(val => val > 0, {
            message: "El precio de venta debe ser mayor a cero.",
        }),
    precio_oferta: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de oferta debe ser un número.",
        })
        .transform(val => parseFloat(val)),
    agru_1: z.any().optional(),
    agru_2: z.any().optional(),
    agru_3: z.any().optional(),
    activo: z.any().optional(),
    componentes: z.array(componenteSchema).optional(),
    usa_compo: z.any().optional(),
    sin_stock: z.any().optional(),
    iva: z.any().optional().transform(val => parseFloat(val)),
    um: z.any().optional(),
    cant_default: z.any()
        .transform(val => parseFloat(val))
        .optional(),
    cod_barras: z.any().optional(),

    costo_iva: z.any().optional().transform(val => parseFloat(val)),



})
