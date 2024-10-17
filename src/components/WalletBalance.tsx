import React, { useEffect, useState } from "react";
import { getAllBalances, getBalance, listRpcUrls } from "../utils/api";
import { useAccount } from "wagmi";

interface RpcUrl {
  name: string;
  rpcUrl: string;
}

interface BalanceData {
  walletAddress: string;
  rpcName: string;
  balance: string;
}

const WalletBalance = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [rpcList, setRpcList] = useState<RpcUrl[]>([]); // List of saved RPC URLs
  const [balanceData, setBalanceData] = useState<BalanceData[]>([]); // Balance data for all wallets
  const [manualBalance, setManualBalance] = useState<string>(""); // Balance for manually checked wallet
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the buttons
  const [message, setMessage] = useState<string | null>(null); // Success/error message
  const [selectedRpcUrl, setSelectedRpcUrl] = useState<string>(""); // Selected RPC URL
  const [selectedWallet, setSelectedWallet] = useState<string>(""); // Selected wallet address

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

  // Function to get all balances
  const handleGetAllBalances = async () => {
    if (!isConnected || !address) {
      setMessage("Please connect your wallet.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await getAllBalances(address as string);
      console.log("Get all balances response:", response);

      // If the response is an array of balances
      if (Array.isArray(response.data)) {
        setBalanceData(response.data);
        setMessage("Balances retrieved successfully.");
      } else {
        console.error("Error: Unexpected response format", response.data);
        setMessage("Failed to retrieve all balances.");
      }
    } catch (error) {
      console.error("Error getting all balances:", error);
      setMessage("Failed to retrieve all balances.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get the balance for a specific wallet with a specific RPC
  const handleCheckBalance = async () => {
    if (!isConnected || !selectedRpcUrl || !selectedWallet) {
      setMessage("Please connect your wallet, select an RPC, and a wallet address.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await getBalance(selectedRpcUrl, address as string, selectedWallet);
      console.log("Check balance response:", response);

      if (response.data.balance) {
        setManualBalance(response.data.balance);
        setMessage(`Balance retrieved: ${response.data.balance}`);
      } else {
        setMessage("Failed to retrieve balance.");
      }
    } catch (error) {
      console.error("Error getting balance:", error);
      setMessage("Failed to retrieve balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Wallet Balance Checker</h2>

      {/* Display messages */}
      {message && (
        <div className={`mt-4 ${message.includes("retrieved") ? "text-green-500" : "text-red-500"}`}>{message}</div>
      )}

      {/* Button to get all balances */}
      <button
        onClick={handleGetAllBalances}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get All Balances"}
      </button>

      {/* Display balance data in table */}
      {balanceData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">All Wallet Balances:</h3>
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead>
              <tr>
                <th className="border p-2">Wallet Address</th>
                <th className="border p-2">RPC Name</th>
                <th className="border p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.walletAddress}</td>
                  <td className="border p-2">{item.rpcName}</td>
                  <td className="border p-2">{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual balance check section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Check Balance for Specific Wallet</h3>

        {/* Select RPC URL */}
        <div className="mb-4">
          <label className="block mb-2">Select RPC URL</label>
          <select className="border p-2 w-full" onChange={e => setSelectedRpcUrl(e.target.value)}>
            <option value="">Select an RPC URL</option>
            {rpcList.map(rpc => (
              <option key={rpc.rpcUrl} value={rpc.rpcUrl}>
                {rpc.name} - {rpc.rpcUrl}
              </option>
            ))}
          </select>
        </div>

        {/* Enter Wallet Address */}
        <div className="mb-4">
          <label className="block mb-2">Wallet Address</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter wallet address"
            onChange={e => setSelectedWallet(e.target.value)}
          />
        </div>

        <button onClick={handleCheckBalance} className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Checking..." : "Check Balance"}
        </button>

        {/* Display manual balance */}
        {manualBalance && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Balance for Selected Wallet:</h3>
            <p>{manualBalance}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
