function RecipePreviewSkeleton() {
  return (
    <li className="mb-4">
      <div className="h-[300px] w-[300px] rounded-md self-center md:self-start bg-gray-200"></div>
      <div className="my-3">
        <h1 className="font-semibold text-xl hover:underline decoration-background bg-gray-200"></h1>
        <small className="hover:no-underline bg-gray-200"></small>
      </div>
    </li>
  )
}

export default RecipePreviewSkeleton