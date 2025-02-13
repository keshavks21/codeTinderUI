import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";

const UserCard = ({user,profileStatus}) => {


  const {firstName,lastName,photoUrl,about,gender,age,_id} = user;
 
  const dispatch =useDispatch();

  const handleSendRequest= async (status,id)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+id,
        {},
        {withCredentials:true }
      );
      dispatch(removeFeedUser(id));

    }catch(err){
      console.log(err);
    }
  }



  return (
    <div className="mt-10 flex justify-center">
     <div className="card bg-base-100 w-96 shadow-xl ">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt="UserPhoto"
      className="rounded-xl" />
  </figure>
  <div className="card-body ">
    <div className="flex">
     <h2 className="card-title ">{firstName +" "+ lastName}</h2>
    <h2 className="card-title mx-5">{age}</h2>
    </div>
    <p>{about}</p> 
    {!profileStatus && <div className="card-actions">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn bg-rose-500 text-white" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
    </div>}
  </div>
</div>
    </div>
  )
}

export default UserCard
