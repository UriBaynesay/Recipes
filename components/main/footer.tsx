import Image from "next/image"
import Link from "next/link"
import logo from "@/app/public/logo.png"

const Footer = () => {
  return (
    <footer className="bg-[#F2F2F2] md:px-24 py-8 h-[300px]">
      <Link href="/">
        <Image alt="Logo" src={logo} width={48} height={48} className="mb-8"/>
        <h1 className="text-5xl">Recipes</h1>
      </Link>
    </footer>
  )
}

export default Footer