import Image from "next/image"
import Link from "next/link"
import logo from "@/app/public/logo.png"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="md:px-2 h-full flex flex-col">
      <header className="flex justify-between">
        <Link href="/">
          <Image alt="Logo" src={logo} width={48} height={48} />
        </Link>
      </header>
      {children}
    </div>
  )
}
