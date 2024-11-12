"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import X from "@/app/public/x.svg"

const tags = [
  "5 Ingredient Main Dishes",
  "One-Pot Meals",
  "Quick and Easy Recipes",
  "30-Minute Meals",
  "Soups, Stews and Chili",
  "Comfort Food",
  "Main Dishes",
  "Sheet Pan Dinners",
  "Family Dinner Ideas & Recipes",
]

const RecipeFilter = () => {
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleTextInput = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) params.set("filter", term)
    else params.delete("filter")
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  const handleTagInput = useDebouncedCallback((tag: string) => {
    const params = new URLSearchParams(searchParams)
    if (!params.getAll("tag").includes(tag)) params.append("tag", tag)
    else params.delete("tag", tag)
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <div>
      <button
        className="p-2 border border-background rounded-sm text-sm"
        onClick={() => setIsTagsModalOpen(!isTagsModalOpen)}
      >
        Tags
      </button>
      <div
        className={
          (isTagsModalOpen ? "block " : "hidden ") +
          "absolute bg-white p-4 border border-background"
        }
      >
        {tags.map((tag) => (
          <label key={tag} className="block mt-2">
            <input
              type="checkbox"
              value={tag}
              checked={searchParams.getAll("tag").includes(tag)}
              onChange={() => handleTagInput(tag)}
            />
            <span className="ml-2 text-sm">{tag}</span>
          </label>
        ))}
        <button className="mt-4 block ml-auto" onClick={() => setIsTagsModalOpen(false)}>
          <Image alt="Close tags modal" src={X} height={18} width={18} />
        </button>
      </div>
      <input
        className="p-2 mb-4 ml-3 border border-gray-200 rounded-sm text-sm"
        type="text"
        defaultValue={searchParams.get("filter")?.toString()}
        placeholder="Search recipe"
        onChange={(ev) => handleTextInput(ev.target.value)}
      />
    </div>
  )
}

export default RecipeFilter
