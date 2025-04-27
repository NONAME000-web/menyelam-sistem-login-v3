"use server"

import * as z from "zod"
import { LoginSchema } from "@/Scemas"
import { getUserByEmail } from "@/data/user"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const LoginAccount = async(values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)
    if(!validatedFields.success) return {error: "Invalid Fields"}

    const { email, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if(!existingUser || existingUser.password !== password) return {error: "User not found"}

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if(error instanceof AuthError){
            if(error.message === "CredentialsSignin") return {error: "Invalid Account"}
            else return {error: "Error"}
        }
    }
}