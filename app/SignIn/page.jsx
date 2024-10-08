"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import loginService from '../../Services/Login.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const result = await loginService.loginUser(email, password);
      if (result && result.message === 'Login successful') {
        sessionStorage.setItem('isLoggedIn', 'true');
        setSuccessMsg(result.message);
        router.push('/User');
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg('Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-purple-100">
        <img src="/images/login-logo.png" alt="Illustration" className="h-96" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-custom-blue">
        <div className="w-96 bg-white rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Hello Again!</h2>
          <p className="text-gray-600 text-center mb-6">Welcome back, you've been missed!</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none "
              />
            </div>
            <div className="mb-6 mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-2 rounded-lg transition duration-300`}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
            <p className="mt-4 text-center">
              Don’t have an account? <Link href="/signup" className="text-red-600 ">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
