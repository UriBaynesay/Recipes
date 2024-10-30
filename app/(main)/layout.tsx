import Footer from "@/components/main/footer"
import Header from "@/components/main/header"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex flex-col h-full mx-2 md:mx-24 lg:mx-60">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
