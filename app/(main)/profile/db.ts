import { PrismaClient } from "prisma/prisma-client"

export const getProfiles = async () => {
  const prisma = new PrismaClient()
  try {
    const profile = await prisma.profile.findMany()
    if (profile) return profile
    return null
  } catch (error) {
    console.log(error)
  }
}

export const getUserProfile = async (userId: string) => {
  const prisma = new PrismaClient()
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: userId },
    })
    if (profile) return profile
    return null
  } catch (error) {
    console.log(error)
  }
}

export const createProfile = async (
  userId: string,
  first_name: string,
  last_name: string,
  email: string,
  profile_image: string
) => {
  const prisma = new PrismaClient()
  try {
    return await prisma.profile.create({
      data: {
        id: userId,
        first_name,
        last_name,
        email,
        profile_image,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const editProfile = async (
  userId: string,
  first_name: string,
  last_name: string,
  email: string,
  profile_image: string
) => {
  const prisma = new PrismaClient()
  try {
    await prisma.profile.update({
      where: { id: userId },
      data: {
        first_name,
        last_name,
        email,
      },
    })
    if (profile_image)
      await prisma.profile.update({
        where: { id: userId },
        data: {
          profile_image,
        },
      })
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}

export const deleteProfile = async (userId: string) => {
  const prisma = new PrismaClient()
  try {
    await prisma.profile.delete({
      where: { id: userId },
    })
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}
