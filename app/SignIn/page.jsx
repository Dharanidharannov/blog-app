"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginService from "@/Services/Login.service";
import { ClipLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const result = await loginService.loginUser(email, password);
      if (result && result.message === "Login successful") {
        sessionStorage.setItem("isLoggedIn", "true");
        setSuccessMsg(result.message);
        router.push("/User");
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
        
        <div className="w-1/2 p-20 bg-blue-100 flex justify-center items-center">
          <Image src="/images/login-logo.png" width={800} height={50} className="h-fix w-96 " alt="Login Illustration" />
        </div>

        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-5 text-center">Hello Again!</h2>
          <p className="text-center mb-10 text-gray-600">
            Welcome back, you've been missed!
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-2 border rounded"
                required
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Login
            </button>
          </form>

          {loading && (
            <div className="flex justify-center mt-6">
              <ClipLoader color="#3b82f6" size={30} />
            </div>
          )}

          {errorMsg && <p className="text-red-600 mt-3">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}

          <p className="text-center mt-5">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign Up here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
