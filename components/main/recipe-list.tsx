import { getRecipes } from "@/app/(main)/recipe/db"
import RecipePreview from "./recipe-preview"

const RecipeList = async ({
  q,
}: {
  q: { filter?: string; tag?: string[] }
}) => {
  const recipes = await getRecipes(q)
  return (
    <section>
      <ul className="mt-4 md:grid md:grid-cols-4 md:gap-4">
        {recipes?.map((recipe) => (
          <RecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </section>
  )
}

export default RecipeList
