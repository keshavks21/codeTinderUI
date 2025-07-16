import axios from "axios"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const ConnectionProfile = () => {
    const {withUserId} = useParams();
    const [user, setUser] = useState("");
    const data  = async()=>{
        const res = await axios(BASE_URL+`/user/connection/${withUserId}`,{withCredentials : true});   
        setUser(res?.data?.data); 
                      
    }
    useEffect(()=>{
        data();
    },[withUserId])
    
    console.log(user);
    
    if(!user )return <p className="text-center text-2xl">Loading...</p>

  return (
    <div className="flex justify-center items-center">
        <div className="w-[60%] bg-base-100 mt-10">
            <div className="flex flex-col justify-center items-center">
                <img src={user.photoUrl} alt="user Profile" className="rounded-full" />
                <div><p className="text-4xl">{user.firstName +" "+ user.lastName}</p></div>
            </div>
            <div>
            <p>{user.age}</p>
            <p>{user.gender}</p>
            <p>{user.about}</p>
            </div>
        </div>
    </div>
  )
}

export default ConnectionProfile
