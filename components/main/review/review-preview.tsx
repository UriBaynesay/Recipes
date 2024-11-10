"use client"

import Image from "next/image"
import Link from "next/link"
import { Profile, Reviews } from "prisma/prisma-client"
import DeleteReview from "./delete-review"
import { useAuth } from "@clerk/nextjs"
import { updateReviewUpvotesAction } from "@/app/(main)/review/action"
import { useState } from "react"
import RatingStar from "@/app/public/recipe-review-star.svg"
import Upvote from "@/app/public/upvote.svg"

const ReviewPreview = ({
  review,
}: {
  review: Reviews & { author: Profile }
}) => {
  const [upvotes, setUpvotes] = useState(review.upvote)
  const user = useAuth()

  const handleUpdateUpvotes = async () => {
    const res = await updateReviewUpvotesAction(review.id)
    if (!res) return
    if (upvotes.includes(user.userId as string))
      setUpvotes(upvotes.filter((userId) => userId !== user.userId))
    else setUpvotes([...upvotes, user.userId as string])
  }
  return (
    <li className="border-b mx-auto mt-3">
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
        <button className="flex items-end gap-2" disabled={!user} onClick={handleUpdateUpvotes}>
          <Image alt="Upvote image" src={Upvote} height={20} width={20}/>
          <small>Helpful ({upvotes.length})</small>
        </button>
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
