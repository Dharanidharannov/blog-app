"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onSearch }) {  // Add onSearch prop
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInUser === "true");
  }, []);

  const handleLoginClick = () => {
    router.push("/SignIn");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    router.push("/SignIn");
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);  // Call onSearch prop with search query
  };

  return (
    <nav className="bg-gray-950 px-8 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/User">BlogSite</Link>
        </div>
        <div className="relative hidden md:flex">
          <input
            type="text"
            className="w-80 px-4 py-2 rounded-2xl text-black bg-slate-200"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={handleSearchChange}  // Update on typing
          />
        </div>

        <ul className="md:flex space-x-9 text-white hidden">
          <li className="group">
            <Link href="/User" className="relative transition duration-300 ease-in-out hover:text-gray-400">Home</Link>
          </li>
          <li className="group">
            <Link href="/about" className="relative transition duration-300 ease-in-out hover:text-gray-400">Add Blog</Link>
          </li>
          <li className="relative">
            {isLoggedIn ? (
              <div className="md:flex hidden items-center ">
                <div onClick={toggleDropdown} className="cursor-pointer rounded-full bg-gray-600 h-8 w-8 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-48 w-48 bg-white text-black rounded-xl z-10">
                    <div className="px-4 py-3 border-b border-gray-300 cursor-pointer">
                      <Link href="/profile">Profile</Link>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200 cursor-pointer">
                      <Link href="/about">Add Blog</Link>
                    </div>
                    <div onClick={openLogoutModal} className="px-4 py-3 cursor-pointer">Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/SignIn" onClick={handleLoginClick} className=" transition duration-300 ease-in-out hover:text-gray-400">Login</Link>
            )}
          </li>
        </ul>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-black">Confirm Logout</h2>
            <p className="mb-6 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleLogout} className=" text-red-500 px-4 py-2 rounded-xl hover:bg-red-100">OK</button>
              <button onClick={closeLogoutModal} className=" text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
