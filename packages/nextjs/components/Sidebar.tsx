"use client";

// Ensures this component is a Client Component
import { useState } from "react";
// For mobile menu icons
import Image from "next/image";
// Use usePathname instead of useRouter
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaPlusSquare } from "react-icons/fa";
import { FiGrid, FiLock } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
// Icons from react-icons
import { IoList } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { MdToken } from "react-icons/md";
import { RiTokenSwapFill } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For toggling sidebar on mobile
  const pathname = usePathname(); // Get the current path

  const toggleDropdown = (section: string) => {
    if (openDropdown === section) {
      setOpenDropdown(null); // Close if the same section is clicked
    } else {
      setOpenDropdown(section); // Open the selected section
    }
  };

  const isActive = (path: string) =>
    pathname === path ? "text-[#19f489] border-r-2 border-[#19f489] " : "hover:bg-gray-700";

  return (
    <>
      {/* Hamburger Button for mobile */}
      <button className="lg:hidden fixed top-4 left-4 z-50 text-white" onClick={() => setIsSidebarOpen(true)}>
        <AiOutlineMenu size={32} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1c1d32] text-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:fixed lg:h-full  lg:w-64`}
      >
        {/* Close Button for mobile */}
        <div className="flex justify-between p-6 text-2xl font-bold lg:hidden">
          <span>BlockTools</span>
          <button className="text-white" onClick={() => setIsSidebarOpen(false)}>
            <AiOutlineClose size={32} />
          </button>
        </div>

        {/* Sidebar with scrolling */}
        <div className="h-full  overflow-y-auto">
          {/* Sidebar Header */}
          <div className="p-6 text-2xl font-bold hidden lg:block">
            <Image src="/logo.png" height={180} width={180} alt="Logo" />
          </div>

          {/* Sidebar Content */}
          <nav className="mt-6">
            {/* Explore Section */}
            <div className="mb-8">
              <div className="text-xs text-gray-400 uppercase px-4">Explore</div>
              <ul className="mt-4">
                <li>
                  <Link href="/" className={`flex gap-2 items-center p-4 ${isActive("/")}`}>
                    <FaHome />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/token-list" className={`flex gap-2 items-center p-4 ${isActive("/token-list")}`}>
                    <IoList />
                    <span>Token List</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rpc-url/save-url"
                    className={`flex items-center gap-2 px-4 py-2 ${isActive("/rpc-url/save-url")}`}
                  >
                    <IoLinkSharp /> Rpc Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-token"
                    className={` px-4 py-2 flex items-center gap-2 ${isActive("/create-token")}`}
                  >
                    <HiOutlineViewGridAdd />
                    Token Create
                  </Link>
                </li>
                <li>
                  <Link href="/token-bundle" className={`flex gap-2 items-center p-4 ${isActive("/token-bundle")}`}>
                    <FiGrid />
                    <span>Create Pool</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/worker-wallets"
                    className={`flex items-center gap-2 px-4 py-2 ${isActive("/worker-wallets")}`}
                  >
                    <MdCreateNewFolder /> Wallets Manager
                  </Link>
                </li>
                <li>
                  <Link
                    href="/send/send-token"
                    className={`flex items-center gap-2 px-4 py-2 ${isActive("/send/send-token")}`}
                  >
                    <RiTokenSwapFill /> Token Multi Sender
                  </Link>
                </li>
                <li>
                  <Link
                    href="/send/send-native"
                    className={`flex items-center gap-2 px-4 py-2 ${isActive("/send/send-native")}`}
                  >
                    <MdToken /> Send Native Token
                  </Link>
                </li>
                <li>
                  <Link href="/token-locks" className={`flex gap-2 items-center p-4 ${isActive("/token-locks")}`}>
                    <FiLock />
                    <span>Token Locks List</span>
                  </Link>
                </li>
                <li>
                  <Link href="/create-lock" className={`flex gap-2 items-center p-4 ${isActive("/create-lock")}`}>
                    <RiVerifiedBadgeFill /> Verify Contract
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developers Section */}
            <div>
              <div className="text-xs text-gray-400 uppercase px-4">Developers</div>
              <ul className="mt-4">
                <li>
                  {/* Parent Menu Item */}
                  <button
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-700"
                    onClick={() => toggleDropdown("developers")}
                  >
                    <div className="flex items-center">
                      <span className="mr-4 text-[#19f489]">
                        <FaPlusSquare />
                      </span>

                      <span>Create & Launch</span>
                    </div>
                    <span>{openDropdown === "developers" ? "▲" : "▼"}</span>
                  </button>

                  {/* Sub-menu (conditionally rendered) */}
                  {openDropdown === "developers" && (
                    <ul className="ml-8 mt-2 space-y-2">
                      <li>
                        <Link href="/launchpad" className={`block px-4 py-2 ${isActive("/launchpad")}`}>
                          Launchpad
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            {/* Utility & Tools */}
            {/* <div className="mt-8">
              <div className="text-xs text-gray-400 uppercase px-4">Utility & Tools</div>
              <ul className="mt-4">
                <li>
                  <button
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-700"
                    onClick={() => toggleDropdown("tools")}
                  >
                    <div className="flex items-center">
                      <FaPlusSquare className="mr-4 text-[#19f489]" />
                      <span>Tools</span>
                    </div>
                    <span>{openDropdown === "tools" ? "▲" : "▼"}</span>
                  </button>

                  {openDropdown === "tools" && <ul className="ml-8 mt-2 space-y-2"></ul>}
                </li>
              </ul>
            </div> */}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile (click to close sidebar) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
