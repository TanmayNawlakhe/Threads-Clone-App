 import {ClerkProvider} from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'

 export const metadata = {
    title: 'Threads',
    description : 'A Next.js 13 Meta Threads Application',

 }

 const inter= Inter({subsets : ["latin"]})
 export default function Authlayout({
    children
} : {
    children: React.ReactNode
}){
    return (
        <ClerkProvider>
        <html lang = "en">
            <body className={` bg-dark-1 ${inter.className}`}>
                <div className="h-full w-full flex justify-center items-center ">

                
                {children}
                </div>

            </body>

        </html>

        </ClerkProvider> 
    )
 }