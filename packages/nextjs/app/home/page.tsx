"use client";

import React, { useState } from "react";
import { deleteRpcUrl, listRpcUrls, registerWallet, saveRpcUrl, updateRpcUrl } from "../../services/api";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [rpcName, setRpcName] = useState<string>("");
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]);
  const [updateRpcName, setUpdateRpcName] = useState<string>(""); // State for new RPC name during update
  const [newRpcUrl, setNewRpcUrl] = useState<string>(""); // Renamed state for new RPC URL to avoid conflict
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setWarningMessage(null);
    try {
      const res = await registerWallet(walletAddress);
      alert(`Wallet Registered: ${res.data.message}`);
    } catch (error: any) {
      if (error.response && error.response.data.error === "User already registered") {
        setWarningMessage("This wallet address is already registered.");
      } else if (error.response && error.response.data.error) {
        setWarningMessage(error.response.data.error);
      } else {
        setWarningMessage("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const validUrl = new URL(url);
      return validUrl.protocol === "http:" || validUrl.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const handleSaveRpcUrl = async () => {
    if (!isValidUrl(rpcUrl)) {
      setWarningMessage("Invalid RPC URL format.");
      return;
    }
    try {
      const res = await saveRpcUrl(walletAddress, rpcUrl, rpcName);
      alert(`RPC URL Saved: ${res.data.message}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleListRpcUrls = async () => {
    if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      alert("Please enter a valid wallet address");
      return;
    }

    try {
      const res = await listRpcUrls(walletAddress);
      const urls = res.data.rpcUrls.map((item: any) => ({ name: item.name, rpcUrl: item.rpcUrl }));
      setRpcList(urls);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRpcUrl = async (name: string) => {
    try {
      const res = await deleteRpcUrl(walletAddress, name);
      alert(`RPC URL Deleted: ${res.data.message}`);
      handleListRpcUrls(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRpcUrl = async (oldName: string) => {
    if (!isValidUrl(newRpcUrl)) {
      setWarningMessage("Invalid RPC URL format.");
      return;
    }
    try {
      const res = await updateRpcUrl(walletAddress, oldName, updateRpcName, newRpcUrl);
      alert(`RPC URL Updated: ${res.data.message}`);
      handleListRpcUrls(); // Refresh the list after update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Eth Bundler App</h1>

      {/* Register Wallet Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Register Wallet</h2>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
        />
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleRegister}>
          Register
        </button>

        {/* Display warning message */}
        {warningMessage && <div className="mt-4 text-red-500 font-semibold">{warningMessage}</div>}
      </div>

      {/* Save RPC URL Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Save RPC URL</h2>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="RPC Name"
          value={rpcName}
          onChange={e => setRpcName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="RPC URL"
          value={rpcUrl}
          onChange={e => setRpcUrl(e.target.value)}
        />
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveRpcUrl}>
          Save RPC URL
        </button>
      </div>

      {/* List RPC URLs Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">List RPC URLs</h2>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleListRpcUrls}>
          List URLs
        </button>

        <ul className="mt-4">
          {rpcList.map((item, index) => (
            <li key={index} className="border p-2 flex justify-between items-center">
              <div>
                <span className="font-semibold">Name : {item.name}</span> <br /> Url : {item.rpcUrl}
              </div>
              <div className="space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteRpcUrl(item.name)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setUpdateRpcName(item.name);
                    setNewRpcUrl(item.rpcUrl); // Set the new RPC URL in the renamed state
                  }}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Update RPC URL Section */}
      {updateRpcName && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Update RPC URL</h2>
          <input
            type="text"
            className="border p-2 w-full mt-2"
            placeholder="New RPC Name"
            value={updateRpcName}
            onChange={e => setUpdateRpcName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full mt-2"
            placeholder="New RPC URL"
            value={newRpcUrl}
            onChange={e => setNewRpcUrl(e.target.value)}
          />
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleUpdateRpcUrl(updateRpcName)}
          >
            Save Updated RPC URL
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
