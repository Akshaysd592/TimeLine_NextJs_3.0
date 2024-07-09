'use client'

import { SessionProvider } from "next-auth/react"  // for using session

export default function AuthProvider ({children}:{children:React.ReactNode}){
     return(
        <SessionProvider>
            {children}
        </SessionProvider>
     )
}