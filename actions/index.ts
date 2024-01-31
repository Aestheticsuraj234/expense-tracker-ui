"use server";
import axios from 'axios';
import { ExpenseData } from "@/app/(root)/_components/table/column";

interface CategoryData {
  id: number;
  name: string;
  description: string;
}

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

    if (expensesResponse.status !== 200) {
      console.error(`Failed to fetch expenses. Status: ${expensesResponse.status}`);
      return []; // Return an empty array in case of an error
    }

    const expensesData: ExpenseData[] = expensesResponse.data;

    // Fetch categories
    const categoriesResponse = await axios.get<CategoryData[]>('http://localhost:8080/categories', {
      headers: {
        Authorization: `Basic ${authorizationHeader}`
      }
    });

    if (categoriesResponse.status !== 200) {
      console.error(`Failed to fetch categories. Status: ${categoriesResponse.status}`);
      return []; // Return an empty array in case of an error
    }

    const categoriesData: CategoryData[] = categoriesResponse.data;

    // Create a lookup map for categories
    const categoryLookup: Record<string | number, string> = categoriesData.reduce((acc, category) => {
      // @ts-ignore
      acc[category.id] = category.name;
      return acc;
    }, {});

    // Map category names based on category IDs in expenses
    const expensesWithCategoryName: ExpenseData[] = expensesData.map(expense => ({
      ...expense,
      // @ts-ignore
      categoryName: categoryLookup[expense.category_id] || 'Unknown Category', // Provide a default if category not found
    }));

    console.log('expensesWithCategoryName', expensesWithCategoryName);
    return expensesWithCategoryName;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
};
