import  { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom';


const EditProfile = ({user,profileStatus}) => {
const dispatch = useDispatch();
const {firstName,lastName, emailId} = user;
const [gender, setGender] = useState(user?.gender|| "");
const [age, setAge] = useState(user?.age || "");
const [about, setAbout] = useState(user?.about || "");
const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
const [skills, setSkills] = useState(user?.skills || "");
const [error , setError] = useState("");
const [saveInfo, setSaveInfo] = useState(false);
const navigate = useNavigate();

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
    setSaveInfo(true);
    setTimeout(() => {
      setSaveInfo(false);
      navigate("/");
    }, 3000);

}catch(err){
   setError(err.response.data);   
}
}

  return (
    <div className='mt-5'>
      
    {saveInfo && <div role="alert" className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current " fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className='text-xl text-white'>Profile saved successfully </span>
        <h1 > Redirecting to Home Page</h1>
    </div>}

      <h2 className="card-title text-2xl flex justify-center  font-semibold">Your Profile</h2>
      <div className=' md:flex justify-center'>
        <div>
          <UserCard user ={{firstName, lastName, age, gender, about, skills, photoUrl}} profileStatus={profileStatus}/>
        </div>
      <div className="card bg-base-100 w-96 shadow-xl mt-2 ">
        <h1 className='text-2xl flex justify-center font-semibold p-2'>Edit Details</h1>
        <div className="card-body">
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
