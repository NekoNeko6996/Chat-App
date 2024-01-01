import React from "react";

// css
import "../css/chatZone.css";


//
interface ChatZoneProps {}

//
const ChatZone: React.FC<ChatZoneProps> = () => {
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
          <svg
            className="hw-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <svg
            className="hw-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            ></path>
          </svg>
          <svg
            className="hw-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
        </div>
      </nav>
      <section className="chat-zone-show-message"></section>
      <footer className="chat-zone-input"></footer>
    </div>
  );
};

export default ChatZone;
