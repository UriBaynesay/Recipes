import { PrismaClient } from "prisma/prisma-client"

export const getRecipes = async (q: { filter?: string; tag?: string|string[] }) => {
  const prisma = new PrismaClient()
  if(typeof q.tag==="string")q.tag=[q.tag]
  try {
    return await prisma.recipe.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q.filter || "",
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: q.filter || "",
              mode: "insensitive",
            },
          },
        ],
        tags: { hasEvery: q.tag || [] },
      },
      include: { Reviews: true },
    })
  } catch (error) {
    console.log(error)
  }
}

export const createRecipe = async (
  profile_id: string,
  title: string,
  description: string,
  prep_time: string,
  cook_time: string,
  servings: number,
  ingredients: string[],
  directions: string[],
  tags: string[],
  image_url: string
) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.create({
      data: {
        title,
        profile_id,
        description,
        prep_time,
        cook_time,
        servings,
        ingredients,
        directions,
        tags,
        image_url,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const editRecipe = async (
  recipeId: string,
  title: string,
  description: string,
  prep_time: string,
  cook_time: string,
  servings: number,
  ingredients: string[],
  directions: string[],
  tags: string[]
) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        description,
        prep_time,
        cook_time,
        servings,
        ingredients,
        directions,
        tags,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteRecipe = async (recipeId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.delete({
      where: { id: recipeId },
    })
  } catch (error) {
    console.log(error)
  }
}

export const getRecipesByProfileId = async (profileId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.findMany({
      where: { profile_id: profileId },
      include: { Reviews: true },
    })
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeById = async (recipeId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.findFirst({
      where: { id: recipeId },
      include: {
        author: true,
        Reviews: true,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const getNumberOfRecipesByProfileId = async (profileId: string) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.recipe.count({
      where: { profile_id: profileId },
    })
  } catch (error) {
    console.log(error)
  }
}
