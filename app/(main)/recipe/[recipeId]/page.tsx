import { Metadata } from "next"
import { getRecipeById } from "../db"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CreateReview from "@/components/main/review/create-review"
import ReviewsList from "@/components/main/review/reviews-list"
import RatingStar from "@/app/public/recipe-review-star.svg"

export const metadata: Metadata = {
  title: "Recipe Details",
}

const RecipeDetailsPage = async ({
  params,
}: {
  params: Promise<{ recipeId: string }>
}) => {
  const user = await auth()
  const { recipeId } = await params
  const recipe = await getRecipeById(recipeId)
  if (!recipe) redirect("/")
  const rating =
    recipe.Reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0) / recipe.Reviews.length

  return (
    <main className="grow m-4 lg:mx-36 xl:mx-80">
      <article className="[&>*]:mb-10">
        <div>
          {user.userId === recipe?.profile_id && (
            <section className="[&>*]:mr-3">
              <Link href={`/recipe/edit/${recipe.id}`}>Edit</Link>
              <Link
                href={`/recipe/delete/${recipe.id}`}
                className="font-semibold text-red-500"
              >
                Delete
              </Link>
            </section>
          )}
          <h1 className="font-bold text-5xl">{recipe?.title}</h1>
          {recipe.Reviews.length > 0 && (
            <div className="flex gap-4 mt-3">
              <div className="flex">
                {Array(Math.floor(rating))
                  .fill(0)
                  .map((_, idx) => (
                    <Image
                      key={idx}
                      alt="Review rating star"
                      src={RatingStar}
                      height={18}
                      width={18}
                    />
                  ))}
              </div>
              <div>
                <Link href="#reviews-list">
                  <small className="pl-4 border-l border-gray-300 font-bold underline decoration-background underline-offset-4">
                    {recipe.Reviews.length} REVIEWS
                  </small>
                </Link>
              </div>
            </div>
          )}
          <p className="text-sm mt-3">{recipe?.description}</p>
          <Link
            href={`/profile/${recipe?.author.id}`}
            className="flex items-center mt-3"
          >
            <Image
              alt="Profile image"
              src={recipe?.author.profile_image as string}
              height={32}
              width={32}
              className="aspect-square rounded-full mr-2"
            />
            <small>{`${recipe?.author.first_name} ${recipe?.author.last_name}`}</small>
          </Link>
          <small className="text-gray-300">
            Updated at {recipe?.updated_at.toLocaleDateString()}
          </small>
        </div>
        <Link href={recipe.image_url} className="block">
          <Image
            alt="Recipe image"
            src={recipe.image_url}
            height={350}
            width={350}
            className="aspect-square mx-auto"
          />
        </Link>
        <div className="md:flex md:justify-between">
          <div>
            <h1 className="mb-2 border-b-4 border-orange-300">Prep Time</h1>
            <p>{recipe?.prep_time}</p>
          </div>
          <div>
            <h1 className="mb-2 border-b-4 border-orange-300">Cook Time</h1>
            <p>{recipe?.cook_time}</p>
          </div>
          <div>
            <h1 className="mb-2 border-b-4 border-orange-300">Servings</h1>
            <p>{recipe?.servings}</p>
          </div>
        </div>

        <ul className="list-disc mx-2">
          <h1 className="font-bold text-4xl">Ingredients</h1>
          {recipe?.ingredients.map((ingredient) => (
            <li key={ingredient} className="mt-6">
              <p>{ingredient}</p>
            </li>
          ))}
        </ul>

        <ol className="list-decimal mx-2">
          <h1 className="font-bold text-4xl">Directions</h1>
          {recipe?.directions.map((direction) => (
            <li key={direction} className="mt-6">
              <p>{direction}</p>
            </li>
          ))}
        </ol>
      </article>
      <CreateReview recipeId={recipe.id} title={recipe.title} />
      <ReviewsList recipeId={recipe.id} />
    </main>
  )
}

export default RecipeDetailsPage
