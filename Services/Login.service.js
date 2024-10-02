import axios from 'axios';

class LoginService {
  async loginUser(email, password) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const login = {
      url: `${apiUrl}/auth/login`,
      method: 'POST',
      body: {
        email,
        password,
      },
      withCredentials: true
    };

    try {
      const response = await axios.post(login.url,login.body,login.withCredentials);
      console.log(response);
      

      if (response.data ) {
        return { 
          message: "Login successful", data: response.data 
        };
      } else {
        return {
           message: "Login failed" 
          };
      }
    } 
    catch (error) {
      console.log("Login error:", error);
      return { 
        message: "Not a user, Register first"
       };
    }
  }
}

export default new LoginService();
