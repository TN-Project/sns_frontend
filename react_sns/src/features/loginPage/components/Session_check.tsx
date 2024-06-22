import React,{ useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
const Session_check = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  const navigate = useNavigate();
  useEffect(() => {
    // クッキーの値を取得する
    const sessionCookie = cookies.login;
    console.log('Session Cookie:', sessionCookie);

   
    if (!sessionCookie) {
        /* ログインページを表示*/ 
        navigate("/login");

    }
    else{
      /*マイページにリダイレクト*/
      navigate("/mypage");
    }
  }, [cookies]);
  return (
    <div>

    </div>
  )
}

export default Session_check