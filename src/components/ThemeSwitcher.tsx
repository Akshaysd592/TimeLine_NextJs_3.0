'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { HoverBorderGradient } from './ui/hover-border-gradient';
import {Moon, Sun} from "lucide-react"

function ThemeSwitcher() {
    const [mount ,setMount] = useState(false)
    const {theme,setTheme} = useTheme();
     
   // initially make mount true in start
   useEffect(()=>{
    setMount(true)
   },[])

   if(!mount){
    return <> </>
   }

  
  
  
    function switchtheme(){
        if(theme=='light'){
            setTheme('dark')
        }else{
            setTheme('light')
        }
    }
  return (
    <div onClick={()=>{
        if(mount) switchtheme()
    }}
    > 
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white border-b-slate-600  flex items-center p-1 m-1"
      >
         
        {
            (theme == 'dark')? (<span><Sun/> </span>):(<span><Moon/></span>)
        }
         
        
      </HoverBorderGradient>
    </div>
        
    </div>
  )
}

export default ThemeSwitcher