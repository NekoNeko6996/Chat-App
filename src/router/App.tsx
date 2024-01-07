import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { instance } from "../axios/axios.ts";

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
};

//
function App() {
  const [friendList, setFriendList] = useState<friendListObj[]>([]);
  const [contactCard, setContactCard] = useState<ReactNode>();
  const [userProfileData, setUserProfileData] = useState<userProfileData>();

  const [chatRoomIndex, setChatRoomIndex] = useState(0);
  const path = useLocation().pathname;

  // onload
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) window.location.href = "/login";

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
            const htmlContactCardElement = dataResp.chatInfo.map(
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
                />
              )
            );
            setContactCard(htmlContactCardElement);
            setFriendList(dataResp.chatInfo);
          }
        }
      });
  }, []);


  
  useEffect(() => {
    instance
      .post("/getProfile", {
        token: window.sessionStorage.getItem("token"),
        date: new Date(),
      })
      .then((resp) => {
        if (resp.data.status) {
          const { fname, lname, email, phone } = resp.data;
          setUserProfileData({ fname, lname, email, phone });
        }
      });
  }, []);




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
          <LeftNavShowBox contactCard={contactCard} userData={userProfileData}/>
        </div>
      </aside>
      <section className="app-section">
        {path === "/chat" && (
          <ChatZone
            chatKey={friendList[chatRoomIndex]?.chatId}
            title={friendList[chatRoomIndex]?.title}
            friendId={friendList[chatRoomIndex]?.friendId}
          />
        )}
        {path === "/profile" && <UserProfile data={userProfileData}/>}
      </section>
      <aside className="app-right-aside"></aside>
    </div>
  );
}

export default App;
