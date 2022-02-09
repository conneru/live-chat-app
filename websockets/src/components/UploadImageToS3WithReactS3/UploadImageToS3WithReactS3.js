import React, { useState } from "react";

const UploadImageToS3WithReactS3 = ({ user }) => {
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
    console.log(imageUrl);
  };

  return (
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
  );
};

export default UploadImageToS3WithReactS3;
