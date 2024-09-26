"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (values: any) => {
    try {
        let respuesta = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        
        return {success : true};
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        }
        return { error: "error 500" };
    }
};

export const signOutAction = async () => {
    try {
        await signOut()
        return {success : true};
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        }
        return { error: "error 500" };
    }
};