import axios from "axios";

class SignupService{
    async Signupuser(username,email,password){
        const signupUrl = process.env.NEXT_PUBLIC_API_URL;
        const signup = {
            url:`${signupUrl}/auth/register`,
            method:'POST',
            body:{
                username,
                email,
                password
            },
            withCredentials: true
        }
        try{
            const res = await axios.post(signup.url,signup.body,signup.withCredentials);
            if(res.data&&res.status === 200){
                return{
                    message:"register successfully",data:res.data
                }
                
            } else {
                return {
                    message:"user already exist "
                }
            }
        } catch (error) {
            console.log("Signup error:",error.message);
            return{
                message:"Please check your details entered correctly!"
            }
        }
    }
}
export default new SignupService();