"use client";

import AddBlogService from '@/Services/AddBlog.service';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'; 
import 'react-quill/dist/quill.snow.css';
import Navbar from '../Navbar/page';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Addblog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [categories, setCategories] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);  
    formData.append('category', categories);
    formData.append('image', image);

    try {
      const response = await AddBlogService.uploadBlog(formData);
      setMessage(response.message);
      router.push("/User");
    } catch (error) {
      setMessage('Error in uploading blog.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto py-16 px-4 md:px-60 '>
        <div className="p-5 md:p-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="font-bold">Title:</label>
              <input 
                className="mt-2 rounded border border-gray-300 w-full p-2"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="font-bold">Categories:</label>
              <select 
                className="mt-2 rounded border border-gray-300 w-full p-2"
                value={categories} 
                onChange={(e) => setCategories(e.target.value)} 
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
                className="mt-2 border border-gray-300 p-2 rounded w-full" 
                onChange={(e) => setImage(e.target.files[0])} 
                required 
              />
            </div>

            <button type="submit" className="bg-black hover:bg-gray-500 rounded-xl px-4 py-2 text-white transition duration-200">Submit</button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Addblog;
