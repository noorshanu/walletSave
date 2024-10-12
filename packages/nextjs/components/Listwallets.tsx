"use client"
import React, { useEffect, useState } from "react";
import { listWallets } from "../utils/api";
// Adjust path as needed
import { useAccount } from "wagmi";

// For wallet connection

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
      const { walletDetails: fetchedWallets, total } = response.data;
      console.log(response.data)

      setWallets(fetchedWallets); // Set fetched wallets
      setTotalWallets(total); // Set total wallets for pagination
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
   

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead>
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Wallet Address</th>
                <th className="border p-2">Wallet Type</th>
                <th className="border p-2">Funding Wallet</th>
                <th className="border p-2">Worker Wallet</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet, index) => (
                <tr key={wallet.walletAddress}>
                  <td className="border p-2">{(currentPage - 1) * walletsPerPage + index + 1}</td>
                  <td className="border p-2">{wallet.walletAddress}</td>
                  <td className="border p-2">{getWalletType(wallet)}</td>
                  <td className="border p-2">{wallet.isFundingWallet ? "Yes" : "No"}</td>
                  <td className="border p-2">{wallet.isWorkerWallet ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
