import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
}

export default async function EditProfileLayout({
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