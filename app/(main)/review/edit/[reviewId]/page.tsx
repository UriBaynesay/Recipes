"use client"

import { useActionState, useEffect, useState } from "react"
import { editReviewAction, getReviewByIdAction } from "../../action"
import { Reviews } from "prisma/prisma-client"
import { useParams } from "next/navigation"
import Image from "next/image"
import UploadImage from "@/app/public/upload-image.svg"

const ReviewEditPage = () => {
  const {reviewId} = useParams<{reviewId:string}>()
  const [review, setReview] = useState<Reviews>()
  const [state, formAction] = useActionState(
    editReviewAction.bind(null, reviewId, review?.profile_id as string),
    { message: null, errors: {} }
  )
  useEffect(() => {
    fetchReview()
  }, [])

  const fetchReview = async () => {
    const review = (await getReviewByIdAction(reviewId)) as Reviews
    setReview(review)
  }
  return (
    <div className="grow mx-4 mt-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Edit Review</h1>
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-12 md:border md:rounded-md md:shadow-md [&>input]:mb-5"
          action={formAction}
        >
          <label htmlFor="rating">
            <h1 className="font-semibold">My Rating</h1>
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            max={5}
            min={1}
            defaultValue={review?.rating}
            className="border-b-2 border-orange-300 overflow-hidden"
          />
          <label htmlFor="text">
            <h1 className="font-semibold">My Review</h1>
          </label>
          <textarea
            name="text"
            id="text"
            placeholder="What did you think about this recipe? Did you make any changes or notes?"
            defaultValue={review?.text}
            required
            className="text-sm h-32 border p-2 mb-5"
          />
          <label htmlFor="image">
            <h1 className="font-semibold text-sm">Add image</h1>
            <Image
              src={UploadImage}
              alt="Upload image"
              className="hover:cursor-pointer"
              height={36}
              width={36}
            />
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="file:hidden"
          />
          {state?.message && (
            <small className="text-red-300">{state.message}</small>
          )}
          <button
            type="submit"
            className="bg-background px-6 py-2 text-foreground rounded-md w-fit mx-auto"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewEditPage
