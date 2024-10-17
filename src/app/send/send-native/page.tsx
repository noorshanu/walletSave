import React from 'react'
import SendTransaction from '../../../components/SendTransaction'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

function page() {
  return (
   <>
   <DefaultLayout>
   <div>
        <SendTransaction/>
    </div>
   </DefaultLayout>
   </>
  )
}

export default page