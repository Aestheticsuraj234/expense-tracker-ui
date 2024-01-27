import * as z from "zod";


export const SignUpSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters long",
  }),
  confirm_password: z.string().min(8,{
    message: "Password must be at least 8 characters long",
  }),
});


export const SignInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirm_password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),

})

export const ExpenseForm = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  amount: z.number().positive({
    message: "Amount must be a positive number",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters long",
  }),
  date: z.string().min(2, {
    message: "Date must be at least 2 characters long",
  }),
})