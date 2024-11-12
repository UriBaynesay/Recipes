import RecipeList from "@/components/main/recipe-list"

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string,tag?:string[] }>
}) => {
  const q = await searchParams
  return (
    <main className="grow mx-2">
      <RecipeList q={q} />
    </main>
  )
}

export default HomePage
