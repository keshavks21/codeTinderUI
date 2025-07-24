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
    
    if(!user )return <div className="h-screen"><p className="text-center text-2xl">Loading...</p></div>

  return (
    <div className="flex justify-center items-center w-full h-screen">
        <div className="md:w-[40%] -mt-40 bg-base-100 flex flex-row rounded-sm">
            <div className="w-[50%] p-5">
                <div className="flex flex-col ">
                    <img src={user.photoUrl} alt="user Profile" className="rounded-full w-[40%]" />
                    <div className=""><p className="text-4xl">{user.firstName +" "+ user.lastName}</p></div>
                    <div className="flex flex-row my-3" >
                        <div className="flex justify-between">
                            <p>{user.gender.charAt(0).toUpperCase()+user.gender.slice(1)}</p>
                            <p>{user.age}</p>
                        </div>    
                    </div>
                </div>
                <div className=" text-2xl mt-4">
                    <div className="flex flex-row">
                    <p>{user.about}</p>
                    </div>
                </div>
            </div>
            <div className="w-[50%]">
                {/* <h1>Linkedin</h1> */}
            </div>
           
        </div>
    </div>
  )
}

export default ConnectionProfile
