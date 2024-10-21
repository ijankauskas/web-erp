import { z } from 'zod'

const componenteSchema = z.object({
    cod_articulo: z.union([z.string(), z.null()]).optional(),
    cod_articulo_compo: z.union([z.string(), z.null()]).optional(),
    cantidad: z.any()
        .refine(val => !isNaN(Number(val)), {
            message: "La cantidad debe ser un número.",
        })
        .transform(val => parseFloat(val)),
    costo_uni: z.union([z.any(), z.null()]).optional().transform(val => val !== null && val !== '' ? parseFloat(val) : null),
});

export const articuloSchema = z.object({
    codigo: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    descripcion: z.string().min(5, {
        message: "La descripcion debe tener al menos 5 caracteres."
    }),
    descripcion_adicional: z.union([z.string(), z.null()]).optional(),
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
        .refine(val => val === null || !isNaN(Number(val)), {
            message: "El stock debe ser un número.",
        })
        .transform(val => val === '' || val === null ? null : parseFloat(val)),
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
    agru_1: z.union([z.any(), z.null()]).optional(),
    agru_2: z.union([z.any(), z.null()]).optional(),
    agru_3: z.union([z.any(), z.null()]).optional(),
    activo: z.union([z.any(), z.null()]).optional(),
    componentes: z.array(componenteSchema).optional(),
    usa_compo: z.union([z.any(), z.null()]).optional(),
    sin_stock: z.union([z.any(), z.null()]).optional(),
    iva: z.union([z.any(), z.null()]).optional().transform(val => val !== null && val !== '' ? parseFloat(val) : null),
    um: z.union([z.string(), z.null()]).optional(),
    cant_default: z.union([z.any(), z.null()]).optional().transform(val => val !== null && val !== '' ? parseFloat(val) : null),
    cod_barras: z.union([z.string(), z.null()]).optional(),
    costo_iva: z.union([z.any(), z.null()]).optional().transform(val => val !== null && val !== '' ? parseFloat(val) : null),
});
