
import ApiService from './Api.service';

class UserPageService {
  async getBlogs(page = 1, limit = 8) {
    const url = `/blogs?page=${page}&limit=${limit}`;

    try {
      const blogData = await ApiService.ApiCall({
        url,
        method: 'GET',
      });

      return blogData;
    } catch (error) {
      console.error("Error in fetching blogs:", error);
      return [];
    }
  }

  async searchBlogs(query) {
    const url = `/blogs?searchquery=${query}`;
    try {
      const response = await ApiService.ApiCall({ url, method: "GET" });
      return response;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  }
}

export default new UserPageService();
