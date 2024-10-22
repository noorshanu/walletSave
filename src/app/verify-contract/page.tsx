import AirDropForm from '@/components/AirDropForm'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

function page() {
  return (
   <>
   <DefaultLayout>
    <div className=' pb-[25%] sm:pd-[20%]'>
        <AirDropForm/>
    </div>
   </DefaultLayout>
   </>
  )
}

export default page