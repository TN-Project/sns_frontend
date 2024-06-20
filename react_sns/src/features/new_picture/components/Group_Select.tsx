import React,{useEffect,useState}from 'react'

const Group_Select= () => {
    const [group_list,setGroup_list]=useState([])
    const [group,setGroup]=useState("")
    const [image, setImage] = useState<File>()
    const fileChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files
    
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }
    async function fetchData() {
        try {
          const response = await fetch('http://localhost:8080/group/acquisition-affiliation-user');
          const data = await response.json();
          setGroup_list(data)
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
      if (!image) 
        return;
      formData.append('file', image);
      formData.append('group_name', group);
      try{
      const response = await fetch('http://localhost:8080/picture/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
         
      });
      if (response.ok) {
        console.log('Upload successful');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
    }
  
  return (
    <div>
      <form>
        {
          (function () {
            const list = [];
            for (const i in group_list) {
              list.push(<option value={i}>{i}</option>);
            }
            return <select value={group} onChange={e => setGroup(e.target.value)}>{list}</select>;
          }())
        }
      
        
        <input type="file" onChange={fileChange}/>
        <button type="submit" onClick={handleSubmit}></button>
        </form>
    </div>
   
  )
}

export default Group_Select