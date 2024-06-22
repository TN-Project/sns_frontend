import { Tab, Tabs, TabList } from 'react-tabs';
import React, { useEffect, useState } from 'react'

import 'react-tabs/style/react-tabs.css';
import "./Tab_System.css"
const Tab_System = () => {
  const [pictureapi, setPictureapi] = useState<string[]>([])
  const [group_id, setGroup_id] = useState<number[]>([])
  const [rpdata, setRpdata] = useState<ResponseData>()
  const [picture_numbers, setPicture_numbers] = useState<number[]>([])

  interface PictureList {
    message: string;
    pictures: string[];
  }
  interface Group {
    Group_id: number;
    Group_name: string;
  }

  interface ResponseData {
    groups: Group[];
    message: string;
  }
  const extractGroupId = (data: ResponseData): number[] => {
    return data.groups.map(group => group.Group_id);
  }
  const onGroupId = async (value: number) => {
    
     console.log(value)
    const pictures = await fetchPictureID(value)
     getPicture(value, pictures)
    
  }
  
  async function fetchData() {
    try {
      const response = await fetch('https://server01.neon-hen.ts.net/group/acquisition-affiliation-user', {
        credentials: "include",
      });
      const data: ResponseData = await response.json();
      console.log(data);
      setRpdata(data)
      
      /*グループidを取得*/
      const group_id_list = extractGroupId(data);
      setGroup_id(group_id_list)
      if (group_id_list.length > 0) {
        onGroupId(group_id_list[0]);
      }


    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }
  const IdToName = (value: Number) => {
    if (rpdata) {
      const group = rpdata.groups.find(group => group.Group_id === value);
      return group && group.Group_name;
    }
  }

  async function fetchPictureID(value: number) {
    try {
      console.log("https://server01.neon-hen.ts.net/group/" + String(value) + "/pictures-list")
      const response = await fetch("https://server01.neon-hen.ts.net/group/" + String(value) + "/pictures-list", {
        credentials: "include",
      });
      /*console.log(response.json());*/
      const data: PictureList = await response.json();

      return data.pictures
      
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }
  async function getPicture(value: number, pictures: string[] | undefined) {
    try {
      

      if (!pictures) {
        return;
      }
      const newPictureNumbers: number[] = [];
      console.log("画像の数は"+pictures.length)
      const img_url_list:string[]=[]
      for await (const picture_id of pictures) {
        console.log("picture_id:"+picture_id)
        newPictureNumbers.push(pictures.indexOf(picture_id));
        
          const response = await fetch("https://server01.neon-hen.ts.net/picture/get/" + value + "/" + picture_id, {
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        // 画像URLを保存しておく
        img_url_list[pictures.indexOf(picture_id)] = imgUrl;
        // 画像URLを更新
        setPictureapi([...img_url_list]); 
        

       
      }
      setPicture_numbers(newPictureNumbers);
      console.log("pictureのindexリスト"+picture_numbers)
      
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }


  useEffect(() => {
    fetchData();
    
    
    
  }, []);
  useEffect(() => {
    // picture_numbersが更新された後に画像を設定する
    picture_numbers.forEach(id => {
      const imgElement = document.getElementById(String(id));
      if (imgElement) {
        (imgElement as HTMLImageElement).src = pictureapi[id];
      }
    });
  }, [picture_numbers]);
  return (

    <Tabs>
      <TabList>
        {group_id.map((id, index) => (
          <Tab key={index} value={id} onClick={() => onGroupId(id)}>
            {IdToName(id)}
          </Tab>
        ))}



      </TabList>

      
      {picture_numbers.map((id, index) => (
        <img key={index} id={String(id)} alt="画像"></img>
      ))}
        
      
    </Tabs>


  )
}

export default Tab_System