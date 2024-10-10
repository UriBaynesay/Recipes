import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Recipe",
}

export default async function EditRecipeLayout({
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