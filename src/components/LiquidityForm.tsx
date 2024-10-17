import React from "react";

const LiquidityForm = () => {
  return (
    <div className=" my-4">
      <h2 className="text-lg font-semibold dark:text-white text-black mb-4">Add liquidity</h2>
      <div>
        <div className="flex space-x-4 my-6">
          {/* Base Token Input */}
          <div className="w-full">
            <label htmlFor="base-token" className="block text-sm font-medium text-red-500 mb-1">
              * Base Token:
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                id="base-token"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Connect your wallet please."
              />
            </div>
          </div>

          {/* Quote Token Input */}
          <div className="w-full">
            <label htmlFor="quote-token" className="block text-sm font-medium text-red-500 mb-1">
              * Quote Token:
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                id="quote-token"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Connect your wallet please."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Base Section */}
        <div className="flex flex-col items-center justify-center bg-white border shadow-md dark:bg-[#22223e] rounded-lg p-4 w-full">
          <div className="flex justify-center w-full items-center">
            {/* <button className="text-sm text-gray-500 bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
              Max
            </button> */}
            <div className="flex flex-col items-center justify-center  mt-4">
              <input
                type="number"
                placeholder="1"
                className="text-xl dark:text-white text-black bg-transparent   text-center border-2 rounded-full dark:border-white border-black"
              />
              <span className=" text-black dark:text-white text-sm">Balance: 1.00 </span>
            </div>
            {/* <button className="text-sm text-gray-500 bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
              Half
            </button> */}
          </div>

          <div className="mt-4 text-sm  bg-green-600 rounded-full py-1 px-6 text-white font-semibold">Token </div>
        </div>

        <div className=" flex justify-center items-center">
          <span className="text-2xl text-gray-700 flex items-center bg-white rounded-full p-4 h-[50px]">+</span>
        </div>

        {/* Quote Section */}
        <div className="flex flex-col items-center justify-center bg-white border shadow-md dark:bg-[#22223e] rounded-lg p-4 w-full">
          <div className="flex justify-center w-full items-center">
            {/* <button className="text-sm text-gray-500 bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
              Max
            </button> */}
            <div className="flex flex-col items-center justify-center  mt-4">
              <input
                type="number"
                placeholder="1"
                className="text-xl dark:text-white text-black bg-transparent   text-center border-2 rounded-full dark:border-white border-black"
              />
              <span className=" text-black dark:text-white text-sm">Balance: 1.00 </span>
            </div>
            {/* <button className="text-sm text-gray-500 bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
              Half
            </button> */}
          </div>

          <div className="mt-4 text-sm  bg-green-600 rounded-full py-1 px-6 text-white font-semibold">Eth</div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityForm;
