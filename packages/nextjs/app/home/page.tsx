"use client";
import React, { useState } from "react";

import { registerWallet, saveRpcUrl, listRpcUrls } from "../../services/api";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [rpcName, setRpcName] = useState<string>("");
  const [rpcList, setRpcList] = useState<string[]>([]);
  const [warningMessage, setWarningMessage] = useState<string | null>(null); // Warning message state

  const handleRegister = async () => {
    setWarningMessage(null); // Reset the warning message before attempting registration
    try {
      const res = await registerWallet(walletAddress);
      alert(`Wallet Registered: ${res.data.message}`);
    } catch (error: any) {
      if (error.response && error.response.data.error === "User already registered") {
        setWarningMessage("This wallet address is already registered.");
      } else if (error.response && error.response.data.error) {
        setWarningMessage(error.response.data.error); // Handle other backend errors
      } else {
        setWarningMessage("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  const handleSaveRpcUrl = async () => {
    try {
      const res = await saveRpcUrl(walletAddress, rpcUrl, rpcName);
      alert(`RPC URL Saved: ${res.data.message}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleListRpcUrls = async () => {
    try {
      const res = await listRpcUrls(walletAddress);
      setRpcList(res.data.rpcUrls);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Eth Bundler App</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Register Wallet</h2>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Display warning message if wallet address is already registered */}
        {warningMessage && (
          <div className="mt-4 text-red-500 font-semibold">
            {warningMessage}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Save RPC URL</h2>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="RPC URL"
          value={rpcUrl}
          onChange={(e) => setRpcUrl(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="RPC Name"
          value={rpcName}
          onChange={(e) => setRpcName(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSaveRpcUrl}
        >
          Save RPC URL
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">List RPC URLs</h2>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handleListRpcUrls}
        >
          List URLs
        </button>
        <ul className="mt-4">
          {rpcList.map((url, index) => (
            <li key={index} className="border p-2">
              {url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
