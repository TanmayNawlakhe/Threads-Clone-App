import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";


export const metadata = {
  title: 'Threads',
  description : 'A Next.js 13 Meta Threads Application',

}

 const inter= Inter({subsets : ["latin"]})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar/>

          <main className="flex">
            <LeftSidebar/>

            <section className="main-container w-full">
              <div className="w-full max-w-full lg:pr-64 text-left ">
                {children}
              </div>
            </section>
            <RightSidebar/>
          </main>
          <Bottombar/>

        </body>
      </html>
    </ClerkProvider>
  );
}
