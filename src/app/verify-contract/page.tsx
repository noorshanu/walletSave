import AirDropForm from '@/components/AirDropForm'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

function page() {
  return (
   <>
   <DefaultLayout>
    <div>
        <AirDropForm/>
    </div>
   </DefaultLayout>
   </>
  )
}

export default page