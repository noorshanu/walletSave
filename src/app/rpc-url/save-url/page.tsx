"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  deleteRpcUrl,
  listRpcUrls,
  registerWallet,
  saveRpcUrl,
  updateRpcUrl,
} from "../../../utils/api";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RpcToast from "@/components/RpcToast";
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { FaSyncAlt, FaCopy } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci"; // List icon
import { FaRegEdit } from "react-icons/fa"; // Edit icon
import { MdDelete } from "react-icons/md"; // Delete icon
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
    if (!rpcUrl || !rpcName) {
      RpcToast("Please provide both name and URL.", "warn");
      return;
    }

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
    <div className="mb-6 rounded-md bg-white px-4 py-6 shadow-md dark:bg-[#191919]">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-black-2 dark:text-white">
        <PiLinkSimpleDuotone /> ADD RPC URL
      </h1>
      <div className="my-4 flex items-center flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label className="font-medium text-black dark:text-white">
            RPC Name
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 p-2 dark:bg-[#191919]"
            placeholder="Ex: eth, bsc"
            value={rpcName}
            onChange={(e) => setRpcName(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="dark:text-white">RPC Url</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 p-2 dark:bg-[#191919]"
            placeholder="https://eth.llamarpc.com"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-primary-gradient w-full rounded-md px-4 py-2 font-semibold text-white"
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
}> = ({
  rpcList,
  onEdit,
  onDelete,
  onUpdate,
  isEditMode,
  loading,
  onRefresh,
}) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editUrl, setEditUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(rpcList.length / itemsPerPage);

  // Paginate the rpcList
  const paginatedData = rpcList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center justify-between flex-col sm:flex-row gap-4 rounded-lg bg-white p-2 shadow-md dark:bg-[#191919]">
        {/* Dropdown for Chain Selection */}
        <div className="relative flex w-full items-center  sm:w-1/2">
          <select className="block w-full appearance-none rounded-md border border-gray-600 bg-white px-4 py-2 pr-8 text-black-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-[#191919] dark:text-white">
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="BSC">BSC</option>
            <option value="Polygon">Polygon</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* Reload Button */}
          <button
            className="btn-rest flex items-center gap-2 rounded-md px-4 py-2  font-semibold  text-white hover:bg-purple-700"
            onClick={onRefresh}
          >
            <FaSyncAlt />
            Reload
          </button>

          {/* Copy Button */}
          <button className="btn-rest flex items-center gap-2 rounded-md px-4 py-1 font-semibold  text-white hover:bg-purple-700">
            <FaCopy />
            Copy
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[340px] sm:w-full overflow-x-auto  ">
        <table className=" border border-[#434C59] w-full  bg-white shadow-md dark:bg-[#191919]">
          <thead className="border-[#434C59]">
            <tr className="border border-[#434C59] bg-gray-100 shadow-md dark:bg-[#191919]">
              <th className="border border-[#434C59] p-4 text-left dark:text-white text-black-2">No</th>
              <th className="border border-[#434C59] p-4 text-left dark:text-white text-black-2">RPC URLs</th>
              <th className="border border-[#434C59] p-4 text-left dark:text-white text-black-2">RPC Names</th>
              <th className="border border-[#434C59] p-4 text-left dark:text-white text-black-2">Response Time</th>
              <th className="border border-[#434C59] p-4 text-left dark:text-white text-black-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-[#434C59] dark:text-white text-black-2 p-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-[#434C59] p-4 dark:text-white text-black-2">
                    {editMode === item.name ? (
                      <input
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                      />
                    ) : (
                      item.rpcUrl
                    )}
                  </td>
                  <td className="border border-[#434C59] p-4 dark:text-white text-black-2">
                    {editMode === item.name ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-md border border-gray-600 bg-gray-100 p-3 text-black-2 dark:bg-[#191919] dark:text-white"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="border border-[#434C59] p-4">341 ms</td>
                  <td className="border border-[#434C59] p-4">
                    {editMode === item.name ? (
                      <button
                        className="btn-rest w-full rounded-md px-4 py-1 font-semibold text-white hover:bg-gray-600 sm:w-1/2"
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
                          className="bg-primary-gradient mr-2 rounded-md px-4 py-1 font-semibold text-white"
                          onClick={() => {
                            setEditMode(item.name);
                            setEditName(item.name);
                            setEditUrl(item.rpcUrl);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-rest b w-full rounded-md px-4 py-1 font-semibold text-white hover:bg-gray-600 sm:w-1/2"
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
      </div>
      )}

      {/* Pagination Controls */}
      {rpcList.length > itemsPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <button
            className={`rounded-md px-4 py-2 ${currentPage === 1 ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`rounded-md px-4 py-2 ${currentPage === totalPages ? "bg-gray-400" : "bg-primary-gradient text-white"}`}
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
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>(
    [],
  );
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
    [address, handleListRpcUrls],
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
    [address, handleListRpcUrls],
  );

  useEffect(() => {
    handleListRpcUrls(); // Fetch on component mount
  }, [handleListRpcUrls]);

  return (
    <DefaultLayout>
      <div className="h-full w-full  sm:h-full mx-auto px-4 pt-4 pb-[38%] sm:pb-[17%] ">
        <AddRpcUrl onSave={handleListRpcUrls} />
        <div className="rounded-md bg-white  px-4 py-4  shadow-md dark:bg-[#191919] ">
          <div className="mb-6 flex gap-4 flex-col sm:flex-row  border-b border-gray-400">
            {/* List RPC URLs Tab */}
            <button
              className={`flex items-center gap-2 px-4 py-4 font-semibold  ${activeTab === "list" ? "active-rpc text-black-2 dark:text-white" : " text-black-2 dark:text-white "}`}
              onClick={() => setActiveTab("list")}
            >
              <CiCircleList className="text-xl" /> List RPC URLs
            </button>

            {/* Edit RPC URLs Tab */}
            <button
              className={`flex items-center gap-2 px-4 py-2 font-semibold  ${activeTab === "edit" ? "active-rpc text-black-2 dark:text-white" : " text-black-2 dark:text-white"}`}
              onClick={() => setActiveTab("edit")}
            >
              <FaRegEdit className="text-xl" /> Edit RPC URLs
            </button>

            {/* Delete RPC URLs Tab */}
            <button
              className={`flex items-center gap-2 px-4 py-2 font-semibold  ${activeTab === "delete" ? "active-rpc text-black-2 dark:text-white" : " text-black-2 dark:text-white"}`}
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
