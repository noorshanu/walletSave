"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { FaList } from "react-icons/fa6";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { RiExpandUpDownFill } from "react-icons/ri";

// Dummy Data
const dummyTokens = [
  {
    id: 1,
    name: "Bitcoin",
    chain: "BTC",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 2,
    name: "Ethereum",
    chain: "ETH",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 3,
    name: "Cardano",
    chain: "ADA",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 4,
    name: "Solana",
    chain: "SOL",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 5,
    name: "Polkadot",
    chain: "DOT",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 6,
    name: "Solana",
    chain: "SOL",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 7,
    name: "USD Coin",
    chain: "USDC",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 8,
    name: "Solana",
    chain: "SOL",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 9,
    name: "USD Coin",
    chain: "USDC",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 10,
    name: "Polkadot",
    chain: "DOT",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 11,
    name: "Solana",
    chain: "SOL",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 12,
    name: "Ethereum",
    chain: "ETH",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
  {
    id: 13,
    name: "Ethereum",
    chain: "ETH",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: true,
  },
  {
    id: 14,
    name: "Ethereum",
    chain: "ETH",
    address: "0123456789abcdef0123456789abcdef01234567",
    verified: false,
  },
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
      <div className="container mx-auto h-full p-4">
        {/* Header */}
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold dark:text-white text-black-2">
          {" "}
          <FaList /> Token List
        </h2>

        {/* Table */}
        <div className="overflow-x-auto border  shadow-md">
          <table className="min-w-full bg-white dark:bg-[#191919] text-black-2 dark:text-white">
            <thead>
              <tr className="bg-white dark:bg-[#191919]">
                <th className="border-[ #4C4C4C] border-b border-r p-4 text-left">
                  {" "}
                  <div className="flex items-center justify-between gap-4">
                    {" "}
                    No <RiExpandUpDownFill />
                  </div>
                </th>
                <th className="border-[ #4C4C4C] border-b border-r p-4 text-left">
                  <div className="flex items-center justify-between gap-4">
                    Token Name <RiExpandUpDownFill />
                  </div>
                </th>
                <th className="border-[ #4C4C4C] border-b border-r p-4 text-left">
                  <div className="flex items-center justify-between gap-4">
                    Token Chain <RiExpandUpDownFill />
                  </div>
                </th>
                <th className="border-[ #4C4C4C] border-b border-r p-4 text-left">
                  <div className="flex items-center justify-between gap-4">
                    Token Address <RiExpandUpDownFill />
                  </div>
                </th>
                <th className="border-[ #4C4C4C] border-b border-r p-4 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((token, index) => (
                <tr key={token.id} className="border-[ #4C4C4C] border-t">
                  <td className="border-r border-[#4C4C4C] p-4">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border-r border-[#4C4C4C] p-4">
                    <a href="/token-details"> {token.name} </a>
                    
                  </td>
                  <td className="border-r border-[#4C4C4C] p-4">
                    {token.chain}
                  </td>
                  <td className="flex items-center border-r border-[#4C4C4C] p-4">
                    <span>
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </span>
                    <button
                      className="ml-2 text-blue-400 underline"
                      onClick={() => copyToClipboard(token.address)}
                    >
                      Copy
                    </button>
                  </td>
                  <td className=" px-4  ">
                    <div className=" flex items-center justify-center">
                      {token.verified ? (
                        <button className="flex items-center justify-center rounded-xl bg-[#00FD81] px-6 py-2 font-semibold text-black-2">
                          <RiCheckboxCircleFill className="mr-1" /> Verified
                        </button>
                      ) : (
                        <button className="flex items-center justify-center rounded-xl bg-[#FF3838] px-2 py-2 font-semibold text-white">
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
        <div className="mt-4 flex items-center justify-center space-x-2">
          <button
            className={`rounded-md px-4 py-2 ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 text-white"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`rounded-md px-4 py-2 ${currentPage === totalPages ? "bg-gray-400" : "bg-btn py-2 text-white"}`}
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
