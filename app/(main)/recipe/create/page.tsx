"use client"

import { ChangeEvent, useActionState, useState } from "react"
import { createRecipeAction } from "../action"

const tags = [
  "5 Ingredient Main Dishes",
  "One-Pot Meals",
  "Quick and Easy Recipes",
  "30-Minute Meals",
  "Soups, Stews and Chili",
  "Comfort Food",
  "Main Dishes",
  "Sheet Pan Dinners",
  "Family Dinner Ideas & Recipes",
]

const CreateRecipePage = () => {
  const [ingredientsArr, setIngredientsArr] = useState([""])
  const [directionsArr, setDirectionsArr] = useState([""])
  const [state, formAction] = useActionState(createRecipeAction, {
    message: null,
    errors: {},
  })

  const handleChangeIngredients = (ev: ChangeEvent<HTMLInputElement>) => {
    const { target } = ev
    const updatedIngredientsArr = [...ingredientsArr]
    updatedIngredientsArr[+target.id.split("_")[1]] = target.value
    setIngredientsArr(updatedIngredientsArr)
  }

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    if (ingredientsArr.length < 2) return
    const updatedIngredientsArr = ingredientsArr.filter(
      (ingredient) => ingredientToRemove !== ingredient
    )
    setIngredientsArr(updatedIngredientsArr)
  }

  const handleChangeDirections = (ev: ChangeEvent<HTMLInputElement>) => {
    const { target } = ev
    const updatedDirectionsArr = [...directionsArr]
    updatedDirectionsArr[+target.id.split("_")[1]] = target.value
    setDirectionsArr(updatedDirectionsArr)
  }

  const handleRemoveDirections = (directionToRemove: string) => {
    if (directionsArr.length < 2) return
    const updatedDirectionsArr = directionsArr.filter(
      (ingredient) => directionToRemove !== ingredient
    )
    setDirectionsArr(updatedDirectionsArr)
  }

  const handleAddIngredient = () => {
    setIngredientsArr([...ingredientsArr, ""])
  }

  const handleAddDirection = () => {
    setDirectionsArr([...directionsArr, ""])
  }

  return (
    <main className="grow mx-4 mt-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Create Recipe</h1>
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
            required
          />
          <label htmlFor="description">
            <h1 className="font-semibold">Description</h1>
          </label>
          <textarea
            className="border-b-2 border-orange-300 focus-within:outline-none"
            name="description"
            id="description"
            required
          />
          <label className="mb-4" htmlFor="prep_time">
            <h1 className="font-semibold">Prep Time</h1>
            <input
              className="border-b-2 border-orange-300"
              type="number"
              name="prep_time"
              id="prep_time"
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
            required
          />
          {ingredientsArr.map((ingredient, idx) => {
            return (
              <label className="mb-4" key={idx} htmlFor={`ingredient_${idx}`}>
                <h1 className="font-semibold">Ingredient</h1>
                <div className="flex gap-4 items-end">
                  <input
                    className="border-b-2 border-orange-300 w-full"
                    type="text"
                    name={`ingredient`}
                    id={`ingredient_${idx}`}
                    placeholder="e.g. 2 cups flour, sifted"
                    required
                    value={ingredient}
                    onChange={handleChangeIngredients}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="font-semibold text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
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

          {directionsArr.map((direction, idx) => {
            return (
              <label className="mb-4" key={idx} htmlFor={`direction_${idx}`}>
                <h1 className="font-semibold">Direction</h1>
                <div className="flex gap-4 items-end">
                  <input
                    className="border-b-2 border-orange-300 w-full"
                    type="text"
                    name={`direction`}
                    id={`direction_${idx}`}
                    placeholder="e.g. Combine all dry ingredients in a large bowl"
                    required
                    value={direction}
                    onChange={handleChangeDirections}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDirections(direction)}
                    className="font-semibold text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </label>
            )
          })}
          <button
            className="bg-blue-300 px-6 py-2 text-foreground rounded-md w-fit mx-auto"
            type="button"
            onClick={handleAddDirection}
          >
            Add Direction
          </button>

          <div className="grid grid-cols-2 mt-3">
            {tags.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  name="tags"
                  value="5-Ingredient Dinner"
                  className="mr-2"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>

          <label htmlFor="image" className="mt-3">
            <h1 className="font-semibold">Recipe Image</h1>
          </label>
          <input
            className="file:bg-transparent file:p-3 file:border file:border-gray-200 file:rounded-md file:shadow-sm file:cursor-pointer file:hover:bg-gray-50"
            id="image"
            name="image"
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            className="bg-background px-6 py-2 text-foreground rounded-md w-fit mx-auto"
            type="submit"
          >
            Create
          </button>
          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default CreateRecipePage
