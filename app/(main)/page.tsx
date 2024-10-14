import RecipeList from "@/components/main/recipe-list"

const HomePage =  ({ searchParams }: { searchParams: { filter?: string } }) => {
  const query = searchParams.filter || ""
  return <main className="grow">
    <RecipeList query={query}/>
  </main>
}

export default HomePage
