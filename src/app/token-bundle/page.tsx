import React from 'react'
import TokenBundleUI from '../../components/TokenBundleUI'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

function page() {
  return (
<>
<DefaultLayout>
<div className=' max-w-6xl mx-auto'>

<TokenBundleUI/>
</div>
</DefaultLayout>
</>
  )
}

export default page