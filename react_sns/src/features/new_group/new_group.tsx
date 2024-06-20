import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const AddGroupPage = () => {
    const navigate = useNavigate();
    const [groupname, setGroupname] = useState('');
    const [usernames, setUsernames] = useState(['']);

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    useEffect(() => {
        // クッキーの値を取得する
        const sessionCookie = cookies.login;

        if (!sessionCookie) {
            // ログインしていない場合はログインページにリダイレクト
            navigate('/login');
        }
    }, [cookies]);

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
                navigate('/');
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

    return (
        <>
            <h1>グループ新規作成</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    グループ名:
                    <input type="text" value={groupname} onChange={e => setGroupname(e.target.value)} />
                </label>
                {usernames.map((username, index) => (
                    <label key={index}>
                        追加するユーザ:
                        <input type="text" value={username} onChange={e => handleUsernameChange(index, e)} />
                    </label>
                ))}
                <button type="button" onClick={handleAddUser}>ユーザーを追加</button>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}