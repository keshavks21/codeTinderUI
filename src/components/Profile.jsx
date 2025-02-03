import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import UserCard from "./UserCard"

const Profile = () => {
  
  const user = useSelector((state)=>state.user);
 
  return (
    user&& (
    <div className="flex justify-center">
      <EditProfile user = {user}/>
      <UserCard user ={user}/>
    </div>
    )
    
  )
}

export default Profile
