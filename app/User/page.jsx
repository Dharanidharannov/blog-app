"use client";

import React, { useEffect, useState } from "react";
import UserService from "@/Services/UserPage.service"
import Link from "next/link";
import Navbar from "../Navbar/page";

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const userData = await UserService.getUsers();
      setUsers(userData);
    };

    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="my-8 mt-16">
        <ul className="flex justify-center space-x-28 text-center">
          <li className="bg-fuchsia-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/all">Books</Link>
          </li>
          <li className="bg-teal-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/admins">Technology</Link>
          </li>
          <li className="bg-blue-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/members">Entertainment</Link>
          </li>
          <li className="bg-pink-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/members">Sports</Link>
          </li>
          <li className="bg-red-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/members">Facts</Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 px-20 mt-16">
        {users.map((user) => (
          <Link href={`/UserProfile/${user._id}`} key={user._id}>
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center p-4 transform transition-all hover:scale-105">
              <div className="w-full h-48 overflow-hidden rounded-lg">
                <img
                  src={user.profileImageUrl} 
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 w-full">
                <h1 className="text-lg font-bold mb-1 text-gray-800">{user.username}</h1>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {UserService.shortContent(user.bio)} 
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="mt-2 text-sm font-semibold">
                    Email: {user.email}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
