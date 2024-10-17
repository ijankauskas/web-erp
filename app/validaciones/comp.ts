import { z } from 'zod'

export const compSchema = z.object({
    tipo: z.string().min(1, {
        message: "Debe completar el codigo."
    }),
    letra: z.string().min(1, {
        message: "Debe completar la letra."
    }),
    prox_num: z.any().optional().transform(val => parseFloat(val)),
    descrip: z.string().min(1, {
        message: "Debe completar la descripcion."
    }),
    porcentaje: z.any().optional().transform(val => parseFloat(val)),
    prefijo: z.string().min(1, {
        message: "Debe completar el prefijo."
    }),
    cod_afip: z.string().min(1, {
        message: "Debe completar el codigo de afip."
    }),
    compro_elec: z.string().min(1, {
        message: "Debe seleccionar el tipo de comprobante."
    }),
    activo: z.any().optional(),
    cod_grupo: z.string().optional(),
})