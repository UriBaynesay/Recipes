"use client"

import { useActionState, useEffect, useState } from "react"
import { editReviewAction, getReviewByIdAction } from "../../action"
import { Reviews } from "prisma/prisma-client"

const ReviewEditPage = ({ params }: { params: { reviewId: string } }) => {
  const [review, setReview] = useState<Reviews>()
  const [state, formAction] = useActionState(
    editReviewAction.bind(null, params.reviewId,review?.profile_id as string),
    { message: null, errors: {} }
  )
  useEffect(() => {
    fetchReview()
  }, [])

  const fetchReview = async () => {
    const review = await getReviewByIdAction(params.reviewId) as Reviews
    setReview(review)
  }
  return (
    <div className="p-6 border-2 rounded-md w-96 mx-auto">
      <form className="[&>*]:mb-4 flex flex-col" action={formAction}>
        <label htmlFor="rating">My Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          max={5}
          min={1}
          defaultValue={review?.rating}
        />
        <label htmlFor="text">My Review</label>
        <textarea
          name="text"
          id="text"
          placeholder="What did you think about this recipe? Did you make any changes or notes?"
          defaultValue={review?.text}
          required
        />
        <label htmlFor="image">Add Image</label>
        <input
          name="image"
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
        {state?.message && (
          <small className="text-red-300">{state.message}</small>
        )}
        <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default ReviewEditPage
