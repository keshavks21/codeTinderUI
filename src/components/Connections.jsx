import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConncection } from '../utils/connectionSlice';
import { useEffect } from 'react';
import {Link} from "react-router-dom"

const Connection = () => {

    const dispatch = useDispatch();
    const connectionData = useSelector((store)=>store.connections);
    
    const getConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connection",{withCredentials : true});
            
            dispatch(addConncection(res?.data?.data));
            
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getConnections()
    },[])

    if(!connectionData)return ;
    if(connectionData.length===0)return <h1 className="text-center text-2xl font-semibold mt-10">No connection found</h1>;;

  return (
   connectionData && (
   <div className='text-center m-2'>
        <h1 className="  font-bold text-3xl my-4">Connections</h1>
        {
            connectionData.map((data )=>{
                const {_id,firstName, lastName, photoUrl, gender, age } = data;
                return (
                    <div key={_id} className=' md:w-1/2 h-24 flex items-center bg-base-300 mx-auto justify-between my-4'>
                        <div><img src= {photoUrl} className='w-20 h-20 rounded-full mx-10' alt="UserPhoto"  /></div>
                        <div className='ml-5 text-left'>
                            <p className='font-bold text-slate-700 text-xl'>{firstName + " "+ lastName}</p>
                            {(age && gender) ?<p>{age +" "+ gender} </p>: ""}
                        </div>
                        <Link to={"/chat/" + _id}><button className='bg-indigo-700 m-2 p-2 rounded-md text-white mx-10'>Chat</button></Link>
                    </div>
                )
                
            })
       
        }
    </div>)
  )
}

export default Connection;
