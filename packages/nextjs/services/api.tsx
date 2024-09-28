import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000'; // Base API URL

interface ApiResponse {
  success: boolean;
  message: string;
}

interface ListRpcUrlsResponse {
  rpcUrls: string[];
}

// Generic function to handle errors
const handleApiError = (error: any): string => {
  if (error.response) {
    console.error('Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    console.error('No Response from Server:', error.request);
    return 'No response received from the server';
  } else {
    console.error('Error Setting Up Request:', error.message);
    return error.message;
  }
};

// Register Wallet (POST /auth/register)
export const registerWallet = async (walletAddress: string): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { walletAddress },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Save RPC URL (POST /rpc/save-rpc-url)
export const saveRpcUrl = async (
  walletAddress: string,
  rpcUrl: string,
  name: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/rpc/save-rpc-url`,
      { walletAddress, rpcUrl, name },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete RPC URL (DELETE /rpc/delete-rpc-url)
export const deleteRpcUrl = async (
  walletAddress: string,
  name: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.delete(
      `${API_URL}/rpc/delete-rpc-url`,
      {
        data: { walletAddress, name },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update RPC URL (PUT /rpc/update-rpc-url)
export const updateRpcUrl = async (
  walletAddress: string,
  oldName: string,
  newName: string,
  rpcUrl: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.put(
      `${API_URL}/rpc/update-rpc-url`,
      { walletAddress, oldName, newName, rpcUrl },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// List RPC URLs (POST /rpc/list-rpc-urls)
export const listRpcUrls = async (walletAddress: string): Promise<AxiosResponse<ListRpcUrlsResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/rpc/list-rpc-urls`,
      { walletAddress },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Create Worker Wallet (POST /wallet/create-worker-wallet)
export const createWorkerWallet = async (
  ownerWallet: string,
  number: number
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/create-worker-wallet`,
      { ownerWallet, number },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Send Token (POST /wallet/sendToken)
export const sendToken = async (
  ownerWalletAddress: string,
  rpcUrl: string,
  tokenAddress: string,
  fromAddress: string,
  toAddress: string,
  amount: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/sendToken`,
      { ownerWalletAddress, rpcUrl, tokenAddress, fromAddress, toAddress, amount },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// List Worker Wallets (POST /wallet/list-worker-wallets)
export const listWorkerWallets = async (
  ownerWallet: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/list-worker-wallets`,
      { ownerWallet },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Send (POST /wallet/send)
export const send = async (
  ownerWalletAddress: string,
  rpcUrl: string,
  fromAddress: string,
  toAddress: string,
  amount: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/send`,
      { ownerWalletAddress, rpcUrl, fromAddress, toAddress, amount },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// List Wallets (POST /wallet/list-wallets)
export const listWallets = async (
  ownerWallet: string,
  page: number,
  limit: number
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/list-wallets`,
      { ownerWallet, page, limit },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get All Balances (POST /wallet/get-all-balances)
export const getAllBalances = async (
  ownerAddress: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/get-all-balances`,
      { ownerAddress },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Set Wallet Type (POST /wallet/set-wallet-type)
export const setWalletType = async (
  ownerWallet: string,
  walletAddresses: string[],
  isFundingWallet: boolean,
  isWorkerWallet: boolean
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/set-wallet-type`,
      { ownerWallet, walletAddresses, isFundingWallet, isWorkerWallet },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get Balance (POST /wallet/get-balance)
export const getBalance = async (
  rpcUrl: string,
  ownerAddress: string,
  walletAddress: string
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/get-balance`,
      { rpcUrl, ownerAddress, walletAddress },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
