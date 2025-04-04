import { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
 
const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin  =async ()=>{
    setError("")
    try{const res = await axios.post(BASE_URL+"/login",{
        emailId,
        password
      },
      {
        withCredentials:true  
      })

  dispatch(addUser(res.data));
  navigate("/");
  
  }catch(err){
    console.log(err)
      setError(err.response.data);
    }
  }

  const handleSignUp = async ()=>{
    setError("")
    try{
      
      const res = await axios.post(BASE_URL+"/signup",{
          firstName,
          lastName,
          emailId,
          password
      },
    {
      withCredentials: true
    })
    dispatch(addUser(res?.data?.data));
    navigate("/profile");

    }catch(err){
      console.log(err);
      setError(err.response.data);
    }
  }

  const handleSignIn_Up= ()=>{
    setLoginStatus(!loginStatus);
    setError("");
  }

  return (
    <>
    <Navbar/>
    <div className='flex justify-center mt-14 '>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title flex justify-center mb-5">{loginStatus ? "Login" : "SignUp"}</h2>
          <div>
            {!loginStatus && <><label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">First Name</span>
              </div>
              <input type="text" placeholder=""
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Last Name</span>
              </div>
              <input type="text" placeholder=""
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            </>}


            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Email ID</span>
              </div>
              <input type="email" placeholder=""
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>

            
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text font-bold mb-2">Password </span>
            </div>
            <input type="password" placeholder=""
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input input-bordered w-full max-w-xs mb-2" />
            {loginStatus ? "" : "Atleast one number, capital & small alphabet and special charcter(min 8char)" }
          </label>
            
          </div>
          <p className='text-red-600  mb-2'>{error}</p>
          <div className="card-actions justify-center">
            <button onClick={loginStatus ? handleLogin : handleSignUp}
            className="btn btn-primary ">{loginStatus ? "Login" :"Sign UP"}</button>
          </div>

          {loginStatus ?(
              <div className='cursor-pointer mt-2 text-indigo-700 flex justify-between' >
              <h2 onClick={handleSignIn_Up}>Click here to SignUp</h2>
              <Link to="/passreset" className='' >Forget password</Link>
              </div> ):
              (<div className='cursor-pointer mt-2 text-indigo-700 ' onClick={handleSignIn_Up}>Click here to Login !</div>)
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
