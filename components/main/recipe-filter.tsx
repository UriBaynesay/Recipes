"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import X from "@/app/public/x.svg"

const categories = [
  {
    title: "Dinners",
    tags: [
      "5 Ingredient Main Dishes",
      "One-Pot Meals",
      "Quick and Easy Recipes",
      "30-Minute Meals",
      "Soups, Stews and Chili",
      "Comfort Food",
      "Main Dishes",
      "Sheet Pan Dinners",
      "Family Dinner Ideas & Recipes",
    ],
  },
  {
    title: "Meals",
    tags: [
      "Breakfast & Brunch",
      "Lunch",
      "Healthy",
      "Salads",
      "Soups",
      "Bread",
      "Drinks",
      "Desserts",
      "Side Dishes",
    ],
  },
  {
    title: "Ingredients",
    tags: [
      "Chicken",
      "Beef",
      "Pork",
      "Seafood",
      "Pasta",
      "Fruits",
      "Vegetables",
    ],
  },
  {
    title: "Cuisins",
    tags: [
      "Mexican",
      "Italian",
      "Chinese",
      "Indian",
      "German",
      "Greek",
      "Filipino",
      "Japanese",
    ],
  },
]

const RecipeFilter = () => {
  const [openModal, setOpenModal] = useState(-1)
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
      <input
        className="p-2 mb-4 ml-3 border border-gray-200 rounded-sm text-sm block"
        type="text"
        defaultValue={searchParams.get("filter")?.toString()}
        placeholder="Search recipe"
        onChange={(ev) => handleTextInput(ev.target.value)}
      />
      <div className="flex justify-center">
        {categories.map((category, idx) => (
          <div key={category.title} className="relative ">
            <button
              className="p-2 font-bold underline decoration-background underline-offset-4"
              onMouseOver={() => setOpenModal(idx)}
            >
              {category.title}
            </button>
            <div
              onMouseLeave={() => setOpenModal(-1)}
              className={
                (openModal === idx ? "block " : "hidden ") +
                "absolute bg-white p-5 shadow-md shadow-gray-300"
              }
            >
              <ul className="w-[200px] h-[250px] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                {category.tags.map((tag) => (
                  <li key={tag} className="mr-2 w-fit">
                    <label className="block mt-2">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={searchParams.getAll("tag").includes(tag)}
                        onChange={() => handleTagInput(tag)}
                      />
                      <span className="ml-2 text-sm">{tag}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 block ml-auto"
                onClick={() => setOpenModal(-1)}
              >
                <Image alt="Close tags modal" src={X} height={18} width={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecipeFilter
