"use client";

import React from "react";
import LiquidityForm from "./LiquidityForm";
import WalletBuyParameters from "./WalletBuyParameters";

const TokenBundleUI = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#1c1d32] my-8 p-8 rounded-md w-full max-w-6xl mx-auto shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Token: CyZq3sULrbByuDc...</h1>
        <button className="bg-primary-gradient text-white py-2 px-4 rounded-full">New Token</button>
      </div>

      {/* Bundle Status Section */}
      <div className="grid grid-cols-2 gap-6 bg-white dark:bg-[#22223e] p-6 rounded-md shadow">
        <div>
          <h2 className="text-xl font-semibold mb-2">Chain</h2>
          <p className="font-medium">Bsc</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Token Name</h2>
          <p className="font-medium">neeraj</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Token Symbol</h2>
          <p className="font-medium">nee</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Token Address</h2>
          <a href="#" className="text-blue-600 underline break-all">
            CyZq3sULrbByuDc...
          </a>
        </div>
      </div>

      {/* Wallet Info Section */}
      <div className="mt-6 bg-white dark:bg-[#22223e] p-6 rounded-md shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Funding Wallet</h3>
            <p className="break-all">sgsiMARpcYe1qKjABt4VdeSNK7HdXuw7G3upRhZBtd</p>
            {/* <button className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md">
              Withdraw
            </button> */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Dev Wallet</h3>
            <p className="break-all">9R3b2NEwdF1j8yGQQZZMUE...SCktKrn48aYZd</p>
            {/* <button className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md">
              Withdraw
            </button> */}
          </div>
        </div>
      </div>
      <div>
        <LiquidityForm />
        <WalletBuyParameters />
      </div>
      {/* Buttons for Actions */}
      {/* <div className="flex justify-between items-center mt-8">
        <div className="space-x-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Estimate Funds
          </button>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Transfer Funds
          </button>
        </div>
        <button className="bg-green-500 text-white py-2 px-6 rounded-md">
          Schedule Bundle
        </button>
      </div> */}

      {/* Wallets Table Section */}
      {/* <div className="mt-8 bg-white dark:bg-[#141414] p-6 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">Wallets</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-[#000]">
              <th className="border p-3 text-left">Index</th>
              <th className="border p-3 text-left">Wallet Address</th>
              <th className="border p-3 text-left">Est Spend</th>
              <th className="border p-3 text-left">Est Supply (%)</th>
              <th className="border p-3 text-left">Token Balance</th>
              <th className="border p-3 text-left">Sol Balance</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody> */}
      {/* Example rows */}
      {/* <tr>
              <td className="border p-3">1</td>
              <td className="border p-3 break-all">FkwXVNaxHaaZ1d...v9M8DTJ9Tr...</td>
              <td className="border p-3">0.171</td>
              <td className="border p-3">0.53</td>
              <td className="border p-3">0</td>
              <td className="border p-3">0</td>
              <td className="border p-3 flex space-x-2">
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
              </td>
            </tr>
            <tr>
              <td className="border p-3">2</td>
              <td className="border p-3 break-all">2Mfh5RK7zZjS1ze...NbKzPEV...</td>
              <td className="border p-3">0.759</td>
              <td className="border p-3">2.54</td>
              <td className="border p-3">0</td>
              <td className="border p-3">0</td>
              <td className="border p-3 flex space-x-2">
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
                <button className="bg-purple-500 text-white px-3 py-1 rounded-md">Icon</button>
              </td>
            </tr> */}
      {/* Add more rows as needed */}
      {/* </tbody>
        </table>
      </div> */}
      <div className="flex justify-center items-center">
        <button className="mt-4 text-xl  bg-primary-gradient rounded-full py-1 px-6 text-white font-semibold ">
          Create Pool
        </button>
      </div>
    </div>
  );
};

export default TokenBundleUI;
