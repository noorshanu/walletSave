import React from "react";
import CreateWorkerWallet from "../../components/CreateWorkerWallet";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = () => {
  return (
    <>
    <DefaultLayout>
    <div className="s mx-auto p-4">
      <CreateWorkerWallet />
    </div>
    </DefaultLayout>
    </>
  );
};

export default Page;
