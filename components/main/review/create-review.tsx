"use client"

import { createReviewAction } from "@/app/(main)/review/action"
import { useActionState } from "react"

const CreateReview = ({ recipeId }: { recipeId: string }) => {
  const [state, formAction] = useActionState(
    createReviewAction.bind(null, recipeId),
    { message: null, errors: {} }
  )
  return (
    <div className="p-6 border-2 rounded-md w-96 mb-10">
      <form className="[&>*]:mb-4 flex flex-col" action={formAction}>
        <label htmlFor="rating">My Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          max={5}
          min={1}
          defaultValue={3}
        />
        <label htmlFor="text">My Review</label>
        <textarea
          name="text"
          id="text"
          placeholder="What did you think about this recipe? Did you make any changes or notes?"
          required
        />
        <label htmlFor="image">Add Image</label>
        <input name="image" type="file" accept="image/png, image/gif, image/jpeg" />
        {state?.message && (
          <small className="text-red-300">{state.message}</small>
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default CreateReview
