import axios from "axios"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const ConnectionProfile = () => {
    const {withUserId} = useParams();
    const [user, setUser] = useState("");
    const data  = async()=>{
        const res = await axios(BASE_URL+`/user/connection/${withUserId}`,{withCredentials : true});   
        setUser(res.data); 
        console.log(user);               
    }
    useEffect(()=>{
        data();
    },)

  return (
    <div className="flex justify-center items-center">
        <div className="w-[60%]">
            <p>{user.firstName}</p>
        </div>
    </div>
  )
}

export default ConnectionProfile
