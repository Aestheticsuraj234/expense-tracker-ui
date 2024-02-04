import Image from 'next/image'
import React from 'react'

const EmptyOverView = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-4 mt-6'>
        <Image src="/nothing_overview.svg" width={200} height={200} alt="Nothing to show image" />
        <h1 className='text-2xl text-gray-600'>No Data to Show</h1>
        <p className=' text-gray-400 text-center'>
            Start adding your expenses to see the overview
        </p>

    </div>
  )
}


export default EmptyOverView