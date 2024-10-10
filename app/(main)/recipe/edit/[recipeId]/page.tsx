"use client"

import { useActionState, useEffect, useState } from "react"
import { editRecipeAction, getRecipeByIdAction } from "../../action"
import { Profile, Recipe, Reviews } from "prisma/prisma-client"
import { redirect } from "next/navigation"

const EditRecipePage = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<
    Recipe & { author: Profile } & { Reviews: Reviews[] }
  >()
  const [state, formAction] = useActionState(
    editRecipeAction.bind(null, params.recipeId),
    {
      message: null,
      errors: {},
    }
  )
  useEffect(() => {
    fetchRecipe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRecipe = async () => {
    const recipe = await getRecipeByIdAction(params.recipeId)
    if (!recipe) redirect("/")
    setRecipe(recipe)
  }

  const handleAddIngredient = () => {
    // @ts-expect-error
    setRecipe({ ...recipe, ingredients: [...recipe?.ingredients, ""] })
  }

  const handleAddDirection = () => {
    // @ts-expect-error
    setRecipe({ ...recipe, directions: [...recipe?.directions, ""] })
  }

  return (
    <main className="grow m-4 md:m-12 mt-8">
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-5 md:border rounded-md [&>input]:mb-4"
          action={formAction}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={recipe?.title}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            defaultValue={recipe?.description}
            required
          />
          <label htmlFor="prep_time" className="mb-4">
            <div>Prep Time</div>
            <input
              type="number"
              name="prep_time"
              id="prep_time"
              defaultValue={recipe?.prep_time.split(" ")[0]}
              required
            />
            <select name="prep_time_type" id="prep_time_type">
              <option value="min">Min</option>
              <option value="hour">Hour</option>
            </select>
          </label>
          <label htmlFor="cook_time" className="mb-4">
            <div>Cook Time</div>
            <input
              type="number"
              name="cook_time"
              id="cook_time"
              defaultValue={recipe?.cook_time.split(" ")[0]}
              required
            />
            <select name="cook_time_type" id="">
              <option value="min">Min</option>
              <option value="hour">Hour</option>
            </select>
          </label>
          <label htmlFor="servings">Servings</label>
          <input
            type="number"
            name="servings"
            id="servings"
            defaultValue={recipe?.servings}
            required
          />
          {recipe?.ingredients.map((ingredient, idx) => {
            return (
              <label
                key={`ingredient_${idx}`}
                htmlFor={`ingredient_${idx}`}
                className="mb-4"
              >
                <div>Ingredient</div>
                <input
                  className="w-full"
                  type="text"
                  name={`ingredient`}
                  id={`ingredient_${idx}`}
                  defaultValue={ingredient}
                  placeholder="e.g. 2 cups flour, sifted"
                  required
                />
              </label>
            )
          })}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>

          {recipe?.directions.map((direction, idx) => {
            return (
              <label key={idx} htmlFor={`direction_${idx}`} className="mb-4">
                <div>Direction</div>
                <input
                  className="w-full"
                  type="text"
                  name={`direction`}
                  id={`direction`}
                  defaultValue={direction}
                  placeholder="e.g. Combine all dry ingredients in a large bowl"
                  required
                />
              </label>
            )
          })}
          <button type="button" onClick={handleAddDirection}>
            Add Direction
          </button>

          <button type="submit">Edit</button>
          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default EditRecipePage
