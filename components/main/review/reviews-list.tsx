import { getReviewsByRecipeId } from "@/app/(main)/review/db"
import ReviewPreview from "./review-preview"

const ReviewsList = async ({ recipeId }: { recipeId: string }) => {
    const reviews = await getReviewsByRecipeId(recipeId)
  return (
    <section>
      <ul>
        {reviews?.map((review) => {
          return (
            <li key={review.id}>
              <ReviewPreview review={review} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ReviewsList
