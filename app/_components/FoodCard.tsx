"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { toast } from "sonner";
import { CartFood, NewFoodType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { FoodCardDetails } from "./FoodCardDetails";

export const FoodCard = ({ filteredFood }: { filteredFood: NewFoodType }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    const existingFood = cartFoods.find(
      (cartFood) => cartFood.food._id === filteredFood._id
    );

    if (existingFood) {
      setIsDisabled(true);
    }
  }, [filteredFood._id]);

  const handleAddSingleFoodToCart = (filteredFood: NewFoodType) => {
    // get from localstorage
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    const existingFood = cartFoods.find(
      (cartFood) => cartFood.food._id === filteredFood._id
    );

    if (existingFood) {
      existingFood.quantity = existingFood.quantity + 1;
    } else {
      cartFoods.push({ food: filteredFood, quantity: 1 });
    }

    // save to localstorage
    localStorage.setItem("cartFoods", JSON.stringify(cartFoods));
    toast(`${filteredFood.foodName} added to the cart!`);
    setIsDisabled(true);
  };

  return (
    <div className="w-[397.3px] p-4 rounded-[20px] flex flex-col gap-5 bg-background">
      <div className="w-full h-[210px] rounded-xl relative overflow-hidden">
        {filteredFood.image ? (
          <Image
            src={filteredFood.image}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          ""
        )}
        <div className="absolute z-50 ml-[301.3px] mt-[146px]">
          <Button
            onClick={() => {
              handleAddSingleFoodToCart(filteredFood);
            }}
            disabled={isDisabled}
            variant={"outline"}
            className={`size-11 rounded-full cursor-pointer ${
              isDisabled &&
              "bg-primary text-[#E4E4E7] border-none hover:bg-primary/20 hover:text-[#E4E4E7]"
            }`}>
            <Plus
              size={16}
              className={`text-red-500 ${isDisabled && "hidden"}`}
            />
            <Check size={16} className={`${!isDisabled && "hidden"}`} />
          </Button>
        </div>
      </div>

      <FoodCardDetails filteredFood={filteredFood} />
    </div>
  );
};
