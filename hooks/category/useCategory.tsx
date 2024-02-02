"use client";
import { useEffect } from "react";
import { useSession } from "../useSession";
import axios from "axios";
import { useCategoryStore } from "./use-category";

interface CategoryProps {
 
    id: number,
    name: string,
    description: string,

}

export const useCategory = () => {
    const { authorizationHeader, userId } = useSession();
    const {category,setCategory} = useCategoryStore();


    const fetchCategory = async () => {
        const category = await axios.get<CategoryProps[]>(
          `http://140.238.227.78:8080/categories`,
          {
            headers: {
              Authorization: `Basic ${authorizationHeader}`,
            },
          }
        );
        console.log(category.data);
        setCategory(category.data);
      };

      useEffect(() => {
        if (typeof window !== "undefined") {
            fetchCategory();
        }
      }, []);
    
      return {
        category,
      };
}

