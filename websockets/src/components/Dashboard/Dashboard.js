import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  deleteChat,
  getAllChats,
  getChats,
  joinChat,
  createChat,
} from "../../store/chats";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import trash from "../../trash.png";
import home from "../../home.png";

import { io } from "socket.io-client";
import { getMessages, addMessage, deleteMessage } from "../../store/messages";
import ChatroomColumn from "../ChatroomColumn/ChatroomColumn";
import Chatroom from "../Chatroom/Chatroom";
import ChannelList from "../ChannelList/ChannelList";

const socket = io("http://localhost:4001");

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [currentChat, setCurrentChat] = useState("");
  const [channelName, setChannelName] = useState("");
  const [message, setMessage] = useState("");
  const [create, setCreate] = useState(false);

  const chatMessages = useSelector((state) => state.messageReducer.messages);
  const chatrooms = useSelector((state) => state.chatReducer.chats);
  const allChats = useSelector((state) => state.chatReducer.allChats);

  useEffect(() => {
    if (user !== null) {
      dispatch(getChats(user._id));
      dispatch(getAllChats(user._id));
    } else {
      navigate("/login");
    }

    socket.on("add", (msg, roomId) => {
      dispatch(getMessages(roomId));
    });

    socket.on("update", () => {
      dispatch(getChats(user._id));
      setCurrentChat("");
    });

    return () => {
      socket.off("add");
      socket.off("update");
    };
  }, [user, navigate, dispatch, currentChat]);

  async function sendMsg(e) {
    e.preventDefault();
    dispatch(
      addMessage(message, user._id, currentChat._id, user.username)
    ).then(() => {
      socket.emit("message", message, currentChat._id);
    });

    setMessage("");
  }

  async function delMsg(msgId) {
    dispatch(deleteMessage(msgId)).then(() => {
      socket.emit("message", msgId, currentChat._id);
    });
  }

  function chatSwitch(chatroom) {
    setCurrentChat(chatroom);
    dispatch(getMessages(chatroom._id));

    socket.emit("joinRoom", chatroom._id);
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ChatroomColumn
        home={home}
        chatSwitch={chatSwitch}
        dispatch={dispatch}
        chatrooms={chatrooms}
        setCurrentChat={setCurrentChat}
        user={user}
      />
      {currentChat ? (
        <Chatroom
          currentChat={currentChat}
          dispatch={dispatch}
          deleteChat={deleteChat}
          navigate={navigate}
          user={user}
          chatMessages={chatMessages}
          delMsg={delMsg}
          trash={trash}
          message={message}
          setMessage={setMessage}
          sendMsg={sendMsg}
          setCurrentChat={setCurrentChat}
          socket={socket}
        />
      ) : !create ? (
        <ChannelList
          chats={allChats}
          dispatch={dispatch}
          user={user}
          setCreate={setCreate}
          joinChat={joinChat}
        />
      ) : (
        <div
          style={{
            display: "flex",
            backgroundColor: "#4a4a4d",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ color: "#c396e4", fontSize: "40px" }}>
              Channel Name
            </div>
            <input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="chat-input"
            ></input>
            <div style={{ display: "flex", paddingTop: "20px" }}>
              <div
                className="create-channel"
                onClick={() => {
                  dispatch(createChat(channelName, user._id));
                  setCreate(false);
                  setChannelName("");
                }}
              >
                Create
              </div>
              <div onClick={() => setCreate(false)} className="cancel">
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
