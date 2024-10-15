import RecipeList from "@/components/main/recipe-list"

const HomePage =  ({ searchParams }: { searchParams: { filter?: string } }) => {
  const filter = searchParams.filter || ""
  return <main className="grow">
    <RecipeList filter={filter}/>
  </main>
}

export default HomePage
