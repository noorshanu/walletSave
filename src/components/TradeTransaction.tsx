"use client";

import React, { useEffect, useState } from "react";
import { listRpcUrls, performTrade } from "../utils/api"; // Ensure the path to your API function is correct
import { useAccount } from "wagmi";

interface RpcUrl {
  name: string;
  rpcUrl: string;
}

const TradeTransaction = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [rpcList, setRpcList] = useState<RpcUrl[]>([]); // List of saved RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState<string>(""); // Selected RPC URL
  const [tokenAddress, setTokenAddress] = useState<string>(""); // Input field for the token address
  const [routerAddress, setRouterAddress] = useState<string>(""); // Input field for the router address
  const [amount, setAmount] = useState<string>(""); // Input field for the amount
  const [routerVersion, setRouterVersion] = useState<string>("v2"); // Router version (default to Uniswap V2)
  const [buy, setBuy] = useState<boolean>(true); // Buy flag (default to true)
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
    if (!isConnected || !address || !tokenAddress || !routerAddress || !amount || !selectedRpcUrl) {
      setMessage("Please fill in all fields and connect your wallet.");
      setLoading(false);
      return;
    }

    try {
      const response = await performTrade(
        selectedRpcUrl, // Selected RPC URL
        address as string, // Owner wallet address (connected wallet)
        "privateKeyPlaceholder", // Replace with actual private key management logic
        tokenAddress, // Token address
        routerAddress, // Router address
        routerVersion, // Router version (v2 or v3)
        amount, // Amount to trade
        buy, // Buy flag
        !buy // Sell flag (opposite of buy)
      );

      setMessage(`Trade successful: ${response.data.message}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error executing trade:", error);
      setMessage("Failed to execute trade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl px-4 py-4 mx-auto mt-8 bg-white dark:bg-[#1c1d32] shadow-lg rounded-lg overflow-hidden border border-blue-700">
      <h2 className="text-2xl font-bold mb-4">Execute Trade</h2>

      {message && (
        <div className={`mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full sm:w-[550px]">
        {/* Token Address */}
        <div>
          <label className="block mb-2">Token Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter token address"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            required
          />
        </div>

        {/* Router Address */}
        <div>
          <label className="block mb-2">Router Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter router address"
            value={routerAddress}
            onChange={e => setRouterAddress(e.target.value)}
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

        {/* Select Router Version */}
        <div>
          <label className="block mb-2">Router Version</label>
          <select
            className="border p-2 w-full"
            value={routerVersion}
            onChange={e => setRouterVersion(e.target.value)}
            required
          >
            <option value="v2">Uniswap V2</option>
            <option value="v3">Uniswap V3</option>
          </select>
        </div>

        {/* Select Buy/Sell */}
        <div>
          <label className="block mb-2">Trade Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={buy}
                onChange={() => setBuy(true)}
              />
              Buy
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={!buy}
                onChange={() => setBuy(false)}
              />
              Sell
            </label>
          </div>
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
          {loading ? "Executing..." : "Execute Trade"}
        </button>
      </form>
    </div>
  );
};

export default TradeTransaction;
