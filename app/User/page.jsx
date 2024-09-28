"use client";

import React, { useEffect, useState } from "react";
import UserPageService from "@/Services/UserPage.service";
import Nav from "../Navbar/page";
import Link from 'next/link';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const blogData = await UserPageService.blogPost();
      setBlogs(blogData);
    };

    getBlog();
  }, []);

  const blog1 = blogs[0];
  const otherBlogs = blogs.slice(1); 

  return (
    <div>
      <Nav />
     
      {blog1 && (
        <>
          <div key={blog1._id}>
            <h1>{blog1.title}</h1>
            <p>{blog1.category}</p>  
            <button>Read More</button>
          </div>
          <div>
            <img src={blog1.imageUrl} alt={blog1.title} />
          </div>
        </>
      )}

      <div>
        <ul>
          <li><Link href="/contact">Books</Link></li>
          <li><Link href="/contact">Technology</Link></li>
          <li><Link href="/contact">Sports</Link></li>
          <li><Link href="/contact">Entertainment</Link></li>
        </ul>
      </div>

      {otherBlogs.map((blog) => (
        <div key={blog._id}>
          <img src={blog.imageUrl} alt={blog.title} />
          <h1>{blog.title}</h1>
          <p>{blog.category}</p>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
