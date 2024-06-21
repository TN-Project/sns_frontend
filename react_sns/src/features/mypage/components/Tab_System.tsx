import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React,{useEffect,useState}from 'react'
import 'react-tabs/style/react-tabs.css';
const Tab_System = () => {
  const [group_list,setGroup_list]=useState<string[]>([])
  const [group_id,setGroup_id]=useState<number[]>([])
  const [group_picture,setGroup_picture]=useState<GroupPicture>()
  const [rpdata,setRpdata]=useState<ResponseData>()
  interface GroupPicture {
    Group_id: number;
    Picture_id: string[];
  }
  interface Group {
    Group_id: number;
    Group_name: string;
  }
  
  interface ResponseData {
    groups: Group[];
    message: string;
  }
  /*const extractGroupNames = (data: ResponseData): string[] => {
    return data.groups.map(group => group.Group_name);
  }*/
  const extractGroupId = (data: ResponseData): number[] => {
    return data.groups.map(group => group.Group_id);
  }

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/group/acquisition-affiliation-user',{
        credentials: "include",
      });
      const data:ResponseData= await response.json();
      console.log(data);
      setRpdata(data)
      /*グループ名を取得*/
      /*const group_data=extractGroupNames(data);
      setGroup_list(group_data)*/
       /*グループidを取得*/
      const group_id_list=extractGroupId(data);
      setGroup_id(group_id_list)
      
      
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }
  const IdToName=(value:Number)=>{
    if (rpdata){
      const group = rpdata.groups.find(group => group.Group_id === value);
      return group && group.Group_name ;
    } 
  }
  
  async function fetchPicture(value:number) {
    try {
          const response =await fetch('/group/{value}/pictures-list',{
          credentials: "include",
          });
          const data:GroupPicture["Picture_id"]= await response.json();
          const group_picture:GroupPicture={
            Group_id: value,
            Picture_id:data
          }
          setGroup_picture(group_picture)  
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }
useEffect(() => {
    fetchData();
    /*fetchPicture();*/
},[]);
    return (
      
        <Tabs>
          <TabList>
          {group_id.map((id, index) => (
          <Tab key={index} value={id} onClick={fetchPicture(id)}>
            {IdToName(id)}
          </Tab>
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