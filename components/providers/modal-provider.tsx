"use client";
// global
import { useEffect , useState } from "react";

// local
import { AddExpense } from "@/components/modals/add-expense";

export const ModalProvider = ()=>{
    const [isMounted , setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

return (
    <>
    <AddExpense />
    </>
)
}