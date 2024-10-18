import axios from 'axios';

class SignupService {
    async Signupuser(username, email, password) {
        const signupUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log(signupUrl);
        

        const signupData = {
            username: username.trim(),
            email: email.trim(),
            password: password
        };

        try {
            const res = await axios.post(`${signupUrl}/auth/register`, signupData);
            if (res.data && res.status === 201) {
                return {
                    message: 'User registered successfully',
                    data: res.data
                };
            } else {
                return {
                    message: res.data?.message || 'User already exists'
                };
            }
        } catch (error) {
            console.log('Signup error:', error);
            return {
                message: error.response?.data?.message || 'Please check your details and enter correctly!'
            };
        }
    }
}

export default new SignupService();
