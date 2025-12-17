import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LucideShoppingCart } from "lucide-react";
import React from "react";

export const HeaderShoppingCartDrawerHeader = () => {
  return (
    <DrawerHeader className="flex-row gap-3 items-center py-1">
      <LucideShoppingCart size={24} />
      <DrawerTitle className="text-xl leading-7 text-primary-foreground">
        Order detail
      </DrawerTitle>
      <DrawerDescription />
    </DrawerHeader>
  );
};
