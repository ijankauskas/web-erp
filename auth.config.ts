import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./app/validaciones/signIn"
import { DbSingIn } from "./app/lib/data"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            authorize: async (credentials: any) => {
                const { data, success } = signInSchema.safeParse(credentials);
                if (!success) {
                    throw new Error("Credenciales invalidas.")
                }
                let respuesta: any = await DbSingIn(data);
                let user = null
                const rta = await respuesta.json();
                console.log(rta);
                
                if (respuesta.ok) {
                    user = {
                        id: rta.id,
                        name: rta.username,
                        email: rta.email,
                    }
                } else {
                    throw new Error(rta.message)
                }

                return user
            },
        }),],
} satisfies NextAuthConfig