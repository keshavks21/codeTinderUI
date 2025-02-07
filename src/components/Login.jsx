import { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

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
      setError(err.response.data);
    }
  }

  const handleSignUp = async ()=>{
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
      
    }
  }

  return (
    <div className='flex justify-center mt-14'>
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
            </label>
          </div>
          <p className='text-red-600  mb-2'>{error}</p>
          <div className="card-actions justify-center">
            <button onClick={loginStatus ? handleLogin : handleSignUp}
            className="btn btn-primary ">{loginStatus ? "Login" : "SignUp"}</button>
          </div>
            <p className='cursor-pointer mt-2 text-indigo-700' onClick={()=>setLoginStatus(!loginStatus)}>{loginStatus ?"Click here to SignUp !":"Click here to Login !"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
