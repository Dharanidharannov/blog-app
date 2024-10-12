import axios from 'axios';
import Cookies from 'js-cookie'; 

class LoginService {
  async loginUser(email, password) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const loginRequest = {
      url: `${apiUrl}/auth/login`, 
      method: 'POST',
      data: {
        email,
        password,
      },
      withCredentials: true,
    };

    try {
      const response = await axios(loginRequest); 
      if (response.data) {
        return { 
          message: "Login successful", 
          data: response.data 
        };
      } else {
        return {
           message: "Login failed" 
        };
      }
    } catch (error) {
      console.error("Login error:", error); 
      return { 
        message: "Not a user, Register first"
      };
    }
  }
}

export default new LoginService();
