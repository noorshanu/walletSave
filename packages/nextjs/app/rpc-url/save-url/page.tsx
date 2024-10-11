"use client";

import React, { useCallback, useEffect, useState } from "react";
import { deleteRpcUrl, listRpcUrls, registerWallet, saveRpcUrl, updateRpcUrl } from "../../../utils/api";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CiCircleList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { useAccount } from "wagmi";

function SaveUrls() {
  const { address, isConnected } = useAccount();
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [rpcName, setRpcName] = useState<string>("");
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]);
  const [updateRpcName, setUpdateRpcName] = useState<string>("");
  const [newRpcUrl, setNewRpcUrl] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [walletRegistered, setWalletRegistered] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  // Memoized function to check if the wallet is registered
  const checkIfWalletIsRegistered = useCallback(async () => {
    try {
      const res = await registerWallet(address as string);
      if (res.data.success) {
        setWalletRegistered(true);
        setWelcomeMessage(`Welcome! Your Wallet Address: ${address}`);
      }
    } catch (error: any) {
      if (error.message === "User already registered") {
        setWalletRegistered(true);
        setWelcomeMessage(`Owner Wallet: ${address}`);
      } else {
        setWarningMessage("An error occurred during registration.");
        console.error(error);
      }
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && address) {
      checkIfWalletIsRegistered();
    }
  }, [isConnected, address, checkIfWalletIsRegistered]);

  const isValidUrl = (url: string): boolean => {
    try {
      const validUrl = new URL(url);
      return validUrl.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const handleSaveRpcUrl = async () => {
    setWarningMessage(null);
    setSuccessMessage(null);

    if (!isValidUrl(rpcUrl)) {
      setWarningMessage("Invalid RPC URL format.");
      return;
    }

    try {
      await saveRpcUrl(address as string, rpcUrl, rpcName);
      setSuccessMessage("RPC URL saved successfully!");
      setRpcUrl("");
      setRpcName("");
      handleListRpcUrls();
    } catch (error) {
      console.error("Error Response:", error);
      setWarningMessage("Failed to save RPC URL.");
    }
  };

  const handleListRpcUrls = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet");
      return;
    }
    try {
      const res = await listRpcUrls(address as string);
      const urls = res.data.rpcUrls.map((item: any) => ({ name: item.name, rpcUrl: item.rpcUrl }));
      setRpcList(urls);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRpcUrl = async (name: string) => {
    setWarningMessage(null);
    setSuccessMessage(null);
    try {
      await deleteRpcUrl(address as string, name);
      setSuccessMessage("RPC URL deleted successfully!");
      handleListRpcUrls();
    } catch (error) {
      console.error(error);
      setWarningMessage("Failed to delete RPC URL.");
    }
  };
  const handleUpdateRpcUrl = async (oldName: string) => {
    setWarningMessage(null);
    setSuccessMessage(null);

    // Ensure that the new RPC URL is valid if it's being changed
    if (newRpcUrl && !isValidUrl(newRpcUrl)) {
      setWarningMessage("Invalid RPC URL format.");
      return;
    }

    try {
      const updatedName = updateRpcName || oldName; // Use new name if provided, else use the old one
      const updatedUrl = newRpcUrl || rpcList.find(rpc => rpc.name === oldName)?.rpcUrl; // Use new URL if provided, else keep the old one

      // Log the data being sent for debugging
      console.log("Updating RPC URL with the following data:", {
        walletAddress: address,
        oldName,
        updatedName,
        updatedUrl,
      });

      // Check if there is any actual change to either the name or the URL
      const rpcEntry = rpcList.find(rpc => rpc.name === oldName);
      const currentName = rpcEntry?.name;
      const currentUrl = rpcEntry?.rpcUrl;

      // Proceed only if there is a change in either the name or the URL
      if (updatedName === currentName && updatedUrl === currentUrl) {
        setWarningMessage("No changes detected.");
        return;
      }

      // API call to update the RPC URL
      const response = await updateRpcUrl(address as string, oldName, updatedName, updatedUrl as string);
      console.log("API Response:", response); // Log the response

      setSuccessMessage("RPC URL updated successfully!");
      setUpdateRpcName("");
      setNewRpcUrl("");
      handleListRpcUrls(); // Refresh the list
    } catch (error: any) {
      // Detailed error logging
      if (error.response) {
        // If the server responded with a status code and data
        console.error("API Error Response:", error.response.data);
        setWarningMessage(`Failed to update RPC URL: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        // If the request was made but no response was received
        console.error("No response received from the API:", error.request);
        setWarningMessage("No response from the server.");
      } else {
        // If there was another issue setting up the request
        console.error("Error setting up the request:", error.message);
        setWarningMessage(`Failed to update RPC URL: ${error.message}`);
      }
    }
  };

  return (
    <div className="sm:max-w-7xl max-w-max mx-auto p-4">
      <h1 className="text-2xl flex items-center justify-center gap-2 font-bold text-center">
        {" "}
        <PiLinkSimpleDuotone /> Add RPC Url
      </h1>

      <div className=" flex justify-center flex-col sm:flex-row gap-8 ">
        <div className=" bg-white shadow-xl rounded-2xl  dark:bg-[#141414] px-4 py-2 border border-[#19f48a9f] ">
          {!isConnected ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Please connect your wallet to register</h2>
              <ConnectButton />
            </div>
          ) : walletRegistered ? (
            <div className="mt-6">
              <h2 className="text-sm text-center font-semibold">{welcomeMessage}</h2>
            </div>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Registering your wallet...</h2>
            </div>
          )}

          {isConnected && walletRegistered && (
            <>
              {/* Save RPC URL Section */}
              <div className="mt-6">
                {/* <h2 className="text-xl font-semibold">Save RPC URL</h2> */}
                <label htmlFor="Name">RPC Name : </label>
                <input
                  type="text"
                  className="border p-2 w-full mt-2 rounded mb-4 border-[#19f48a9f]"
                  placeholder="Ex- eth, Bsc"
                  value={rpcName}
                  onChange={e => setRpcName(e.target.value)}
                />

                <label htmlFor="Name">RPC Url : </label>
                <input
                  type="text"
                  className="border p-2 w-full mt-2 rounded border-[#19f48a9f]"
                  placeholder="https://eth.llamarpc.com"
                  value={rpcUrl}
                  onChange={e => setRpcUrl(e.target.value)}
                />
                <button
                  className="mt-4 dark:bg-[#313f66] bg-[#d6ebf8] dark:text-white text-black px-8 py-2 rounded-full mx-auto flex justify-center font-semibold"
                  onClick={handleSaveRpcUrl}
                >
                  Submit
                </button>
              </div>

              {/* List RPC URLs Section */}
              <div className="mt-6">
                <ul className="mt-4">
                  {rpcList.map((item, index) => (
                    <li key={index} className="border p-2 flex justify-between items-center">
                      <div>
                        <span className="font-semibold">Name: {item.name}</span> <br /> Url: {item.rpcUrl}
                      </div>
                      <div className="space-x-2">
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-full"
                          onClick={() => handleDeleteRpcUrl(item.name)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded-full"
                          onClick={() => {
                            setUpdateRpcName(item.name);
                            setNewRpcUrl(item.rpcUrl);
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

              {/* Add Worker Wallet Section */}
              {/* <div className="mt-6">
            <button className="bg-green-500 text-white px-2 py-1 rounded-full" onClick={toggleWorkerWalletForm}>
              {showWorkerWalletForm ? "Hide Worker Wallet Form" : "Add Worker Wallet"}
            </button>

            {showWorkerWalletForm && <CreateWorkerWallet />}
          </div> */}
            </>
          )}
        </div>

        <div>
          <button
            className=" dark:text-white text-black px-4 py-2 flex items-center gap-2  "
            onClick={handleListRpcUrls}
          >
            <CiCircleList /> List RPC URLs
          </button>

          <button
            className=" dark:text-white text-black px-4 py-2 flex items-center gap-2  "
            onClick={handleListRpcUrls}
          >
            <FaRegEdit /> Edit RPC URLs
          </button>
          <button
            className=" dark:text-white text-black px-4 py-2 flex items-center gap-2  "
            onClick={handleListRpcUrls}
          >
            <MdDelete /> Delete RPC URLs
          </button>
        </div>
      </div>

      {/* Display success and warning messages */}
      {successMessage && <div className="mt-4 text-green-500 font-semibold">{successMessage}</div>}
      {warningMessage && <div className="mt-4 text-red-500 font-semibold">{warningMessage}</div>}
      {/* <SendTransaction />
      <SetWalletType />
      <ListWallets />
      <WalletBalance /> */}
    </div>
  );
}

export default SaveUrls;
