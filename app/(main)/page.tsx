import RecipeList from "@/components/main/recipe-list"

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  let { filter } = await searchParams
  if (!filter) filter = ""
  return (
    <main className="grow">
      <RecipeList filter={filter as string} />
    </main>
  )
}

export default HomePage
