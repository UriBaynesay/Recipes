import { SignOutButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = auth()
  
  return (
    <div>
      <header className="flex justify-between">
        <h1>Recipe</h1>
        {user.userId ? <SignOutButton /> : <Link href="/sign-in">Sign in</Link>}
      </header>
      {children}
    </div>
  )
}
