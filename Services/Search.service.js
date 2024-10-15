import ApiService from './Api.service';

class SearchService {
  async fetchSearchResults(searchQuery, page = 1, limit = 8) {
    const url = `/blogs?searchquery=${searchQuery}&page=${page}&limit=${limit}`;
    
    try {
      const response = await ApiService.ApiCall({
        url,
        method: 'GET',
      });
      
      if (response) {
        return response;
      } else {
        console.error("Failed to fetch search results");
        return { totalBlogs: 0, blogs: [] };
      }
    } catch (error) {
      console.error("Error in fetching search results:", error);
      return { totalBlogs: 0, blogs: [] };
    }
  }
}

export default new SearchService();
