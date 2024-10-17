"use client";
import React, { useEffect, useState } from "react";
import userblogdata from '../../../Services/Profile.service';
import Navbar from "@/app/Navbar/page";
import { useParams } from 'next/navigation';  
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function UserBlogDetails() {
  const { id } = useParams();  
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    if (id) {
      const getUserDetails = async () => {
        setLoading(true);
        try {
          const blogData = await userblogdata.getUserBlogs(id);
          if (blogData) {
            setBlogs(blogData);  
          } else {
            setError("No data found for this user");
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
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const user = blogs.length > 0 ? blogs[0].user : null;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        {blogs.length === 0 ? (
          <div>No blogs available for this user.</div>
        ) : (
          <div>
            {user && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">User: {user.username}</h2>
                <p className="text-lg text-gray-600">Email: {user.email}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm p-4 transform transition-all hover:scale-105 cursor-pointer">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{blog.title.replace(/(<([^>]+)>)/gi, "").substring(0, 50)}...</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}...
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold bg-purple-200 px-2 py-1 rounded-lg text-purple-600">
                        {blog.category}
                      </span>
                      <div className="flex space-x-5">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBlogDetails;
