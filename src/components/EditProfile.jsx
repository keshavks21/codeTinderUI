import React, { useState } from 'react';
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from "axios";

const EditProfile = ({user}) => {
const dispatch = useDispatch();
const {firstName,lastName, emailId} = user;
const [gender, setGender] = useState(user.gender);
const [age, setAge] = useState(user.age);
const [about, setAbout] = useState(user.about);
const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
const [skills, setSkills] = useState(user.skills);
const [error , setError] = useState("");

const handleSave = async ()=>{
    setError("");
try{
    const res = await axios.patch(BASE_URL+"/profile/edit",{
        gender,
        age,
        about,
        photoUrl,
        skills,
    },
    {withCredentials : true})

    dispatch(addUser(res?.data?.data));

}catch(err){
   setError(err.response.data);   
}
}

  return (
    <div>
      <div className='flex justify-center mt-14'>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title flex justify-center mb-5">Your Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">FirstName</span>
              </div>
              <input type="text" placeholder=""
              value={firstName}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">LastName</span>
              </div>
              <input type="text" placeholder=""
              value={lastName}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Email ID</span>
              </div>
              <input type="text" placeholder=""
              value={emailId}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Gender</span>
              </div>
              <input type="text" placeholder=""
              value={gender}
              onChange={(e)=>setGender(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Age</span>
              </div>
              <input type="text" placeholder=""
              value={age}
              onChange={(e)=>setAge(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold mb-2">Photo</span>
              </div>
              <input type="text" placeholder=""
              value={photoUrl}
              onChange={(e)=>setPhotoUrl(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-5" />
            </label>

            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text font-bold mb-2">About</span>
              </div>
              <input type="text" placeholder=""
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-2" />
            </label>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text font-bold mb-2">Skills</span>
              </div>
              <input type="text" placeholder=""
              value={skills}
              onChange={(e)=>setSkills(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-2" />
            </label>
          </div>
          <p className='text-red-600  mb-2'>{error}</p>
          <div className="card-actions justify-center">
            <button
            onClick={handleSave}
            className="btn btn-primary ">Save</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditProfile
