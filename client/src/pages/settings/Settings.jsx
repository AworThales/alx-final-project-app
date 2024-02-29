import Sidebar from "../../components/sidebar/Sidebar";
import people from "../../assets/people.jpg";
import "./settings.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const publicFolder = "http://localhost:5000/images/";
  const {user, dispatch } = useContext(Context)

  const handleUpdate = async (e)=>{
    e.preventDefault();
    dispatch({type: "UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axios.post("/upload", data);
       } catch (err) {
         console.log(err);
       };
    };

    try {
      const res = await axios.put("/users/" + user._id, updatedUser );
      setSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data});
     } catch (err) {
      dispatch({type: "UPDATE_FAILURE"});
     };
  };
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img src={file ? URL.createObjectURL(file) : publicFolder + user.profilePic} alt="People" />
              <label htmlFor="fileInput">
                <span className="settingsPPIcon"><ion-icon name="person-circle-outline"></ion-icon></span>
              </label>
              <input 
                type="file" 
                id="fileInput" 
                style={{display:"none"}}
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="settingSubmit" type="submit">Update</button>
            {success && <span style={{color: "green", marginTop: "22px", textAlign: "center"}}>Profile updated successfully...!</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
