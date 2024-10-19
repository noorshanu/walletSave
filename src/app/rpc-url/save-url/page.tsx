"use client";

import React, { useCallback, useEffect, useState } from "react";
import { deleteRpcUrl, listRpcUrls, registerWallet, saveRpcUrl, updateRpcUrl } from "../../../utils/api";
import { useAccount } from "wagmi";
import { CiCircleList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiLinkSimpleDuotone } from "react-icons/pi";
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
    if (!rpcUrl || !rpcName) return alert("Please provide both name and URL.");

    try {
      await saveRpcUrl(address as string, rpcUrl, rpcName);
      alert("RPC URL saved successfully!");
      setRpcUrl("");
      setRpcName("");
      onSave(); // Trigger refresh after saving
    } catch (error) {
      console.error("Failed to save RPC URL", error);
      alert("Failed to save RPC URL.");
    }
  }, [rpcUrl, rpcName, address, onSave]);

  return (
    <div className="bg-gray-100 shadow-md dark:bg-[#191919] px-4 py-4 rounded-md mb-6">
      <h1 className="text-2xl flex items-center gap-2 font-bold dark:text-white">
        <PiLinkSimpleDuotone /> ADD RPC URL
      </h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-full sm:w-1/2">
          <label className="dark:text-white">RPC Name</label>
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
        className="bg-primary-gradient text-white py-2 px-4 rounded-md w-full"
        onClick={handleSaveRpcUrl}
      >
        Submit RPC
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
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">RPC URLs</h2>
        <div>
          <button className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2" onClick={onRefresh}>
            Reload
          </button>
          <button className="bg-purple-500 text-white py-1 px-3 rounded-md">Copy</button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <table className="min-w-full bg-gray-100 shadow-md  dark:bg-[#191919] rounded-md overflow-hidden border  border-[#434C59]">
          <thead>
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
                        className="border p-1 rounded"
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
                        className="border p-1 rounded"
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
                        className="bg-green-500 text-white px-4 py-1 rounded-md"
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
                          className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2"
                          onClick={() => {
                            setEditMode(item.name);
                            setEditName(item.name);
                            setEditUrl(item.rpcUrl);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-md"
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
      alert("Please connect your wallet");
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
        alert("RPC URL deleted successfully!");
        handleListRpcUrls();
      } catch (error) {
        console.error("Failed to delete RPC URL", error);
        alert("Failed to delete RPC URL.");
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
        alert("RPC URL updated successfully!");
        handleListRpcUrls();
      } catch (error) {
        console.error("Failed to update RPC URL", error);
        alert("Failed to update RPC URL.");
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
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "list" ? "bg-primary-gradient text-white" : "bg-gray-200 dark:bg-[#2f2f2f] dark:text-white"}`}
            onClick={() => setActiveTab("list")}
          >
            List RPC URLs
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "edit" ? "bg-primary-gradient text-white" : "bg-gray-200 dark:bg-[#2f2f2f] dark:text-white"}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit RPC URLs
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "delete" ? "bg-primary-gradient text-white" : "bg-gray-200 dark:bg-[#2f2f2f] dark:text-white"}`}
            onClick={() => setActiveTab("delete")}
          >
            Delete RPC URLs
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
    </DefaultLayout>
  );
};

export default SaveUrls;
