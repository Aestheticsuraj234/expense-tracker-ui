"use client";
// global
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// locals
// @ts-ignore
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignUpSchema } from "@/schema/schema";
import toast from "react-hot-toast";
import { CardWrapper } from "../components/card-wrapper";
import axios from "axios";

const SignUp = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    console.log(values);

    try {
      setIsPending(true);

      const { email, first_name, last_name, password, confirm_password } =
        values;

      if (password !== confirm_password) {
        toast.error("Password and confirm password does not match");
        return;
      }

     
      const response = await axios.post(
        "https://140.238.227.78:8080/register",
        {
          email,
          first_name,
          last_name,
          password,
        },
        {
          headers: {
            "X-XSRF-TOKEN": "4fa2f8a8-9a9d-4d4f-b5dc-284052b63c18",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        toast.success("Email sent. Please check your inbox.");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <div className="flex md:justify-between justify-center flex-1 md:flex-row flex-col items-center my-1  w-full ">
        <Image
          src={"/sign-up.svg"}
          alt={"signup"}
          width={600}
          height={600}
          className="md:mb-0 mb-2"
        />
        <CardWrapper
          headerLabel="Create an Account!"
          backButtonLabel="Already have an account? login"
          backButtonHref="/sign-in"
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
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="jhon"
                          type="text"
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
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="doe"
                          type="text"
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
                          placeholder="12345678"
                          type="password"
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
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="12345678"
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
                Register
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default SignUp;
