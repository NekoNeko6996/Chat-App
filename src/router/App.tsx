import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { instance } from "../axios/axios.ts";
import { io } from "socket.io-client";

// components
import LeftNavShowBox from "../components/navAside.tsx";
import ContactCard from "../components/contactCard.tsx";
import ChatZone from "../components/chatZone.tsx";
import { Message, Call, Friends, User } from "../components/svgComponent.tsx";
import UserProfile from "../components/userProfile.tsx";

// css
import "../css/App.css";

// icons
import messageIcon from "../assets/icons/message.png";

//
import { socketURL } from "../axios/axios.ts";

// type
type friendListObj = {
  chatId: string;
  friendId: string;
  title: string;
  dateCreate: Date;
};
type userProfileData = {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  website: string;
};
type messageData = [
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

//
function App() {
  const [friendList, setFriendList] = useState<friendListObj[]>([]);
  const [contactCard, setContactCard] = useState<ReactNode>();
  const [userProfileData, setUserProfileData] = useState<userProfileData>();
  const [messageData, setMessageData] = useState<messageData[]>();
  const [refresh, setRefresh] = useState(true);

  const [chatRoomIndex, setChatRoomIndex] = useState(0);
  const path = useLocation().pathname;

  // onload
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    instance
      .post(
        "/onload",
        {
          token,
          date: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.status) {
          const dataResp = resp.data.dataUser;
          if (dataResp.chatInfo.length > 0) {
            setMessageData(resp.data.messageData);
            setFriendList(dataResp.chatInfo);
          }
        }
      });
    instance
      .post("/getProfile", {
        token: window.sessionStorage.getItem("token"),
        date: new Date(),
      })
      .then((resp) => {
        if (resp.data.status) {
          const { fname, lname, email, phone, address, birthDate, website } = resp.data;
          setUserProfileData({ fname, lname, email, phone, address, birthDate, website });
        }
      });
  }, []);

  useEffect(() => {
    const htmlContactCardElement = friendList.map(
      (data: friendListObj, index: number) => (
        <ContactCard
          name={data.title}
          messageUnreadAmount={10}
          time={{ hour: 12, minutes: 23 }}
          path="/"
          key={index}
          onclickCallback={() => {
            setChatRoomIndex(index);
          }}
          select={chatRoomIndex === index}
        />
      )
    );
    setContactCard(htmlContactCardElement);
  }, [friendList, chatRoomIndex]);

  useEffect(() => {
    // Kết nối đến server Socket.IO
    const token = window.sessionStorage.getItem("token");
    const socket = io(`${socketURL}`);

    // Gửi dữ liệu từ client đến server
    socket.emit("joinRoom", friendList);

    socket.on("newMessage", (data) => {
      // setMessageDataArray((prev) => [...(prev || []), data]);
      console.log(data);
      if (data) {
        const messageTemp = messageData;
        friendList.map(({ friendId }, index) => {
          if (
            (friendId === data.senderId || data.senderId === token) &&
            messageTemp
          ) {
            messageTemp[index].push(data);
          }
        });
        setMessageData(messageTemp);
        setRefresh((prev) => !prev);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendList]);

  return (
    <div className="app">
      <aside className="app-left-aside">
        <nav className="flex-column-center">
          <Link to={"/"} className="flex-center home-icon">
            <img src={messageIcon} alt="mess icon" className="message-icon" />
          </Link>
          <Link to={"/chat"} className="flex-center nav-icon">
            <Message className="hw-35" />
          </Link>
          <Link to={"/call"} className="flex-center nav-icon">
            <Call className="hw-35" />
          </Link>
          <Link to={"/friend"} className="flex-center nav-icon">
            <Friends className="hw-35" />
          </Link>
          <Link to={"/profile"} className="flex-center nav-icon">
            <User className="hw-35" />
          </Link>
        </nav>
        <div className="left-aside-section">
          <LeftNavShowBox
            contactCard={contactCard}
            profileData={userProfileData}
          />
        </div>
      </aside>
      <section className="app-section">
        {path === "/chat" && messageData && (
          <ChatZone
            chatKey={friendList[chatRoomIndex]?.chatId}
            roomMessageData={messageData[chatRoomIndex]}
            title={friendList[chatRoomIndex]?.title}
            friendId={friendList[chatRoomIndex]?.friendId}
            refresh={refresh}
          />
        )}
        {path === "/profile" && <UserProfile data={userProfileData} />}
      </section>
      <aside className="app-right-aside"></aside>
    </div>
  );
}

export default App;
