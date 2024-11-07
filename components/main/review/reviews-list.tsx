import { getReviewsByRecipeId } from "@/app/(main)/review/db"
import ReviewPreview from "./review-preview"

const ReviewsList = async ({ recipeId }: { recipeId: string }) => {
  const reviews = await getReviewsByRecipeId(recipeId)
  return (
    <ul id="reviews-list">
      {reviews?.map((review) => {
        return <ReviewPreview key={review.id} review={review} />
      })}
    </ul>
  )
}

export default ReviewsList
