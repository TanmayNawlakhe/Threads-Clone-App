'use client';
import Link from "next/link";
import {sidebarLinks} from "@/constants/index"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

function LeftSidebar(){
    const router = useRouter();
    const pathname = usePathname();
    const {userId} = useAuth();

    return (
        <section className="custom-scrollbar  leftsidebar">
            <div className="flex justify-start text-sm  flex-1 flex-col  gap-3 pt-[5rem] px-3">
                {
                    sidebarLinks.map((link)=>{

                        const isActive = (pathname.includes(link.route )&& link.route.length > 1) || pathname === link.route;

                        let route = link.route; // Store the original route
                        if (link.route === '/profile' && userId) {
                            route = `/profile/${userId}`;  // Create a new variable instead of modifying the array
                        }
                        return (
                            <Link href={route} key={link.label} className={`leftsidebar_link lg:justify-start justify-center ${isActive && 'bg-primary-500'}`}>
                                <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
    
                                <p className="text-light-1 max-sm:hidden">{link.label}</p>
                            </Link>
                        )
                    })
                }
            </div>

            <div className="mt-10 px-4">
            <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer lg:justify-start justify-center gap-4 p-2">
                                <Image src="/assets/logout.svg" alt="logout" width={28} height={28} />

                                <p className="text-light-2 max-sm:hidden">Logout</p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
            </div>

            
        </section>
    )
}
export default LeftSidebar;