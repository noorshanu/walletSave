"use client";

import React, { useEffect, useState } from "react";
import { listRpcUrls, send } from "../utils/api";
// Ensure the path to your API function is correct
import { useAccount } from "wagmi";

interface RpcUrl {
  name: string;
  rpcUrl: string;
}

const SendTransaction = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [fromAddress, setFromAddress] = useState<string>(""); // Input field for the from address
  const [toAddress, setToAddress] = useState<string>(""); // Input field for the to address
  const [amount, setAmount] = useState<string>(""); // Input field for the amount
  const [rpcList, setRpcList] = useState<RpcUrl[]>([]); // List of saved RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState<string>(""); // Selected RPC URL
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the form
  const [message, setMessage] = useState<string | null>(null); // Success/error message

  // Fetch the saved RPC URLs when the component mounts
  useEffect(() => {
    const fetchRpcUrls = async () => {
      if (!isConnected || !address) return;

      try {
        const response = await listRpcUrls(address as string);
        setRpcList(response.data.rpcUrls);
      } catch (error) {
        console.error("Error fetching RPC URLs:", error);
        setMessage("Failed to load RPC URLs.");
      }
    };

    fetchRpcUrls();
  }, [isConnected, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Ensure the user is connected and all inputs are valid
    if (
      !isConnected ||
      !address ||
      !fromAddress ||
      !toAddress ||
      !amount ||
      !selectedRpcUrl
    ) {
      setMessage("Please fill in all fields and connect your wallet.");
      setLoading(false);
      return;
    }

    try {
      const response = await send(
        address as string, // Owner wallet address (connected wallet)
        selectedRpcUrl, // Selected RPC URL
        fromAddress, // Sender address
        toAddress, // Recipient address
        amount, // Amount to send
      );

      setMessage(`Transaction successful: ${response.data.message}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending transaction:", error);
      setMessage("Failed to send transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto mt-8 overflow-hidden rounded-lg  bg-white px-4 py-8 shadow-lg dark:bg-[#191919] ">
      <h2 className="mb-4 text-2xl font-bold text-whiten">Send Transaction</h2>

      {message && (
        <div
          className={`mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4 ">
        {/* From Address */}

        <div className=" flex flex-col sm:flex-row items-center gap-4">
          <div className=" w-full sm:w-1/2">
            <label className="mb-2 block text-black dark:text-white">Select RPC URL</label>
            <select
              className="w-full p-2 border border-[#434C59] bg-white rounded-md shadow-lg dark:bg-[#191919]"
              value={selectedRpcUrl}
              onChange={(e) => setSelectedRpcUrl(e.target.value)}
              required
            >
              <option value="">Select an RPC URL</option>
              {rpcList.map((rpc) => (
                <option key={rpc.rpcUrl} value={rpc.rpcUrl}>
                  {rpc.name} - {rpc.rpcUrl}
                </option>
              ))}
            </select>
          </div>

          <div className=" w-full sm:w-1/2">
            <label className="mb-2 block text-black dark:text-white">From Address</label>
            <input
              type="text"
              className="w-full p-2 border border-[#434C59] bg-white rounded-md shadow-lg dark:bg-[#191919]"
              placeholder="Enter sender address"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* To Address */}
        <div className=" flex items-center gap-4 flex-col sm:flex-row">
        <div className=" w-full sm:w-1/2">
          <label className="mb-2 block text-black dark:text-white">To Address</label>
          <input
            type="text"
            className="w-full p-2 border border-[#434C59] bg-white rounded-md shadow-lg dark:bg-[#191919]"
            placeholder="Enter recipient address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div className=" w-full sm:w-1/2">
          <label className="mb-2 block text-black dark:text-white">Amount</label>
          <input
            type="text"
            className="w-full p-2 border border-[#434C59] bg-white rounded-md shadow-lg dark:bg-[#191919]"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
       </div>

        {/* Select RPC URL */}

        <button
          type="submit"
          className="bg-primary-gradient rounded-md px-4 py-2 text-white w-full font-semibold"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Transaction"}
        </button>
      </form>
    </div>
  );
};

export default SendTransaction;
