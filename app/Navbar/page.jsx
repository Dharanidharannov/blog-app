import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const savedUserId = Cookies.get("userId");
    console.log("UserId from cookies:", savedUserId);
    setIsLoggedIn(!!token);
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const handleSearchClick = () => {
    if (searchQuery) {
      router.push(`/Search?query=${searchQuery}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    setUserId(null);
    router.push("/SignIn");
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <nav className="bg-gray-950 px-6 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
       
        <div className="text-2xl font-bold ">
          <Link href="/User">BlogSite</Link>
        </div>

       
        <div className="flex items-center space-x-4 ml-2 flex-grow md:flex-grow-0">
          <input
            type="text"
            className="w-full md:w-80 px-3 py-1 rounded-xl text-black bg-slate-200"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchClick}
            className="px-3 py-2 bg-slate-500 text-white rounded-full"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-9">
        
          <Link href="/User" className="hidden md:block text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/addblog" className="hidden md:block text-white hover:text-gray-400">
            Add Blog
          </Link>

          {isLoggedIn ? (
            <>
              <div className="relative">
                <button
                  className="flex items-center px-3 py-2 rounded-full text-white bg-slate-600"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                    <Link href={`/Profile/${userId}`} className="block px-4 py-2 hover:bg-gray-200">
                      My Profile
                    </Link>
                    <Link href="/addblog" className="block px-4 py-2 hover:bg-gray-200">
                      Add Blog
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-black">Confirm Logout</h2>
                    <p className="mb-6 text-black">Are you sure you want to log out?</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={handleLogout}
                        className="text-red-500 px-4 py-2 rounded-xl hover:bg-red-100"
                      >
                        OK
                      </button>
                      <button
                        onClick={closeLogoutModal}
                        className="text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link href="/SignIn" className="px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-700 transition duration-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
