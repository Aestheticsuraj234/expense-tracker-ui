"use client";
import { Button } from '@/components/ui/button'
import { useStoreModal } from '@/hooks/use-store-modal';
import { CheckCircle2, Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AddCurrencySetup = () => {
    const {onOpen} = useStoreModal()

  return (
    <div className="flex justify-center items-center flex-col px-4 space-y-4 mt-4">
    <Image
      src={"/currency.svg"}
      alt={"confirm-registration"}
      width={450}
      height={450}
      className="md:mb-0 mb-2"
    />
    <div className="flex items-center justify-center flex-col space-y-4">
        <h1 className="text-3xl font-bold text-center">Choose Currency</h1>
        <p className="text-center text-gray-500">
          Please add your currency to continue
        </p>
        <Button onClick={()=>onOpen("CURRENCY_ADD")} variant={"default"} size={"lg"}>
        Choose  Currencies   
        </Button>
    </div>
  </div>
  )
}

export default AddCurrencySetup