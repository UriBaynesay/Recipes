import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Recipe",
}

export default async function CreateRecipeLayout({
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