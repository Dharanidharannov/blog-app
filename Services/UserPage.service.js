import ApiService from './Api.service';

class UserService {
  async getUsers(page = 1, limit = 10) {
    const url = `/blogs?page=${page}&limit=${limit}`; 

    try {
      const userData = await ApiService.ApiCall({
        url,
        method: 'GET',
      });

      if (userData) {
        return userData;
      } else {
        console.error("Failed to fetch users");
        return [];
      }
    } catch (error) {
      console.error("Error in fetching users:", error);
      return [];
    }
  }

  shortContent = (content) => {
    const temp = document.createElement("div");
    temp.innerHTML = content;
    const text = temp.textContent;

    const words = text.split(/\s+/); 
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "..."; 
    }
    return text; 
  };
}

export default new UserService();
