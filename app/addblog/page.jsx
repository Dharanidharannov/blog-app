"use client"

import AddBlogService from '@/Services/AddBlog.service';
import { useState } from 'react';
import dynamic from 'next/dynamic'; 
import 'react-quill/dist/quill.snow.css';
 


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Addblog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [categories, setCategories] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);  
    formData.append('categories', categories);
    formData.append('image', image);

    try {
      const response = await AddBlogService.uploadBlog(formData);
      setMessage(response.message);
    } catch (error) {
      setMessage('Error in uploading blog.');
    }
  };

  return (
    <div>
     <div className="mb-3 bg-black text-white h-12">
      <h1 className="p-3">Add new blog</h1>
     </div>
      <form onSubmit={handleSubmit} className="p-10 ml-96 bg-pink-500 w-fit rounded-xl">
        <div>
          <label className ="font-bold">Title:</label> <br />
          <input 
          className="rounded w-72 p-1   "
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div> 
        <br />
        
        <div>
          <label>Content</label>
          <ReactQuill
          className = "p-2 w-96" 
            value={content} 
            onChange={setContent}  
            required 
            placeholder="Write your content here..."
          />
        </div> 
        <br />
        
        <div>
          <label>Categories</label> <br />
          <select 
          className ="ml-10 mt-2"
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
        <br />
        
        <div>
          <label>Image</label> <br />
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />
        </div> 
        <br />
        
        <button type="submit" className="bg-teal-400 rounded-xl p-2 ml-40">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Addblog;
