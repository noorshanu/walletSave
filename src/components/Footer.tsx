import React from "react";
import Link from "next/link";



/**
 * Site footer
 */
export const Footer = () => {


  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0 bg-white dark:bg-[#242424]">
      
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">2024© BlockTools | All Rights Reserved</p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
