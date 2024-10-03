"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import BlogDisplayService from "../../../Services/BlogDisplay.service";
import Navbar from "../../Navbar/page";

function BlogDetails() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      const getBlogDetails = async () => {
        const blogData = await BlogDisplayService.getBlogById(id);
        setBlog(blogData); 
        console.log(blogData);
      };
      getBlogDetails();
    }
  }, [id]);

  return (
    <div>
      <Navbar />
      {blog &&
        <div className="p-4">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover my-4"
          />
          <div
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-4">
            <p className="font-semibold">By: {blog.user && blog.user.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      }
    </div>
  );
}

export default BlogDetails;
