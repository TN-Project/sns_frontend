import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React,{useEffect,useState}from 'react'
import 'react-tabs/style/react-tabs.css';
const Tab_System = () => {
  const [group_list,setGroup_list]=useState<string[]>([])
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
    return (
      
        <Tabs>
          <TabList>
          {group_list.map((group_name, index) => (
          <Tab key={index} value={group_name}>{group_name}</Tab>
        ))}
  
            
            
          </TabList>
      
          <TabPanel>
            <h1>HOMEです</h1>
          </TabPanel>
          <TabPanel>
            <h1>Aboutです</h1>
          </TabPanel>
           <TabPanel>
            <h1>Contactです</h1>
          </TabPanel>
        </Tabs>
      
      
    )
}

export default Tab_System