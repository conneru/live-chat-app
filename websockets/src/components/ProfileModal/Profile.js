import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/session";
import UploadImageToS3WithReactS3 from "../UploadImageToS3WithReactS3/UploadImageToS3WithReactS3";
import "./Profile.css";

const Profile = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState(user.username);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user.profilePic);
  const [changed, setChanged] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(objectUrl);
      setChanged(true);
    } else {
      setPreview(user.profilePic);
      setChanged(false);
    }
  };

  const handleUpload = async (file) => {
    const { url } = await fetch("/s3Url").then((res) => res.json());

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];

    return imageUrl;
  };

  async function submitChanges() {
    if (selectedFile !== null) {
      let profilePic = await handleUpload(selectedFile);
      dispatch(updateUser(user._id, username, profilePic));
    } else {
      dispatch(updateUser(user._id, username, user.profilePic));
    }
  }

  return (
    <div className="profile-contain">
      <h1 style={{ fontFamily: "Uni-Heavy", color: "#c396e4" }}>
        Edit Profile
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ color: "#c396e4" }}>Username</label>
        <input
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <label
        style={{ color: "#c396e4", paddingTop: "40px", paddingBottom: "10px" }}
      >
        Profile Picture
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
                setPreview(user.profilePic);
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
              <div>{user.username[0]}</div>
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
export default Profile;
