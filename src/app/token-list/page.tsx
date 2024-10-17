"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
// Dummy Data
const dummyTokens = [
  { id: 1, name: "Ethereum", chain:"eth", address: "0x1234567890abcdef1234567890abcdef12345678" },
  { id: 2, name: "Binance Coin", chain:"eth", address: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678" },
  { id: 3, name: "Polygon", chain:"eth", address: "0xaabbccddeeff1122334455667788990011223344" },
  { id: 4, name: "Avalanche", chain:"eth", address: "0x99887766554433221100ffeeddccbbaa99887766" },
  { id: 5, name: "Solana", chain:"eth", address: "0x1234432112344321123443211234432112344321" },
  { id: 6, name: "Fantom", chain:"eth", address: "0x11223344556677889900aabbccddeeff11223344" },
];

const TokenList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Token address copied to clipboard!");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyTokens.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dummyTokens.length / itemsPerPage);

  return (
    <>
    <DefaultLayout>
    <div className="container max-w-5xl mx-auto p-4 h-full">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Token List</h2>

      {/* Table */}
      <div className="overflow-x-auto border rounded-2xl">
        <table className="min-w-full bg-white dark:bg-[#1c1d32] shadow-lg rounded-lg overflow-hidden border border-green-700 ">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#1c1d32]">
              <th className="text-left p-4">No</th>
              <th className="text-left p-4">Token Name</th>
              <th className="text-left p-4">Token Chain</th>
              <th className="text-left p-4">Token Address</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((token, index) => (
              <tr key={token.id} className="border-t">
                <td className="p-4">{indexOfFirstItem + index + 1}</td>
                <td className="p-4"><a href="/token-details">{token.name}</a></td>
                <td className="p-4">{token.chain}</td>
                <td className="p-4">
                  <span className="inline-block">
                    {token.address.slice(0, 10)}...{token.address.slice(-10)}
                  </span>
                  <button
                    className="ml-2 text-blue-500 underline"
                    onClick={() => copyToClipboard(token.address)}
                  >
                    Copy
                  </button>
                </td>
                <td className="p-4 text-green-600 text-lg"><RiVerifiedBadgeFill />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </DefaultLayout>
    </>

  );
};

export default TokenList;
