"use client"

import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Profile } from "prisma/prisma-client"
import Hamburger from "@/app/public/hamburger.svg"
import X from "@/app/public/x.svg"
import Image from "next/image"
import { useState } from "react"

const NavBar = ({ profile }: { profile: Profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="sm:mt-auto text-sm">
      <Image
        className="sm:hidden"
        src={Hamburger}
        alt="Hamburger"
        height={36}
        width={36}
        onClick={() => setIsMenuOpen(true)}
      />
      {profile ? (
        <>
          {isMenuOpen && (
            <div className="sm:hidden absolute h-dvh w-dvw bg-slate-100 top-0 left-0 p-4 text-2xl flex flex-col items-start">
              <Image
                className="sm:hidden ml-auto"
                src={X}
                alt="X"
                height={36}
                width={36}
                onClick={() => setIsMenuOpen(false)}
              />
              <SignOutButton />
              <Link
                
                href={`/profile/${profile.id}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                
                href={`/recipe/create`}
                onClick={() => setIsMenuOpen(false)}
              >
                Create Recipe
              </Link>
            </div>
          )}
          <div className="hidden sm:flex [&>*]:ml-4">
            <SignOutButton />
            <Link
              
              href={`/profile/${profile.id}`}
            >
              Profile
            </Link>
            <Link
              
              href={`/recipe/create`}
            >
              Create Recipe
            </Link>
          </div>
        </>
      ) : (
        <>
          {isMenuOpen && (
            <div className="sm:hidden absolute h-dvh w-dvw bg-slate-100 top-0 left-0 p-4 text-2xl flex flex-col items-start">
              <Image
                className="sm:hidden ml-auto"
                src={X}
                alt="X"
                height={36}
                width={36}
                onClick={() => setIsMenuOpen(false)}
              />
              <Link
                
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          )}
          <Link
            className="hidden sm:block"
            href="/sign-in"
          >
            Sign in
          </Link>
        </>
      )}
    </nav>
  )
}

export default NavBar
