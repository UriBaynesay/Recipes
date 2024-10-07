export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header>
        <h1>Recipe</h1>
      </header>
      {children}
    </div>
  )
}
