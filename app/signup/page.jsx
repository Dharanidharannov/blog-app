"use client";
import React, { useState } from "react";
import SignupService from "@/Services/Signup.service";
import { useRouter } from "next/navigation";
import LoginService from "@/Services/Login.service"; // Create a LoginService for logging in

function Signup() {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errormsg, setErrormsg] = useState('');
    let [successmsg, setSuccessmsg] = useState('');
    const router = useRouter();

    const handlesignup = async (e) => {
        e.preventDefault();

        setErrormsg('');
        setSuccessmsg('');

        try {
            const result = await SignupService.Signupuser(username, email, password);
            console.log(result);

            if (result && result.message === "User registered successfully") {
                setSuccessmsg(result.message);
                
                // After successful signup, attempt to log in
                const loginResult = await LoginService.loginUser(email, password);
                if (loginResult && loginResult.message === "Login successful") {
                    // Navigate to SignIn page if login is successful
                    router.push('/SignIn');
                } else {
                    setErrormsg(loginResult.message);
                }
            } else {
                setErrormsg(result.message);
            }
        } catch (error) {
            console.log((error && error.response && error.response.data && error.response.data.message)
                ? error.response.data.message :
                'Please check your details and enter correctly!');
                
            setErrormsg((error && error.response && error.response.data && error.response.data.message)
                ? error.response.data.message :
                'Please check your details and enter correctly!');
        }
    };

    return (
        <div>
            <div className="bg-blue-600 w-96 rounded-xl ml-96 mt-40 h-auto p-5">
                <h2 className="mb-5 ml-32 font-semibold">SignUp Form</h2>

                <form onSubmit={handlesignup}>
                    <label className="ml-14">Username:</label><br />
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="ml-20 rounded p-2 mt-2" /> <br />
                    <label className="ml-14">Email:</label><br />
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="ml-20 rounded p-2 mt-2" />
                    <label className="ml-14" htmlFor="">Password:</label><br />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ml-20 rounded p-2 mt-2" /> <br />
                    <button className="bg-teal-400 rounded-xl p-2 mt-5 ml-32" type="submit">Submit</button>
                </form>
                {errormsg && <p className="text-red-600">{errormsg}</p>}
                {successmsg && <p className="text-green-600">{successmsg}</p>}
            </div>
        </div>
    );
}

export default Signup;
