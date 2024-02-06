import * as z from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirm_password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
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
});

export const AddExpenseForm = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  amount: z.string().min(2,{
    message: "Amount must be a least of 2 characters long",
  }),
  categoryName: z.string().min(2,{
    message: "Category must be at least 2 characters",
  }),
  date:z.date({
    required_error: "date is required.",
  }),

});

export const UpdateExpenseForm = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  // amount is must be positive   
  amount: z.string().min(2,{
    message: "Amount must be a least of 2 characters long",
  }),

  category: z.string().min(2,{
    message: "Category must be at least 2 characters",
  }),
  date:z.date({
    required_error: "date is required.",
  }),

});

export const overviewSchema = z.object({
  StartDate: z.date({
    required_error: "A start date is required.",
  }),
  EndDate: z.date({
    required_error: "An end date is required.",
  }),
});

export const categorySchema = z.object({
  from: z.date({
    required_error: "A start date is required.",
  }),
  to: z.date({
    required_error: "An end date is required.",
  }),
  //  array of category ids
  category_ids:  z.array(
    z.string().min(2,{
      message: "Category must be at least 2 characters",
    })
  ),
  
});

