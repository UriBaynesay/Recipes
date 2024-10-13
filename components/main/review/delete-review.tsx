"use client"

import { deleteReviewAction } from "@/app/(main)/review/action"
import { useActionState } from "react"

const DeleteReview = ({
  reviewId,
  profileId,
}: {
  reviewId: string
  profileId: string
}) => {
  const [state, formAction] = useActionState(
    deleteReviewAction.bind(null, reviewId, profileId),
    { message: null, errors: {} }
  )
  return (
    <form action={formAction}>
      <button type="submit">Delete</button>
      {state?.message && (
        <small className="text-red-300">{state.message}</small>
      )}
    </form>
  )
}

export default DeleteReview
