"use client"

import { useActionState } from "react"
import { createProfileAction } from "../(main)/profile/actions"
import { useUser } from "@clerk/nextjs"

const CreateProfilePage = () => {
  const user = useUser()
  const [state, formAction] = useActionState(createProfileAction, {
    message: null,
    errors: {},
  })
  return (
    <main className="grow m-4 md:m-12 mt-8">
      <h1 className="text-3xl text-center mb-4">Create Profile</h1>
      <div className="md:flex md:justify-center">
        <form
          className="flex flex-col md:p-5 md:border rounded-md [&>input]:mb-4"
          action={formAction}
        >
          <label htmlFor="first_name">First name</label>
          <input type="text" name="first_name" id="first_name" defaultValue={user.user?.firstName?.toString()} required />
          <label htmlFor="last_name">Last name</label>
          <input type="text" name="last_name" id="last_name" defaultValue={user.user?.lastName?.toString()} required />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" defaultValue={user.user?.primaryEmailAddress?.toString()} required />
          <label htmlFor="facebook_link">Facebook</label>
          <input type="url" name="facebook_link" id="facebook_link" />
          <label htmlFor="instagram_link">Instagram</label>
          <input type="url" name="instagram_link" id="instagram_link" />
          <label htmlFor="x_link">X</label>
          <input type="url" name="x_link" id="x_link" />

          <label htmlFor="profile_image">Profile image</label>
          <input
            type="file"
            name="profile_image"
            id="profile_image"
            accept="image/png, image/gif, image/jpeg"
          />

          <button type="submit">Create</button>
          {state.message && (
            <small className="text-red-300">{state.message}</small>
          )}
        </form>
      </div>
    </main>
  )
}

export default CreateProfilePage
