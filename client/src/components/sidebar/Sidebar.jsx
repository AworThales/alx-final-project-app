import './sidebar.scss';
import ai from '../../assets/ai.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() =>{
    const getCats = async () =>{
      try {
        const res = await axios.get("/categories");
        console.log(res);
        setCats(res.data);
      } catch (err) {
        console.log(err);
      };
    };
    getCats();
  },[]);
  return (
    <div className='sidebar'>
      <span className="sidebarTitle">ABOUT ME</span>
      <img src={ai} alt="AI" />
        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Iste voluptate, fugit explicabo dignissimos minus error.
        </p>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
              {cats.map((cat)=>(
                <Link to={`/?cat=${cat.name}`} className='link'>
                  <li className="sidebarListItem">{cat.name}</li>
                </Link>
              ))}
            </ul>
        </div>
        <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        <a className='sidebarIcon' href="#"><ion-icon name="logo-facebook"></ion-icon></a>
        <a className='sidebarIcon' href="#"><ion-icon name="logo-instagram"></ion-icon></a>
        <a className='sidebarIcon' href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        <a className='sidebarIcon' href="#"><ion-icon name="logo-youtube"></ion-icon></a>
        <a className='sidebarIcon' href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
        </div>
        </div>
    </div>
    
  )
}
