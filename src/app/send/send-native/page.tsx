import React from 'react'
import SendTransaction from '../../../components/SendTransaction'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

function page() {
  return (
   <>
   <DefaultLayout>
   <div className=' h-[100vh]'>
        <SendTransaction/>
    </div>
   </DefaultLayout>
   </>
  )
}

export default page