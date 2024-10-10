import { Metadata } from "next"
import { getRecipeById } from "../db"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

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
    <main className="grow m-4 md:m-12 mt-8 md:flex md:justify-center">
      <article className="md:flex md:flex-col [&>*]:mb-10">
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
              className="aspect-square"
            />
            <small>{`${recipe?.author.first_name} ${recipe?.author.last_name}`}</small>
          </Link>
          <small className="text-gray-300">
            Updated at {recipe?.updated_at.toLocaleDateString()}
          </small>
        </div>
        <p className="text-sm">{recipe?.description}</p>
        <div className="md:grid md:grid-cols-3 md:gap-3">
          <div>Prep Time : {recipe?.prep_time}</div>
          <div>Cook Time : {recipe?.cook_time}</div>
          <div>Servings : {recipe?.servings}</div>
        </div>
        <h1 className="font-semibold text-xl">Ingredients</h1>
        <ul className="list-disc">
          {recipe?.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <h1 className="font-semibold text-xl">Directions</h1>
        <ol className="list-decimal">
          {recipe?.directions.map((direction) => (
            <li key={direction}>{direction}</li>
          ))}
        </ol>
      </article>
    </main>
  )
}

export default RecipeDetailsPage
