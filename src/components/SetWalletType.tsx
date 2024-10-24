"use client";

import React, { useEffect, useState } from "react";
import { listWorkerWallets, setWalletType } from "../utils/api"; // Adjust the path to your API file
import { useAccount } from "wagmi";

interface WorkerWallet {
  walletAddress: string; // Ensure this is the correct structure
}

const SetWalletType = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [workerWallets, setWorkerWallets] = useState<WorkerWallet[]>([]); // Initialize as an empty array
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]); // Selected wallet addresses
  const [isFundingWallet, setIsFundingWallet] = useState<boolean>(false);
  const [isWorkerWallet, setIsWorkerWallet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingWorkerWallets, setLoadingWorkerWallets] = useState<boolean>(true); // Track loading state for worker wallets

  // Fetch the worker wallets when the component mounts
  useEffect(() => {
    const fetchWorkerWallets = async () => {
      if (!isConnected || !address) return;

      try {
        setLoadingWorkerWallets(true); // Start loading
        const response = await listWorkerWallets(address as string);
        setWorkerWallets(response.data.walletDetails as unknown as WorkerWallet[]); // Ensure correct type assertion
      } catch (error) {
        console.error("Error fetching worker wallets:", error);
        setMessage("Failed to load worker wallets.");
      } finally {
        setLoadingWorkerWallets(false); // Stop loading
      }
    };

    fetchWorkerWallets();
  }, [isConnected, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!isConnected || selectedWallets.length === 0) {
      setMessage("Please connect your wallet and select valid worker wallets.");
      setLoading(false);
      return;
    }

    try {
      const response = await setWalletType(
        address as string, // The owner wallet is the connected wallet
        selectedWallets, // Selected wallet addresses as an array
        isFundingWallet, // Whether it's a funding wallet
        isWorkerWallet, // Whether it's a worker wallet
      );
      setMessage("Wallet type updated successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error setting wallet type:", error);
      setMessage("Failed to update wallet type.");
    } finally {
      setLoading(false);
    }
  };

  const handleWalletSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedWallets(selectedOptions);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-black-2 dark:text-white">Set Wallet Type</h2>

      {message && (
        <div className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Worker Wallets</label>
          {loadingWorkerWallets ? (
            <div>Loading worker wallets...</div>
          ) : workerWallets.length > 0 ? (
            <select
              className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919] text-black-2 dark:text-white"
              value={selectedWallets}
              onChange={handleWalletSelection}
              // Allow multiple selections
            >
              {workerWallets.map(wallet => (
                <option key={wallet.walletAddress} value={wallet.walletAddress}>
                  {wallet.walletAddress}
                </option>
              ))}
            </select>
          ) : (
            <div>No worker wallets found.</div>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div>
            <input
              type="checkbox"
              id="fundingWallet"
              checked={isFundingWallet}
              onChange={e => setIsFundingWallet(e.target.checked)}
            />
            <label htmlFor="fundingWallet" className="ml-2">
              Funding Wallet
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="workerWallet"
              checked={isWorkerWallet}
              onChange={e => setIsWorkerWallet(e.target.checked)}
            />
            <label htmlFor="workerWallet" className="ml-2">
              Worker Wallet
            </label>
          </div>
        </div>

        <button type="submit" className="bg-primary-gradient my-8 w-full rounded-md px-4 py-2 font-semibold text-white" disabled={loading}>
          {loading ? "Updating..." : "Set Wallet Type"}
        </button>
      </form>
    </div>
  );
};

export default SetWalletType;
