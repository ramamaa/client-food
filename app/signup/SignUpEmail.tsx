"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

const formSchema = z.object({
  email: z.email("Invalid email. Use a format like example@email.com"),
});

export const SignUpEmail = ({ email, setEmail, handleNextStep }: any) => {
  const form = useForm({ defaultValues: { email } });

  const onSubmit = (values: any) => {
    setEmail(values.email);
    handleNextStep();
  };

  return (
    <div>
      <div className="w-104">
        <Button className="w-9 h-9 border-1 rounded-md flex justify-center items-center ">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-6 pt-6">
                  <div>
                    <FormLabel className="font-semibold leading-8 text-2xl text-foreground">
                      Create your account
                    </FormLabel>
                    <FormDescription className="text-muted-foreground leading-6 text-base">
                      Sign up to explore your favorite dishes.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input placeholder="enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-md bg-primary w-full h-9 px-8">
              Let's go
            </Button>
            <FormDescription className="flex justify-center gap-2">
              Already have an account?
              <Link href="" className="text-blue-500">
                Log in
              </Link>
            </FormDescription>
          </form>
        </Form>
      </div>
    </div>
  );
};
