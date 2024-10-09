import { SignOutButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import logo from "@/app/public/logo.png"
import { getUserProfile } from "../profile/db"
import Image from "next/image"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = auth()
  let profile
  if (user.userId) {
    profile = await getUserProfile(user.userId)
    if (!profile) redirect("/profile/create")
  }

  return (
    <div className="flex flex-col h-full px-2">
      <header className="flex justify-between">
        <Link href="/">
          <Image alt="Logo" src={logo} width={48} height={48} />
        </Link>
        <nav>
          {profile ? (
            <div className="flex [&>*]:ml-4">
              <SignOutButton />
              <Link href={`/profile/${profile.id}`}>Profile</Link>
            </div>
          ) : (
            <Link href="/sign-in">Sign in</Link>
          )}
        </nav>
      </header>
      {children}
    </div>
  )
}
