"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { FaList } from "react-icons/fa6";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";

// Dummy Data
const dummyTokens = [
  { id: 1, name: "Bitcoin", chain: "BTC", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 2, name: "Ethereum", chain: "ETH", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 3, name: "Cardano", chain: "ADA", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 4, name: "Solana", chain: "SOL", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 5, name: "Polkadot", chain: "DOT", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 6, name: "Solana", chain: "SOL", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 7, name: "USD Coin", chain: "USDC", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 8, name: "Solana", chain: "SOL", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 9, name: "USD Coin", chain: "USDC", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 10, name: "Polkadot", chain: "DOT", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 11, name: "Solana", chain: "SOL", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 12, name: "Ethereum", chain: "ETH", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
  { id: 13, name: "Ethereum", chain: "ETH", address: "0123456789abcdef0123456789abcdef01234567", verified: true },
  { id: 14, name: "Ethereum", chain: "ETH", address: "0123456789abcdef0123456789abcdef01234567", verified: false },
];

const TokenList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    <DefaultLayout>
      <div className="container mx-auto p-4 h-full">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"> <FaList/> Token List</h2>

        {/* Table */}
        <div className="overflow-x-auto border  shadow-md">
          <table className="min-w-full bg-[#191919] text-white">
            <thead>
              <tr className="bg-[#191919]">
                <th className="text-left p-4 border-b border-r border-[ #4C4C4C]">No</th>
                <th className="text-left p-4 border-b border-r border-[ #4C4C4C]">Token Name</th>
                <th className="text-left p-4 border-b border-r border-[ #4C4C4C]">Token Chain</th>
                <th className="text-left p-4 border-b border-r border-[ #4C4C4C]">Token Address</th>
                <th className="text-left p-4 border-b border-r border-[ #4C4C4C]">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((token, index) => (
                <tr key={token.id} className="border-t border-[ #4C4C4C]">
                  <td className="p-4 border-r border-[#4C4C4C]">{indexOfFirstItem + index + 1}</td>
                  <td className="p-4 border-r border-[#4C4C4C]">{token.name}</td>
                  <td className="p-4 border-r border-[#4C4C4C]">{token.chain}</td>
                  <td className="p-4 flex items-center border-r border-[#4C4C4C]">
                    <span>{token.address.slice(0, 8)}...{token.address.slice(-8)}</span>
                    <button
                      className="ml-2 text-blue-400 underline"
                      onClick={() => copyToClipboard(token.address)}
                    >
                      Copy
                    </button>
                  </td>
                  <td className=" px-4  ">
                <div  className=" flex justify-center items-center" >
                {token.verified ? (
                      <button className="bg-[#00FD81] rounded-xl px-6 py-2 justify-center font-semibold text-black-2 flex items-center">
                        <RiCheckboxCircleFill className="mr-1" /> Verified
                      </button>
                    ) : (
                      <button className="bg-[#FF3838] rounded-xl px-2 py-2 justify-center font-semibold text-white flex items-center">
                        <RiCloseCircleFill className="mr-1" /> Not Verified
                      </button>
                    )}
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 text-white"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-400" : "bg-btn py-2 text-white"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TokenList;
