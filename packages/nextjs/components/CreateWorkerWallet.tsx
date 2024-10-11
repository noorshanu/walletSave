"use client";

import React, { useState } from "react";
import { createWorkerWallet } from "../services/api";
import { FaListUl } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { useAccount } from "wagmi";

const CreateWorkerWallet = () => {
  const { address } = useAccount();
  const [numberOfWorkers, setNumberOfWorkers] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      setSuccessMessage(`Worker Wallet(s) Created Successfully: ${res.data.message}`);
      setNumberOfWorkers(1); // Reset the number of workers after creation
    } catch (error) {
      console.error(error);
      setMessage("Failed to create worker wallet(s).");
    }
  };

  return (
    <div className=" mt-8">
      <h1 className="text-2xl font-bold text-center">Worker Wallet Management</h1>

      {/* Create Worker Wallet Section */}
      <div className=" flex justify-between gap-8 mt-8 ">
        <div className="bg-white shadow-xl rounded-2xl dark:bg-[#141414] px-4 py-8 border border-[#19f48a9f]  sm:w-[500px] ">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Create Worker Wallets</h2>
            <input
              type="number"
              className=" p-2  mt-2 rounded w-full border border-[#19f48a9f] "
              placeholder="Number of Worker Wallets"
              value={numberOfWorkers}
              onChange={e => setNumberOfWorkers(Number(e.target.value))}
              min={1}
            />
            <button
              className="mt-4 dark:bg-[#313f66] bg-[#d6ebf8] dark:text-white text-black px-8 py-2 rounded-full mx-auto flex justify-center font-semibold "
              onClick={handleCreateWorkerWallet}
            >
              Create Wallets
            </button>

            {message && <div className="mt-4 text-red-500">{message}</div>}
            {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
          </div>
        </div>
        <div className=" flex flex-col  gap-4  ">
          <a href="/worker-wallets" className=" flex items-center gap-3 font-semibold">
            {" "}
            <MdAddToPhotos /> Create Worker Wallets
          </a>

          <a href="/worker-wallets/list-worker-wallets" className=" flex items-center gap-3 font-semibold">
            {" "}
            <FaListUl />
            List Worker Wallets
          </a>

          <a href="/worker-wallets/set-wallet" className=" flex items-center gap-3 font-semibold">
            {" "}
            <IoSettings /> Set Wallet Types
          </a>
        </div>
      </div>

      {/* List Worker Wallets Section */}
      {/* <WorkerWallets /> */}

      {/* Send Token Section */}
      {/* <div className="mt-6">
        <SendToken />
      </div> */}
    </div>
  );
};

export default CreateWorkerWallet;
