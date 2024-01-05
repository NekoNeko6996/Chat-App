import React, { useEffect, useState, useRef } from "react";
import { instance } from "../axios/axios";
import io from "socket.io-client";

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
  chatKey: string;
  title: string;
  friendId: string;
};

//
const ChatZone: React.FC<ChatZoneProps> = ({ chatKey, title }) => {
  const [messageString, setMessageString] = useState("");
  const [messageDataArray, setMessageDataArray] = useState([
    {
      senderId: "",
      roomId: "",
      message: "",
      dateSend: "",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollF = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        const { scrollHeight, clientHeight } = bottomRef.current;
        bottomRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }, 50);
  };

  useEffect(() => {
    if (chatKey) {
      instance
        .post(
          "/messageLoader",
          { chatKey, date: new Date() },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          if (resp) {
            setMessageDataArray([...resp.data]);
            scrollF();
          }
        });
    }
  }, [chatKey]);

  useEffect(() => {
    // Kết nối đến server Socket.IO
    if (chatKey) {
      const socket = io("http://192.168.1.62:4000");

      // Gửi dữ liệu từ client đến server
      socket.emit("joinRoom", chatKey);

      socket.on("newMessage", (data) => {
        setMessageDataArray((prev) => [...prev, data]);
        scrollF();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [chatKey]);

  const sendMessage = () => {
    const socket = io("http://192.168.1.62:4000"); // Địa chỉ server của bạn
    socket.emit("privateMessage", {
      senderId: window.sessionStorage.getItem("token"),
      roomId: chatKey,
      message: messageString,
      dateSend: new Date(),
    });
    setMessageString("");
  };

  //
  return (
    <div className="chat-zone-container flex-column">
      {chatKey ? (
        <>
          <nav className="chat-zone-nav flex-row-space-between">
            <div className="user-box flex-row-center">
              <img
                src="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
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
            {messageDataArray
              ? messageDataArray.map((data, index) => (
                  <UserMessageBox
                    message={data.message}
                    userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
                    owner={
                      data.senderId === window.sessionStorage.getItem("token")
                    }
                    key={index}
                  />
                ))
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
                  sendMessage()
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
      ) : null}
    </div>
  );
};

export default ChatZone;
