import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const EmptyOverView = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-4 mt-6'>
        <Image src="/nothing_overview.svg" width={200} height={200} alt="Nothing to show image" />
        <h1 className='text-2xl text-gray-600 dark:text-gray-200'>No Data to Show</h1>
        <p className=' text-gray-400 dark:text-gray-100 text-center flex justify-center items-center space-x-2 gap-4'>
            Start filtering your Data <span> <MoreHorizontal size={18} /></span> to see the results here
        </p>

    </div>
  )
}


export default EmptyOverView