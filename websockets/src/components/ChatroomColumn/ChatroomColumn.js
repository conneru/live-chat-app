import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAllChats } from "../../store/chats";
import { logOut } from "../../store/session";

function ChatroomColumn({
  home,
  dispatch,
  chatrooms,
  chatSwitch,
  setCurrentChat,
  user,
}) {
  const navigate = useNavigate();

  return (
    <div className="chatroom-column">
      <div className="home-contain">
        <img
          src={home}
          alt="home"
          className="home-icon"
          onClick={() => {
            setCurrentChat("");
            dispatch(getAllChats(user._id));
          }}
        />
      </div>
      <hr style={{ width: "100px" }} />
      {chatrooms
        ? chatrooms.map((chatroom, id) => {
            return chatroom.profilePic ? (
              <img
                alt="chat-icon"
                src={chatroom.profilePic}
                className="chat-icon"
                onClick={() => {
                  chatSwitch(chatroom);
                }}
              />
            ) : (
              <div
                className="chat-icon"
                onClick={() => {
                  chatSwitch(chatroom);
                }}
                key={id}
              >
                {chatroom.name[0]}
              </div>
            );
          })
        : null}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          backgroundColor: "#c396e4",
          padding: "10px",
          borderRadius: "10px",
        }}
        onClick={() => {
          fetch("/logout");
          dispatch(logOut());
          navigate("/");
        }}
      >
        Log Out
      </div>
    </div>
  );
}

export default ChatroomColumn;
