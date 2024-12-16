import RecipePreviewSkeleton from "@/components/main/recipe-preview-skeleton"

function RecipesListSkeleton() {
  return (
    <section>
      <ul className="mt-4 md:grid md:grid-cols-4 md:gap-4">
        {Array(8)
          .fill(null)
          .map((_, idx) => (
            <RecipePreviewSkeleton key={idx} />
          ))}
      </ul>
    </section>
  )
}

export default RecipesListSkeleton
