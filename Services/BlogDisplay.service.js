import axios from "axios";

class Blogdisplay {
  async getBlogById(id) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endUrl = `${apiUrl}/blogs/${id}`;
    try {
      const response = await axios.get(endUrl); 
      if (response.status === 200 && response.data) {
        return response.data; 
      } else {
        console.error("Failed to fetch blog details");
        return null;
      }
    } catch (error) {
      console.error("Error in fetching blog details:", error);
      return null;
    }
  }
}

export default new Blogdisplay();
