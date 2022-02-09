function ChannelList({ chats, dispatch, joinChat, user, setCreate }) {
  return (
    <>
      <div className="servers">
        <div style={{ color: "#c396e4", fontSize: "40px" }}>
          Available Channels
        </div>

        <hr style={{ width: "50%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "50%",
          }}
        >
          {chats?.length ? (
            chats?.map((chat, id) => {
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {chat.profilePic ? (
                      <img
                        alt="chat-icon"
                        className="chat-icon"
                        src={chat.profilePic}
                      />
                    ) : (
                      <div className="chat-icon">{chat.name[0]}</div>
                    )}

                    <div style={{ color: "white" }}> {chat.name}</div>
                  </div>
                  <div
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => dispatch(joinChat(chat._id, user._id))}
                  >
                    Join Room
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontSize: "32px",
                paddingTop: "50px",
              }}
            >
              There are currently no available channels
            </div>
          )}
        </div>
      </div>
      <div className="create-room" onClick={() => setCreate(true)}>
        Create Channel
      </div>
    </>
  );
}

export default ChannelList;
