import { deleteUserAction } from "@/app/(main)/profile/actions"
import { getUserProfile } from "@/app/(main)/profile/db"
import { getNumberOfRecipesByProfileId } from "@/app/(main)/recipe/db"
import { getNumberOfReviewsByProfileId } from "@/app/(main)/review/db"
import Image from "next/image"
import Link from "next/link"

const ProfilePreview = async ({ profileId }: { profileId: string }) => {
  const [profile, numOfRecipes, numOfReviews] = await Promise.all([
    getUserProfile(profileId),
    getNumberOfRecipesByProfileId(profileId),
    getNumberOfReviewsByProfileId(profileId),
  ])

  return (
    <article className="md:flex md:items-end mb-10">
      <Image
        alt="Profile image"
        src={profile?.profile_image as string}
        width={72}
        height={72}
        className="rounded-full aspect-square mr-4"
      />
      <section className="mr-3">
        <h1 className="font-bold text-3xl">{`${profile?.first_name} ${profile?.last_name}`}</h1>
        <div className="flex font-semibold decoration-background">
          <Link href={"#profile-recipes"} className="mr-2">
            <small>
              <span className="text-background">{numOfRecipes}</span> Recipes
            </small>
          </Link>
          <Link href={"#profile-reviews"}>
            <small>
              <span className="text-background">{numOfReviews}</span> Reviews
            </small>
          </Link>
        </div>

        <small className="text-gray-300">{profile?.email}</small>
      </section>
      <Link className="mr-2 font-semibold" href={`/profile/edit/${profileId}`}>
        Edit
      </Link>
      <form action={deleteUserAction}>
        <button className="font-semibold text-red-500">Delete</button>
      </form>
    </article>
  )
}

export default ProfilePreview
