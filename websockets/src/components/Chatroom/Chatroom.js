import ProfileModal from "../ProfileModal";
import ChannelModal from "../ChannelModal";

function Chatroom({
  currentChat,
  dispatch,
  deleteChat,
  navigate,
  user,
  chatMessages,
  delMsg,
  trash,
  message,
  setMessage,
  sendMsg,
  setCurrentChat,
  socket,
}) {
  return (
    <>
      <div className="users-column">
        <div className="server-name">
          {currentChat.name}
          <ChannelModal chat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#c396e4" }}>Members</h3>

          <div
            style={{
              border: "1px solid #c396e4",
              padding: "20px",
              borderRadius: "10px",
              color: "#c396e4",
            }}
          >
            {currentChat
              ? currentChat.users.map((user, id) => {
                  return <div key={id}>{user}</div>;
                })
              : null}
          </div>
        </div>
        {currentChat.admin === user._id ? (
          <div
            style={{
              backgroundColor: "red",
              height: "40px",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              cursor: "pointer",
              position: "absolute",
              bottom: "70px",
            }}
            onClick={() => {
              dispatch(deleteChat(currentChat._id));
              setCurrentChat("");
              socket.emit("delete", currentChat._id);
            }}
          >
            DELETE CHATROOM
          </div>
        ) : null}
        <div className="user-info">
          <div>
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                {user.profilePic ? (
                  <img
                    alt="profilepic"
                    src={user.profilePic}
                    className="user-icon"
                  />
                ) : (
                  <div
                    className="user-icon"
                    style={{ marginRight: "20px", color: "black" }}
                  >
                    {user.username[0]}
                  </div>
                )}
                <div>{user.username}</div>
                <ProfileModal />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="messages">
        {chatMessages ? (
          <div className="actual-msg">
            {chatMessages.map((message, id) => {
              return (
                <div key={id} className="message-container">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      inlineSize: "60%",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {message.profilePic ? (
                        <img
                          alt="profilepic"
                          src={message.profilePic}
                          className="user-icon"
                        />
                      ) : (
                        <div
                          className="user-icon"
                          style={{ marginRight: "20px", color: "black" }}
                        >
                          {message.username[0]}
                        </div>
                      )}
                      <div style={{ color: "#c396e4" }}>{message.username}</div>
                    </div>
                    <div style={{ marginLeft: "50px" }}>{message.content}</div>
                  </div>
                  {user._id === message.userId ? (
                    <div
                      style={{
                        marginLeft: "30%",
                        fontSize: "20px",
                        color: "pink",
                      }}
                    >
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => delMsg(message._id)}
                        src={trash}
                        alt="delete"
                        className="trashcan"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        <form style={{ margin: "20px" }} onSubmit={(e) => sendMsg(e)}>
          <input
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </form>
      </div>
    </>
  );
}

export default Chatroom;
