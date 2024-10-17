import React from "react";
import CreateTokenForm from "../../components/CreateTokenForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function page() {
  return (
 <>
 <DefaultLayout>
 <div className=" mt-8">
      <CreateTokenForm />
    </div>
 </DefaultLayout>
 </>
  );
}

export default page;
