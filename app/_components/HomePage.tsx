"use client";

import { FoodMenuCard } from "./FoodMenuCard";
import { useFood } from "../_hooks/useFood";

export const HomePage = () => {
  const { categories, foods } = useFood();

  return (
    <div className="bg-neutral-700 min-h-screen text-white">
      <div className="relative w-full">
        <img
          src="/images/HomePagePicture.png"
          alt="Today's Offer"
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto p-22 flex flex-col gap-9">
        {categories.map((category) => (
          <div key={category._id} className="space-y-9">
            <h2 className="text-2xl font-semibold ">{category.name}</h2>
            <div className="flex gap-9">
              {foods
                .filter((food) => food.categoryId._id === category._id)
                .map((food) => (
                  <FoodMenuCard key={food._id} food={food} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
