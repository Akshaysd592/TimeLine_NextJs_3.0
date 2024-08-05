
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get-Line Application",
  description: "Making anonymours feedback easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    
      <div>
        <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar/>
        {children}
        </ThemeProvider>

      </div>
          
  );
}
