/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { listWallets } from "../utils/api"; // Adjust path as needed
import { useAccount } from "wagmi"; // For wallet connection
import { RiExpandUpDownFill } from "react-icons/ri";

// Interface for the Wallet type expected from API
interface Wallet {
  walletAddress: string;
  isFundingWallet: boolean;
  isWorkerWallet: boolean;
}

const ListWallets = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [wallets, setWallets] = useState<Wallet[]>([]); // Store fetched wallets
  const [currentPage, setCurrentPage] = useState<number>(1); // For pagination
  const [totalWallets, setTotalWallets] = useState<number>(0); // Total wallets for pagination
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  const walletsPerPage = 10; // Number of wallets per page (adjusted to 10)

  // Fetch wallets when component mounts or page changes
  const fetchWallets = async (page: number) => {
    if (!isConnected || !address) {
      setError("Please connect your wallet.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await listWallets(address, page, walletsPerPage);
      const { walletDetails, total } = response.data; // Ensure API returns correct structure

      console.log(response.data);

      // Ensure walletDetails is an array of Wallet or fallback to an empty array
      setWallets(Array.isArray(walletDetails) ? walletDetails : []);
      setTotalWallets(typeof total === "number" ? total : 0); // Fallback to 0 if total is not a number
    } catch (err) {
      console.error("Error fetching wallets:", err);
      setError("Failed to fetch wallets.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Trigger wallet fetching on component mount or page change
  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage, isConnected]);

  // Calculate total pages
  const totalPages = Math.ceil(totalWallets / walletsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to determine the wallet type based on flags
  const getWalletType = (wallet: Wallet) => {
    if (wallet.isFundingWallet) return "Funding Wallet";
    if (wallet.isWorkerWallet) return "Worker Wallet";
    return "Standard Wallet";
  };

  return (
    <div className="">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="mt-4 min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-black-2 dark:text-white">
                  {" "}
                  <div className="flex items-center justify-between gap-4">
                    {" "}
                    No <RiExpandUpDownFill />
                  </div>
                </th>
                <th className="border p-2 text-black-2 dark:text-white">
                <div className="flex items-center justify-between gap-4">
                    {" "}
                    Wallet Address <RiExpandUpDownFill />
                  </div>
                 
                </th>
                <th className="border p-2 text-black-2 dark:text-white">
                <div className="flex items-center justify-between gap-4">
                    {" "}
                    Wallet Type <RiExpandUpDownFill />
                  </div>
                
                </th>
                <th className="border p-2 text-black-2 dark:text-white">
                <div className="flex items-center justify-between gap-4">
                    {" "}
                    Funding Wallet <RiExpandUpDownFill />
                  </div>
                 
                </th>
                <th className="border p-2 text-black-2 dark:text-white">
                <div className="flex items-center justify-between gap-4">
                    {" "}
                    Worker Wallet <RiExpandUpDownFill />
                  </div>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet, index) => (
                <tr key={wallet.walletAddress}>
                  <td className="border p-2">
                    {(currentPage - 1) * walletsPerPage + index + 1}
                  </td>
                  <td className="border p-2 text-black-2 dark:text-white">
                    {wallet.walletAddress}
                  </td>
                  <td className="border p-2 text-black-2 dark:text-white">
                    {getWalletType(wallet)}
                  </td>
                  <td className="border p-2 text-black-2 dark:text-white">
                    {wallet.isFundingWallet ? "Yes" : "No"}
                  </td>
                  <td className="border p-2 text-black-2 dark:text-white">
                    {wallet.isWorkerWallet ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between">
            <button
              className="btn-rest rounded px-4 py-2 text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="btn-rest rounded px-4 py-2 text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListWallets;
