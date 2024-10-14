"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createRecipe, deleteRecipe, editRecipe, getRecipeById } from "./db"
import { revalidatePath } from "next/cache"

interface State {
  message?: string | null
  errors?: {
    title?: string[]
    description?: string[]
    prep_time?: string[]
    cook_time?: string[]
    servings?: string[]
    ingredients?: string[]
    directions?: string[]
  }
}

const RecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  profile_id: z.string(),
  created_at: z.any(),
  updated_at: z.any(),
  prep_time: z.string(),
  cook_time: z.string(),
  servings: z.number().gt(0),
  ingredients: z.string().array(),
  directions: z.string().array(),
  image:z.any()
})

const CreateRecipeSchema = RecipeSchema.omit({
  id: true,
  profile_id: true,
  created_at: true,
  updated_at: true,
})
export const createRecipeAction = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  const validatedInputs = CreateRecipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    prep_time: `${formData.get("prep_time")} ${formData.get("prep_time_type")}`,
    cook_time: `${formData.get("cook_time")} ${formData.get("cook_time_type")}`,
    servings: Number(formData.get("servings")),
    ingredients: formData.getAll("ingredient"),
    directions: formData.getAll("direction"),
    image:formData.get("image")
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const {
    title,
    description,
    prep_time,
    cook_time,
    servings,
    ingredients,
    directions,
    image
  } = validatedInputs.data

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

  const recipe = await createRecipe(
    user.userId,
    title,
    description,
    prep_time,
    cook_time,
    servings,
    ingredients,
    directions,
    image_url
  )
  if (!recipe) return { message: "Unable to create recipe" }
  redirect(`/recipe/${recipe.id}`)
}

const EditRecipeScheme = RecipeSchema.omit({
  id: true,
  profile_id: true,
  created_at: true,
  updated_at: true,
})
export const editRecipeAction = async (
  recipeId: string,
  state: State,
  formData: FormData
): Promise<State> => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  const oldRecipe = await getRecipeById(recipeId)
  if (user.userId !== oldRecipe?.profile_id)
    return { message: "Unauthorized to edit this recipe" }
  const validatedInputs = EditRecipeScheme.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    prep_time: `${formData.get("prep_time")} ${formData.get("prep_time_type")}`,
    cook_time: `${formData.get("cook_time")} ${formData.get("cook_time_type")}`,
    servings: Number(formData.get("servings")),
    ingredients: formData.getAll("ingredient"),
    directions: formData.getAll("direction"),
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const {
    title,
    description,
    prep_time,
    cook_time,
    servings,
    ingredients,
    directions,
  } = validatedInputs.data

  const recipe = await editRecipe(
    recipeId,
    title,
    description,
    prep_time,
    cook_time,
    servings,
    ingredients,
    directions
  )
  if (!recipe) return { message: "Unable to edit recipe" }
  redirect(`/recipe/${recipe.id}`)
}

export const deleteRecipeAction = async (recipeId: string) => {
  const user = auth()
  if (!user.userId) redirect("/sign-in")
  const recipe = await getRecipeById(recipeId)
  if (recipe?.profile_id !== user.userId) redirect("/")
  await deleteRecipe(recipeId)
  revalidatePath("/")
  redirect("/")
}

export const getRecipeByIdAction = async (recipeId: string) => {
  return await getRecipeById(recipeId)
}
