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
    <Link href={`/recipe/${recipe.id}`} className="mb-4">
      <Image
        alt="Recipe image"
        src={recipe.image_url}
        height={280}
        width={280}
        className="aspect-square mb-4"
      />
      <h1 className="font-bold text-xl">{recipe.title}</h1>
      <small>{`Rating : ${avgRating ? `${avgRating.toFixed(1)}` : "No rating"}`}</small>
    </Link>
  )
}

export default RecipePreview
