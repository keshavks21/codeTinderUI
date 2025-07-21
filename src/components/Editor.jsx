import {useState} from 'react';
import EditorRoom from './EditorRoom';

const Editor = () => {

    const [key, setKey] = useState("");
    const [roomId, setRoomId] = useState("");
    const [room,setRoom] = useState(false);
    const [createKeyPage, setCreateKeyPage] = useState(true);



    const handleRoom = ()=>{
        if(key && key.length >0){            
            setRoomId(key);
            setRoom(true);
        }
    }

  return (
    <div className="w-screen h-screen p-4 bg-gray-800 shadow-lg flex justify-center ">
    {!room && (
      <div className="bg-base-200 border border-base-300 rounded-xl w-80 h-72 p-4 flex flex-col justify-center gap-4 ">
        <div className="text-center text-lg font-semibold">{createKeyPage? "Create Room" : "Join Room"}</div>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          onClick={handleRoom}
        >
          {createKeyPage? "Create" : " Join"}
        </button>

        <div><button className='text-blue-800 cursor-pointer'
          onClick={()=>setCreateKeyPage(!createKeyPage)}
        >
          {createKeyPage? "I have a key" : " Create Room Key"}</button></div>
      </div>
    )}
  
    {room && (
      <>
      <div className='w-[30%] bg-blue-900 mx-4'>
        <h1 className='text-white text-2xl'>Users</h1>
      </div>

      <div className='w-[70%]  bg-gray-800  overflow-hidden'>
        <EditorRoom roomId={roomId}/>
      </div>
      </>
    )}
    </div>
  )
}

export default Editor;
