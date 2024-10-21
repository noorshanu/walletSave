import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CoinMarquee from "@/components/CoinMarquee";


export const metadata: Metadata = {
  title: " Blocktools | The Ultimate Solana & EVM Chains Token & Airdrop Powerhouse Effortlessly",
  description: "The Ultimate Solana & EVM Chains Token & Airdrop Powerhouse Effortlessly",
};

export default function Home() {
  return (
    <>
       {/* <div className=" w-full overflow-hidden mb-4">
     <CoinMarquee/>

        </div> */}
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
