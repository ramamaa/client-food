"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { LucideShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { HeaderShoppingCartDrawerContent } from "./HeaderShoppingCartDrawerContent";
import { CartFood } from "@/lib/types";

export const HeaderShoppingCart = ({ email }: { email: string }) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartFoods, setCartFoods] = useState<CartFood[]>([]);

  const reloadFoods = () => {
    setCartOpen(true);

    const cartFoodsFromLocal = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    setCartFoods(cartFoodsFromLocal);
  };

  return (
    <div>
      <Drawer direction="right" open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerTrigger
          asChild
          onClick={reloadFoods}
          className="cursor-pointer border-0">
          <Button
            variant={"outline"}
            className="size-9 rounded-full relative border-0">
            <LucideShoppingCart
              size={16}
              className="text-secondary-foreground"
            />
            {cartFoods.length > 0 && (
              <div className="w-5 h-5 absolute left-5 bottom-5 z-30 rounded-full bg-red-500 text-[10px] leading-4 font-medium text-primary-foreground flex justify-center items-center">
                {cartFoods.length}
              </div>
            )}
          </Button>
        </DrawerTrigger>

        <HeaderShoppingCartDrawerContent
          cartFoods={cartFoods}
          email={email}
          reloadFoods={reloadFoods}
          setCartOpen={setCartOpen}
        />
      </Drawer>
    </div>
  );
};
