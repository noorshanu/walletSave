import React from 'react'

function TokenDetails() {
  return (
    <div className="bg-gray-100 dark:bg-[#1c1d32] my-8 p-8 rounded-md w-full max-w-6xl mx-auto shadow-lg">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Token: CyZq3sULrbByuDc...</h1>
   
    </div>

    {/* Bundle Status Section */}
    <div className="grid grid-cols-2 gap-6 bg-white dark:bg-[#22223e] p-6 rounded-md shadow">
      <div>
        <h2 className="text-xl font-semibold mb-2">Chain</h2>
        <p className="font-medium">Bsc</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Token Name</h2>
        <p className="font-medium">BlockTools</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Token Symbol</h2>
        <p className="font-medium">BlockTools</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Token Address</h2>
        <a href="#" className="text-blue-600 underline break-all">
        0x7fC3d085c853889Fd452F8F0251792c1C3E99772
        </a>
      </div>
    </div>
    <div className=' flex justify-center items-center mt-4'>
    <button className="bg-primary-gradient text-white py-2 px-4 rounded-full">Create New Token</button>
    </div>
    </div>
  )
}

export default TokenDetails