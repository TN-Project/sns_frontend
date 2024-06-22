import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './IndexPage.css';

const IndexPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['login']);
  const sessionCookie = cookies.login;

  const SignUp = () => {
    navigate('/signup');
  };

  const Login = () => {
    navigate('/login');
  };

  const MyPage = () => {
    navigate('/mypage');
  };

  useEffect(() => {
    if (sessionCookie) {
      MyPage();
    }
  }, [sessionCookie]);

  return (
    <div className="index-page">
      {!sessionCookie && <button className='signup' type="button" onClick={SignUp}>アカウント新規作成</button>}
      {!sessionCookie && <button className='login' type="button" onClick={Login}>ログイン</button>}
    </div>
  );
};

export default IndexPage;
