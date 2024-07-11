'use client'
import React from 'react'

// this is an  Home
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

import messages from '@/message.json'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

function Home() {
  return (
  <>
    <main className='flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white '>
      <section className='text-center mb-8 md:mb-12 '>
      <h1 className='text-3xl md:text-5xl font-bold'>
        Dive Into the world on Anonymous Feedback on GetLine
      </h1>
      <p className='mt-3 md:mt-4 text-base md:text-lg'>True Feedback - Where your Identity remains a secret</p>
      </section>


      <Carousel
      plugins={[Autoplay({delay:2000})]}
      className=''
      >
        <CarouselContent>
          {messages.map((message,index)=>(
            <CarouselItem key={index} className='p-4'>
              <Card>
                <CardHeader>
                   <CardTitle>
                    {message.title}
                   </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col md:flex-row items-start space-y-2 md:space-x-4 '>
                  <Mail className='flex-shrink-0'/>
                    <div>
                      <p>{message.content}</p>
                      <p className='text-xs text-muted-foreground'>
                        {message.received}
                      </p>
                    </div>


                </CardContent>
              </Card>

            </CarouselItem>
          ))}
        </CarouselContent>
        
      </Carousel>
    </main>

    <footer className='text-center p-4 md:p-6 bg-gray-900 text-white'>
      @2024 GetLine True Feedback . All rights reserved 
    </footer>
    </>

  )
}

export default Home