import React from 'react'
import Tab_System from './components/Tab_System';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./mypage.css"

const Mypage = () => {
  const [cookies] = useCookies(['login']);
  const sessionCookie = cookies.login;
  const navigate = useNavigate();
  
const MakeGroup=()=>{
  navigate("/new_group");
}
const UpPicture=()=>{
  navigate("/picture");
}
  return (

   <>
   
   <button className='makegroup' type="button" onClick={MakeGroup}>グループ新規作成</button>
   
  
  <button className='uppicture' type="button" onClick={UpPicture}>写真を投稿する</button>
    <Tab_System/>
  </>
  )
}

export default Mypage