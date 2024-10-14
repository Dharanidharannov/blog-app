"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import userblogdata from '../../../Services/Profile.service';
import Navbar from "../../Navbar/page";

function UserBlogDetails() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    if (id) {
      const getUserDetails = async () => {
        setLoading(true);

        try {
          const blogData = await userblogdata.getUserBlogs(id);
          if (blogData && blogData.user) {
            setBlog(blogData);
            setError('');
          } else {
            setError(blogData.message || "No data found for this user");
          }
        } catch (err) {
          setError("An error occurred while fetching blog data.");
        }

        setLoading(false);
      };

      getUserDetails();
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
      <div className="container mx-auto px-80 py-20">
        <div>
          <h1>{blog.user.username}</h1>
          <p>{blog.user.email}</p>
        </div>
        <div className="bg-white shadow-lg p-16 rounded-3xl">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6 mt-6"
          />

          <p className="text-lg font-semibold text-gray-600 mb-2">
            {blog.category}
          </p>

          <div
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserBlogDetails;
