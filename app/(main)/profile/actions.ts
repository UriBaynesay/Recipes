"use server"

import { z } from "zod"
import { createProfile, deleteProfile, editProfile, getUserProfile } from "./db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"

const ProfileSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  profile_image: z.any(),
  created_at: z.string(),
})

interface State {
  message?: string | null
  errors?: {
    first_name?: string[]
    last_name?: string[]
    email?: string[]
  }
}

const CreateProfileSchema = ProfileSchema.omit({ created_at: true, id: true })
export const createProfileAction = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const user = await currentUser()
  if (!user?.id) redirect("/sign-in")
  const validatedInputs = CreateProfileSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    profile_image: formData.get("profile_image"),
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const {
    email,
    first_name,
    last_name,
    profile_image,
  } = validatedInputs.data

  let url = user.imageUrl
  if (profile_image.size) {
    const form = new FormData()
    form.append("image", profile_image)
    const { data } = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_APIKEY}`,
      { method: "post", body: form }
    ).then((res) => res.json())
    url = data.url
  }

  const profile = await createProfile(
    user.id,
    first_name,
    last_name,
    email,
    url
  )
  if (!profile) return { message: "Unable to create profile" }
  revalidatePath("/")
  redirect("/")
}

const EditProfileSchema = ProfileSchema.omit({ created_at: true, id: true })
export const editProfileAction = async (
  profileId: string,
  state: State,
  formData: FormData
): Promise<State> => {
  const user = await auth()
  if (!user.userId) redirect("/sign-in")
  if (user.userId !== profileId)
    return { message: "Unauthorized to edit this user" }
  const validatedInputs = EditProfileSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),

    profile_image: formData.get("profile_image"),
  })
  if (!validatedInputs.success)
    return {
      message: "Invalid inputs",
      errors: validatedInputs.error.flatten().fieldErrors,
    }
  const {
    email,
    first_name,
    last_name,
    profile_image,
  } = validatedInputs.data

  let url
  if (profile_image.size) {
    const form = new FormData()
    form.append("image", profile_image)
    const { data } = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_APIKEY}`,
      { method: "post", body: form }
    ).then((res) => res.json())
    url = data.url
  }

  const updated = await editProfile(
    user.userId,
    first_name,
    last_name,
    email,
    url
  )
  if (!updated) return { message: "Unable to edit profile" }
  revalidatePath("/")
  redirect(`/profile/${profileId}`)
}

export const deleteUserAction = async () => {
  const user = await auth()
  if (!user.userId) redirect("/sign-in")
  try {
    await deleteProfile(user.userId)
    await (await clerkClient()).users.deleteUser(user.userId)
  } catch (error) {
    console.log(error)
    return redirect(`/profile/${user.userId}`)
  }
  revalidatePath("/")
}

export const getUserProfileAction = async (profileId: string) => {
  return getUserProfile(profileId)
}
