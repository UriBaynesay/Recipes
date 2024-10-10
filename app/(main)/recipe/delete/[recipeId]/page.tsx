import { redirect } from "next/navigation"
import { deleteRecipeAction } from "../../action"
import { getRecipeById } from "../../db"

const DeleteRecipePage = async ({
  params,
}: {
  params: { recipeId: string }
}) => {
  const recipe = await getRecipeById(params.recipeId)
  if (!recipe) redirect("/")
    return (
      <main className="grow m-4 md:m-12 mt-8 md:flex md:justify-center">
        <form
          action={deleteRecipeAction.bind(null, recipe?.id as string)}
          className="flex flex-col items-center"
        >
          <h1>
            Are you sure you want to delete{" "}
            <span className="font-bold">{recipe?.title}</span> recipe
          </h1>
          <button type="submit" className="text-red-400">
            Delete
          </button>
        </form>
      </main>
    )
}

export default DeleteRecipePage
