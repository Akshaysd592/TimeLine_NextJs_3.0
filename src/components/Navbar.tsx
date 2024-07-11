'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth' // this User will include session and token
import { Button } from './ui/button'



function Navbar() {
   
    // according to documentation
    const {data : session}= useSession() // you can no access data related to user directly from session , can be accessed from userSession
    const user : User = session?.user as User // if variable not accepting data due to typescipt then use => as dat

  return (
    <nav className='p-4 md:p-6 shodow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0 ' href='#'>GetLine Mystry Message </a>
            {
                session?(
                    <>
                    <span className='mr-4 '>
                        Welcome, {user.username || user.email}
                    </span>
                    <Button className='w-full md:w-auto ' onClick={()=>signOut()}>Logout</Button>
                    </>
                ):(
                    <Link href='/sign-in'>
                        <Button className='w-full md:w-auto '>Log In </Button>
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar