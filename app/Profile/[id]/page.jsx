"use client";
import React, { useEffect, useState } from "react";
import userblogdata from '../../../Services/Profile.service';
import DeleteService from '../../../Services/Delete.service';
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
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null); // <-- Define blogToDelete state

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
  
  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId); // <-- Set the selected blog to delete
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        const response = await DeleteService.deleteBlog(blogToDelete); // <-- Call the service to delete the blog
        if (response && !response.error) {
          setBlogs(blogs.filter((blog) => blog._id !== blogToDelete)); // <-- Filter out the deleted blog
          setShowModal(false);
          setBlogToDelete(null);
        } else {
          setError(response.error || "Failed to delete the blog.");
        }
      } catch (error) {
        setError("An error occurred while deleting the blog.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setBlogToDelete(null); // <-- Reset the blogToDelete when modal is closed
  };

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
                 <h1 className="text-2xl font-semibold">User information:</h1>
                <div className="bg-slate-200 rounded-xl w-60 p-5">
                <h4 className="text-lg ">User: {user.username}</h4>
                <p className="text-lg text-gray-600">Email: {user.email}</p>
                </div>
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
                        <button onClick={() => handleDeleteClick(blog._id)} className="text-red-500 hover:text-red-700">
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this blog?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBlogDetails;
