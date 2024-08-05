'use client';

import { useParams } from 'next/navigation'
import React from 'react'

function Feedback() {
    const params = useParams<{username:string}>()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
        <p>Hey, Dear <span className='text-xl text-red-600'>{params.username}</span>  thank you for your </p>
        <p> This will help our organizations to improve our products  </p>
    </div>
  )
}

export default Feedback