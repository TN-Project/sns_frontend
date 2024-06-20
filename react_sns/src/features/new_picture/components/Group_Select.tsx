import React,{useEffect,useState}from 'react'
import "./Group_Select.css"
import { useNavigate } from 'react-router-dom';
const Group_Select= () => {
    const [group_list,setGroup_list]=useState<string[]>([])
    const [group,setGroup]=useState("")
    const [image, setImage] = useState<File>()
    const [texterr,setTexterr]=useState<boolean>(false)
    const navigate = useNavigate();
    const fileChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files
        if (files && files.length > 0) {
            setImage(files[0])
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
    const extractGroupNames = (data: ResponseData): string[] => {
     return data.groups.map(group => group.Group_name);
    }
    
    async function fetchData() {
        try {
          const response = await fetch('http://localhost:8080/group/acquisition-affiliation-user',{
            credentials: "include",
          });
          const data:ResponseData= await response.json();
          
          const group_data=extractGroupNames(data);
          
          setGroup_list(group_data)
          
        } catch (error) {
          console.error('リクエストエラー:', error);
        }
      }
    useEffect(() => {
        fetchData();
    },[]);
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); 
      const formData = new FormData();
      if (!image){
        setTexterr(true);
      }else{
      formData.append('file', image);
      formData.append('group_name', group);
      try{
      const response = await fetch('http://localhost:8080/picture/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'   
      });
      if (response.ok) {
        console.log('Upload successful');
        navigate('/');
      } else {
        console.error('Upload failed');
        
        
      }
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
    }
  }
    useEffect(() => {
      console.log(group)
    },[group]);
  return (
    <div>
      {texterr && <p style={{ color: 'red' }}>エラーが発生しました。</p>}
      <form>
        
          <p>グループを選択</p>
          <select value={group} onChange={e => setGroup(e.target.value)}>
            {group_list.map((group_name, index) => (
            <option key={index} value={group_name}>{group_name}</option>
          ))}
          </select>
        <input type="file" onChange={fileChange}/>
        <button type="submit" onClick={handleSubmit}>アップロード</button>
      </form>
    </div>
   
  )
}

export default Group_Select