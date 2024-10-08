import axios from 'axios';


class AddblogService {
  async uploadBlog(blogData) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const blogUpload = {
      url: `${apiUrl}/blogs/upload`,
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: blogData
    };

    try {
      const response = await axios.post(blogUpload.url, blogUpload.data, {
        withCredentials: blogUpload.withCredentials,
        headers: blogUpload.headers,
      });

      if (response.status === 200 && response.data) {
        return {
          message: "Blog uploaded successfully",
          data: response.data
        };
      } else {
        return {
          message: "Failed to upload blog"
        };
      }
    } catch (error) {
      console.error("Error in uploading blog:", error);
      return {
        message: "Error in uploading blog"
      };
    }
  }
}

export default new AddblogService();
