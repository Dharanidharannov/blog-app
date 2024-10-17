import ApiService from './Api.service';

class EditBlogService {
  async getBlogDetails(id) {
    const url = `/blogs/${id}`;
    console.log(`Fetching blog details from: ${url}`);
    try {
      const response = await ApiService.ApiCall({ url, method: 'GET' });
      
     
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);
  
      if (response && response.data) {
        return response.data; 
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
    console.log(`Updating blog at: ${url}`);
    try {
      const response = await ApiService.ApiCall({ url, method: 'PUT', data: formData });
      console.log('Update API Response:', response); 

      if (response && response.data) {
        return response.data; 
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

