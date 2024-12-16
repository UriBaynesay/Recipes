import RecipeList from "@/components/main/recipe-list"
import { Suspense } from "react"
import RecipeFilter from "@/components/main/recipe-filter"
import RecipesListSkeleton from "@/components/main/recipes-list-skeleton"

export const experimental_ppr = true

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; tag?: string[] }>
}) => {
  const q = await searchParams
  return (
    <main className="grow mx-2">
      <RecipeFilter />
      <Suspense fallback={<RecipesListSkeleton />}>
        <RecipeList q={q} />
      </Suspense>
    </main>
  )
}

export default HomePage
