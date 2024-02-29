import { Link } from 'react-router-dom';
import people from '../../assets/people.jpg'
import './topbar.scss';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Topbar() {
  const {user, dispatch} = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const hanadleLogout = ()=>{
    dispatch({type: "LOGOUT"});
  };
  return (
    <div className='top'>
      <div className='topLeft'>
        
        <span className='socialIcon'> <ion-icon name="menu"></ion-icon></span>
        <span className='socialIcon'> <ion-icon name="close-outline"></ion-icon></span>
        <span className='socialIcon'> <ion-icon name="logo-facebook"></ion-icon></span>
        <span className='socialIcon'> <ion-icon name="logo-instagram"></ion-icon></span>
        <span className='socialIcon'> <ion-icon name="logo-twitter"></ion-icon></span>        
        <span className='socialIcon'> <ion-icon name="logo-youtube"></ion-icon> </span>   
        <span className='socialIcon'> <ion-icon name="logo-linkedin"></ion-icon></span>
      </div>
      <div className='topCenter'>
        <ul className="topList">
            <li className="topListItem">
            <Link className='link' to="/">Home</Link>
            </li>
            <li className="topListItem"><Link className='link' to="/about">About</Link></li>
            <li className="topListItem"><Link className='link' to="/contact">Contact</Link></li>
            <li className="topListItem"><Link className='link' to="/write">Write</Link></li>
            <li className="topListItem"  onClick={hanadleLogout}>{user && "Logout"}</li>
        </ul>
      </div>
      <div className='topRight'>
        {
          user ? (
            <Link to={"/settings"}>
              <img className='topImg' src={publicFolder + user.profilePic || people } alt="Image" />
            </Link>

          ) : (
            <ul className="topList">
              <li className="topListItem"><Link className='link' to="/login">Login</Link></li>
              <li className="topListItem"><Link className='link' to="/register">Register</Link></li>
            </ul>
          )
        }
       <span  className='topSearchIcon'> <ion-icon name="search-outline"></ion-icon></span>
      </div>
    </div>
  )
}
