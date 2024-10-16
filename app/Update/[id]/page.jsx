"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import EditBlogService from "@/Services/Update.service";
import Navbar from "../../Navbar/page";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();

  const fetchBlog = async () => {
    try {
      const blogData = await EditBlogService.getBlogDetails(id);
      if (blogData) {
        setTitle(blogData.title);
        setContent(blogData.content);
        setCategory(blogData.category);
        setImage(blogData.imageUrl);
        setImagePreview(blogData.imageUrl); 
      } else {
        throw new Error("Blog data is null");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error.message || error);
      setMessage(
        "Error fetching blog details: " + (error.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await EditBlogService.updateBlog(id, formData);
      if (response) {
     
        setSuccessmsg(response.message || "Blog updated successfully");
       
        if (response.updatedBlog) {
          setImagePreview(response.updatedBlog.imageUrl);
        }
        
        router.push("/User"); 
      } else {
        throw new Error("No data received from the API.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the blog.";
      setMessage("Error updating blog: " + errorMessage);
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
        <div className="p-5 md:p-10 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="font-bold">Title:</label>
              <input
                className="mt-2 rounded border border-gray-300 w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-bold">Category:</label>
              <select
                className="mt-2 rounded border border-gray-300 w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="books">Books</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="facts">Facts</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="font-bold">Content:</label>
              <ReactQuill
                className="mt-2 mb-4"
                value={content}
                onChange={setContent}
                required
                placeholder="Write your content here..."
              />
            </div>
            <div className="mb-4">
              <label className="font-bold mr-2">Image:</label>
              <input
                type="file"
                className="mt-2 border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200} height={100}
                  className="mt-4 w-full h-48 object-cover rounded"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-500 rounded-xl px-4 py-2 text-white transition duration-200 w-full md:w-auto"
            >
              Update
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
          {successmsg && (
            <p className="text-green-600 text-center mt-4">{successmsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditBlog;

