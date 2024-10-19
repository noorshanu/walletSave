import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
  ETH: { fast: 15.65, normal: 12.34, slow: 11.39 },
  BTC: { fast: 5.1, normal: 3.8, slow: 2.9 },
  BSC: { fast: 7.5, normal: 5.3, slow: 4.1 },
  Polygon: { fast: 2.1, normal: 1.5, slow: 1.2 },
  zkSync: { fast: 9.2, normal: 7.1, slow: 6.3 },
  Base: { fast: 4.9, normal: 4.2, slow: 3.7 },
};

const GasFeeUI = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>('ETH'); // Set the type explicitly
  const fees = gasFees[selectedChain];

  const fearGreedIndex = 12; // Dummy data for Fear & Greed index

  return (
    <div className="flex justify-between gap-4 w-full flex-col sm:flex-row">
      {/* Gas Fee Section */}
      <div className="bg-[#191919] p-6 rounded-lg shadow-md w-full sm:w-1/2 ">
        <div className="relative mb-4">
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value as Chain)} // Cast value to the correct type
            className="block w-full p-3 border-none bg-[#1f2436] text-white rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {chains.map((chain) => (
              <option key={chain.symbol} value={chain.symbol}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-around items-center mt-4 p-4 bg-[#1f2436] rounded-lg">
          <div className="text-center">
            <p className="text-blue-500 font-bold">Fast</p>
            <p className="text-blue-500">{fees.fast} Gwei</p>
          </div>
          <div className="text-center">
            <p className="text-orange-500 font-bold">Normal</p>
            <p className="text-orange-500">{fees.normal} Gwei</p>
          </div>
          <div className="text-center">
            <p className="text-green-500 font-bold">Slow</p>
            <p className="text-green-500">{fees.slow} Gwei</p>
          </div>
        </div>

        <div className="text-right text-sm text-gray-500 mt-2">
          Updated at 10-15 16:39:24
        </div>
      </div>

      {/* Crypto Fear & Greed Index */}
      <div className="bg-[#191919] p-6 rounded-lg shadow-md w-full sm:w-1/2  flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-bold mb-2">Crypto Fear & Greed Index</p>
          <CircularProgressbar
            value={fearGreedIndex}
            maxValue={100}
            text={`${fearGreedIndex}`}
            styles={buildStyles({
              pathColor: fearGreedIndex > 50 ? '#00FF00' : '#FF6347',
              textColor: '#FFFFFF',
              trailColor: '#2f374b',
              backgroundColor: '#191919',
            })}
          />
          <p className="text-green-400 mt-2">Greed</p>
        </div>
      </div>
    </div>
  );
};

export default GasFeeUI;
