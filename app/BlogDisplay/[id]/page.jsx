"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogDisplayService from "../../../Services/BlogDisplay.service";
import Navbar from "../../Navbar/page";
import Image from "next/image";

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
      <div className="container mx-auto px-5 py-8 md:px-20 lg:px-60 lg:py-16">
        <div className="bg-white shadow-lg p-6 md:p-8 lg:p-12 rounded-3xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {blog.title}
          </h1>

          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={500} height={300}
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-lg mb-6"
          />

          <p className="text-md md:text-lg font-semibold text-purple-600 mb-4">
            {blog.category}
          </p>

          <div
            className="text-md md:text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
