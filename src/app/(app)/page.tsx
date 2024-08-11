'use client'
import React from 'react'
import { useScroll, useTransform } from "framer-motion";

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
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { motion } from "framer-motion";
import { GoogleGeminiEffect } from '@/components/ui/google-gemini-effect';

function Home() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
 
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  
  return (
  <>
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        With TimeLine,you can make development easier and smarter. Get faster {" "}
        <Highlight className="text-black dark:text-white">
          Feedbacks, Reviews and Updates.
        </Highlight>
      </motion.h1>
    </HeroHighlight>
    <div
       className="h-[400vh]  w-full bg-gray-800 dark:bg-black dark:border dark:border-white/[0.1] rounded-md relative  overflow-clip"
      ref={ref}
      >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title='Get Instant Feedback '
        description='You can get feed-back from your client by creating your account and generating unique URL.'
        className='pt-3 w-full  '
      />
    </div>
    
    
    <footer className='text-center p-4 md:p-6 dark:bg-gray-900 border-t-gray-400 border-t-4'>
      @2024 TimeLine True Feedback By Akshay Dhobale . All rights reserved 
    </footer>
   
    </>

  )
}

export default Home