import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: " Blocktools | The Ultimate Solana & EVM Chains Token & Airdrop Powerhouse Effortlessly",
  description: "The Ultimate Solana & EVM Chains Token & Airdrop Powerhouse Effortlessly",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
