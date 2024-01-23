"use client";
// global
import Image from "next/image";
import React from "react";

// locals
// @ts-ignore
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignInSchema } from "@/schema/schema";
import { CardWrapper } from "../components/card-wrapper";

const SignIn = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="text-3xl font-extrabold mb-7 bg-clip-text text-transparent bg-gradient-to-r  from-gray-900 to-gray-600  dark:from-indigo-300 dark:to-purple-400 text-center">
        Login to the Expense Tracker
      </h1>
      <div className="flex justify-between flex-1 flex-row items-center my-1  w-full ">
      <Image src={"/login_2.svg"} alt={"signup"} width={520} height={520} />
        <CardWrapper
          headerLabel="Welcome Back!"
          backButtonLabel="Dont have an Account!"
          backButtonHref="/sign-up"
          showSocial={false}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="jhon.doe@emaple.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
          <FormSuccess message={success} /> */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default SignIn;
