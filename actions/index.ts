"use server";
import axios from 'axios';
// @ts-ignore
import { ExpenseData } from "@/app/(root)/_components/table/column";

export const getAllExpenseOfCurrentUser = async (
  userId: string | null,
  authorizationHeader: string | null
): Promise<ExpenseData[] | null> => {
  try {
    const response = await axios.get(`http://localhost:8080/expenses/${userId}`,
      {
        headers: {
          Authorization: `Basic ${authorizationHeader}`
        }
      });
      
      console.log(response.data);
   

    return response.data;

    
  } catch (error) {
    console.error(error);
    return null;
  }
};
