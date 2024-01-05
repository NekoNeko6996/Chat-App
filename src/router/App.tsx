import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState, useRef } from "react";
import { instance } from "../axios/axios.ts";

// components
import ContactCard from "../components/contactCard.tsx";
import ChatZone from "../components/chatZone.tsx";
import {
  Bell,
  Message,
  Call,
  Friends,
  User,
  Search,
  More,
} from "../components/svgComponent.tsx";

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

//
function App() {
  const [contactCard, setContactCard] = useState<ReactNode>();
  const [friendList, setFriendList] = useState<friendListObj[]>([]);
  const inputSearchFriend = useRef<HTMLInputElement>(null);
  const [chatRoomIndex, setChatRoomIndex] = useState(0);

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

  const addFriend = async () => {
    try {
      instance.post(
        "/addFriend",
        {
          search: inputSearchFriend.current?.value,
          token: window.sessionStorage.getItem("token"),
          date: new Date()
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      throw new Error("send add friend error :(");
    }
  };

  return (
    <div className="app">
      <aside className="app-left-aside">
        <nav className="flex-column-center">
          <Link to={"/"} className="flex-center home-icon">
            <img src={messageIcon} alt="mess icon" className="message-icon" />
          </Link>
          <Link to={"/message"} className="flex-center nav-icon">
            <Message className="hw-35" />
          </Link>
          <Link to={"/call"} className="flex-center nav-icon">
            <Call className="hw-35" />
          </Link>
          <Link to={"/friend"} className="flex-center nav-icon">
            <Friends className="hw-35" />
          </Link>
          <Link to={"/user"} className="flex-center nav-icon">
            <User className="hw-35" />
          </Link>
        </nav>
        <div className="left-aside-section">
          <nav>
            <div className="title-container">
              <p className="title">Chats</p>
              <span>
                <Bell className="hw-25 bell-icon" />
                <More className="hw-25" />
              </span>
            </div>
            <div className="title-option flex-center">
              <select defaultValue={"friend"}>
                <option value="all-chats">All Chats</option>
                <option value="friend">Friends</option>
                <option value="groups">Groups</option>
              </select>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  name="searchText"
                  ref={inputSearchFriend}
                />
                <Search className="hw-25" onclickF={addFriend} />
              </div>
            </div>
          </nav>
          <section>{contactCard}</section>
        </div>
      </aside>
      <section className="app-section">
        <ChatZone
          chatKey={friendList[chatRoomIndex]?.chatId}
          title={friendList[chatRoomIndex]?.title}
          friendId={friendList[chatRoomIndex]?.friendId}
        />
      </section>
      <aside className="app-right-aside"></aside>
    </div>
  );
}

export default App;
