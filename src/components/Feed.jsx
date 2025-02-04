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

    // if (!userFeedData) return;
    
  return ( 
    userFeed && (
      <div>
        
        {userFeed.map((userData,key)=><UserCard user={userData}/>)}
          
      </div>
    )   
    
  )
}

export default Feed
