import { useEffect, useRef, useState } from "react";
import {createSocketConnection} from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditorRoom = () => {

    const [editorText,setEditorText] = useState("");
    const socketRef = useRef(null);
    const {roomId}= useParams();
    const user = useSelector((state)=> state.user);
    const [users,setUsers] = useState([]);
    
useEffect(()=>{
    const socket = createSocketConnection();
    socketRef.current = socket;
    
    socket.emit("joinEditor",{roomId,userName : user.firstName+" "+user.lastName,userId : user._id});

    socket.on("syncContent",({text})=>{
        setEditorText(text);
    })

    socket.on("roomUsers",({users})=>{
        setUsers(users);
    });
    
    socket.on("updateEditorContent",({text})=>{
        setEditorText(text);
    })

    return ()=>{
        socket.disconnect();
        socket.off("syncContent");
        socket.off("roomUsers");
        socket.off("updateEditorContent");
    }
},[roomId]); 

const handleChange =(e)=>{
    const updatedText = e.target.value;
    setEditorText(updatedText);
    if(socketRef.current){
        socketRef.current.emit("updateEditorContent",{roomId,text : updatedText});
    }
}

  return (
    <div className="w-full h-screen flex flex-row">

        <div className='w-[30%] bg-[#1e293b] flex flex-col p-5'>
            <div className="text-white text-3xl font-bold mb-4">Users <span className="text-blue-500">Online</span></div>
            <div className="flex flex-col gap-4 mt-4">
            {
                users && users.map((user,index)=>(
                    <> <div key= {index} className="text-white text-xl flex items-center gap-2 bg-blue-500 hover:bg-blue-700 rounded p-2 px-4">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                        <p className="font-bold">{user.name}</p>
                     </div>
                     </>
                 ))
            }
            
            </div>
        </div>

        <div className='w-[70%]  bg-gray-800  overflow-hidden'>
            <div className="bg-gray-900 text-white flex justify-between p-5 ">
                <h1 className="text-2xl font-bold">Collaborative Editor </h1>
                <p className="text-gray-400">Room Id : {roomId}</p>
            </div>
            <textarea onChange={(e)=>handleChange(e)} value={editorText}
            className="w-full h-full p-6 text-lg font-mono text-green-500 font-semibold bg-black resize-none outline-none"
            placeholder="Start typing here..."
            />
        </div>
    </div>
  )
}

export default  EditorRoom;
