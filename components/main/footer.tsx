import Image from "next/image"
import Link from "next/link"
import logo from "@/app/public/logo.png"

const Footer = () => {
  return (
    <footer className="py-8">
      <Link href="/" className="hover:no-underline">
        <Image alt="Logo" src={logo} width={48} height={48} className="mb-8" />
        <h1 className="text-5xl text-background">Recipes</h1>
      </Link>
    </footer>
  )
}

export default Footer