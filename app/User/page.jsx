"use client";

import React, { useEffect, useState } from "react";
import BlogService from "@/Services/UserPage.service";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import Image from "next/image";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    const getBlogs = async () => {
      setLoading(true);
      try {
        const blogData = await BlogService.getBlogs(currentPage);
        if (blogData && Array.isArray(blogData.blogs)) {
          setBlogs(blogData.blogs);
          setTotalPages(blogData.totalPages);
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

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="flex items-center justify-center w-full h-[70vh]">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-10 mt-16">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
                className="bg-white rounded-lg overflow-hidden flex flex-col items-center shadow-md p-4 transform transition-all hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-48 overflow-hidden rounded-lg">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    height={100} width={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 w-full">
                  <h1 className="text-lg font-bold mb-1 text-gray-800 truncate">
                    {blog.title.replace(/(<([^>]+)>)/gi, "").substring(0, 50)}...
                  </h1>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}
                    ...
                  </p>
                  <div className="flex justify-between items-center mt-3 w-full">
                    <div>
                      <p className="mt-2 text-sm font-semibold">
                        By: {blog.user.username}
                      </p>
                      <p className="mt-1 text-gray-400 text-sm">
                        {blog.user.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold bg-purple-200 px-2 py-1 rounded-lg text-purple-600">{blog.category}</p>
                    </div>
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
          className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogPage;

