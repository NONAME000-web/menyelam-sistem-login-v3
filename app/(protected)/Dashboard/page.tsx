"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Page = () => {
    const { data: session } = useSession()

    const handleLogout = async() => {
        await signOut({
            redirect: true,
            callbackUrl: '/auth/login'
        })
    }

  return (
    <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div className='flex flex-col items-center justify-center space-y-4'>
            <h2 className='text-xl font-semibold'>Welcome {session?.user?.name}</h2>
            <p className='text-gray-500'>{session?.user?.name}</p>
            <Button onClick={handleLogout} variant='destructive'>Logout</Button>
        </div>
    </div>
  )
}

export default Page