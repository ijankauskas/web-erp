import { z } from "zod"

export const signInSchema = z.object({
    email: z.string({ required_error: "Email is requerido" })
        .min(1, "Email is requerido")
        .email("Email invalido"),
    password: z.string({ required_error: "Password es requerido" })
        .min(1, "Password es requerido")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})