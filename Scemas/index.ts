import * as z from 'zod';

export const RegisterSchema = z.object({
    username: z.string().min(4).max(25),
    email: z.string().email(),
    password: z.string().min(8),
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})