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
      <Navbar  />
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
          <p className="font-semibold">By: {blog.user?.username}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
