"use client";

import React, { useCallback, useEffect, useState } from "react";
import { deleteRpcUrl, listRpcUrls, registerWallet, saveRpcUrl, updateRpcUrl } from "../../../utils/api";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RpcToast from "@/components/RpcToast";
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { FaSyncAlt, FaCopy } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";  // List icon
import { FaRegEdit } from "react-icons/fa";    // Edit icon
import { MdDelete } from "react-icons/md";     // Delete icon
import dynamic from "next/dynamic";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// Dynamic import of Loader
const Loader = dynamic(() => import("../../Loader"), { suspense: true });

// Add RPC URL Component
const AddRpcUrl: React.FC<{ onSave: () => void }> = ({ onSave }) => {
  const { address } = useAccount();
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [rpcName, setRpcName] = useState<string>("");
 
  const handleSaveRpcUrl = useCallback(async () => {
    if (!rpcUrl || !rpcName) { RpcToast("Please provide both name and URL.", "warn"); return }

    try {
      await saveRpcUrl(address as string, rpcUrl, rpcName);
      RpcToast("RPC URL saved successfully!", "success");
      setRpcUrl("");
      setRpcName("");
      onSave(); // Trigger refresh after saving
    } catch (error) {
      console.error("Failed to save RPC URL", error);
      RpcToast("Failed to save RPC URL.", "error");
    }
  }, [rpcUrl, rpcName, address, onSave]);

  return (
    <div className="bg-gray-300 shadow-md dark:bg-[#191919] px-4 py-6 rounded-md mb-6">
      <h1 className="text-2xl flex items-center gap-2 font-bold dark:text-white text-black-2">
        <PiLinkSimpleDuotone /> ADD RPC URL
      </h1>
      <div className="flex items-center gap-4 my-4">
        <div className="w-full sm:w-1/2">
          <label className="dark:text-white text-black font-medium">RPC Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-[#191919]"
            placeholder="Ex: eth, bsc"
            value={rpcName}
            onChange={(e) => setRpcName(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="dark:text-white">RPC Url</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-[#191919]"
            placeholder="https://eth.llamarpc.com"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-primary-gradient text-white py-2 px-4 rounded-md w-full font-semibold"
        onClick={handleSaveRpcUrl}
      >
        SAVE RPC
      </button>
    </div>
  );
};

// Table for RPCs with Pagination
const RpcTable: React.FC<{
  rpcList: { name: string; rpcUrl: string }[];
  onEdit: (name: string, rpcUrl: string) => void;
  onDelete: (name: string) => void;
  onUpdate: (name: string, rpcUrl: string) => void;
  isEditMode: boolean;
  loading: boolean;
  onRefresh: () => void;
}> = ({ rpcList, onEdit, onDelete, onUpdate, isEditMode, loading, onRefresh }) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editUrl, setEditUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(rpcList.length / itemsPerPage);

  // Paginate the rpcList
  const paginatedData = rpcList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mt-4">
     
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-100 dark:bg-[#191919] rounded-lg shadow-md">
      {/* Dropdown for Chain Selection */}
      <div className="relative flex items-center w-full sm:w-1/2">
        <select className="appearance-none block w-full px-4 py-2 pr-8 bg-gray-300 dark:bg-[#191919] text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300">
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
          <option value="BSC">BSC</option>
          <option value="Polygon">Polygon</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        {/* Reload Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 btn-rest text-white  rounded-md  font-semibold hover:bg-purple-700"
          onClick={onRefresh}
        >
          <FaSyncAlt />
          Reload
        </button>

        {/* Copy Button */}
        <button
          className="flex items-center gap-2 btn-rest text-white px-4 py-1 rounded-md  font-semibold hover:bg-purple-700"
        
        >
          <FaCopy />
          Copy
        </button>

    </div>
      
     
      </div>
      {loading ? (
        <Loader />
      ) : (
        <table className="min-w-full bg-gray-100 shadow-md  dark:bg-[#191919]  overflow-hidden border  border-[#434C59]">
          <thead className="  border-[#434C59]">
            <tr className="bg-gray-100 shadow-md  dark:bg-[#191919] border-[#434C59] border">
              <th className="text-left p-4 border border-[#434C59]">No</th>
              <th className="text-left p-4 border border-[#434C59]">RPC URLs</th>
              <th className="text-left p-4 border border-[#434C59]">RPC Names</th>
              <th className="text-left p-4 border border-[#434C59]">Response Time</th>
              <th className="text-left p-4 border border-[#434C59]">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className=" ">
                  <td className="p-4  border border-[#434C59]">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-4 border border-[#434C59]">
                    {editMode === item.name ? (
                      <input
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
                      />
                    ) : (
                      item.rpcUrl
                    )}
                  </td>
                  <td className="p-4 border border-[#434C59]">
                    {editMode === item.name ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="p-4 border border-[#434C59]">
                   341 ms
                  </td>
                  <td className="p-4 border border-[#434C59]">
                    {editMode === item.name ? (
                      <button
                        className="btn-rest text-white px-4 py-1 rounded-md b hover:bg-gray-600 w-full sm:w-1/2 font-semibold"
                        onClick={() => {
                          onUpdate(editName, editUrl);
                          setEditMode(null);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-primary-gradient text-white px-4 py-1 rounded-md font-semibold  mr-2"
                          onClick={() => {
                            setEditMode(item.name);
                            setEditName(item.name);
                            setEditUrl(item.rpcUrl);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-rest text-white px-4 py-1 rounded-md b hover:bg-gray-600 w-full sm:w-1/2 font-semibold"
                          onClick={() => onDelete(item.name)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No RPC URLs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      {rpcList.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Main Component
const SaveUrls: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("list");

  const handleListRpcUrls = useCallback(async () => {
    if (!isConnected || !address) {
      RpcToast("Please connect your wallet", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await listRpcUrls(address as string);
      const urls = res.data.rpcUrls.map((item: any) => ({
        name: item.name,
        rpcUrl: item.rpcUrl,
      }));
      setRpcList(urls);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected]);

  const handleDeleteRpcUrl = useCallback(
    async (name: string) => {
      try {
        setLoading(true);
        await deleteRpcUrl(address as string, name);
        RpcToast("RPC URL deleted successfully!", "success");
      
        handleListRpcUrls();
      } catch (error) {
        console.error("Failed to delete RPC URL", error);
       
        RpcToast("Failed to delete RPC URL.", "error");
      } finally {
        setLoading(false);
      }
    },
    [address, handleListRpcUrls]
  );

  const handleUpdateRpcUrl = useCallback(
    async (name: string, rpcUrl: string) => {
      try {
        setLoading(true);
        await updateRpcUrl(address as string, name, name, rpcUrl);
   
        RpcToast("RPC URL upadted successfully!", "success");
        handleListRpcUrls();
      } catch (error) {
        console.error("Failed to update RPC URL", error);
    
        RpcToast("Failded To Update RPC URL!", "error");
      } finally {
        setLoading(false);
      }
    },
    [address, handleListRpcUrls]
  );

  useEffect(() => {
    handleListRpcUrls(); // Fetch on component mount
  }, [handleListRpcUrls]);

  return (
    <DefaultLayout>
      <div className="w-full p-4">
        <AddRpcUrl onSave={handleListRpcUrls} />
      <div className="bg-gray-300 shadow-md  dark:bg-[#191919] rounded-md  py-4 px-4 ">
      <div className="flex gap-4 mb-6  border-b border-gray-400">
      {/* List RPC URLs Tab */}
      <button
        className={`px-4 py-4 flex items-center gap-2 font-semibold  ${activeTab === "list" ? "active-rpc text-white" : " text-black-2 dark:text-white "}`}
        onClick={() => setActiveTab("list")}
      >
        <CiCircleList className="text-xl" /> List RPC URLs
      </button>

      {/* Edit RPC URLs Tab */}
      <button
        className={`px-4 py-2 flex items-center gap-2 font-semibold  ${activeTab === "edit" ? "active-rpc text-white" : " text-black-2 dark:text-white"}`}
        onClick={() => setActiveTab("edit")}
      >
        <FaRegEdit className="text-xl" /> Edit RPC URLs
      </button>

      {/* Delete RPC URLs Tab */}
      <button
        className={`px-4 py-2 flex items-center gap-2 font-semibold  ${activeTab === "delete" ? "active-rpc text-white" : " text-black-2 dark:text-white"}`}
        onClick={() => setActiveTab("delete")}
      >
        <MdDelete className="text-xl" /> Delete RPC URLs
      </button>
    </div>

        <RpcTable
          rpcList={rpcList}
          onEdit={(name, rpcUrl) => handleUpdateRpcUrl(name, rpcUrl)}
          onDelete={(name) => handleDeleteRpcUrl(name)}
          onUpdate={handleUpdateRpcUrl}
          isEditMode={activeTab === "edit"}
          loading={loading}
          onRefresh={handleListRpcUrls}
        />
      </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default SaveUrls;
