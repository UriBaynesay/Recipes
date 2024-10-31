
import { getReviewsByProfileId } from "@/app/(main)/review/db"
import ReviewPreview from "../review/review-preview"

const ProfileReviewsList = async ({ profileId }: { profileId: string }) => {
  const reviews = await getReviewsByProfileId(profileId)
  return (
    <div className="mb-12" id="profile-reviews">
      <h1 className="text-2xl font-bold pb-3 border-b-2 border-orange-300 mb-5">
        Reviews
      </h1>
      <ul>
        {reviews?.map((review) => (
          <ReviewPreview key={review.id} review={review} />
        ))}
      </ul>
    </div>
  )
}

export default ProfileReviewsList
