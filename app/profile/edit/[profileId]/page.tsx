"use client"

import { useActionState, useEffect, useState } from "react"
import { editProfileAction, getUserProfileAction } from "../../actions"
import { redirect } from "next/navigation"
import { Profile } from "prisma/prisma-client"

const EditProfilePage = ({ params }: { params: { profileId: string } }) => {
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
    <main className="grow m-4 md:m-12 mt-8">
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-5 md:border rounded-md [&>input]:mb-4"
          action={formAction}
        >
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            required
            defaultValue={profile?.first_name}
          />
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            required
            defaultValue={profile?.last_name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            defaultValue={profile?.email}
          />
          <label htmlFor="facebook_link">Facebook</label>
          <input
            type="url"
            name="facebook_link"
            id="facebook_link"
            defaultValue={profile?.facebook_link as string}
          />
          <label htmlFor="instagram_link">Instagram</label>
          <input
            type="url"
            name="instagram_link"
            id="instagram_link"
            defaultValue={profile?.instagram_link as string}
          />
          <label htmlFor="x_link">X</label>
          <input
            type="url"
            name="x_link"
            id="x_link"
            defaultValue={profile?.x_link as string}
          />

          <label htmlFor="profile_image">Profile image</label>
          <input type="file" name="profile_image" id="profile_image" />

          <button type="submit">Edit</button>

          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default EditProfilePage
