"use client";

import { useFood } from "../_hooks/use-food";
import { Skeleton } from "@/components/ui/skeleton";
import { FoodCard } from "./FoodCard";

export const HomePage = () => {
  const { loading, categories, foods } = useFood();

  return (
    <div className="bg-[#2b2b2b] min-h-screen text-white pb-20">
      {/* HERO */}
      <div className="w-full h-[668px] relative overflow-hidden">
        <img
          src="/images/HomePagePicture.svg"
          alt="Home banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-[1440px] mx-auto px-16 mt-20 flex flex-col gap-20">
        {categories.map((category) => (
          <div key={category._id} className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold">{category.categoryName}</h2>

            <div className="grid grid-cols-3 gap-9">
              {foods
                .filter((food) => food.categoryId?._id === category._id)
                .map((food) => (
                  <FoodCard key={food._id} filteredFood={food} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
