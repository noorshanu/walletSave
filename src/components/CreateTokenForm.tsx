"use client";

import { useCallback, useEffect, useState } from "react";
import { deployToken, listRpcUrls, listWallets, listWorkerWallets } from "../utils/api";
import { useAccount } from "wagmi";
import SnipeToken from "./SnipeToken";
import Popup from "./Popup/Popup";
import AddRpc from "./Popup/AddRpc";
import RpcToast from "./RpcToast";

interface UserWallet {
  walletAddress: string;
  address: string;
  privateKey: string;


  balance: string;
}

const CreateTokenForm = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("");
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]); // List of saved RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState(""); // Selected RPC URL
  const [wallets, setWallets] = useState<UserWallet[]>([]); // List of wallets
  const [selectedWallet, setSelectedWallet] = useState(""); // Selected wallet
  const [privateKey, setPrivateKey] = useState(""); // For fetching private key securely
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Response message
  const [error, setError] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Fetch the saved RPC URLs and wallets when the component mounts
  useEffect(() => {
    const fetchRpcUrls = async () => {
      if (isConnected && address) {
        try {
          const response = await listRpcUrls(address as string);
          setRpcList(response.data.rpcUrls); // Save the list of RPC URLs
        } catch (error) {
          console.error("Error fetching RPC URLs:", error);
        }
      }
    };

    const fetchWallets = async () => {
      if (!isConnected || !address) {
        setError("Please connect your wallet.");
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await listWallets(address, 1, 100); // Fetch wallets (first page)
        const { walletDetails } = response.data;

        const walletsArray = Array.isArray(walletDetails) ? walletDetails : [];
        setWallets(walletsArray); // Set fetched wallets
      } catch (err) {
        console.error("Error fetching wallets:", err);
        setError("Failed to fetch wallets.");
      } finally {
        setLoading(false);
      }
    };

    fetchRpcUrls();
    fetchWallets();
  }, [isConnected, address]);

  const handleWalletSelection = async (walletAddress: string) => {
    setSelectedWallet(walletAddress);
    if (!walletAddress) {
      setPrivateKey("");
      return;
    }
    try {
      const response = await listWorkerWallets(address as string);
      const selectedWalletDetails = response.data.walletDetails.find(
        (wallet: { walletAddress: string }) => wallet.walletAddress === walletAddress,
      );
      if (selectedWalletDetails && selectedWalletDetails.privateKey) {
        setPrivateKey(selectedWalletDetails.privateKey); // Set private key
        setError(null); // Clear any error
      } else {
        setPrivateKey("");
        setError("Private key not found for the selected wallet.");
      }
    } catch (error) {
      console.error("Error fetching wallet private key:", error);
      setError("An error occurred while fetching the private key.");
    }
  };

   // Handle form submission
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedRpcUrl || !privateKey) {
      alert("Please select an RPC URL and a valid wallet with a private key.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await deployToken(
        selectedWallet,  // Deployer's public key (wallet address)
        privateKey,      // Private key of the selected wallet
        tokenName,       // Token name
        tokenSymbol,     // Token symbol
        tokenDecimals,   // Token decimals
        totalSupply,     // Total supply
        selectedRpcUrl   // RPC URL
      );
  
      if (response.data.success) {
        setResponseMessage(`Token deployed successfully! Transaction Hash: ${response.data.deploymentHash}`);
      } else {
        setResponseMessage(`Token deployment failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deploying token:", error);
      setResponseMessage("An error occurred during token deployment.");
    } finally {
      setLoading(false);
    }
  };
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden sm:flex-row">
        <div className="mx-auto w-full rounded-md bg-white p-8 pb-12 shadow-md dark:bg-[#191919]">
          {/* Header */}
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Create Token</h2>
          {error && <div className="text-red-500">{error}</div>}
          {loading && <div>Loading wallets...</div>}

         
        {/* Form */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* Select Network (RPC) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
              Select Network (RPC)
            </label>
            <select
              className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
              value={selectedRpcUrl}
              onChange={(e) => setSelectedRpcUrl(e.target.value)}
              required
            >
              <option value="">Select an RPC URL</option>
              {rpcList.map((rpc, index) => (
                <option key={`${rpc.rpcUrl}-${index}`} value={rpc.rpcUrl}>
                  {rpc.name} - {rpc.rpcUrl}
                </option>
              ))}
            </select>
          </div>

          {/* Wallet and Private Key Section */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
                * Owner Address
              </label>
              <select
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                value={selectedWallet}
                onChange={(e) => handleWalletSelection(e.target.value)}
              >
                <option value="">Select Wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet.walletAddress} value={wallet.walletAddress}>
                    {wallet.walletAddress} ({wallet.balance})
                  </option>
                ))}
              </select>
            </div>
            {/* Hidden input for the private key */}
            <input type="hidden" value={privateKey} />
            {privateKey && (
              <div className="text-green-500">
                Private key loaded for selected wallet.
              </div>
            )}
          </div>

          {/* Token Name and Symbol */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
                * TOKEN NAME
              </label>
              <input
                type="text"
                placeholder="Ex: Ethereum"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
                * TOKEN SYMBOL
              </label>
              <input
                type="text"
                placeholder="Ex: ETH"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                required
              />
            </div>
          </div>

          {/* Token Decimals and Total Supply */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
                * TOKEN DECIMALS
              </label>
              <input
                type="number"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(Number(e.target.value))}
                className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black-2 dark:text-white">
                * TOTAL SUPPLY
              </label>
              <input
                type="text"
                placeholder="Ex: 1000000000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                required
              />
            </div>
          </div>

          {/* Response Message */}
          {responseMessage && (
            <div className="mt-4 rounded-md bg-[#191919] p-4 text-green-500">
              <p>{responseMessage}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col justify-center gap-4">
            <button
              type="reset"
              className="btn-reset w-full rounded-md px-6 py-3 font-semibold text-white hover:bg-gray-600"
            >
              RESET
            </button>
            <button
              type="submit"
              className={`bg-primary-gradient w-full rounded-md px-6 py-3 font-semibold text-white hover:bg-red-500 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create New Token"}
            </button>
          </div>
        </form>
        </div>

        <div className="w-full">
          <SnipeToken />
        </div>
      </div>

      <Popup visible={isPopupVisible} onClose={togglePopup}>
        <AddRpc />
      </Popup>
    </>
  );
};

export default CreateTokenForm;
