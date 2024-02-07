"use client";
import { Button } from '@/components/ui/button'
import { useStoreModal } from '@/hooks/use-store-modal';
import { CheckCircle2, Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const UpdateCurrencySetup = ({params}:{params:{id:string}}) => {
    
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
        <h1 className="text-3xl font-bold text-center">Update Currency Symbol</h1>
        <p className="text-center text-gray-500">
          Please Update your currency Symbol
        </p>
        <Button onClick={()=>onOpen("CURRENCY_UPDATE")} variant={"default"} size={"lg"}>
        Update Your Currency Symbol
        </Button>
    </div>
  </div>
  )
}

export default UpdateCurrencySetup