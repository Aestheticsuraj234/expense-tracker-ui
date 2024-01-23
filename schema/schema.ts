import * as z from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  password: z.string().min(5,{
    message: "Password must be at least 5 characters long",
  }),
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
});
