import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

// default
import { defaultAvatar } from "../defaults/default.tsx";

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
import { socketURL } from "../axios/axios";

// type
type ChatZoneProps = {
  data?: undefined;
  chatKey?: string;
  title: string;
  friendId: string;
  friendInfo: {
    lname: string;
    fname: string;
    avatar: string;
  };
  myAvatar: string;
  roomMessageData: [
    {
      message: string;
      senderId: string;
      dateSend: {
        hour: number;
        minutes: number;
        second: number;
        day: number;
        month: number;
        year: number;
      };
    }
  ];
  refresh: true | false;
};

//
const ChatZone: React.FC<ChatZoneProps> = ({
  chatKey,
  title,
  roomMessageData,
  refresh,
  friendInfo,
  myAvatar,
}) => {
  const [messageString, setMessageString] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollF = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        const { scrollHeight, clientHeight } = bottomRef.current;
        bottomRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }, 50);
  };

  const sendMessage = () => {
    if(!messageString) return;
    const socket = io(`${socketURL}`);
    socket.emit("privateMessage", {
      senderId: window.sessionStorage.getItem("token"),
      roomId: chatKey,
      message: messageString,
      dateSend: {
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
        second: new Date().getSeconds(),
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    });
    setMessageString("");
  };

  useEffect(() => {
    if (roomMessageData?.length) {
      scrollF();
    }
  }, [roomMessageData, refresh]);

  //
  return (
    <div className="chat-zone-container flex-column">
      <>
        <nav className="chat-zone-nav flex-row-space-between">
          <div className="user-box flex-row-center">
            <img
              src={friendInfo?.avatar || defaultAvatar}
              alt="img"
            />
            <span className="flex-column">
              <p className="name">{title}</p>
              <p className="status">Online</p>
            </span>
          </div>
          <div className="option-box flex-row-center ">
            <Search className="hw-30" />
            <Call className="hw-30" />
            <More className="hw-30" />
          </div>
        </nav>
        <section className="chat-zone-show-message" ref={bottomRef}>
          {roomMessageData
            ? roomMessageData.map(({ message, senderId, dateSend }, index) => {
                const owner =
                  senderId === window.sessionStorage.getItem("token");
                return (
                  <UserMessageBox
                    message={message}
                    userAvatar={
                      owner ? myAvatar : friendInfo.avatar || defaultAvatar
                    }
                    owner={owner}
                    key={index}
                    time={dateSend}
                  />
                );
              })
            : null}
        </section>
        <footer className="chat-zone-input">
          <form action="" className="chat-zone-form">
            <input
              type="text"
              className="chat-zone-input-text"
              id="message-input"
              placeholder="Type your message here..."
              value={messageString}
              onInput={(event) => {
                setMessageString(event.currentTarget.value);
              }}
            />
            <input
              type="submit"
              value=""
              onClick={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="message-submit"
            />
          </form>
          <Add className="hw-25" />
          <div
            className="send-btn flex-center"
            onClick={() => {
              sendMessage();
            }}
          >
            <ToRightArrow className="hw-30 white" />
          </div>
        </footer>
      </>
    </div>
  );
};

export default ChatZone;
