"use client";

import React, { useState } from "react";
import { listWorkerWallets } from "../utils/api";
import { useAccount } from "wagmi";

interface Worker {
  walletAddress: string;
}

const WorkerWallets = () => {
  const { address, isConnected } = useAccount();
  const [workerList, setWorkerList] = useState<Worker[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch the list of worker wallets when the button is clicked
  const fetchWorkerWallets = async () => {
    if (!isConnected || !address) {
      setMessage("Please connect your wallet to see worker wallets.");
      return;
    }

    setLoading(true);
    setMessage(null); // Clear previous messages

    try {
      const response = await listWorkerWallets(address as string); // Fetch worker wallets using the connected address

      // Debugging output
      console.log("API Response:", response);

      if (response.data.walletDetails && Array.isArray(response.data.walletDetails)) {
        // Explicitly define the type of workers
        const workers: Worker[] = response.data.walletDetails.map((worker: any) => ({
          walletAddress: worker.walletAddress,
        }));

        // Debugging output
        console.log("Workers fetched:", workers);

        setWorkerList(workers);
        setCurrentPage(1); // Reset to the first page when new data is fetched
      } else {
        setWorkerList([]);
        setMessage("No worker wallets found.");
      }
    } catch (error) {
      console.error("Error fetching worker wallets:", error);
      setMessage("Failed to fetch worker wallets.");
    } finally {
      setLoading(false);
    }
  };

  // Get the current page's items
  const currentItems = workerList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(workerList.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">List of Worker Wallets</h2>

      {message && <div className="text-red-500">{message}</div>}

      <button
        onClick={fetchWorkerWallets}
        className="mt-4 dark:bg-[#313f66] bg-[#d6ebf8] dark:text-white text-black px-8 py-2 rounded-full mx-auto flex justify-center font-semibold"
        disabled={loading}
      >
        {loading ? "Loading..." : "Show Worker List"}
      </button>

      {/* Table to display worker wallets */}
      {workerList.length > 0 ? (
        <>
          <table className="min-w-full table-auto mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Wallet Address</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((worker, index) => (
                <tr key={worker.walletAddress}>
                  <td className="border p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{worker.walletAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-3 py-1 mx-1 border rounded"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
              <button
                key={pageNumber}
                className={`px-3 py-1 mx-1 border rounded ${
                  currentPage === pageNumber ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="px-3 py-1 mx-1 border rounded"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        !loading && <div className="mt-4 text-center">Click here for the list.</div>
      )}
    </div>
  );
};

export default WorkerWallets;
