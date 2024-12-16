import { getRecipesByProfileId } from "@/app/(main)/recipe/db"
import RecipePreview from "../recipe-preview"

const ProfileRecipeList = async ({ profileId }: { profileId: string }) => {
  const recipes = await getRecipesByProfileId(profileId)
  return (

      <ul className="md:grid md:grid-cols-4 md:place-items-center md:gap-4">
        {recipes?.map((recipe) => (
          <RecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </ul>

  )
}

export default ProfileRecipeList
