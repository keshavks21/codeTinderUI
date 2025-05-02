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

    // const [suppressEmit, setSuppressEmit] = useState(false);
    const suppressEmit = useRef(false);
    const [key, setKey] = useState("");
    const [roomId, setRoomId] = useState("");
    const editorRef = useRef(null);
    const [room,setRoom] = useState(false);

    const handleRoom = ()=>{
        if(key && key.length >0){
            console.log("room");
            
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
    <div className="w-full h-full p-4 bg-gray-900 rounded-lg shadow-lg">
    {!room && (
      <div className="bg-base-200 border border-base-300 rounded-xl w-80 h-72 p-4 flex flex-col justify-center gap-4">
        <div className="text-center text-lg font-semibold">Create Room</div>
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
          Create
        </button>
      </div>
    )}
  
    {room && (
      <div
        ref={editorRef}
        className="w-full h-[calc(100vh-6rem)] bg-gray-800 rounded-xl overflow-hidden"
      />
    )}
  </div>
  )
}

export default Editor;
