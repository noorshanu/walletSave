import DefaultLayout from '@/components/Layouts/DefaultLayout'
import LockForm from '@/components/LockForm'
import React from 'react'

function page() {
  return (
    <DefaultLayout>
        <div className=' pb-[20%] sm:pb-[8%]'>
        
            <LockForm/>
        </div>
    </DefaultLayout>
  )
}

export default page