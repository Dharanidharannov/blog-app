import ApiService from './Api.service';

class UserPageService {
  async getBlogs(page = 1, limit = 10) {
    const url = `/blogs?page=${page}&limit=${limit}`;

    try {
      const blogData = await ApiService.ApiCall({
        url,
        method: 'GET',
      });

      if (blogData) {
        return blogData; // blogData contains totalBlogs, currentPage, totalPages, and blogs array
      } else {
        console.error("Failed to fetch blogs");
        return [];
      }
    } catch (error) {
      console.error("Error in fetching blogs:", error);
      return [];
    }
  }

  
}

export default new UserPageService();
