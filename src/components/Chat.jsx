import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios"

const Chat = () => {

  const {targetUserId} = useParams();
  const [messages,setMessages] = useState([]);
  const [newMessage,setNewMessage] = useState("");
  const [targetUser,setTargetUser] = useState("");
  const user = useSelector((store)=>store.user);
  const userId = user?._id;
  const messageRef = useRef(null);

  const fetchTargetUserInfo = async()=>{
    const data = await axios.get(BASE_URL+"/user/connection/"+targetUserId,
      {withCredentials:true});

    setTargetUser(data?.data?.data);
  }

  const fecthChatMessages = async()=>{
    const chat  = await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})
   
    const chatMessages = chat?.data?.messages?.map((msg)=>{
      const {senderId,text} =msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text
    }
      })
 
      setMessages(chatMessages);
  }

  useEffect(()=>{
    fetchTargetUserInfo();
    fecthChatMessages();
  },[])

  useEffect(()=>{
    if(!user){
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat",{firstName : user?.firstName,lastName : user?.lastName,userId,targetUserId})

    socket.on("messageReceived",({firstName,lastName,text})=>{
        console.log(firstName+ " " +lastName+" : " + text);
        setMessages((messages)=>[...messages,{firstName,lastName,text}]);
        setNewMessage("");
    })

    return ()=>{
      socket.disconnect();
    }
  },[userId,targetUserId])

  useEffect(()=>{
    messageRef.current?.scrollIntoView();
  },[messages])

  const sendMessage = ()=>{
    if(newMessage.length==0)return;
    const socket = createSocketConnection();
    socket.emit("sendMessage",
      { firstName:user?.firstName, 
        lastName : user?.lastName,
        userId,
        targetUserId,
        text : newMessage
      }
    )
  }

  return (
    <div className=" w-full md:w-1/3 m-auto h-[70vh] mt-10 bg-white border-2 rounded-md  ">
      <div className=" ">
        <div className="flex p-3 border-b-1">
        <div className="w-10 rounded-full mx-5">
          <img
            alt="Photo"
            src={targetUser?.photoUrl} />
        </div>
        <div className="">{targetUser?.firstName}</div>
        
        </div>
       
        <div  className=" p-5 h-[50vh] overflow-y-scroll scroll-m-14">
        {messages.map((msg,index)=>{
          return(
          <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
            <div className="chat-header">
              {targetUser?.firstName=== msg.firstName?( msg.firstName + " "+ msg.lastName ): "You"}
              <time className="text-xs opacity-50">1 min ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
          )
        })}
        <div ref={messageRef}/>
        </div>
        <div className=" px-2 my-2 py-5 md:py-2 md: flex bg-base-300">
            <div className="w-[90%] "><input type="text"
            value={newMessage}
            onChange={(e)=>{setNewMessage(e.target.value)}}
            className=" bg-white w-full rounded-2xl p-2"/></div>
            <div 
            onClick={sendMessage}
            className=" px-5 ml-2 bg-emerald-500 rounded-2xl p-2 cursor-pointer">send</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
