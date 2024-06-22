import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './new_group.css'

export const AddGroupPage = () => {
    const navigate = useNavigate();
    const [groupname, setGroupname] = useState('');
    const [usernames, setUsernames] = useState(['']);

    const [cookies] = useCookies(['login']);
    /*useEffect(() => {
        // クッキーの値を取得する
        const sessionCookie = cookies.login;

        if (!sessionCookie) {
            // ログインしていない場合はログインページにリダイレクト
            navigate('/login');
        }
    }, [cookies]);*/

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:8080/group/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupname, usernames }),
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                navigate('/mypage');
            } else {
                alert("グループ作成に失敗しました");
            }
        });
    };

    const handleUsernameChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newUsernames = [...usernames];
        newUsernames[index] = event.target.value;
        setUsernames(newUsernames);
    };

    const handleAddUser = () => {
        setUsernames([...usernames, '']);
    };

    const handleRemoveUser = (index: number) => {
        const newUsernames = [...usernames];
        newUsernames.splice(index, 1);
        setUsernames(newUsernames);
    };
    const BackToMypage=()=>{
      navigate("/mypage")
    }


    return (
<>
  <div className='add-group-content'>
    <form onSubmit={handleSubmit}>
      <h1 className='title'>グループ新規作成</h1>
      <label>
        グループ名
        <input type="text" value={groupname} onChange={e => setGroupname(e.target.value)} />
      </label>
      {usernames.map((username, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <label>
            追加するユーザ:
            <input type="text" value={username} onChange={e => handleUsernameChange(index, e)} />
          </label>
          <button className='del-btn' type="button" onClick={() => handleRemoveUser(index)} style={{ marginLeft: '10px' }}>削除</button>
        </div>
      ))}
      <button className='add-btn' type="button" onClick={handleAddUser}>ユーザーを追加</button>
      <br />
      <input className='submit-btn' type="submit" value="新規作成" />
      <button className='tomypage' type="button" onClick={BackToMypage}>マイページに戻る</button>
    </form>
  </div>
</>
    )
}

