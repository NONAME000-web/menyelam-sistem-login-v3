"use server"

import * as z from "zod"
import { RegisterSchema } from "@/Scemas"
import { Database } from "@/lib/db"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"

export const RegistAccount = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if(!validatedFields.success) return { error: "Invalid Fields"}

    const { email, password, username } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if(existingUser) return { error: "User already exists"}

    const hashedPassword = await bcrypt.hash(password, 10)

    await Database.user.create({
        data: {
            email,
            password: hashedPassword,
            name: username,
        },
    })
    
    return {success: "User created successfully"}
}