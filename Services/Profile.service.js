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
        console.log('Fetched User Blog Data:', userBlogData); 
        return userBlogData; 
      } else {
        console.error("No data found for the user");
        return null; // Return null if no data is found
      }
    } catch (error) {
      console.error("Error in fetching blogs:", error);
      throw new Error("Failed to fetch user blogs."); 
    }
  }
}

export default new UserPageService();
