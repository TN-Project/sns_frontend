import React,{ useEffect } from 'react'
import { useCookies } from "react-cookie";

const Session_check = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  useEffect(() => {
    // クッキーの値を取得する
    const sessionCookie = cookies.session;
    console.log('Session Cookie:', sessionCookie);

   
    if (!sessionCookie) {
        /* ログインページを表示*/ 
    }
    else{
      /*マイページにリダイレクト*/
    }
  }, [cookies]);
  return (
    <div>

    </div>
  )
}

export default Session_check