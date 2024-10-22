import { Metadata } from "next"
import { getRecipeById } from "../db"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CreateReview from "@/components/main/review/create-review"
import ReviewsList from "@/components/main/review/reviews-list"

export const metadata: Metadata = {
  title: "Recipe Details",
}

const RecipeDetailsPage = async ({
  params,
}: {
  params: { recipeId: string }
}) => {
  const user = auth()
  const recipe = await getRecipeById(params.recipeId)
  if (!recipe) redirect("/")
  return (
    <main className="grow m-4 md:mx-48">
      <article className="[&>*]:mb-10">
        <div>
          {user.userId === recipe?.profile_id && (
            <section className="[&>*]:mr-3">
              <Link href={`/recipe/edit/${recipe.id}`}>Edit</Link>
              <Link href={`/recipe/delete/${recipe.id}`}>Delete</Link>
            </section>
          )}
          <h1 className="font-bold text-5xl mb-3">{recipe?.title}</h1>
          <Link
            href={`/profile/${recipe?.author.id}`}
            className="flex items-center"
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
        <p className="text-sm">{recipe?.description}</p>
        <div className="md:flex md:justify-between">
          <div className="pb-3 border-b-4 border-orange-300 ">
            Prep Time : {recipe?.prep_time}
          </div>
          <div className="pb-3 border-b-4 border-orange-300 ">
            Cook Time : {recipe?.cook_time}
          </div>
          <div className="pb-3 border-b-4 border-orange-300 ">
            Servings : {recipe?.servings}
          </div>
        </div>

        <ul className="list-disc">
          <h1 className="font-bold text-4xl mb-3">Ingredients</h1>
          {recipe?.ingredients.map((ingredient) => (
            <li key={ingredient} className="mb-4">
              <p>{ingredient}</p>
            </li>
          ))}
        </ul>

        <ol className="list-decimal">
          <h1 className="font-bold text-4xl mb-3">Directions</h1>
          {recipe?.directions.map((direction) => (
            <li key={direction} className="mb-4">
              <p>{direction}</p>
            </li>
          ))}
        </ol>
      </article>
      <CreateReview recipeId={recipe.id} />
      <ReviewsList recipeId={recipe.id} />
    </main>
  )
}

export default RecipeDetailsPage
