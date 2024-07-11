import { z } from 'zod'

export const usuarioSchema = z.object({
    cuit: z.string().min(3,{
        message: "El cuit tiene que tener 3 caracteres."
    }),
    fecha_nac: z.string().optional(),
    nombre: z.string().optional(),
    apellido: z.string().optional(),
    email: z.string().email({
        message: "Por favor ingresar un mail valido."
    }),
    pass: z.string()
            .min(1,{
                message: "La contraseña no puede estar vacia."
            }),
    repetir_pass: z.string()
                    .min(1,{
                        message: "Repetir contraseña no puede estar vacia."
                    }),
    pais: z.string().optional(),
    direccion: z.string().optional(),
    ciudad: z.string().optional(),
    provincia: z.string().optional(),
    cp: z.string().optional(),
}).refine( data => data.pass === data.repetir_pass,{
    message: "Las contraseñas no coinciden",
    path: ["repetir_pass"]
})