
import ApiService from './Api.service';


class BlogDisplayService {
  async getBlogById(id) {
    const url = `/blogs/${id}`; 

    try {
      const blogData = await ApiService.ApiCall({
        url,
        method: 'GET',
        withCredentials: true,
        
      });

      if (blogData) {
        return {
          message: "Blog fetched successfully",
          data: blogData,
        };
      } else {
        return {
          message: "Failed to fetch blog details",
        };
      }
    } catch (error) {
      console.error("Error in fetching blog details:", error);
      return {
        message: "Error in fetching blog details",
      };
    }
  }
}

export default new BlogDisplayService();
