"use client";

import React, { useState } from "react";
import { sendToken } from "../utils/api";
import { useAccount } from "wagmi";

const SendToken = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [rpcUrl, setRpcUrl] = useState<string>("https://eth.llaarpc.com");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ownerWalletAddress: address, // Automatically use the connected wallet address
      rpcUrl,
      tokenAddress,
      fromAddress,
      toAddress,
      amount,
    };

    console.log("Submitting token transfer with payload:", payload);

    try {
      const response = await sendToken(address as string, rpcUrl, tokenAddress, fromAddress, toAddress, amount);
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
    <div className="max-w-4xl w-full px-4 py-4 mx-auto mt-8  bg-white dark:bg-[#1c1d32] shadow-lg rounded-lg overflow-hidden border border-green-700">
      <h2 className="text-2xl font-bold mb-4">Send Token</h2>

      {message && <div className="text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">RPC URL</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={rpcUrl}
            onChange={e => setRpcUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Token Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">From Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={fromAddress}
            onChange={e => setFromAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">To Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={toAddress}
            onChange={e => setToAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary-gradient text-white py-2 px-4 rounded-full"
          disabled={loading || !isConnected}
        >
          {loading ? "Sending..." : isConnected ? "Send Token" : "Connect Wallet"}
        </button>
      </form>
    </div>
  );
};

export default SendToken;
