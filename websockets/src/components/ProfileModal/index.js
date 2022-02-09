import { useState } from "react";
import { Modal } from "../../context/Modal";

import { useDispatch } from "react-redux";
import Profile from "./Profile";
import cog from "../../cog.png";
import "./Profile.css";

function ProfileModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <img
        src={cog}
        alt="reciept"
        style={{
          width: "25px",
          cursor: "pointer",

          position: "absolute",
          right: "10px",
        }}
        onClick={() => setShowModal(true)}
      ></img>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <Profile setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
