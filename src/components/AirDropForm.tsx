// components/AirDropForm.tsx
"use client";
import React, { useState } from 'react';

const AirDropForm = () => {
  const [quantityPerWallet, setQuantityPerWallet] = useState(0);
  const [walletAddresses, setWalletAddresses] = useState(['']);
  const [newWalletAddress, setNewWalletAddress] = useState('');

  // Add new wallet address field
  const addWalletAddress = () => {
    setWalletAddresses([...walletAddresses, '']);
  };

  // Remove a wallet address field
  const removeWalletAddress = (index: number) => {
    const updatedAddresses = walletAddresses.filter((_, i) => i !== index);
    setWalletAddresses(updatedAddresses);
  };

  // Handle input changes in wallet address fields
  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...walletAddresses];
    updatedAddresses[index] = value;
    setWalletAddresses(updatedAddresses);
  };

  // Handle file upload (e.g., CSV)
  const handleUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle CSV file upload logic here
  };

  return (
    <div className="w-full mx-auto p-4 bg-white dark:bg-[#191919] rounded-lg shadow-md">
      {/* Token Address and Quantity Section */}
      <div className="flex flex-col sm:flex-row gap-4  mb-6 items-center">
        <div className="w-full sm:w-1/2">
          <label className="block dark:text-white text-black-2 ">Token Address</label>
          <input 
            type="text" 
            placeholder="Enter Token Address" 
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
          />
        </div>
        <div className=" w-full sm:w-1/2">
          <label className="block dark:text-white text-black-2 ">Quantity per Wallet</label>
          <input 
            type="number" 
            value={quantityPerWallet}
            onChange={(e) => setQuantityPerWallet(parseInt(e.target.value))}
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
          />
        </div>
        <button className="w-[300px] py-3 mt-5  bg-primary-gradient text-white rounded-lg hover:bg-purple-700 transition-all duration-200">
        Different Amount Per Wallet
      </button>
      </div>

     

      {/* List of Wallet Addresses */}
      <div className="border border-gray-500 p-4 mb-6 rounded-lg">
        <h4 className="font-semibold dark:text-white text-black-2 mb-2">* List of Wallet Addresses:</h4>
        <ul className="space-y-4">
          {walletAddresses.map((address, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-600 h-8 w-8 flex items-center justify-center text-white font-bold rounded">
                {index + 1}
              </span>
              <input
                type="text"
                value={address}
                placeholder="Enter Wallet Address Here"
                onChange={(e) => handleAddressChange(index, e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
              />
              <button
                onClick={() => removeWalletAddress(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Wallet Address Button */}
      <div className="mt-4">
        <button
          onClick={addWalletAddress}
          className="bg-primary-gradient text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200"
        >
          ➕ Add New Wallet Address
        </button>
      </div>

      {/* CSV Upload Section */}
      <div className="flex items-center space-x-4 mb-6 mt-6">
    <div className=' w-full'>
    <label className="block dark:text-white text-black-2 ">Add New Wallet Wallet</label>
        <input
          type="text"
      
         
          className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
        />
    </div>
    
      </div>
      <div className=' flex  gap-4 items-center my-4 '>
      <button className="bg-primary-gradient text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200">
          Upload CSV
        </button>
        <a href="/sample.csv" className="text-purple-400 underline">Download CSV Sample</a>
      </div>

      {/* Summary Section */}
      <div className="flex justify-between gap-4 dark:text-white text-black-2 mb-6">
        <span>Sending Tokens: 01</span>
        <span>Total Wallets: {walletAddresses.length}</span>
        <span>Total Tx Fees:  001 ETH</span>
      </div>

      {/* Start Airdrop Button */}
      <button className="w-full  bg-primary-gradient text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all duration-200">
        Start Air Drop
      </button>
    </div>
  );
};

export default AirDropForm;
