import Image from "next/image"
import { getUserProfile } from "../db"
import Link from "next/link"
import { Metadata } from "next"

export const metadata:Metadata={
    title:"Profile Details"
}

const ProfileDetailsPage = async ({
  params,
}: {
  params: { profileId: string }
}) => {
  const { profileId } = params
  const profile = await getUserProfile(profileId)
  return (
    <main className="grow m-4 md:m-12 mt-8">
      <article className="md:flex">
        <Image
          alt="Profile image"
          src={profile?.profile_image as string}
          width={48}
          height={48}
          className="rounded-full aspect-square mr-4"
        />
        <section>
          <h1>{`${profile?.first_name} ${profile?.last_name}`}</h1>
          <small className="text-gray-300">{`@${profile?.email}`}</small>
        </section>
        <Link href={`/profile/edit/${profileId}`}>Edit</Link>
      </article>
    </main>
  )
}

export default ProfileDetailsPage
