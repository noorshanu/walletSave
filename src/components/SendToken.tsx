"use client";

import React, { useState, useEffect } from "react";
import { sendToken, listRpcUrls } from "../utils/api"; // Import the listRpcUrls API
import { useAccount } from "wagmi";

const SendToken = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [rpcUrls, setRpcUrls] = useState<{ name: string; rpcUrl: string }[]>([]); // Store fetched RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState<string>(""); // Selected RPC URL
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch RPC URLs from API when component mounts
  useEffect(() => {
    const fetchRpcUrls = async () => {
      try {
        if (address) {
          const response = await listRpcUrls(address);
          const rpcList = response.data.rpcUrls;
          setRpcUrls(rpcList); // Set the fetched RPC URLs
          if (rpcList.length > 0) {
            setSelectedRpcUrl(rpcList[0].rpcUrl); // Set default selection to the first RPC
          }
        }
      } catch (error) {
        console.error("Failed to fetch RPC URLs:", error);
      }
    };
    fetchRpcUrls();
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ownerWalletAddress: address, // Automatically use the connected wallet address
      rpcUrl: selectedRpcUrl,
      tokenAddress,
      fromAddress,
      toAddress,
      amount,
    };

    try {
      const response = await sendToken(
        address as string,
        selectedRpcUrl,
        tokenAddress,
        fromAddress,
        toAddress,
        amount
      );
      console.log("API response:", response);
      setMessage("Token sent successfully!");
    } catch (error) {
      console.error("Error sending token:", error);
      setMessage("Failed to send token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full overflow-hidden rounded-lg bg-white px-4 py-4 shadow-lg dark:bg-[#191919] ">
      <h2 className="mb-4 text-2xl font-bold text-black-2 dark:text-white">Send Token</h2>

      {message && <div className="text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-4 ">
        {/* Select RPC URL */}
        <div className="flex w-full items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-2 block text-black-2 dark:text-white">Select RPC URL</label>
            <select
              value={selectedRpcUrl}
              onChange={(e) => setSelectedRpcUrl(e.target.value)}
              className="w-full p-2 border border-[#434C59] bg-white rounded-md shadow-lg dark:bg-[#191919]"
            >
              {rpcUrls.length > 0 ? (
                rpcUrls.map((url) => (
                  <option key={url.name} value={url.rpcUrl}>
                     {url.rpcUrl}
                  </option>
                ))
              ) : (
                <option disabled>No RPC URLs found</option>
              )}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-2 block text-black-2 dark:text-white">Token Address</label>
            <input
              type="text"
              className="w-full border p-2 border-[#434C59] bg-white px-4 py-2 rounded-md shadow-lg dark:bg-[#191919]"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Address and Amount Inputs */}
        <div className="flex w-full items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-2 block text-black-2 dark:text-white">From Address</label>
            <input
              type="text"
              className="w-full border p-2 border-[#434C59] bg-white px-4 py-2 rounded-md shadow-lg dark:bg-[#191919]"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              required
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-2 block text-black-2 dark:text-white">To Address</label>
            <input
              type="text"
              className="w-full border p-2 border-[#434C59] bg-white px-4 py-2 rounded-md shadow-lg dark:bg-[#191919]"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-black-2 dark:text-white">Amount</label>
          <input
            type="text"
            className="w-full border p-2 border-[#434C59] bg-white px-4 py-2 rounded-md shadow-lg dark:bg-[#191919]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="bg-primary-gradient rounded-md font-semibold px-4 py-2 text-white w-full"
            disabled={loading || !isConnected}
          >
            {loading
              ? "Sending..."
              : isConnected
              ? "Send Token"
              : "Connect Wallet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendToken;
