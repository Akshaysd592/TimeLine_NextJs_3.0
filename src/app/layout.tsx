import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time-Line Application",
  description: "Making anonymous feedback easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
       <html lang="en">
         <body className={inter.className}>
        
        {children}
        <Toaster/>
         </body>
       </html>
    </AuthProvider>
   
  );
}
