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
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 
    setSuccessMsg(''); 

    try {
      const result = await loginService.loginUser(email, password);

      if (result && result.message === "Login successful") {
        setSuccessMsg(result.message);
        router.push('/User');
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg("please try again later");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
          <label >Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>new user ? <Link href="/signup">Register here!</Link></p>
        {errorMsg && <p>{errorMsg}</p>}
        {successMsg && <p>{successMsg}</p>}
        <button type="submit" >Login</button>
      </form>

    </div>
  );
}

export default Login;
