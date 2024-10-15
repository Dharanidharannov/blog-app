"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import BlogDisplayService from "../../../Services/BlogDisplay.service";
import Navbar from "../../Navbar/page";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const getBlogDetails = async () => {
        setLoading(true);

        const blogData = await BlogDisplayService.getBlogById(id);
        if (blogData && blogData.data) {
          setBlog(blogData.data);
          setError('');
        } else {
          setError(blogData.message);
        }

        setLoading(false);
      };

      getBlogDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5 py-14 md:px-60 md:py-16">
        <div className="bg-white shadow-lg p-14 md:p-8 lg:p-10 rounded-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-lg mb-6 mt-6"
          />

          <p className="text-lg font-semibold text-gray-600 mb-4 text-purple-600">{blog.category}</p>

          <div
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
