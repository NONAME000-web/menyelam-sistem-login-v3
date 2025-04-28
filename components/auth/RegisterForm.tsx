"use client"

import * as z from 'zod'
import React, { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/Scemas'
import { RegistAccount } from '@/app/actions/register'
import { CardWrapper } from './CardWrapper'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { ErrorForm } from '../ErrorForm'
import { Button } from '../ui/button'
import { SuccessForm } from '../SuccesForm'

const RegisterForm = () => {
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const Submit = (values: z.infer<typeof RegisterSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            RegistAccount(values).then((res) => {
                setError(res?.error)
                setSuccess(res?.success)
            })
        })
    }

  return (
    <CardWrapper headerLabel='Welcome In Page Regist Account' backButtonLabel='Have any account ? ' backButtonHref='/auth/login' showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(Submit)} className='space-y-6'>
                <div className='space-y-4'>
                    <FormField control={form.control} name='username' render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Enter Your Username' {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Enter Your Email' {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Enter Your Password' {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>
                {error && <ErrorForm message={error} />}
                {success && <SuccessForm message={success}/>}
                <Button className='w-full' variant={"default"} type='submit' disabled={isPending}>Register</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm