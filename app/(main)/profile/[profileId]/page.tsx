import { Metadata } from "next"
import ProfileRecipeList from "@/components/main/profile/profile-recipe-list"
import ProfilePreview from "@/components/main/profile/profile-preview"
import ProfileReviewsList from "@/components/main/profile/profile-reviews-list"
import { Suspense } from "react"
import RecipesListSkeleton from "@/components/main/recipes-list-skeleton"

export const experimental_ppr = true

export const metadata: Metadata = {
  title: "Profile Details",
}

const ProfileDetailsPage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>
}) => {
  const { profileId } = await params
  return (
    <main className="grow m-2 md:m-12 mt-8">
      <ProfilePreview profileId={profileId} />
      <section className="mb-12" id="profile-recipes">
        <h1 className="text-2xl font-bold pb-3 border-b-2 border-orange-300 mb-5">
          Recipes
        </h1>
        <Suspense fallback={<RecipesListSkeleton />}>
          <ProfileRecipeList profileId={profileId} />
        </Suspense>
      </section>
      <section className="mb-12" id="profile-reviews">
        <h1 className="text-2xl font-bold pb-3 border-b-2 border-orange-300 mb-5">
          Reviews
        </h1>
        <ProfileReviewsList profileId={profileId} />
      </section>
    </main>
  )
}

export default ProfileDetailsPage
