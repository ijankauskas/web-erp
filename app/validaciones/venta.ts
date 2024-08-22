import { z } from 'zod'

const articulos = z.object({
    codigo: z.any().optional(),
    cantidad: z.any().optional(),
    precio_vta: z.any().optional(),
});

export const VentaSchema = z.object({
    // tipo: z.string().min(3, {
    //     message: "El codigo debe tener al menos 3 caracteres."
    // }),
    tipo: z.string().optional(),
    numero: z.string().min(3, {
        message: "El codigo debe tener al menos 3 caracteres."
    }),
    fecha: z.string().optional(),
    num_cliente: z.string().optional(),
    articulos: z.array(articulos).optional(),
})