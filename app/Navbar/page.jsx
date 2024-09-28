// components/Nav.jsx

import React from 'react';
import Link from 'next/link';

function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 px-8 bg-gray-100 ">
      <div className="text-xl font-bold">BlogApp</div>
      <div className="flex-grow mx-4 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-full"/>
      </div>
      <div className="flex space-x-6">
        <Link href="/User" className="text-blue-500 hover:bg-blue-100 p-2 rounded">
          Home
        </Link>
        <Link href="/contact" className="text-blue-500 hover:bg-blue-100 p-2 rounded">
          Contact Us
        </Link>
        <Link href="/SignIn" className="text-blue-500 hover:bg-blue-100 p-2 rounded">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
