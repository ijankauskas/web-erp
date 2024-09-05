import { z } from 'zod'


const componenteSchema = z.object({
    cod_articulo: z.string().optional(),
    cod_articulo_compo: z.string().optional(),
    cantidad: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "El precio de oferta debe ser un número.",
        }),
    costo_uni: z.any().optional()
});

export const articuloSchema = z.object({
    codigo: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    descripcion: z.string().min(5, {
        message: "La descripcion debe tener al menos 5 caracteres."
    }),
    descripcion_adicional: z.string().optional(),
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
    agru_1: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 1."
    }),
    agru_2: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 2."
    }),
    agru_3: z.string().min(1, {
        message: "Debe seleccionar la agrupacion 3."
    }),
    activo: z.any().optional(),
    componentes: z.array(componenteSchema).optional(),
    usa_compo: z.any().optional(),
    sin_stock: z.any().optional(),
    iva: z.any().optional().transform(val => parseFloat(val)),
    um: z.string().optional(),
    cant_default: z.any()
        .transform(val => parseFloat(val))
        .optional(),
    cod_barras: z.string().optional(),
    
    costo_iva: z.any().optional().transform(val => parseFloat(val)),



})
