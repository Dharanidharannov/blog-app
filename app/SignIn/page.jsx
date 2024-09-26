// components/Login.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import loginService from '../../Services/Login.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginService.loginUser(email, password);

    if (result.success) {
      console.log("Login successful", result.message);
      router.push('/User/BlogPage');
    } 
    else{
      console.log("login failed");
    }
  };

  return (
    <div>
      <label>Email</label>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>LogIn</button>
    </div>
  );
}

export default Login;
