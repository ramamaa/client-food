"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CartFood, NewFoodType } from "@/lib/types";
import React, { useState } from "react";

import { toast } from "sonner";
import { FoodCardDetailsDialogTrigger } from "./FoodCardDetailsDialogTrigger";
import { FoodCardDetailsImage } from "./FoodCardDetailsImage";
import { FoodCardDetailsNameAndIngredients } from "./FoodCardDetailsNameAndIngredients";
import { FoodCardDetailsPriceAndMinusQuantityPlusBtn } from "./FoodCardDetailsPriceAndMinusQuantityPlusBtn";

export const FoodCardDetails = ({
  filteredFood,
}: {
  filteredFood: NewFoodType;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrementQuantity = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };

  const handleIncrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleAddMultiFoodsToCart = (filteredFood: NewFoodType) => {
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    const existingFood = cartFoods.find(
      (cartFood) => cartFood.food._id === filteredFood._id
    );

    if (existingFood) {
      existingFood.quantity += quantity;
    } else {
      cartFoods.push({ food: filteredFood, quantity: quantity });
    }

    localStorage.setItem("cartFoods", JSON.stringify(cartFoods));
    setOpen(false);
    toast(`${filteredFood.foodName} added to the cart!`);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FoodCardDetailsDialogTrigger filteredFood={filteredFood} />

      <DialogContent className="sm:max-w-[826px] flex rounded-[20px] gap-6">
        <FoodCardDetailsImage filteredFoodImage={filteredFood?.image} />

        <div className="w-1/2 flex flex-col gap-27">
          <FoodCardDetailsNameAndIngredients
            filteredFoodName={filteredFood?.foodName}
            filteredFoodIngredients={filteredFood?.ingredients}
          />

          <div className="flex flex-col gap-6">
            <FoodCardDetailsPriceAndMinusQuantityPlusBtn
              filteredFoodPrice={filteredFood?.price}
              quantity={quantity}
              handleDecrementQuantity={handleDecrementQuantity}
              handleIncrementQuantity={handleIncrementQuantity}
            />

            <Button
              className="w-full rounded-full h-11 py-3 cursor-pointer"
              onClick={() => handleAddMultiFoodsToCart(filteredFood)}>
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
