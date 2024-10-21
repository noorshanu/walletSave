"use client";
import dynamic from "next/dynamic";
import React from "react";

import BlockchainGrid from "../BlockchainGrid";
import GasFeeUI from "../GasFeeTracker";
import HeroHeader from "../HeroHeader";
import ToolsGrid from "../ToolsGrid";
import CoinMarquee from "../CoinMarquee";



const ECommerce: React.FC = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-0 re">
        <div className="  overflow-hidden mb-4">
          <CoinMarquee/>

        </div>
      <div>
          <HeroHeader />
        </div>

        <BlockchainGrid />

        <ToolsGrid />
        <GasFeeUI />
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default ECommerce;
