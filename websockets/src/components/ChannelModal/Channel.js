import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../store/chats";
import { updateUser } from "../../store/session";
import "./Profile.css";

const Channel = ({ setShowModal, chat, setCurrentChat }) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState(chat.name);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(chat.profilePic);
  const [changed, setChanged] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(objectUrl);
      setChanged(true);
    } else {
      setPreview(chat.profilePic);
      setChanged(false);
    }
  };

  const handleUpload = async (file) => {
    const { url } = await fetch("/s3Url").then((res) => res.json());
    console.log(url);
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageUrl = url.split("?")[0];
    console.log(imageUrl);
    return imageUrl;
  };

  async function submitChanges() {
    if (selectedFile !== null) {
      let profilePic = await handleUpload(selectedFile);
      let res = await dispatch(
        updateChat(chat._id, username, profilePic, user._id)
      );

      setCurrentChat(res);
    } else {
      let res = await dispatch(
        updateChat(chat._id, username, chat.profilePic, user._id)
      );
      setCurrentChat(res);
    }
  }

  return (
    <div className="profile-contain">
      <h1 style={{ fontFamily: "Uni-Heavy", color: "#c396e4" }}>
        Edit Channel
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ color: "#c396e4" }}>Channel Name</label>
        <input
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <label
        style={{ color: "#c396e4", paddingTop: "40px", paddingBottom: "10px" }}
      >
        Channel Icon
      </label>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {changed ? (
            <div
              className="cancel-upload"
              onClick={() => {
                setSelectedFile(null);
                setPreview(chat.profilePic);
                setChanged(false);
              }}
            >
              X
            </div>
          ) : null}
          {preview ? (
            <img
              alt="file"
              src={preview}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                // border: "1px solid white",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            >
              <div>{chat.name[0]}</div>
            </div>
          )}
          <label class="custom-file-upload">
            <input type="file" onChange={handleFileInput} />
            Upload
          </label>
          {/* <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button> */}
        </div>
      </div>
      <div
        className="submit-changes"
        onClick={() => {
          submitChanges();
          setShowModal(false);
        }}
      >
        Submit Changes
      </div>
    </div>
  );
};
export default Channel;
