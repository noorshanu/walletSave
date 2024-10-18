/* eslint-disable @next/next/no-img-element */
import React from "react";

function HeroHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-8 bg-hero rounded-md mb-8 ">
      {/* Left side - Text section */}
      <div className="  w-full sm:w-1/2">
        <h1 className="text-3xl font-bold text-white pb-4">
          Blocktools | The Ultimate Solana & EVM Chains Token & Airdrop
          Powerhouse Effortlessly
        </h1>
        <p className="text-base text-white">
          Create tokens, manage OpenBook, burn liquidity, launch airdrops, and
          master market-making across Solana and EVM chains with Blocktools.
          Unleash your project’s full potential and dominate multiple blockchain
          ecosystems with this all-in-one toolkit designed for success!
        </p>
    
      </div>

      {/* Right side - Image section */}
      <div className=" w-full sm:w-1/2">
        <img
          src="hero.png"
          alt="SlerfTools Illustration"
          className="max-w-full h-[320px] mx-auto"
        />
      </div>
    </div>
  );
}

export default HeroHeader;
