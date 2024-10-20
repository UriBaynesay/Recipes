import { Metadata } from "next"
import ProfileRecipeList from "@/components/main/profile/profile-recipe-list"
import ProfilePreview from "@/components/main/profile/profile-preview"
import ProfileReviewsList from "@/components/main/profile/profile-reviews-list"
import { getProfiles } from "../db"
import { Profile } from "prisma/prisma-client"

export const metadata: Metadata = {
  title: "Profile Details",
}

export const revalidate = 60

export const dynamicParams = true 

export async function generateStaticParams() {
  const profiles = (await getProfiles()) as Profile[]
  return profiles.map((profile) => ({
    profileId: profile.id,
  }))
}

const ProfileDetailsPage = async ({
  params,
}: {
  params: { profileId: string }
}) => {
  return (
    <main className="grow m-2 md:m-12 mt-8">
      <ProfilePreview profileId={params.profileId} />
      <ProfileRecipeList profileId={params.profileId} />
      <ProfileReviewsList profileId={params.profileId} />
    </main>
  )
}

export default ProfileDetailsPage
