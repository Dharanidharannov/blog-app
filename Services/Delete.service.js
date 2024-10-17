import ApiService from './Api.service';

class DeleteService {
  async deleteBlog(blogId) {
    const url = `/blogs/${blogId}`;

    try {
      const response = await ApiService.ApiCall({
        url,
        method: 'DELETE',
      });

      if (response && response.message === "Blog deleted successfully") {
        console.log(response.message);
        return response;
      } else {
        console.error("Failed to delete the blog");
        return { 
            error: "Failed to delete the blog." 
        };
      }
    } catch (error) {
      console.error("Error in deleting blog:", error);
      throw new Error("Failed to delete blog.");
    }
  }
}

export default new DeleteService();
