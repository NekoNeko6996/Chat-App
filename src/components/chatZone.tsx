import React, { useState } from "react";

// css
import "../css/chatZone.css";

//
import {
  Search,
  Call,
  More,
  Add,
  ToRightArrow,
} from "../components/svgComponent";
import UserMessageBox from "./messageBox";

//
type ChatZoneProps = {
  data?: undefined;
};

//
const ChatZone: React.FC<ChatZoneProps> = () => {
  const [messageString, setMessageString] = useState("");

  const sendMessage = () => {
    console.log(messageString);
    fetch("http://localhost:5500/messageReceive", {
      method: "post",
      body: JSON.stringify({
        messageString,
        dateSend: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="chat-zone-container flex-column">
      <nav className="chat-zone-nav flex-row-space-between">
        <div className="user-box flex-row-center">
          <img
            src="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
            alt="img"
          />
          <span className="flex-column">
            <p className="name">Join</p>
            <p className="status">Online</p>
          </span>
        </div>
        <div className="option-box flex-row-center ">
          <Search className="hw-30" />
          <Call className="hw-30" />
          <More className="hw-30" />
        </div>
      </nav>
      <section className="chat-zone-show-message">
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={false}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={true}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={false}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={true}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={false}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={true}
        />
        <UserMessageBox
          message="hello"
          userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
          owner={true}
        />
      </section>
      <footer className="chat-zone-input">
        <input
          type="text"
          className="chat-zone-input-text"
          placeholder="Type your message here..."
          onInput={(event) => setMessageString(event.currentTarget.value)}
        />
        <Add className="hw-25" />
        <div className="send-btn flex-center" onClick={sendMessage}>
          <ToRightArrow className="hw-30 white" />
        </div>
      </footer>
    </div>
  );
};

export default ChatZone;
