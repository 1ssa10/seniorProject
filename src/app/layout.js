"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Sidenav from "../components/SideNav";
import Providers from "../components/Providers";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@material-tailwind/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <ThemeProvider>
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="container mx-auto flex items-start sm:pr-4">
            {/* <Sidenav /> */}

            <div className=" min-h-fit  mx-1 flex-grow border-x">
              <Navbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
    // </ThemeProvider>
  );
}
