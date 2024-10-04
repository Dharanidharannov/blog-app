import axios from 'axios';

class BlogdisplayService {
  async getBlogById(id) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const blog = {
      url: `${apiUrl}/blogs/${id}`,
      method: 'GET',
      withCredentials: true
    };

    try {
      const response = await axios.get(blog.url,blog.withCredentials);
      if (response.status === 200 && response.data) {
        return {
          message: "Blog fetched successfully",
          data: response.data
        };
      } else {
        return {
          message: "Failed to fetch blog details"
        };
      }
    } catch (error) {
      console.error("Error in fetching blog details:", error);
      return {
        message: "Error in fetching blog details"
      };
    }
  }
}

export default new BlogdisplayService();
