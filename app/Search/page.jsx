"use client"; 
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchService from "../../Services/Search.service";
import Navbar from "../Navbar/page";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

export const dynamic = "force-dynamic"; 

function SearchPage() {
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    const searchQuery = searchParams.get("query");
    setQuery(searchQuery); 

    if (searchQuery) {
      fetchSearchResults(currentPage, searchQuery);
    }
  }, [searchParams, currentPage]);

  const fetchSearchResults = async (page, query) => { 
    setLoading(true);
    try {
      const data = await SearchService.fetchSearchResults(query, page);
      setResults(data.blogs);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  const handleBlogClick = (blogId) => {
    if (isLoggedIn) {
      router.push(`/BlogDisplay/${blogId}`);
    } else {
      router.push("/SignIn");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-10 mt-10">
        {results.length > 0 ? (
          results.map((blog) => (
            <div
              key={blog._id}
              onClick={() => handleBlogClick(blog._id)}
              className="bg-white rounded-xl overflow-hidden flex flex-col items-center shadow-sm p-4 transform transition-all hover:scale-105 cursor-pointer"
            >
              <div className="w-full h-40 sm:h-48 overflow-hidden rounded-lg">
                <Image 
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={500} 
                  height={300} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 w-full">
                <h1 className="text-md sm:text-lg font-bold mb-1 text-gray-800 line-clamp-2">
                  {blog.title}
                </h1>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}
                  ...
                </p>
                <div className="justify-between items-center mt-3">
                  <p className="mt-2 text-sm font-semibold">
                    By: {blog.user.username}
                  </p>
                  <p className="mt-1 text-gray-400 text-sm">
                    {blog.user.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No blogs found.</p>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 my-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-sm sm:text-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function SearchWrapper() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPage />
    </Suspense>
  );
}
