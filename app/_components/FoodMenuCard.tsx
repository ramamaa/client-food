import { Plus } from "lucide-react";
import Image from "next/image";

type FoodMenuCardProps = {
  food: FoodType;
};

export const FoodMenuCard = ({ food }: FoodMenuCardProps) => {
  const { image, price, ingredients, name } = food;
  return (
    <div className="w-100 rounded-3xl border-1 bg-white p-4 flex flex-col gap-5">
      <div className="relative">
        <img src={image} alt="" className="w-91 h-fit rounded-xl relative" />
        <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center cursor-pointer">
          <Plus className="text-red-500 " />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between leading-5 text-sm">
          <p className="text-red-500  font-medium ">{name}</p>
          <p className="text-black">{price}$</p>
        </div>
        <p className="leading-4 font-normal text-xs text-black">
          {ingredients}
        </p>
      </div>
    </div>
  );
};
