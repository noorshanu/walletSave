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
    if (!isConnected || !address || !fromAddress || !toAddress || !amount || !selectedRpcUrl) {
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
    <div className="max-w-4xl px-4 py-4 mx-auto mt-8  bg-white dark:bg-[#1c1d32] shadow-lg rounded-lg overflow-hidden border border-green-700">
      <h2 className="text-2xl font-bold mb-4">Send Transaction</h2>

      {message && (
        <div className={`mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full sm:w-[550px]">
        {/* From Address */}
        <div>
          <label className="block mb-2">From Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter sender address"
            value={fromAddress}
            onChange={e => setFromAddress(e.target.value)}
            required
          />
        </div>

        {/* To Address */}
        <div>
          <label className="block mb-2">To Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter recipient address"
            value={toAddress}
            onChange={e => setToAddress(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Select RPC URL */}
        <div>
          <label className="block mb-2">Select RPC URL</label>
          <select
            className="border p-2 w-full"
            value={selectedRpcUrl}
            onChange={e => setSelectedRpcUrl(e.target.value)}
            required
          >
            <option value="">Select an RPC URL</option>
            {rpcList.map(rpc => (
              <option key={rpc.rpcUrl} value={rpc.rpcUrl}>
                {rpc.name} - {rpc.rpcUrl}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-primary-gradient text-white py-2 px-4 rounded-full" disabled={loading}>
          {loading ? "Sending..." : "Send Transaction"}
        </button>
      </form>
    </div>
  );
};

export default SendTransaction;
