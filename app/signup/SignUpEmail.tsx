"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupCompAlreadyAccount } from "./SignupCompAlreadyAccount";

const formSchema = z.object({
  email: z.email({
    message: "Invalid email. Use a format like example@email.com",
  }),
});

export const SignupEmail = ({
  handleNextStep,
}: {
  handleNextStep: (email: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleNextStep(values.email);
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant={"outline"}
        onClick={() => router.push("/")}
        className="w-fit cursor-pointer">
        <ChevronLeft className="size-4" />
      </Button>

      <div>
        <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
          Create your account
        </h2>
        <p className="text-base leading-6 text-muted-foreground">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/20 cursor-pointer">
            Let's Go
          </Button>

          <SignupCompAlreadyAccount />
        </form>
      </Form>
    </div>
  );
};
