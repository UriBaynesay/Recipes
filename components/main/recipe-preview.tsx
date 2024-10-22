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
    <li className="md:mb-4 md:mx-auto">
      <Link href={`/recipe/${recipe.id}`}>
        <Image
          alt="Recipe image"
          src={recipe.image_url}
          height={250}
          width={250}
          className="aspect-square rounded-md"
        />
        <div className="p-3">
          <h1 className="font-semibold text-xl">{recipe.title}</h1>
          <small>{`Rating : ${
            avgRating ? `${avgRating.toFixed(1)}` : "No rating"
          }`}</small>
        </div>
      </Link>
    </li>
  )
}

export default RecipePreview
