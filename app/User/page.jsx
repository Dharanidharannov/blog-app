"use client";

import React, { useEffect, useState } from "react";
import UserPageService from "@/Services/UserPage.service";
import Link from "next/link";
import Navbar from "../Navbar/page";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const blogData = await UserPageService.blogPost();
      setBlogs(blogData);
    };

    getBlog();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="my-8 mt-14">
        <ul className="flex justify-center space-x-28 text-center">
          <li className="bg-fuchsia-100  rounded-2xl" style={{ width: "150px", height: "30px" }}>
            <Link href="/category/books">Books</Link>
          </li>
          <li className="bg-teal-100  rounded-2xl" style={{ width: "150px", height: "30px" }}>
            <Link href="/category/technology">Technology</Link>
          </li>
          <li className="bg-blue-100  rounded-2xl" style={{ width: "150px", height: "30px" }}>
            <Link href="/category/sports">Sports</Link>
          </li>
          <li className="bg-purple-100 rounded-2xl" style={{ width: "150px", height: "30px" }}>
            <Link href="/category/entertainment">Entertainment</Link>
          </li>
          <li className="bg-pink-100 rounded-2xl" style={{ width: "150px", height: "30px" }}>
            <Link href="/category/facts">Facts</Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-20 mt-14">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl overflow-hidden flex flex-col items-center p-4 transform transition-all hover:scale-105"
          >
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 w-full text-center">
              <h1 className="text-lg font-bold mb-1 text-gray-800">{blog.title}</h1>
              <p className="text-sm text-gray-500 mb-1">{blog.category}</p>
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="text-sm text-gray-600 line-clamp-2" 
              />
              <p className="mt-2 text-sm font-semibold">
                By: {blog.user && blog.user.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
