"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth"; // this User will include session and token
import { Button } from "./ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  // according to documentation
  const { data: session } = useSession(); // you can no access data related to user directly from session , can be accessed from userSession
  const user: User = session?.user as User; // if variable not accepting data due to typescipt then use => as dat

  return (
    <nav className="p-4 md:p-6 shadow-md flex  flex-row w-full ">
      <div className=" flex w-full  flex-col sm:flex-row justify-between items-center">
        <div className=" flex flex-row gap-4  ">
        <a className="text-center text-sm font-bold mb-4 md:mb-0  sm:text-xl md:text-2xl" href="#">
          GetLine {" "}
        </a>
        <ThemeSwitcher />
        </div>
      
      
        <div>
          <div>
            {session ? (
              <>
                <span className="mr-4 ">
                  Welcome, {user.username || user.email}
                </span>
                <Button className="w-full md:w-auto " onClick={() => signOut()}>
                  Logout
                </Button>
              </>
            ) : (
                <div className="flex gap-3">
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
      </div>
    </nav>
  );
}

export default Navbar;
