import axios from 'axios';

class ApiService {
  async ApiCall({ 
    url, 
    method = 'GET', 
    headers = {}, 
    body 
  }) {
    try {
      const token = process.env.NEXT_PUBLIC_AUTH_TOKEN; 

      const config = {
        method,
        url: process.env.NEXT_PUBLIC_API_URL + url,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      };

      if (body) {
        config.data = body; 
      }

      const response = await axios(config);
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        console.error('Failed to fetch data');
        return null;
      }
    } catch (error) {
      console.error('API call error:', error);
      return null;
    }
  }
}

export default new ApiService();
