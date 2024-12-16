import { getReviewsByProfileId } from "@/app/(main)/review/db"
import ReviewPreview from "../review/review-preview"

const ProfileReviewsList = async ({ profileId }: { profileId: string }) => {
  const reviews = await getReviewsByProfileId(profileId)
  return (
    <ul>
      {reviews?.map((review) => (
        <ReviewPreview key={review.id} review={review} />
      ))}
    </ul>
  )
}

export default ProfileReviewsList
