import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import { useState } from "react";

const Profile = () => {
  
  const user = useSelector((store)=>store.user);
  
  const [profileStatus, setProfileStatus] = useState(true);
 
  return (
    user && (
    <div className="flex justify-center">
      <EditProfile user = {user} profileStatus={profileStatus}/>
    </div>
    )
    
  )
}

export default Profile
