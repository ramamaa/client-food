"use client";
import { useEffect, useState } from "react";

export const useFood = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const getCategories = async () => {
    const result = await fetch(
      "https://food-backend-lac.vercel.app/api/categories"
    );
    const responseData = await result.json();
    setCategories(responseData.data);
  };

  const getFoods = async () => {
    const result = await fetch("https://food-backend-lac.vercel.app/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return {
    categories,
    foods,
  };
};
