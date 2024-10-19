"use client";
import React, { useState } from "react";
import { createWorkerWallet } from "../utils/api";
import { FaListUl } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useAccount } from "wagmi";
import ListWallets from "../components/Listwallets";
import SetWalletType from "../components/SetWalletType";

const CreateWorkerWallet = () => {
  const { address } = useAccount();
  const [numberOfWorkers, setNumberOfWorkers] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("list-wallets");

  // Function to handle creating a new worker wallet(s)
  const handleCreateWorkerWallet = async () => {
    setMessage(null);
    setSuccessMessage(null);

    if (!address || numberOfWorkers <= 0) {
      setMessage("Please enter a valid number of worker wallets to create.");
      return;
    }

    try {
      const res = await createWorkerWallet(address, numberOfWorkers);
      setSuccessMessage(
        `Worker Wallet(s) Created Successfully: ${res.data.message}`,
      );
      setNumberOfWorkers(1); // Reset the number of workers after creation
    } catch (error) {
      console.error(error);
      setMessage("Failed to create worker wallet(s).");
    }
  };

  return (
    <div className="mt-2">
      {/* Create Worker Wallet Section */}
      <div className="mt-2 flex flex-col gap-8">
        <div className="w-full rounded-md bg-white px-4 py-8 shadow-xl dark:bg-[#191919]">
          <h1 className="text-2xl font-bold text-black-2 dark:text-white">
            Worker Wallet Management
          </h1>
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-black-2 dark:text-white">
              Create Worker Wallets
            </h2>
            <input
              type="number"
              className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]"
              placeholder="Number of Worker Wallets"
              value={numberOfWorkers}
              onChange={(e) => setNumberOfWorkers(Number(e.target.value))}
              min={1}
            />
            <button
              className="bg-primary-gradient mt-4 w-full rounded-md px-4 py-2 font-semibold text-white"
              onClick={handleCreateWorkerWallet}
            >
              Create Wallets
            </button>

            {message && <div className="mt-4 text-red-500">{message}</div>}
            {successMessage && (
              <div className="mt-4 text-green-500">{successMessage}</div>
            )}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="rounded-md bg-gray-300 px-4 py-4 shadow-md dark:bg-[#191919]">
          <div className="flex flex-row gap-4 border-b border-[ #4C4C4C]">
            <button
              className={`px-4 py-4 flex items-center gap-2 font-semibold  ${
                activeTab === "list-wallets" ? "active-rpc text-white" : "text-black-2 dark:text-white"
              }`}
              onClick={() => setActiveTab("list-wallets")}
            >
              <FaListUl />
              List Worker Wallets
            </button>

            <button
              className={`px-4 py-4 flex items-center gap-2 font-semibold  ${
                activeTab === "set-wallet" ? "active-rpc text-white" : "text-black-2 dark:text-white"
              }`}
              onClick={() => setActiveTab("set-wallet")}
            >
              <IoSettings />
              Set Wallet Types
            </button>
          </div>
          <div className="mt-4">
          {activeTab === "list-wallets" && <ListWallets />}
          {activeTab === "set-wallet" && <SetWalletType />}
        </div>
        </div>

        {/* Tab content */}
       
      </div>
    </div>
  );
};

export default CreateWorkerWallet;
