"use client";
import React, { useState } from "react";
import SignupService from "@/Services/Signup.service";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Signup() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errormsg, setErrormsg] = useState("");
  let [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();

  const handlesignup = async (e) => {
    e.preventDefault();

    setErrormsg("");
    setSuccessmsg("");

    try {
      const result = await SignupService.Signupuser(username, email, password);
      console.log(result);

      if (result && result.message === "User registered successfully") {
        setSuccessmsg(result.message);
        router.push("/SignIn");
      } else {
        setErrormsg(result.message);
      }
    } catch (error) {
      const errorMessage =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        "Please check your details and enter correctly!";
      setErrormsg(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
       
        <div className="w-1/2 p-10 bg-purple-100 flex justify-center items-center">
          
        </div>

        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-5 text-center">Hello!</h2>
          <p className="text-center mb-10 text-gray-600">
            Welcome to MyblogApp!
          </p>

          <form onSubmit={handlesignup}>
        
            <div className="mb-4">
              <label className="block text-sm mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-2 border rounded"
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-2 border rounded"
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-2 border rounded"
              />
            </div>

        
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Sign Up
            </button>
          </form>

   
          {errormsg && <p className="text-red-600 mt-3">{errormsg}</p>}
          {successmsg && <p className="text-green-600 mt-3">{successmsg}</p>}

          <p className="text-center mt-5">
            Already a member?{" "}
            <a href="/SignIn" className="text-blue-500">
              Login here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
