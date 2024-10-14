"use client"

import { useActionState, useState } from "react"
import { createRecipeAction } from "../action"

const CreateRecipePage = () => {
  const [ingredientsArr, setIngredientsArr] = useState([null])
  const [directionsArr, setDirectionsArr] = useState([null])
  const [state, formAction] = useActionState(createRecipeAction, {
    message: null,
    errors: {},
  })

  const handleAddIngredient = () => {
    setIngredientsArr([...ingredientsArr, null])
  }

  const handleAddDirection = () => {
    setDirectionsArr([...directionsArr, null])
  }

  return (
    <main className="grow m-4 md:m-12 mt-8">
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-5 md:border rounded-md [&>input]:mb-4"
          action={formAction}
        >
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" required />
          <label htmlFor="prep_time" className="mb-4">
            <div>Prep Time</div>
            <input type="number" name="prep_time" id="prep_time" required />
            <select name="prep_time_type" id="prep_time_type">
              <option value="min">Min</option>
              <option value="hour">Hour</option>
            </select>
          </label>
          <label htmlFor="cook_time" className="mb-4">
            <div>Cook Time</div>
            <input type="number" name="cook_time" id="cook_time" required />
            <select name="cook_time_type" id="">
              <option value="min">Min</option>
              <option value="hour">Hour</option>
            </select>
          </label>
          <label htmlFor="servings">Servings</label>
          <input type="number" name="servings" id="servings" required />
          {ingredientsArr.map((ingredient, idx) => {
            return (
              <label key={idx} htmlFor={`ingredient_${idx}`} className="mb-4">
                <div>Ingredient</div>
                <input
                  className="w-full"
                  type="text"
                  name={`ingredient`}
                  id={`ingredient`}
                  placeholder="e.g. 2 cups flour, sifted"
                  required
                />
              </label>
            )
          })}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>

          {directionsArr.map((direction, idx) => {
            return (
              <label key={idx} htmlFor={`direction_${idx}`} className="mb-4">
                <div>Direction</div>
                <input
                  className="w-full"
                  type="text"
                  name={`direction`}
                  id={`direction`}
                  placeholder="e.g. Combine all dry ingredients in a large bowl"
                  required
                />
              </label>
            )
          })}
          <button type="button" onClick={handleAddDirection}>
            Add Direction
          </button>

          <input
            name="image"
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />
          <button type="submit">Create</button>
          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default CreateRecipePage
