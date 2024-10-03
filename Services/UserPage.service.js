import axios from "axios";

class UserPageService {
  async blogPost(page = 1, limit = 10) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endUrl = `${apiUrl}/blogs?page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(endUrl);
      if (response.status === 200 && response.data) {
        return response.data.blogs;
      } else {
        console.error("Failed to fetch blogs");
        return [];
      }
    } catch (error) {
      console.error("Error in fetching:", error);
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

export default new UserPageService();
