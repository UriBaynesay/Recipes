"use client"

import { useActionState, useEffect, useState } from "react"
import { editProfileAction, getUserProfileAction } from "../../actions"
import { redirect, useParams } from "next/navigation"
import { Profile } from "prisma/prisma-client"
import Image from "next/image"
import UploadImage from "@/app/public/upload-image.svg"

const EditProfilePage = () => {
  const params = useParams<{ profileId: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [state, formAction] = useActionState(
    editProfileAction.bind(null, params.profileId),
    { message: null, errors: {} }
  )

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const profile = await getUserProfileAction(params.profileId)
    if (!profile) redirect("/")
    setProfile(profile)
  }
  return (
    <main className="grow mx-4 mt-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Edit Profile</h1>
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-12 md:border md:rounded-md md:shadow-md [&>input]:mb-5"
          action={formAction}
        >
          <label htmlFor="first_name">First name</label>
          <input
            className="border-b-2 border-orange-300"
            type="text"
            name="first_name"
            id="first_name"
            required
            defaultValue={profile?.first_name}
          />
          <label htmlFor="last_name">Last name</label>
          <input
            className="border-b-2 border-orange-300"
            type="text"
            name="last_name"
            id="last_name"
            required
            defaultValue={profile?.last_name}
          />
          <label htmlFor="email">Email</label>
          <input
            className="border-b-2 border-orange-300"
            type="email"
            name="email"
            id="email"
            required
            defaultValue={profile?.email}
            aria-errormessage="email-err"
          />
          <label htmlFor="facebook_link">Facebook</label>
          <input
            className="border-b-2 border-orange-300"
            type="url"
            name="facebook_link"
            id="facebook_link"
            defaultValue={profile?.facebook_link as string}
          />
          <label htmlFor="instagram_link">Instagram</label>
          <input
            className="border-b-2 border-orange-300"
            type="url"
            name="instagram_link"
            id="instagram_link"
            defaultValue={profile?.instagram_link as string}
          />
          <label htmlFor="x_link">X</label>
          <input
            className="border-b-2 border-orange-300"
            type="url"
            name="x_link"
            id="x_link"
            defaultValue={profile?.x_link as string}
          />

          <label htmlFor="profile_image">
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
            id="profile_image"
            name="profile_image"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="file:hidden"
          />
          {state.message && (
            <small className="text-red-400 font-semibold">
              {state.message}
            </small>
          )}
          <button
            className="bg-background px-6 py-2 text-foreground rounded-md w-fit mx-auto"
            type="submit"
          >
            Edit
          </button>
        </form>
      </div>
    </main>
  )
}

export default EditProfilePage
