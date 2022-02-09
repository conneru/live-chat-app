import { useState } from "react";
import { Modal } from "../../context/Modal";

import { useDispatch } from "react-redux";
import Channel from "./Channel";
import cog from "../../cog.png";
import "./Profile.css";

function ChannelModal({ chat, setCurrentChat }) {
  const [showModal, setShowModal] = useState(false);

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
          <Channel
            setShowModal={setShowModal}
            chat={chat}
            setCurrentChat={setCurrentChat}
          />
        </Modal>
      )}
    </>
  );
}

export default ChannelModal;
