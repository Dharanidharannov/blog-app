"use client";

import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white px-8 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black text-xl font-bold">
          <Link href="/User">BlogSite</Link>
        </div>
        <div className="relative hidden md:flex ">
          <input
            type="text"
            className="w-80 px-4 py-2 rounded-2xl text-black bg-slate-200"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="md:flex space-x-9 text-black hidden">
          <li className="group">
            <Link href="/" className="relative">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="group">
            <Link href="/about" className="relative">
              Add Blog
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="group">
            <Link href="/contact" className="relative">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="group">
            <Link href="/SignIn" className="relative">
              Login
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
