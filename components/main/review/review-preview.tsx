import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { Profile, Reviews } from "prisma/prisma-client"
import DeleteReview from "./delete-review"
import RatingStar from "@/app/public/recipe-review-star.svg"

const ReviewPreview = async ({
  review,
}: {
  review: Reviews & { author: Profile }
}) => {
  const user = await auth()
  return (
    <li className="border-b mx-auto">
      <Link
        href={`/profile/${review.author.id}`}
        className="flex items-center mb-3"
      >
        <Image
          alt="Profile image"
          src={review.author.profile_image}
          width={46}
          height={46}
          className="rounded-full aspect-square mr-2"
        />
        <h1 className="font-bold">{`${review.author.first_name} ${review.author.last_name}`}</h1>
      </Link>
      <div className="mb-5">
        <small className="font-semibold mb-4 flex items-end">
          {Array(review.rating)
            .fill(0)
            .map((_, idx) => {
              return (
                <Image
                  key={idx}
                  alt="Review rating star"
                  src={RatingStar}
                  height={24}
                  width={24}
                />
              )
            })}
          <span className="text-gray-400 ml-2">
            {review.created_at.toLocaleDateString()}
          </span>
        </small>
        <p className="mb-5">{review.text}</p>
        {review.image_url && (
          <Link href={review.image_url} target="_blank">
            <Image
              alt="Review image"
              src={review.image_url}
              height={150}
              width={150}
            />
          </Link>
        )}
      </div>
      {user.userId === review.profile_id && (
        <div className="mb-5">
          <Link href={`/review/edit/${review.id}`}>Edit</Link>
          <DeleteReview profileId={review.profile_id} reviewId={review.id} />
        </div>
      )}
    </li>
  )
}
export default ReviewPreview
