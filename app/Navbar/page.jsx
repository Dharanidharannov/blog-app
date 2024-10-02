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
        <div className="relative ">
          <input
            type="text"
            className="w-80 px-4 py-2 rounded-2xl text-black bg-slate-200"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="flex space-x-9 text-black ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">Add Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/categories">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
