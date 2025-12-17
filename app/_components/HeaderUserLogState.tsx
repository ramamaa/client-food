"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { HeaderUserLogHoverContent } from "./HeaderUserLogHoverContent";

export const HeaderUserLogState = ({ email }: { email: string }) => {
  const router = useRouter();

  const userLogOutHandler = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className={`${!email && "hidden"}`}>
      <HoverCard>
        <HoverCardTrigger asChild className="cursor-pointer p-0">
          <Button
            variant={"destructive"}
            className="size-9 rounded-full bg-red-500 cursor-pointer">
            <User size={16} className="-ml-[1px]" />
          </Button>
        </HoverCardTrigger>

        <HeaderUserLogHoverContent
          email={email}
          userLogOutHandler={userLogOutHandler}
        />
      </HoverCard>
    </div>
  );
};
