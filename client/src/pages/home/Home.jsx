import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.scss';
import axios from "axios";
import { useLocation } from 'react-router';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
   const fetchPosts = async ()=>{
    try {
      const res = await axios.get("/posts" + search);
      console.log(res);
      setPosts(res.data);
    } catch (err) {
      console.log(err)
    };
   };
   fetchPosts();
  }, [search]);
  
  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  )
}
