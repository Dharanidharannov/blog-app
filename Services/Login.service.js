import axios from 'axios';

class LoginService {
    async loginUser(email, password) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    console.log(apiUrl);
    const login = {
      url: `${apiUrl}/auth/login`,
      method: 'POST',
      body: {
        email,
        password,
      },
      withCredentials: true
    };
    console.log(login.body);
    console.log(login.url);

    try {
      const apiCall = await axios.post(login.url,login.body,login.withCredentials);
      console.log(apiCall,"api check");
      if (apiCall.data) {
        return apiCall.data;
      } else {
        return {  message: "Login failed, please try again." };
      }
    } catch (error) {
      console.error("Login error:", error.message);
      return { message: "server error." };
    }
  }
}

export default new  LoginService();
