import axios from 'axios';

class ApiService {
  async ApiCall({ 
    url, 
    method = 'GET', 
    headers = {}, 
    data = null 
  }) {
    try {
      const config = {
        method,
        url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        headers: {
          ...headers,
        },
        withCredentials: true,  
      };

      if (data) {
        if (data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Content-Type'] = 'application/json';
        }
        config.data = data;
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
      throw error;
    }
  }
}

export default new ApiService();
