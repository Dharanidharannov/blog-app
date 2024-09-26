"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <div className="login-container">
      <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}
        <button type="submit" >Login</button>
      </form>

    </div>
  );
}

export default Login;
