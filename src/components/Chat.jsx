import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

function Chat() {
  const toUserId = useParams();
  const [messages, setMessages] = useState(["Hello World"]);
  const [newMessage, setNewMessage] = useState("");
  console.log("senderID", toUserId);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socket = createSocketConnection();
  useEffect(() => {
    socket.emit("joinchat", { firstName: user?.firstName, userId, toUserId });
    // whenever component unmount we have to disconnct the socket connection
    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      toUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full mx-auto h-[75vh] border border-gray-300 flex flex-col p-5">
      <h1 className="border-b border-gray-300 py-5 text-xl">Chat</h1>
      <div className="flex-1">
        {messages?.map((msg) => {
          return (
            <>
              <div className="chat chat-start">
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
              <div className="chat chat-start">
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">2 hour ago</time>
                </div>
                <div className="chat-bubble">I loved you.</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-400 rounded-md py-1 flex-1 "
        />
        <button
          onClick={sendMessage}
          className="btn btn-sm bg-black text-white border-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
