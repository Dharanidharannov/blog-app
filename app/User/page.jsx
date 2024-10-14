"use client";

import React, { useEffect, useState } from "react";
import BlogService from "@/Services/UserPage.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie"; 

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    const getBlogs = async () => {
      try {
        const blogData = await BlogService.getBlogs(currentPage); 
        if (blogData && Array.isArray(blogData.blogs)) {
          setBlogs(blogData.blogs);
          setFilteredBlogs(blogData.blogs); 
          setTotalPages(blogData.totalPages); 
        } else {
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [currentPage]);

  const handleBlogClick = (blogId) => {
    if (isLoggedIn) {
      router.push(`/BlogDisplay/${blogId}`);
    } else {
      router.push("/SignIn");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSearch = (query) => {
    const filtered = blogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase()) || 
      blog.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {loading ? (
        <div className="flex items-center justify-center w-full h-[70vh]">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 px-20 mt-16">
          {Array.isArray(filteredBlogs) && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col items-center shadow-sm p-4 transform transition-all hover:scale-105 cursor-pointer"
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
            <p className="text-center col-span-4">No blogs found.</p>
          )}
        </div>
      )}
      <div className="flex justify-center items-center space-x-4 my-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-2 py-1 text-white bg-blue-400 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 text-white bg-blue-400 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
