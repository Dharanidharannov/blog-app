import ApiService from './Api.service';

class EditBlogService {
  async getBlogDetails(id) {
    const url = `/blogs/${id}`;
    return await ApiService.ApiCall({ url, method: 'GET' });
  }

  async updateBlog(id, formData) {
    const url = `/blogs/${id}`;
    return await ApiService.ApiCall({ url, method: 'PUT', data: formData });
  }
}

export default new EditBlogService();
