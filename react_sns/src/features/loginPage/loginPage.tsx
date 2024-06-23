import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Session_check from './components/Session_check';
import './loginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const response = await fetch('https://server01.neon-hen.ts.net/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'  
    });

    if (response.ok) {
      // タイムラインページにリダイレクト
      navigate('/mypage');
    } else {
      alert("ログインに失敗しました")
    }
  }

  return (
    <div className="login-page">
      <Session_check />
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="ログイン" />
      </form>
    </div>
  );
}
