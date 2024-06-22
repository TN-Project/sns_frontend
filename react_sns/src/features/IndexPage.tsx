import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
const IndexPage = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['login']);
  const sessionCookie = cookies.login;
    const SignUp=()=>{
      navigate("/signup");
    }
    const Login=()=>{
      navigate("/login");
    }
    const MyPage=()=>{
      navigate("/mypage")
    }
    useEffect(() => {
      if (sessionCookie){
        MyPage()
      }
      
      
      
    }, []);
  return (
    <div>
        {!sessionCookie &&<button className='siginup' type="button" onClick={SignUp}>アカウント新規作成</button>}
        {!sessionCookie&&<button className='login' type="button" onClick={Login}>ログイン</button>}
        
    </div>
  )
}

export default IndexPage