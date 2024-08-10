
'use client';

import { useParams } from 'next/navigation'
import React from 'react'
import { FlipWords } from '@/components/ui/flip-words'

function FeedBackGreet() {
    const message = ["Feedback", "Message","Review"]
    const params = useParams<{username:string}>()
  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-gray-800'>
       <div className='flex flex-col items-center justify-center p-4 flex-wrap content-center bg-gray-800 text-white text-2xl h-52  '>
        <p>Hey, Thanks for your </p>
        <FlipWords className='text-blue-200' words={message} /> 
        <p className='text-xl'> This will help our organizations to improve our Service and Products.   </p>
       </div>
    </div>
  )
}

export default FeedBackGreet