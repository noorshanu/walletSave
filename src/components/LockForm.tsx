/* eslint-disable @next/next/no-img-element */
// components/LockForm.tsx

"use client";

import React, { useState } from 'react';

const LockForm = () => {
  const [useAnotherOwner, setUseAnotherOwner] = useState(false);
  const [useVesting, setUseVesting] = useState(false);

  return (
    <div className="w-full mx-auto px-4 pt-4 pb-12 bg-white dark:bg-[#191919] rounded-lg shadow-md">
      {/* Chains section */}
      <div className="flex justify-between mb-6">
        <div className="border  border-green-600 text-white p-4 rounded-lg w-1/2 mr-2">
          <h3 className="font-semibold text-green-600 mb-4">EVM ✔</h3>
          <div className=' flex items-center'>
            <img src="/eth.png" alt="" />
            <img src="/bsc.png" alt="" />
            <img src="/sol.png" alt="" />
            <img src="/tron.png" alt="" />
           
          </div>
        </div>
        <div className="border border-gray-600   dark:text-white text-black-2 p-4 rounded-lg w-1/2 ml-2">
          <h3 className="font-semibold mb-4">ETH</h3>
          <div className=' flex items-center'>
            <img src="/eth.png" alt="" />
            <img src="/bsc.png" alt="" />
            <img src="/sol.png" alt="" />
            <img src="/tron.png" alt="" />
           
          </div>
        </div>
      </div>

      {/* PinkLock is Audited By Section */}
      <div className="border  border-green-600 p-4 mb-6 rounded-lg">
        <h4 className="font-semibold dark:text-white text-black-2 mb-4">PinkLock Is Audited By</h4>
        <div className="flex gap-4 space-x-2">
          {/* Certik logos */}
          <img src="/certik.svg" alt="Certik" className="h-6 w-auto border border-gray-600  dark:bg-transparent bg-[#191919] rounded-md py-1 px-4" />
          <img src="/certik.svg" alt="Certik" className="h-6 w-auto border border-gray-600 rounded-md py-1 px-4 dark:bg-transparent bg-[#191919]" />
          <img src="/certik.svg" alt="Certik" className="h-6 w-auto border border-gray-600 rounded-md py-1 px-4 dark:bg-transparent bg-[#191919]" />
          {/* Add more logos if needed */}
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        {/* Token Address */}
        <div>
          <label className="block dark:text-white text-black-2  mb-2">Token or LP Token Address</label>
          <input 
            type="text" 
            placeholder="Enter your Rpc URL" 
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Use Another Owner Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anotherOwner"
            checked={useAnotherOwner}
            onChange={() => setUseAnotherOwner(!useAnotherOwner)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="anotherOwner" className="ml-2 dark:text-white text-black-2 ">Use Another Owner?</label>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block dark:text-white text-black-2  mb-2">Amount</label>
          <input 
            type="number" 
            placeholder="Enter Amount" 
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Use Vesting Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useVesting"
            checked={useVesting}
            onChange={() => setUseVesting(!useVesting)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="useVesting" className="ml-2 dark:text-white text-black-2 ">Use Vesting?</label>
        </div>

        {/* TGE Date, TGE Percent */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block dark:text-white text-black-2  mb-2">TGE Date (UTC)</label>
            <input 
              type="date" 
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
            />
          </div>
          <div className="w-1/2">
            <label className="block dark:text-white text-black-2  mb-2">TGE Percent</label>
            <input 
              type="number" 
              placeholder="Ex: 10" 
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
            />
          </div>
        </div>

        {/* Cycle Days, Cycle Release Percent */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block dark:text-white text-black-2  mb-2">Cycle (Days)</label>
            <input 
              type="number" 
              placeholder="Ex: 10" 
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
            />
          </div>
          <div className="w-1/2">
            <label className="block dark:text-white text-black-2  mb-2">Cycle Release Percent</label>
            <input 
              type="number" 
              placeholder="Ex: 10" 
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
            />
          </div>
        </div>

        {/* Approve Button */}
        <div>
          <button 
            type="submit" 
            className="w-full  bg-primary-gradient text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all duration-200">
            Approve
          </button>
        </div>
      </form>
    </div>
  );
};

export default LockForm;
