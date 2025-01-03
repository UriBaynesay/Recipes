import { PrismaClient } from "prisma/prisma-client"

export const createReview = async (
  profile_id: string,
  recipe_id: string,
  rating: number,
  text: string,
  image_url: string
) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.create({
      data: { rating, text, image_url, profile_id, upvote: [], recipe_id },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const editReview = async (
  reviewId: string,
  rating: number,
  text: string,
  image_url?: string
) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.update({
      where: { id: reviewId },
      data: { rating, text, image_url },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteReview = async (reviewId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.delete({
      where: { id: reviewId },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getReviewById = async (reviewId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.findFirst({
      where: { id: reviewId },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getReviewsByRecipeId = async (recipeId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.findMany({
      where: { recipe_id: recipeId },
      include: { author: true },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getReviewsByProfileId = async (profileId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.findMany({
      where: { profile_id: profileId },
      include: { author: true },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getNumberOfReviewsByProfileId = async (profileId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.reviews.count({
      where: { profile_id: profileId },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateReviewUpvotes = async (reviewId: string, userId: string) => {
  const prisma = new PrismaClient()
  try {
    const reviewUpvotes = await prisma.reviews.findFirst({
      where: { id: reviewId },
      select: { upvote: true },
    })
    if (reviewUpvotes?.upvote.includes(userId))
      return await prisma.reviews.update({
        where: { id: reviewId },
        data: {
          upvote: reviewUpvotes.upvote.filter(
            (currUserId) => currUserId !== userId
          ),
        },
      })
    return await prisma.reviews.update({
      where: { id: reviewId },
      data: { upvote: { push: userId } },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}
