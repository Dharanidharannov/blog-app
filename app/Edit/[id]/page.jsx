"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "../../Navbar/page";
import EditService from "@/Services/Edit.service";

function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      const getBlogDetails = async () => {
        setLoading(true);
        try {
          const blogData = await BlogDisplayService.getBlogById(id);
          if (blogData && blogData.data) {
            setBlog(blogData.data);
            setTitle(blogData.data.title);
            setContent(blogData.data.content);
            setCategory(blogData.data.category);
            setImageUrl(blogData.data.imageUrl);
          } else {
            setError("Blog not found");
          }
        } catch (err) {
          setError("An error occurred while fetching blog data.");
        } finally {
          setLoading(false);
        }
      };

      getBlogDetails();
    } else {
      setError("No blog ID provided");
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlogData = { title, content, category, imageUrl };

    try {
      await EditService.updateBlog(id, updatedBlogData);
      router.push(`/blogs/${id}`); 
    } catch (err) {
      setError("An error occurred while updating the blog.");
    }
  };

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
        <form onSubmit={handleUpdate} className="bg-white shadow-lg p-8 rounded-3xl">
          <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-2">Update Blog</button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;