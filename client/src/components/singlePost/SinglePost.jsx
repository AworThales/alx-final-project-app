import { useLocation } from "react-router";
import people from "../../assets/people.jpg"
import "./singlePost.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

 useEffect(()=>{
  const getPost = async ()=>{
   try {
    const res = await axios.get("/posts/" + postId);
    console.log(res);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
   } catch (err) {
    console.log(err);
   };
  };
  getPost();
 },[postId]);

 const handleDelete = async () =>{
  try {
    await axios.delete(`/posts/${post._id}`, {data: {username: user.username}});
    window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
 };

 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`/posts/${post._id}`, {username: user.username, title, desc });
    // window.location.reload();
    setUpdateMode(false);
  } catch (err) {
    console.log(err);
  }
 };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
            {post.photo && 
              <img className="singlePostImg" src={publicFolder + post.photo} alt="" />
            }

            {updateMode ? (
              <input 
                type="text" 
                value={title} 
                className="singlePostTitleInput"  
                autoFocus 
                onChange={(e)=>setTitle(e.target.value)}
              />
            ) :(
            <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username && (
                  <div className="singlePostEdit">
                    <i className='singlePostIcon' href="#"><ion-icon name="trash-outline" onClick={handleDelete}></ion-icon></i>
                    <i className='singlePostIcon' href="#"><ion-icon name="create-outline" onClick={()=> setUpdateMode(true)}></ion-icon></i>
                  </div>
                )}
            </h1>
            )}
            <div className="singlePostInfo">
                <Link to={`/?user=${post.username}`} className="link">
                  <span className="singlePostAuthor">Author: <b>{post.username}</b></span>
                </Link>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
              <textarea 
                className="singlePostDescInput" 
                value={desc} 
                onChange={(e)=>setDesc(e.target.value)}
              />
            ) : (
            <p className="singlePostDesc"> {desc}</p>
            )}

            {updateMode && 
              <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            }
      </div>
    </div>
  )
}
