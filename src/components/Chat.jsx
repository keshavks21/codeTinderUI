const Chat = () => {
  return (
    <div className="w-1/2 m-auto h-[70vh] bg-800 border-2 rounded-3xl mt-10">
      <div className=" ">
        <div className="p-5 border-b-2">Chat</div>
        <div className=" p-5 h-[50vh]">
          <div className="chat chat-start">
            <div className="chat-header">
              Keshav
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-header">
              You
              <time className="text-xs opacity-50">2 hour ago</time>
            </div>
            <div className="chat-bubble">I loved you.</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>
        <div className=" p-5 border-t-2 flex ">
            <div className="w-[90%] "><input type="text" className=" bg-base-300 w-full rounded-2xl p-2"/></div>
            <div className=" px-5 ml-2 bg-emerald-500 rounded-2xl p-2">send</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
