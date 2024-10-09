"use client";

import React, { useEffect, useState } from "react";
import BlogService from "@/Services/UserPage.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";
import { ClipLoader } from "react-spinners"; 

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInUser === "true");

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
      } finally {
        setLoading(false); 
      }
    };

    getBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    if (isLoggedIn) {
      router.push(`/BlogDisplay/${blogId}`);
    } else {
      router.push("/SignIn");
    }
  };

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

      {loading ? (
        <div className="flex items-center justify-center w-full h-[70vh]">
          <ClipLoader color="#3b82f6" size={50} /> 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 px-20 mt-16">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col items-center p-4 transform transition-all hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 w-full">
                  <h1 className="text-lg font-bold mb-1 text-gray-800">
                    {blog.title}
                  </h1>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}
                    ...
                  </p>
                  <div className="justify-between items-center mt-3">
                    <p className="mt-2 text-sm font-semibold">
                      By: {blog.user.username}
                    </p>
                    <p className="mt-1 text-gray-400 text-sm">
                      {blog.user.email}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
