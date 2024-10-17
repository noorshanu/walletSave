import { useState } from 'react';

type Chain = 'ETH' | 'BTC' | 'BSC' | 'Polygon' | 'zkSync' | 'Base';

const chains: { name: string; symbol: Chain }[] = [
  { name: 'BTC', symbol: 'BTC' },
  { name: 'Bitcoin Fractal Mainnet', symbol: 'BTC' },
  { name: 'ETH', symbol: 'ETH' },
  { name: 'BSC', symbol: 'BSC' },
  { name: 'Polygon', symbol: 'Polygon' },
  { name: 'zkSync Era', symbol: 'zkSync' },
  { name: 'Base', symbol: 'Base' },
];

const gasFees: Record<Chain, { fast: number; normal: number; slow: number }> = {
  ETH: { fast: 16.81, normal: 16.49, slow: 16.32 },
  BTC: { fast: 5.1, normal: 3.8, slow: 2.9 },
  BSC: { fast: 7.5, normal: 5.3, slow: 4.1 },
  Polygon: { fast: 2.1, normal: 1.5, slow: 1.2 },
  zkSync: { fast: 9.2, normal: 7.1, slow: 6.3 },
  Base: { fast: 4.9, normal: 4.2, slow: 3.7 },
};

const GasFeeUI = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>('ETH'); // Set the type explicitly

  const fees = gasFees[selectedChain];

  return (
    <div className="px-6 py-3  mx-auto bg-white max-w-3xl   rounded-lg shadow-md dark:bg-[#1c1d32] w-full">
      <div className="relative">
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value as Chain)} // Cast value to the correct type
          className="block w-full p-2.5  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {chains.map((chain) => (
            <option key={chain.symbol} value={chain.symbol}>
              {chain.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 dark:bg-[#1c1d32] rounded-lg">
        <div className="text-center">
          <p className="text-blue-600 font-bold">Fast</p>
          <p className="text-blue-600">{fees.fast} Gwei</p>
        </div>
        <div className="text-center">
          <p className="text-orange-600 font-bold">Normal</p>
          <p className="text-orange-600">{fees.normal} Gwei</p>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-bold">Slow</p>
          <p className="text-green-600">{fees.slow} Gwei</p>
        </div>
      </div>

      <div className="text-right text-sm text-gray-400 mt-2">
        10-15 16:39:24
      </div>
    </div>
  );
};

export default GasFeeUI;
