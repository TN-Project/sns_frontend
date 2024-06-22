import Tab_System from './components/Tab_System';
import { useNavigate } from 'react-router-dom';
import './mypage.css';

const Mypage = () => {
  const navigate = useNavigate();
  
  const MakeGroup = () => {
    navigate('/new_group');
  };
  
  const UpPicture = () => {
    navigate('/picture');
  };
  async function Logout() {
    try {
      await fetch('http://localhost:8080/auth/logout', {
        credentials: "include",
      });
      navigate('/')

    }catch (error) {
      console.error('クッキー削除エラー:', error);
    }
  }

  return (
    <div className="mypage">
      <div className="button-container">
        <button className='makegroup' type="button" onClick={MakeGroup}>グループ<br></br>新規作成</button>
        <button className='uppicture' type="button" onClick={UpPicture}>写真を投稿する</button>
        <button className='logout' type="button" onClick={Logout}>ログアウト</button>
      </div>
      <Tab_System />
    </div>
  );
}

export default Mypage;
