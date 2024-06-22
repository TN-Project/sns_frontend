import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Session_check from './components/Session_check';
export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const response = await fetch('http://localhost:8080/auth/login', {
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
    <>
    <Session_check />
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </>
  )
}