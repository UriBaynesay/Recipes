import { getUserProfile } from "@/app/(main)/profile/db"
import Image from "next/image"
import Link from "next/link"

const ProfilePreview = async ({ profileId }: { profileId: string }) => {
  const profile = await getUserProfile(profileId)
  return (
    <article className="md:flex mb-10">
      <Image
        alt="Profile image"
        src={profile?.profile_image as string}
        width={48}
        height={48}
        className="rounded-full aspect-square mr-4"
      />
      <section>
        <h1>{`${profile?.first_name} ${profile?.last_name}`}</h1>
        <small className="text-gray-300">{profile?.email}</small>
      </section>
      <Link href={`/profile/edit/${profileId}`}>Edit</Link>
    </article>
  )
}

export default ProfilePreview