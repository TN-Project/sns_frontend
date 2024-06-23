import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './signup.css'

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [cookies] = useCookies(['login']);
  useEffect(() => {
    // クッキーの値を取得する
    const sessionCookie = cookies.login;

    if (sessionCookie) {
      // ログインしている場合は初期ページにリダイレクト
      navigate('/');
    }
  }, [cookies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // パスワードと再入力パスワードが一致しているかチェック
    if (password !== retypePassword) {
      alert("パスワードが一致しません");
      return;
    }

    // 各入力値が空でないかチェック
    if (nickname === '' || username === '' || password === '') {
      alert("入力値が空です");
      return;
    }

    // ユーザー登録APIを呼び出す
    const response = await fetch('https://server01.neon-hen.ts.net/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (response.ok) {
      // タイムラインページにリダイレクト
      navigate('/');
    } else {
      alert("アカウント登録に失敗しました\nhint: すでに登録されているユーザー名かもしれません")
    }
  }

  return (
    <>
    <div className='signup-content'>
    <form onSubmit={handleSubmit}>
      <h1>新規アカウント登録</h1>
        <label>
          Nickname:
          <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          【確認】ReType Password:
          <input type="password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    </>
  )
}