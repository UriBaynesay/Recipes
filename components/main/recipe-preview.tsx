import Image from "next/image"
import Link from "next/link"
import { Recipe, Reviews } from "prisma/prisma-client"

const RecipePreview = ({ recipe }: { recipe: Recipe&{Reviews:Reviews[]} }) => {
  let avgRating
  if(recipe.Reviews.length)
   avgRating=recipe.Reviews.reduce((acc,curr)=>{
    return acc+curr.rating
  },0)/recipe.Reviews.length
  return (
    <li className="mb-4">
      <Link href={`/recipe/${recipe.id}`} className="flex flex-col hover:no-underline">
        <Image
          alt="Recipe image"
          src={recipe.image_url}
          height={300}
          width={300}
          className="aspect-square rounded-md self-center md:self-start"
        />
        <div className="my-3">
          <h1 className="font-semibold text-xl hover:underline decoration-background">{recipe.title}</h1>
          <small className="hover:no-underline">{`Rating : ${
            avgRating ? `${avgRating.toFixed(1)}` : "No rating"
          }`}</small>
        </div>
      </Link>
    </li>
  )
}

export default RecipePreview
