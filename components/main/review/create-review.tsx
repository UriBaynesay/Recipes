"use client"
import { createReviewAction } from "@/app/(main)/review/action"
import { useActionState } from "react"
import UploadImage from "@/app/public/upload-image.svg"
import Image from "next/image"

const CreateReview = ({
  recipeId,
  title,
}: {
  recipeId: string
  title: string
}) => {
  const [state, formAction] = useActionState(
    createReviewAction.bind(null, recipeId),
    { message: null, errors: {} }
  )
  return (
    <div className="md:mx-auto p-8 border md:shadow-md md:w-96 mb-10">
      <form className="[&>*]:mb-4 flex flex-col" action={formAction}>
        <h1 className="font-bold">{title}</h1>
        <label htmlFor="rating">
          <h1 className="font-semibold text-sm">My Rating</h1>
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          max={5}
          min={1}
          defaultValue={3}
          className="overflow-hidden"
        />
        <label htmlFor="text">
          <h1 className="font-semibold text-sm">My Review</h1>
        </label>
        <textarea
          name="text"
          id="text"
          placeholder="What did you think about this recipe? Did you make any changes or notes?"
          required
          className="text-sm h-32 border p-2"
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
          className="bg-background px-6 py-2 text-foreground rounded-md w-fit mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateReview
