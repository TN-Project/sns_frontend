import './App.css';
import New_picture  from './features/new_picture/new_picture';
import { LoginPage } from './features/loginPage/loginPage';
import {SignUpPage} from './features/signup/signup';
import {AddGroupPage} from './features/new_group/new_group';
import Mypage from './features/mypage/mypage';
import IndexPage from './features/IndexPage';
import { Routes, Route } from 'react-router-dom';
function App() {
 
  return (
    <>
  <Routes>
    <Route path="/picture" element={<New_picture />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/new_group" element={<AddGroupPage/>} />
    <Route path="/mypage" element={<Mypage />}/>
    <Route path="/" element={<IndexPage />}/>
  </Routes>
  
  </>
  );
}

export default App;
