"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const RecipeFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleInput = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) params.set("filter", term)
    else params.delete("filter")
    replace(`${pathname}?${params.toString()}`)
  }, 200)
  return (
    <input
      className="p-3 mb-4 border border-gray-200 rounded-md"
      type="text"
      defaultValue={searchParams.get("filter")?.toString()}
      placeholder="Search recipe"
      onChange={(ev) => handleInput(ev.target.value)}
    />
  )
}

export default RecipeFilter
