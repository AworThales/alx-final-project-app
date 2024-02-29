import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

const handleSubmit = async (e)=>{
  e.preventDefault();
  setError(false);
  try {
    const res = await axios.post("/auth/register",{
      username,
      email,
      password,
    });
    console.log(res);
    res.data && window.location.replace("/login");
  } catch (err) {
    setError(true);
  };
};

  return (
    <div className="register">
        <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={(e)=>setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter your username" />
        <label>Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} className="registerInput" type="email" placeholder="Enter your email..." />
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton"><Link className='link' to="/register">Register</Link></button>
      </form>
      <button type="submit" className="registerLoginButton"><Link className='link' to="/login">Login</Link></button>
      {error && 
        <span style={{color:"red", marginTop:"8px"}}>Something went wrong!</span>
      }
    </div>
  )
}
