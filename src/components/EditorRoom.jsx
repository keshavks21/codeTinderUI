import { useEffect, useRef, useState } from "react";
import {createSocketConnection} from "../utils/socket";
const EditorRoom = ({roomId}) => {

    const [editorText,setEditorText] = useState("");
    const socketRef = useRef(null);
    
useEffect(()=>{
    const socket = createSocketConnection();
    socketRef.current = socket;
    
    socket.emit("joinEditor",{roomId});

    socket.on("syncContent",({content})=>{
        setEditorText(content);
    })

    socket.on("updateEditorContent",({content})=>{
        setEditorText(content);
    })
})

const handleChange =(e)=>{
    const updatedText = e.target.value;
    setEditorText(updatedText);
    if(socketRef.current){
        socketRef.current.emit("updateEditorContent",{roomId,text : updatedText});
    }
}

  return (
    <div className="w-full h-[80%]">
        <textarea type="text" onChange={(e)=>handleChange(e)} value={editorText}
         className="text-white w-full h-full" />
    </div>
  )
}

export default  EditorRoom;
