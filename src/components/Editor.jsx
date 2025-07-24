import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Editor = () => {

    const [key, setKey] = useState("");
    const [createKeyPage, setCreateKeyPage] = useState(true);
    const [keyError, setKeyError] = useState("");
    const navigate = useNavigate();

    const handleRoom = async(action)=>{
      try{
        if(key && key.length >0){ 
          await axios(BASE_URL+"/editor/"+action+"/"+key, {withCredentials:true});
          navigate(`/editor/${key}`);
        }
      }catch(err){
        console.log(err);
        
        setKeyError(err.response.data.message || "Something went wrong");
        setTimeout(() => {
          setKeyError("");
        }, 3000);
        console.log(err);
      } 
    }

    const generateKey = ()=>{
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let res = '';
      for(let i=0; i<6; i++){
        res+=characters.charAt(Math.floor(Math.random()*characters.length));
      }
      setKey(res);
    }

  return (
    <div className="w-screen h-screen pt-10 bg-gray-900 shadow-lg flex justify-center ">
    
      <div className="bg-base-200 border border-base-300 rounded-xl w-80 h-72 p-4 flex flex-col justify-center gap-4 ">
        <div className="text-center text-lg font-semibold">{createKeyPage? "Create Room" : "Join Room"}</div>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        {createKeyPage && <p className='text-gray-500 text-sm' onClick={generateKey}>Generate key</p>}
        <p className='text-red-500 text-sm'>{keyError}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          onClick={()=>handleRoom(createKeyPage? "create" : "join")}
        >
          {createKeyPage? "Create" : " Join"}
        </button>

        <div><button className='text-blue-800 cursor-pointer'
          onClick={()=>setCreateKeyPage(!createKeyPage)}
        >
          {createKeyPage? "Join using key" : " Create Room Key"}</button></div>
      </div>
    
    </div>
  )
}

export default Editor;
