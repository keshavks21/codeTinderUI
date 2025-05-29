import React, { useEffect, useState,useRef } from 'react';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {createSocketConnection} from "../utils/socket";

self.MonacoEnvironment = {
    getWorker: function (_moduleId, label) {
      if (label === 'json') {
        return new Worker(
          new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url),
          { type: 'module' }
        );
      }
      if (['css', 'scss', 'less'].includes(label)) {
        return new Worker(
          new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url),
          { type: 'module' }
        );
      }
      if (['html', 'handlebars', 'razor'].includes(label)) {
        return new Worker(
          new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url),
          { type: 'module' }
        );
      }
      if (['typescript', 'javascript'].includes(label)) {
        return new Worker(
          new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url),
          { type: 'module' }
        );
      }
      return new Worker(
        new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
        { type: 'module' }
      );
    }
  };
  

const Editor = () => {

    const socket = createSocketConnection();

    const suppressEmit = useRef(false);
    const [key, setKey] = useState("");
    const [roomId, setRoomId] = useState("");
    const editorRef = useRef(null);
    const [room,setRoom] = useState(false);

    const [createKeyPage, setCreateKeyPage] = useState(true);

    const handleRoom = ()=>{
        if(key && key.length >0){            
            setRoomId(key);
            setRoom(true);
        }
    }

useEffect(()=>{

if(!editorRef.current)return;

    const editor = monaco.editor.create(editorRef.current, {
        value: "Editor",
        language : "javascript",
        theme:"vs-dark",
        automaticLayout : true
    })
    
    socket.emit("joinEditorRoom",roomId);
    
    editor.onDidChangeModelContent(()=>{
        if(suppressEmit.current){
            suppressEmit.current = false;
            return;
        }
        const code = editor.getValue();
        socket.emit("codeChange", {roomId,code})
    })
    
    socket.on("codeChange", (code) => {
        const currentCode = editor.getValue();
        if (code !== currentCode) {
          // Avoid triggering onDidChangeModelContent
          suppressEmit.current = true;
          editor.getModel().pushEditOperations(
            [], // selections
            [{ range: editor.getModel().getFullModelRange(), text: code }],
            () => null // no selection change
          );
        }
      });
      
    
    return ()=>{
        socket.off("codeChange");
        editor.dispose();
    }
},[roomId,suppressEmit])




  return (
    <div className="w-screen h-screen p-4 bg-gray-900 rounded-lg shadow-lg flex justify-center">
    {!room && (
      <div className="bg-base-200 border border-base-300 rounded-xl w-80 h-72 p-4 flex flex-col justify-center gap-4">
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
        <div> 
        </div>

      </div>
      <div
        ref={editorRef}
        className="w-[70%] h-[calc(100vh-6rem)] bg-gray-800 rounded-xl overflow-hidden"
      />
      </>
    )}
    </div>
  )
}

export default Editor;
