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
import { toast } from "sonner";
import { email, z } from "zod";
const passwordChecks = [
  { test: (s: string) => s.length >= 8, msg: "At least 8 characters" },
  { test: (s: string) => /[A-Z]/.test(s), msg: "An uppercase letter" },
  { test: (s: string) => /[a-z]/.test(s), msg: "A lowercase letter" },
  { test: (s: string) => /\d/.test(s), msg: "A number" },
  { test: (s: string) => /[^A-Za-z0-9]/.test(s), msg: "A special character" },
];

const formSchema = z
  .object({
    password: z.string().superRefine((val, ctx) => {
      const failed = passwordChecks
        .filter((c) => !c.test(val))
        .map((c) => c.msg);
      if (failed.length) {
        for (const msg of failed) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: msg });
        }
      }
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpPasswordProps = {
  password: string;
  setPassword: (password: string) => void;
  handleBackStep: () => void;
  handleSubmitAll: () => Promise<void>;
};

export const SignUpPassword = ({
  password,
  setPassword,
  handleBackStep,
  handleSubmitAll,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password, confirmPassword: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPassword(values.password);
    handleSubmitAll(values.password);
  };
  return (
    <div>
      <div className="w-104">
        <Button
          onClick={handleBackStep}
          className="w-9 h-9 border-1 rounded-md flex justify-center items-center ">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="password"
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
                      <Input placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-6">
                    <FormControl>
                      <Input placeholder="Confirm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="rounded-md bg-primary w-full h-9 px-8"
              onClick={() => toast.success("Account created")}>
              Let's go
            </Button>
            <FormDescription className="flex justify-center gap-2">
              Already have an account?
              <Link href="/login" className="text-blue-500">
                Log in
              </Link>
            </FormDescription>
          </form>
        </Form>
      </div>
    </div>
  );
};
