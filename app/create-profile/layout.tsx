import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Profile",
}

export default async function CreateProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full md:px-24 lg:px-60">{children}</div>
  )
}
