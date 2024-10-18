import React from "react";
import TokenDetails from "../../components/TokenDetails";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function TokenDe() {
  return (
   <DefaultLayout>
   <div className=" h-[100vh]">
   <TokenDetails />
   </div>
   </DefaultLayout>
  );
}

export default TokenDe;
