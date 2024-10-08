"use client";

import React, { useContext, useEffect, useState } from "react";
import BlogService from "@/Services/UserPage.service"; 
import Link from "next/link";
import Navbar from "../Navbar/page";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData = await BlogService.getBlogs();
        
        if (blogData && Array.isArray(blogData.blogs)) {
          setBlogs(blogData.blogs); 
        } else {
          setBlogs([]); 
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]); 
      }
    };

    getBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="my-8 mt-16">
        <ul className="flex justify-center space-x-28 text-center">
          <li className="bg-fuchsia-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/books">Books</Link>
          </li>
          <li className="bg-teal-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/technology">Technology</Link>
          </li>
          <li className="bg-blue-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/entertainment">Entertainment</Link>
          </li>
          <li className="bg-pink-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/sports">Sports</Link>
          </li>
          <li className="bg-red-200 rounded-2xl flex items-center justify-center" style={{ width: "150px", height: "35px" }}>
            <Link href="/category/facts">Facts</Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 px-20 mt-16">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/BlogDisplay/${blog._id}`} key={blog._id}>
              <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center p-4 transform transition-all hover:scale-105">
                <div className="w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 w-full">
                  <h1 className="text-lg font-bold mb-1 text-gray-800">{blog.title}</h1>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}...
                  </p>
                  <div className=" justify-between items-center mt-3">
                    <p className="mt-2 text-sm font-semibold">
                      By: {blog.user.username} 
                    </p>
                    <p className="mt-1 text-gray-400 text-sm">{blog.user.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
