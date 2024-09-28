import axios from 'axios';

class UserPageService {
  async blogPost(page = 1, limit = 10) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endUrl = `${apiUrl}/blogs?page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(endUrl);
      if (response.status === 200 && response.data ) {
        return response.data.blogs;
      } else {
        console.error("Failed to fetch blogs");
        return []; 
      }
    } catch (error) {
      console.error("Error in fetching:", error); 
      return []; 
    }
  }
}

export default new UserPageService();
