import Image from "next/image"
import Link from "next/link"
import logo from "@/app/public/logo.png"
import { auth } from "@clerk/nextjs/server"
import { getUserProfile } from "@/app/(main)/profile/db"
import { redirect } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"

const Header = async () => {
  const user = auth()
  let profile
  if (user.userId) {
    profile = await getUserProfile(user.userId)
    if (!profile) redirect("/profile/create")
  }
  return (
    <header className="flex justify-between mb-10">
      <Link href="/">
        <Image alt="Logo" src={logo} width={48} height={48} />
      </Link>
      <nav>
        {profile ? (
          <div className="flex [&>*]:ml-4">
            <SignOutButton />
            <Link href={`/profile/${profile.id}`}>Profile</Link>
            <Link href={`/recipe/create`}>Create Recipe</Link>
          </div>
        ) : (
          <Link href="/sign-in">Sign in</Link>
        )}
      </nav>
    </header>
  )
}

export default Header
