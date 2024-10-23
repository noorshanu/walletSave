import React from 'react'

const BuySetting = () => {
  return (
    <div className=' container w-full p-4 bg-white shadow-md dark:bg-[#191919]  rounded-lg'>
        <div className=' my-2'>
            <label htmlFor="" className='mb-2 block text-black-2 dark:text-white'>Set Min Buy Amount</label>
            <input type="number" placeholder='0.00' className='w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]' />
        </div>
        <div className=' my-2'>
            <label htmlFor="" className='mb-2 block text-black-2 dark:text-white'>Set Max Buy Amount</label>
            <input type="number" placeholder='0.00' className='w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]' />
        </div>
        <div className=' my-2'>
            <label htmlFor="" className='mb-2 block text-black-2 dark:text-white'>Set Slipage</label>
            <input type="number" placeholder='0.00' className='w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]' />
        </div>
        <div className=' my-2'>
            <label htmlFor="" className='mb-2 block text-black-2 dark:text-white'>Set Quick Buy</label>
            <input type="number" placeholder='0.00' className='w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]' />
        </div>
        <div className=' my-2'>
            <button className='bg-primary-gradient mt-4 w-full rounded-md px-4 py-2 font-semibold text-white'>Apply</button>
        </div>

    </div>
  )
}

export default BuySetting