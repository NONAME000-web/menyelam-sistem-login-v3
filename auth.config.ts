import Credential from 'next-auth/providers/credentials'
import type { NextAuthConfig, User } from "next-auth"
import { getUserByEmail } from './data/user'
import { LoginSchema } from './Scemas'
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// import argon2 from 'argon2'
import bcrypt from 'bcryptjs'

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_SECRET_ID,
            clientSecret: process.env.GITHUB_SECRET_CREDENTIAL,
        }),
        Google({
            clientId: process.env.GOOGLE_SECRET_ID,
            clientSecret: process.env.GOOGLE_SECRET_CREDENTIAL,
        }),
        Credential({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);
                if (validateFields.success) {
                    const { email, password } = validateFields.data
                   
                    const user = await getUserByEmail(email);
                    
                    if(!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user
                }
                return null;
            },
        }),
    ],    
          
} satisfies NextAuthConfig