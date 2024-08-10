import React from 'react'
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { useRouter } from 'next/navigation';

interface NavigateType {
    text:string;
    linkto:string
}


function NavigateButton({text,linkto}:NavigateType){
    const navigate = useRouter();
    function moveNavigate(){
            navigate.replace(`${linkto}`);
    }
    return (
        <div onClick={moveNavigate}>
            <HoverBorderGradient

             containerClassName="rounded-full"
             as="button"
             className="dark:bg-black bg-white text-black dark:text-white border-b-slate-800   flex items-center space-x-2"
            >
               {text}
            </HoverBorderGradient>
        </div>
    )
}

export default NavigateButton;