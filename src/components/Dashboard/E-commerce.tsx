"use client";
import dynamic from "next/dynamic";
import React from "react";

import BlockchainGrid from "../BlockchainGrid";
import GasFeeUI from "../GasFeeTracker";
import HeroHeader from "../HeroHeader";
import ToolsGrid from "../ToolsGrid";
// import CoinMarquee from "../CoinMarquee";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="re flex flex-grow flex-col items-center pt-0">
        <div className="  mb-4 overflow-hidden">{/* <CoinMarquee/> */}</div>
        <div>
          <HeroHeader />
        </div>

        <BlockchainGrid />

        <ToolsGrid />
        <GasFeeUI />
      </div>
    </>
  );
};

export default ECommerce;
