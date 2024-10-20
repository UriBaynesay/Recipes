import { Metadata } from "next"
import ProfileRecipeList from "@/components/main/profile/profile-recipe-list"
import ProfilePreview from "@/components/main/profile/profile-preview"
import ProfileReviewsList from "@/components/main/profile/profile-reviews-list"

export const metadata: Metadata = {
  title: "Profile Details",
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
