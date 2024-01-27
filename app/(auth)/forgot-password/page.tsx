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
import { ForgotPasswordSchema } from "@/schema/schema";
import { CardWrapper } from "../components/card-wrapper";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [isPending, setIsPending] = React.useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      if (values.password !== values.confirm_password) {
        toast.error("Password and confirm password does not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/forget_password",
        {
          email: values.email,
          password: values.password,
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
      <h1 className="md:text-3xl text-xl  font-extrabold mb-7 bg-clip-text text-transparent bg-gradient-to-r  from-gray-900 to-gray-600  dark:from-indigo-300 dark:to-purple-400 text-center">
        Forgot Your Password!
      </h1>
      <div className="flex md:justify-between justify-center flex-1 md:flex-row flex-col items-center my-1  w-full ">
        <Image
          src={"/forgot_password.svg"}
          alt={"Forgot Password"}
          width={520}
          height={520}
          className="md:mb-0 mb-2"
        />
        <CardWrapper
          headerLabel="Forgot Your Password!"
          backButtonLabel="Dont have an Account!"
          backButtonHref="/sign-up"
          showSocial={false}
          showForgotPassword={false}
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

              <Button disabled={isPending} type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default ForgotPassword;
