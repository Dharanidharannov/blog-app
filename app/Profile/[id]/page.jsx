  "use client";
import React, { useEffect, useState } from "react";
import userblogdata from '../../../Services/Profile.service';
import Navbar from "@/app/Navbar/page";
import { useParams } from 'next/navigation';  
import Link from "next/link";


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
            console.log('Blog Data:', blogData);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  const user = blogs.length > 0 ? blogs[0].user : null;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-80 py-20">
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

            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white shadow-lg p-16 rounded-3xl mb-6">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
                <p className="text-lg font-semibold text-gray-600 mb-2">
                  {blog.category}
                </p>
                <div
                  className="text-lg text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="mt-2">
                <Link href={`/Edit/${blog._id}`} className="bg-black text-white rounded p-2 w-16 mr-96">
    Edit
</Link>

                  <button className="bg-red-700 text-white rounded p-2">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBlogDetails;