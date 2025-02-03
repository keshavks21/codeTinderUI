import { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("keshav@gmail.com");
  const [password, setPassword] = useState("Keshav@2123");
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

  return (
    <div className='flex justify-center mt-14'>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title flex justify-center mb-5">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Email ID</span>
              </div>
              <input type="text" placeholder=""
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>

            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text font-bold mb-2">Password </span>
              </div>
              <input type="text" placeholder=""
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-2" />
            </label>
          </div>
          <p className='text-red-600  mb-2'>{error}</p>
          <div className="card-actions justify-center">
            <button onClick={handleLogin}
            className="btn btn-primary ">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
