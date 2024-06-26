import React, { useEffect, useState } from 'react';
import './Group_Select.css';
import { useNavigate } from 'react-router-dom';

const Group_Select = () => {
  const [group_list, setGroup_list] = useState<Group[]>([]);
  const [group_id, setGroup_id] = useState("");
  const [image, setImage] = useState<File>();
  const [texterr, setTexterr] = useState<boolean>(false);
  const navigate = useNavigate();

  const fileChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  }

  interface Group {
    Group_id: number;
    Group_name: string;
  }

  interface ResponseData {
    groups: Group[];
    message: string;
  }

  const extractGroupNames = (data: ResponseData): Group[] => {
    return data.groups;
  }

  async function fetchData() {
    try {
      const response = await fetch('https://server01.neon-hen.ts.net/group/acquisition-affiliation-user', {
        credentials: "include",
      });
      const data: ResponseData = await response.json();
      const group_data = extractGroupNames(data);
      setGroup_list(group_data);
      setGroup_id(String(group_data[0].Group_id));
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (!image) {
      setTexterr(true);
    } else {
      formData.append('file', image);
      formData.append('group_id', group_id);
      try {
        const response = await fetch('https://server01.neon-hen.ts.net/picture/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        if (response.ok) {
          console.log('Upload successful');
          navigate('/mypage');
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('リクエストエラー:', error);
      }
    }
  }

  return (
    <div className="group-select-content">
      {texterr && <p style={{ color: 'red' }}>エラーが発生しました。</p>}
      <form>
        <p className="title">グループを選択</p>
        <select value={group_id} onChange={e => setGroup_id(e.target.value)}>
          {group_list.map((group, index) => (
            <option key={index} value={group.Group_id}>{group.Group_name}</option>
          ))}
        </select>
        <input type="file" onChange={fileChange} />
        <button type="submit" className="submit-btn" onClick={handleSubmit}>アップロード</button>
      </form>
    </div>
  );
}

export default Group_Select;
