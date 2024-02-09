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
    const {categorydata,setCategory} = useCategoryStore();


    const fetchCategory = async () => {
        const res = await axios.get<CategoryProps[]>(
          `https://140.238.227.78:8080/categories`,
          {
            headers: {
              Authorization: `Basic ${authorizationHeader}`,
            },
          }
        );
       
        setCategory(res.data);
      };

      useEffect(() => {
        if (typeof window !== "undefined"  && authorizationHeader!==null) {
            fetchCategory();
        }
      }, [authorizationHeader]);
    
      return {
        categorydata,
      };
}

