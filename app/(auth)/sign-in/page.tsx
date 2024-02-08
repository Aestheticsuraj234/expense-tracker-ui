"use client";
// global
import Image from "next/image";
import React, { use } from "react";
import { useRouter } from "next/navigation";
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
import toast from "react-hot-toast";
import axios from "axios";

const SignIn = () => {
  const [isPending, setIsPending] = React.useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      const base64Data = btoa(`${values.email}:${values.password}`);
      console.log("BASE_64:", base64Data);

      const response = await axios.get(
        "http://140.238.227.78:8080/login/user_info",
        {
          headers: {
            Authorization: `Basic ${base64Data}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "*",
          },
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        toast.success("Login Successfull");
        sessionStorage.setItem("user_id", response.data.id);
        sessionStorage.setItem("authorization_header", base64Data);
        sessionStorage.setItem(
          "full_name",
          response.data.first_name
        );
        router.push("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);

      toast.error("Unable to Login, Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="md:text-3xl text-xl  font-extrabold mb-7 bg-clip-text text-transparent bg-gradient-to-r  from-gray-900 to-gray-600  dark:from-indigo-300 dark:to-purple-400 text-center">
        Login to the Expense Tracker
      </h1>
      <div className="flex md:justify-between justify-center flex-1 md:flex-row flex-col items-center my-1  w-full ">
        <Image
          src={"/login_2.svg"}
          alt={"signup"}
          width={520}
          height={520}
          className="md:mb-0 mb-2"
        />
        <CardWrapper
          headerLabel="Welcome Back!"
          backButtonLabel="Dont have an Account!"
          backButtonHref="/sign-up"
          showSocial={false}
          showForgotPassword={true}
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
                          disabled={isPending}
                          placeholder="jhon.doe@emaple.com"
                          type="email"
                          className="dark:bg-zinc-700 dark:text-white"
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
                          disabled={isPending}
                          placeholder="1234567"
                          type="password"
                          className="dark:bg-zinc-700 dark:text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={isPending} type="submit" className="w-full">
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
