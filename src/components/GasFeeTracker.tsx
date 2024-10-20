/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { FaCircleQuestion } from "react-icons/fa6";
import 'react-circular-progressbar/dist/styles.css';
import CoinGreed from './CoinGreed';

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
            className="block w-full p-3 border bg-[#191919] border-[#434C59] text-white rounded-md"
          >
            {chains.map((chain) => (
              <option key={chain.symbol} value={chain.symbol}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-around items-center mt-4 p-4 bg-[#191919] rounded-lg">
          <div className="text-center">
            <img src="/rock.png" alt="" className=' mx-auto' />
            <p className="text-white font-normal">Fast</p>
            <p className="text-white font-bold">{fees.fast} Gwei</p>
          </div>
          <div className="text-center">
            <img src="/car.png" alt="" className=' mx-auto' />
            <p className="text-white font-normal">Normal</p>
            <p className="text-white font-bold">{fees.normal} Gwei</p>
          </div>
          <div className="text-center">
          <img src="/tor.png" alt="" className=' mx-auto' />
            <p className="text-white font-normal">Slow</p>
            <p className="text-white font-bold">{fees.slow} Gwei</p>
          </div>
        </div>

        
      </div>

      {/* Crypto Fear & Greed Index */}
      <div className="bg-[#191919] p-6 rounded-lg shadow-md w-full sm:w-1/2   ">
        <div className="">
          <p className="text-white font-bold mb-2 flex items-center gap-3">Crypto Fear & Greed Index <FaCircleQuestion /></p>
      

          <div className=' flex justify-center items-center'>
          <CoinGreed/>
          </div>
          <p className="text-green-400 mt-2 text-center">Greed</p>
        </div>
      </div>
    </div>
  );
};

export default GasFeeUI;
