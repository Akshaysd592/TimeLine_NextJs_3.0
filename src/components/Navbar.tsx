"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth"; // this User will include session and token
import { Button } from "./ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import MoveDashboard from "./NavigateButton";
import { useParams, usePathname } from "next/navigation";
import NavigateButton from "./NavigateButton";
import { useToast } from "./ui/use-toast";


function Navbar() {
  const {toast} = useToast();
  const pathname = usePathname()
  
  // according to documentation
  const { data: session } = useSession(); // you can no access data related to user directly from session , can be accessed from userSession
  const user: User = session?.user as User; // if variable not accepting data due to typescipt then use => as dat
   function signOutnow(){
    
    signOut();// just call signOut function all session and localstorage get removed
    toast({
      title:"Signed Out..."
    })
   }
  return (
    <nav className="p-4 shadow-md flex border-[4px] flex-row min-w-full ">
      <div className=" flex w-full sm:flex-row justify-between items-center">
        <div className=" flex flex-col sm:flex-row ">
          <div className="flex items-center flex-row  gap-4 text-center justify-center ">
           <a className=" text-sm font-bold  flex sm:text-xl md:text-2xl" href="">
           <p className="text-xl uppercase font-bold">TimeLine {" "}</p>
           </a>
           <ThemeSwitcher />
          </div>
      
        
        <div className=" p-3 flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-28">
        {  
            (pathname=='/' && session)?
            <NavigateButton text={"Dashboard"} linkto="/dashboard"/>:
            ((pathname=='/dashboard')?<NavigateButton text={"Home"} linkto="/"/>:"")
            
        }
        </div>
        </div>


       


          <div>
            {session ? (
              
              
               <div className="flex flex-col sm:flex-row items-center  pl-12 gap-3 w-full text-center justify-center  p-4 ">
               <div className="">
                  Welcome, {user.username || user.email}
                </div>
                <Button className="w-2/3 md:w-auto  " onClick={() => signOutnow()}>
                  Logout
                </Button>
               </div>
              
            ) : (
                <div className="flex gap-2 ">
              <Link href="/sign-in">
                <Button className="w-full md:w-auto ">Sign In </Button>
              </Link>
              <Link href={'/sign-up'}>
                    <Button className="w-full md:w-auto">Sign Up</Button>
              </Link>
              </div>
              
            )}
          </div>
          
        </div>
   
    </nav>
  );
}

export default Navbar;
