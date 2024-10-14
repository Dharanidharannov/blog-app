import ApiService from './Api.service';

class UserPageService {
  async getUserBlogs(id) {
    const url = `/blogs/user/${id}`;

    try {
      const userBlogData = await ApiService.ApiCall({
        url,
        method: 'GET',
      });

      if (userBlogData) {
        return userBlogData; 
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
