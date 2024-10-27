/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { useActionState, useEffect, useState } from "react"
import { editRecipeAction, getRecipeByIdAction } from "../../action"
import { Profile, Recipe } from "prisma/prisma-client"
import { redirect, useParams } from "next/navigation"

const EditRecipePage = () => {
  const {recipeId} = useParams<{recipeId:string}>()
  const [recipe, setRecipe] = useState<Recipe & { author: Profile }>()
  const [state, formAction] = useActionState(
    editRecipeAction.bind(null, recipeId),
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
    const recipe = await getRecipeByIdAction(recipeId)
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
    <main className="grow mx-4 mt-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Edit Recipe</h1>
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-12 md:border md:rounded-md md:shadow-md [&>input]:mb-4"
          action={formAction}
        >
          <label htmlFor="title">
            <h1 className="font-semibold">Title</h1>
          </label>
          <input
            className="border-b-2 border-orange-300"
            type="text"
            name="title"
            id="title"
            defaultValue={recipe?.title}
            required
          />
          <label htmlFor="description">
            <h1 className="font-semibold">Description</h1>
          </label>
          <textarea
            className="border-b-2 border-orange-300 resize-y min-w-[350px]"
            rows={4}
            name="description"
            id="description"
            defaultValue={recipe?.description}
            required
          />
          <label className="mb-4" htmlFor="prep_time">
            <h1 className="font-semibold">Prep Time</h1>
            <input
              className="border-b-2 border-orange-300"
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
          <label className="mb-4" htmlFor="cook_time">
            <h1 className="font-semibold">Cook Time</h1>
            <input
              className="border-b-2 border-orange-300"
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
          <label htmlFor="servings">
            <h1 className="font-semibold">Servings</h1>
          </label>
          <input
            className="border-b-2 border-orange-300"
            type="number"
            name="servings"
            id="servings"
            defaultValue={recipe?.servings}
            required
          />
          {recipe?.ingredients.map((ingredient, idx) => {
            return (
              <label
                className="mb-4"
                key={`ingredient_${idx}`}
                htmlFor={`ingredient_${idx}`}
              >
                <h1 className="font-semibold">Ingredient</h1>
                <input
                  className="w-full border-b-2 border-orange-300"
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
          <button
            className="bg-blue-300 px-6 py-2 text-foreground rounded-md w-fit mx-auto"
            type="button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>

          {recipe?.directions.map((direction, idx) => {
            return (
              <label className="mb-4" key={idx} htmlFor={`direction_${idx}`}>
                <h1 className="font-semibold">Direction</h1>
                <input
                  className="w-full border-b-2 border-orange-300"
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
          <button
            className="bg-blue-300 px-6 py-2 text-foreground rounded-md w-fit mx-auto mb-4"
            type="button"
            onClick={handleAddDirection}
          >
            Add Direction
          </button>

          <button
            className="bg-background px-6 py-2 text-foreground rounded-md w-fit mx-auto"
            type="submit"
          >
            Edit
          </button>
          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default EditRecipePage
