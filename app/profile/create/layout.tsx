import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Profile",
}

export default async function CreateProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}