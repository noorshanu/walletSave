import React from 'react'
import SendToken from '../../../components/SendToken'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

function page() {
  return (
  <>
  <DefaultLayout>
  <div>
        <SendToken/>
    </div>
  </DefaultLayout>
  </>
  )
}

export default page