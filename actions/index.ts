"use server";
import axios from 'axios';
import { ExpenseData } from "@/app/(root)/_components/table/column";




export const getAllExpenseOfCurrentUser = async (
  userId: string | null,
  authorizationHeader: string | null
): Promise<ExpenseData[]> => {
  try {
    // Fetch expenses
    const expensesResponse = await axios.get<ExpenseData[]>(`http://140.238.227.78:8080/expenses/${userId}`, {
      headers: {
        Authorization: `Basic ${authorizationHeader}`
      }
    });
    return expensesResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
