import { getRecipes } from "@/app/(main)/recipe/db"
import RecipePreview from "./recipe-preview"

const RecipeList = async ({ query }: { query: string }) => {
  const recipes = await getRecipes(query)
  return (
    <ul className="md:grid md:grid-cols-4 md:gap-4">
      {recipes?.map((recipe) => (
        <RecipePreview key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  )
}

export default RecipeList
