import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  // const username = userRef.current.value;
  // const password = passwordRef.current.value;

  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE"});
    }
  };


  const hanadleLogout = ()=>{
    
  };

  console.log(user);

  return (
    <div className="login">
        <span className="LoginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="loginInput" 
          type="text" 
          placeholder="Enter your email..." 
          ref={userRef}
        />
        <label>Password</label>
        <input 
          className="loginInput" 
          type="password" 
          placeholder="Enter your password..." 
          ref={passwordRef}
        />
        <button type="submit"  className="loginButton">
          <Link className='link' to="/login" onClick={hanadleLogout}>Login</Link>
        </button>
      </form>
      <button className="loginRegisterButton" disabled={isFetching}>
        <Link className='link' to="/register">Register</Link>
      </button>
    </div>
  )
}
