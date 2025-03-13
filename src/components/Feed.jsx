import UserCard from "./UserCard"
import {useEffect} from "react";
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

    const userFeed = useSelector((store)=>store.feed);
    const dispatch = useDispatch();  
    
    const getFeed =async ()=>{
        if (userFeed) return;
        
    try{
      const res = await axios.get(BASE_URL+"/feed", {withCredentials:true});
      
      dispatch(addFeed(res?.data?.data));
      
    }catch(err){
      console.log(err);
    }
    }
    
    useEffect(() => {
      getFeed()
    }, [])

    if (!userFeed) return;
    if(userFeed.length ==0)return <h1 className="text-center text-2xl font-semibold mt-10">No new user found</h1>

  return ( 
    
    userFeed && (
      
      <div >
        
        {<UserCard user={userFeed[0]}/>}
          
      </div>
    )   
    
  )
}

export default Feed
