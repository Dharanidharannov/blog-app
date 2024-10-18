import ApiService from './Api.service';

class EditBlogService {
  async getBlogDetails(id) {
    const url = `/blogs/${id}`;
    try {
      const response = await ApiService.ApiCall({ url, method: 'GET' });
      if (response) {
        return response; 
      } else {
        throw new Error('No data received from the API');
      }
    } catch (error) {
      console.error('Error fetching blog details:', error.message || error);
      throw error; 
    }
  }

  async updateBlog(id, formData) {
    const url = `/blogs/${id}`;
    try {
      const response = await ApiService.ApiCall({ url, method: 'PUT', data: formData });

      if (response) {
        return response; 
      } else {
        throw new Error('No data received after updating the blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error.message || error);
      throw error; 
    }
  }
}

export default new EditBlogService();
