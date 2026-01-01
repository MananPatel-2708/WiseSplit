"use client"
import React from 'react';
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { useStoreUser } from "../hooks/use-store-user";
import { usePathname } from "next/navigation";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from 'next/link';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';


const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className='flex items-center gap-2'>
        <Image
        src={"/logos/WiseSplit.png"}
        alt="WiseSplit+9 Logo"
        width={200}
        height={200}
        className="h-11 w-auto object-contain"
        />
        </Link>

        {path=== '/' && (
        <div className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium mr-4 text-gray-700 hover:text-green-900 transition">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium mr-4 text-gray-700 hover:text-green-900 transition">How It Works</Link>
        </div>
        )}

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
            <Button 
            variant='outline'
            className={"hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"}
            >
              <LayoutDashboard className='h-4 w-5'></LayoutDashboard>
              Dashboard
            </Button>

            <Button variant='ghost' className={"md:hidden h-10 w-10 p-0"}>
              <LayoutDashboard className='h-4 w-5'></LayoutDashboard>
            </Button>
            
            </Link>

            <UserButton/>
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant={'ghost'}>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className={"bg-green-600 hover:bg-green-700 border-none"}>Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
  );
}

export default Header;
