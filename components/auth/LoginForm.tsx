"use client"

import * as z from 'zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/Scemas'
import { LoginAccount } from '@/app/actions/login'
import { CardWrapper } from './CardWrapper'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ErrorForm } from '../ErrorForm'
import { SuccessForm } from '../SuccesForm'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const LoginForm = () => {
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            LoginAccount(values).then((res) => {
                if(res?.error) setError(res.error)
                else setSuccess("Login Success")
                router.refresh()
                router.push(DEFAULT_LOGIN_REDIRECT)
            })
        })
    }

  return (
    <CardWrapper headerLabel='Welcome In Page Login' backButtonLabel='Have not any account ? ' backButtonHref='/auth/register' showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
                    <FormField control={form.control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Enter Your Email' {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Enter Your Password' {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                {error && <ErrorForm message={error} />}
                {success && <SuccessForm message={success}/>}
                <Button className='w-full' variant={"default"} type='submit'>Login</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm