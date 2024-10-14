import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { Profile, Reviews } from "prisma/prisma-client"
import DeleteReview from "./delete-review"

const ReviewPreview = ({
  review,
}: {
  review: Reviews & { author: Profile }
}) => {
  const user = auth()
  return (
    <li>
      <Link href={`/profile/${review.author.id}`} className="flex items-center">
        <Image
          alt="Profile image"
          src={review.author.profile_image}
          width={46}
          height={46}
          className="rounded-full aspect-square mr-2"
        />
        <h1 className="font-bold">{`${review.author.first_name} ${review.author.last_name}`}</h1>
      </Link>
      <div className="[&>*]:mb-4">
        <small className="font-semibold">
          Rating : {review.rating}{" "}
          <span className="text-gray-400">
            {review.created_at.toLocaleDateString()}
          </span>
        </small>
        <p>{review.text}</p>
        {review.image_url && (
          <Link href={review.image_url} target="_blank">
            <Image
              alt="Review image"
              src={review.image_url}
              height={72}
              width={72}
            />
          </Link>
        )}
      </div>
      {user.userId === review.profile_id && (
        <div>
          <Link href={`/review/edit/${review.id}`}>Edit</Link>
          <DeleteReview profileId={review.profile_id} reviewId={review.id} />
        </div>
      )}
    </li>
  )
}
export default ReviewPreview
