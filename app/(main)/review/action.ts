"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import z from "zod"
import { createReview, deleteReview, editReview, getReviewById } from "./db"

interface State {
  message?: string | null
  errors?: {
    rating?: string[]
    text?: string[]
    recipe_id?: string[]
    upvote?: string[]
  }
}

const ReviewSchema = z.object({
  id: z.string(),
  recipe_id: z.string(),
  profile_id: z.string(),
  created_at: z.string(),
  rating: z.number().lte(5).gte(0),
  text: z.string(),
  image: z.any(),
  upvote: z.string().array(),
})

const CreateReviewSchema = ReviewSchema.omit({
  id: true,
  created_at: true,
  profile_id: true,
  upvote: true,
})
export const createReviewAction = async (
  recipeId: string,
  state: State,
  formData: FormData
): Promise<State> => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  const validatedInputs = CreateReviewSchema.safeParse({
    recipe_id: recipeId,
    rating: Number(formData.get("rating")),
    text: formData.get("text"),
    image: formData.get("image"),
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const { rating, recipe_id, text, image } = validatedInputs.data

  let image_url
  if (image.size) {
    const form = new FormData()
    form.append("image", image)
    const { data } = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_APIKEY}`,
      { method: "post", body: form }
    ).then((res) => res.json())
    image_url = data.url
  }

  const review = await createReview(
    user.userId,
    recipe_id,
    rating,
    text,
    image_url
  )
  if (!review) return { message: "Unable to create review" }
  redirect(`/recipe/${recipeId}`)
}

const EditReviewSchema = ReviewSchema.omit({
  created_at: true,
  profile_id: true,
  recipe_id: true,
  upvote: true,
  id: true,
})
export const editReviewAction = async (
  reviewId: string,
  profileId: string,
  state: State,
  formData: FormData
): Promise<State> => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  if (user.userId !== profileId)
    return { message: "Not authorized to edit this review" }

  const validatedInputs = EditReviewSchema.safeParse({
    rating: Number(formData.get("rating")),
    text: formData.get("text"),
    image: formData.get("image"),
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const { rating, text, image } = validatedInputs.data

  let image_url
  if (image.size) {
    const form = new FormData()
    form.append("image", image)
    const { data } = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_APIKEY}`,
      { method: "post", body: form }
    ).then((res) => res.json())
    image_url = data.url
  }

  const updatedReview = {
    reviewId,
    rating,
    text,
    image_url,
  }

  if (!updatedReview.image_url) delete updatedReview.image_url

  const review = await editReview(
    updatedReview.reviewId,
    updatedReview.rating,
    updatedReview.text,
    updatedReview.image_url
  )
  if (!review) return { message: "Unable to edit review" }
  redirect(`/recipe/${review.recipe_id}`)
}

export const deleteReviewAction = async (
  reviewId: string,
  profileId: string
): Promise<State> => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  if (user.userId !== profileId)
    return { message: "Not authorized to delete this review" }
  const review = await deleteReview(reviewId)
  if (!review) return { message: "Unable to delete review" }
  redirect(`/recipe/${review.recipe_id}`)
}

export const getReviewByIdAction = async (reviewId: string) => {
  return await getReviewById(reviewId)
}
