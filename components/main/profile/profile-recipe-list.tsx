import { getRecipesByProfileId } from "@/app/(main)/recipe/db"
import RecipePreview from "../recipe-preview"

const ProfileRecipeList = async ({ profileId }: { profileId: string }) => {
  const recipes = await getRecipesByProfileId(profileId)
  return (
    <div className="mb-12" id="profile-recipes">
      <h1 className="text-2xl font-bold pb-3 border-b-2 border-orange-300 mb-5">Recipes</h1>
      <ul className="md:grid md:grid-cols-4 md:place-items-center md:gap-4">
        {recipes?.map((recipe) => (
          <RecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  )
}

export default ProfileRecipeList
