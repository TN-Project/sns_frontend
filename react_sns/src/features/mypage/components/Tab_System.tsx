import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import './Tab_System.css';

const Tab_System = () => {
  const [pictureapi, setPictureapi] = useState<string[]>([]);
  const [group_id, setGroup_id] = useState<number[]>([]);
  const [rpdata, setRpdata] = useState<ResponseData>();
  const [picture_numbers, setPicture_numbers] = useState<number[]>([]);
  
  interface GroupPicture {
    Group_id: number;
    Picture_id: string[];
  }
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
    const pictures = await fetchPictureID(value);
    getPicture(value, pictures);
  }
  
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/group/acquisition-affiliation-user', {
        credentials: "include",
      });
      const data: ResponseData = await response.json();
      setRpdata(data);

      const group_id_list = extractGroupId(data);
      setGroup_id(group_id_list);
      if (group_id_list.length > 0) {
        onGroupId(group_id_list[0]);
      }
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }
  
  const IdToName = (value: number) => {
    if (rpdata) {
      const group = rpdata.groups.find(group => group.Group_id === value);
      return group && group.Group_name;
    }
  }

  async function fetchPictureID(value: number) {
    try {
      const response = await fetch(`http://localhost:8080/group/${value}/pictures-list`, {
        credentials: "include",
      });
      const data: PictureList = await response.json();
      return data.pictures;
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }

  async function getPicture(value: number, pictures: string[] | undefined) {
    try {
      if (!pictures) return;

      const newPictureNumbers: number[] = [];
      const img_url_list: string[] = [];
      
      for await (const picture_id of pictures) {
        newPictureNumbers.push(pictures.indexOf(picture_id));

        const response = await fetch(`http://localhost:8080/picture/get/${value}/${picture_id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);

        img_url_list[pictures.indexOf(picture_id)] = imgUrl;

        setPictureapi([...img_url_list]);
      }

      setPicture_numbers(newPictureNumbers);
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
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
      <div className="image-grid">
        {picture_numbers.map((id, index) => (
          <img key={index} id={String(id)} alt="画像" />
        ))}
      </div>
    </Tabs>
  );
};

export default Tab_System;