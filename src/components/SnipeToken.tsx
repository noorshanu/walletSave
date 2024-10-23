import React, { useState, useEffect } from 'react';
import { listWallets, getBalance } from '../utils/api';
import { useAccount } from 'wagmi';
import Popup from './Popup/Popup';
import GenerateWallets from './Popup/GenerateWallets';
import BuySetting from './Popup/BuySetting';
import SellSetting from './Popup/SellSetting ';


interface Wallet {
  walletAddress: string;
  balance: string;
}

const SnipeToken = () => {
  const { address, isConnected } = useAccount();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalWallets, setTotalWallets] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const walletsPerPage = 10;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };

  // Load wallets from localStorage on component mount
  useEffect(() => {
    const savedWallets = localStorage.getItem('wallets');
    const savedTotalWallets = localStorage.getItem('totalWallets');
    const savedPage = localStorage.getItem('currentPage');

    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }

    if (savedTotalWallets) {
      setTotalWallets(Number(savedTotalWallets));
    }

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const fetchWallets = async (page: number) => {
    if (!isConnected || !address) {
      setError('Please connect your wallet.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await listWallets(address, page, walletsPerPage);
      const { walletDetails, total } = response.data;
  
      const walletsArray = Array.isArray(walletDetails) ? walletDetails : [];
  
      // Check if rpcUrl is defined for the owner before making the balance call
      const rpcUrl = '<RPC_URL>'; // Replace with the correct rpcUrl
      if (!rpcUrl) {
        setError('RPC URL is missing for the owner.');
        return;
      }
  
      const updatedWallets = await Promise.all(
        walletsArray.map(async (wallet: Wallet) => {
          try {
            const balanceResponse = await getBalance(rpcUrl, address, wallet.walletAddress);
            const balance = balanceResponse.data.balance;
            return {
              ...wallet,
              balance: balance || '0.00',
            };
          } catch (balanceError) {
            console.error('Error fetching balance for wallet:', wallet.walletAddress, balanceError);
            return { ...wallet, balance: '0.00' };
          }
        })
      );
  
      setWallets(updatedWallets);
      setTotalWallets(typeof total === 'number' ? total : 0);
    } catch (err) {
      console.error('Error fetching wallets:', err);
      setError('Failed to fetch wallets.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage, isConnected]);

  const totalPages = Math.ceil(totalWallets / walletsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchWallets(newPage);
    }
  };
 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [isPopupVisible3, setIsPopupVisible3] = useState(false);



  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const togglePopup2 = () => {
    setIsPopupVisible2(!isPopupVisible2);
  };
  const togglePopup3 = () => {
    setIsPopupVisible3(!isPopupVisible3);
  };

  return (
    <div className="bg-white dark:bg-[#191919] text-white p-4 rounded-lg shadow-lg">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-bold">CREATE TOKEN PROJECT NAME - TEST TOKEN</h1>
        <div className="text-right">
          <span className="text-sm">(Max Amount 793100000)</span>
        </div>
      </header>

      {/* Show error if exists */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium">Token Address</label>
            <select className="mt-1 block w-full px-3 py-2 dark:bg-[#191919] bg-white border border-gray-700 rounded-md text-sm">
              <option value="">NOT SET</option>
              {wallets.map((wallet) => (
                <option key={wallet.walletAddress} value={wallet.walletAddress}>
                  {formatAddress(wallet.walletAddress)} ({wallet.balance})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label className="block text-sm font-medium mr-4">Dev Wallet</label>
              <select className="block w-48 px-3 py-2 dark:bg-[#191919] bg-white border border-gray-700 rounded-md text-sm">
                <option value="">NOT SET</option>
                {wallets.map((wallet) => (
                  <option key={wallet.walletAddress} value={wallet.walletAddress}>
                    {formatAddress(wallet.walletAddress)} ({wallet.balance})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-right">
              <input
                type="number"
                className="block w-20 px-3 py-2 dark:bg-[#191919] bg-white border border-gray-700 rounded-md text-sm"
                placeholder="FB"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm" onClick={togglePopup}  >Generate Wallets</button>
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm">Download Wallets</button>
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm" onClick={togglePopup2}>Buy Setting</button>
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm" onClick={togglePopup3}>Sell Setting</button>
          </div>

          <table className="dark:bg-[#191919] bg-white text-left text-sm p-4 w-full border rounded-md border-gray-300">
            <thead>
              <tr className="dark:bg-[#191919] bg-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Balance</th>
                <th className="py-2 px-4">Token Balance</th>
                <th className="py-2 px-4">Tokens to Buy</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet, index) => (
                <tr key={wallet.walletAddress}>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <input type="checkbox" /> {(currentPage - 1) * walletsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4 text-black-2 dark:text-white">{formatAddress(wallet.walletAddress)}</td>
                  <td className="py-2 px-4">{wallet.balance}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="dark:bg-[#191919] bg-white px-2 py-1 rounded-md text-sm border border-gray-700"
                      value="0.00"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="dark:bg-[#191919] bg-white px-2 py-1 rounded-md text-sm border border-gray-700"
                      value="0.00"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button
              className="btn-rest rounded px-4 py-2 text-black-2 dark:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="btn-rest rounded px-4 py-2 text-black-2 dark:text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="flex gap-2 my-4">
         
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm">Buy </button>
            <button className="bg-primary-gradient px-4 py-2 rounded-md text-sm">Sell </button>
          </div>
        </>
      )}
   <Popup visible={isPopupVisible} onClose={togglePopup} >
  <GenerateWallets/>
</Popup>
<Popup visible={isPopupVisible2} onClose={togglePopup2} >
  <BuySetting/>
</Popup>
<Popup visible={isPopupVisible3} onClose={togglePopup3} >
<SellSetting/>
</Popup>

    </div>
  );
};

export default SnipeToken;
