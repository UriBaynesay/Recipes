import Image from "next/image"
import Link from "next/link"
import logo from "@/app/public/logo.png"
import { auth } from "@clerk/nextjs/server"
import { getUserProfile } from "@/app/(main)/profile/db"
import { redirect } from "next/navigation"
import NavBar from "./nav-bar"
import { Profile } from "prisma/prisma-client"

const Header = async () => {
  const user = await auth()
  let profile
  if (user.userId) {
    profile = await getUserProfile(user.userId)
    if (!profile) redirect("/create-profile")
  }
  return (
    <header className="flex justify-between mb-10">
      <Link href="/" className="flex">
        <Image alt="Logo" src={logo} width={56} height={56} className="sm:hidden"/>
        <h1 className="hidden sm:block text-5xl font-bold text-background">Recipes</h1>
      </Link>
      <NavBar profile={profile as Profile}/>
    </header>
  )
}

export default Header
