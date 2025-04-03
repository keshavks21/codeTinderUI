import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [userVerified, setUserVerified] = useState(false);
    const [resetPass , setResetPass] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [emailId, setEmailId]  = useState("");
    const [OTP, setOTP]  = useState("");

    const navigate = useNavigate();

    const handleUserVerifyAndOtp =async ()=>{
       try{
        const res = await axios.post(BASE_URL+"/validate/user/generate-otp",
            {emailId},
            {withCredentials:true})
            setUserVerified(true);
       }catch(err){
        setError(err.response.data);
        console.log(err)
       }
        
    }

    const handleReset = async ()=>{
        try{
            const res = await axios.post(BASE_URL+"/verify/otp",
                {emailId,otp:OTP},
                {withCredentials:true});
                setResetPass(true);
           }catch(err){
            setError(err.response.data);
            console.log(err)
           }
    }

    const handleSavePassword= async ()=>{
        try{
        const res = axios.post(BASE_URL+"/password/reset", {emailId,newPassword},
            {withCredentials:true})
            navigate("/login")
        }catch(err){
          setError(err.response.data);
            console.log(err)
        } 
    }

  return (
    <div className="flex justify-center mt-14">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Reset Password</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold mb-2">Enter Email ID </span>
            </div>
            <input
              type="email"
              placeholder=""
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5"
            />
          </label>

          {userVerified && !resetPass && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold mb-2">One Time Password(sent to your emailId) </span>
            </div>
            <input
              type="email"
              placeholder="Enter OTP"
              value={OTP}
              onChange={(e)=>setOTP(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5"
            />
          </label>}
          {resetPass && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold mb-2">Enter new password  </span>
            </div>
            <input
              type="email"
              placeholder=""
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5"
            />
          </label>}

          <p className='text-red-600  mb-2'>{error}</p>
          <div className="card-actions">
            <button 
            onClick={userVerified?  (resetPass? handleSavePassword : handleReset ) : handleUserVerifyAndOtp}
            className="btn btn-primary">{userVerified ? (resetPass? "Save Password" : "Reset Password" ): "Send OTP"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
