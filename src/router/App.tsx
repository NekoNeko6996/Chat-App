import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { instance } from "../axios/axios.ts";
import { io } from "socket.io-client";

// default
import { defaultAvatar } from "../defaults/default.tsx";

// components
import LeftNavShowBox from "../components/navAside.tsx";
import ContactCard from "../components/contactCard.tsx";
import ChatZone from "../components/chatZone.tsx";
import { Message, Call, Friends, User } from "../components/svgComponent.tsx";
import UserProfile from "../components/userProfile.tsx";
import AddFriendProfile from "../components/addFriendProfile.tsx";

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

type friendInfoObj = {
  lname: string;
  fname: string;
  avatar: string;
};

type userProfileData = {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  website: string;
  avatar: string;
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
type userProfileAddFriendResult = {
  fname: string;
  lname: string;
  id: string;
  phone: string;
  avatar: string;
};

//
function App() {
  const [friendList, setFriendList] = useState<friendListObj[]>([]);
  const [friendInfo, setFriendInfo] = useState<friendInfoObj[]>([]);
  const [contactCard, setContactCard] = useState<ReactNode>();
  const [userProfileData, setUserProfileData] = useState<userProfileData>();
  const [messageData, setMessageData] = useState<messageData[]>();
  const [refresh, setRefresh] = useState(true);
  const [addFriendProfile, setAddFriendProfile] = useState<ReactNode>();

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
            setFriendInfo(resp.data.friendInfo);
          }
        }
      });

    // -------------------------- //
    instance
      .post("/getProfile", {
        token: window.sessionStorage.getItem("token"),
        date: new Date(),
      })
      .then((resp) => {
        if (resp.data.status) {
          const {
            fname,
            lname,
            email,
            phone,
            address,
            birthDate,
            website,
            avatar,
          } = resp.data;
          setUserProfileData({
            fname,
            lname,
            email,
            phone,
            address,
            birthDate,
            website,
            avatar,
          });
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
          avatar={friendInfo[index]?.avatar}
        />
      )
    );
    setContactCard(htmlContactCardElement);
  }, [friendList, chatRoomIndex, friendInfo]);

  // show add friend popup
  const SearchNewFriendCallBack = (result: userProfileAddFriendResult) => {
    const addFComponent = (
      <AddFriendProfile
        zIndex={10}
        data={result}
        closeCallBackF={(off) => {
          off ? setAddFriendProfile(null) : null;
        }}
      />
    );
    setAddFriendProfile(addFComponent);
  };

  //
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
          <Link to={"/chat"} className="flex-center home-icon">
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
            searchFriendResultF={(result) =>
              SearchNewFriendCallBack(result as userProfileAddFriendResult)
            }
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
            friendInfo={friendInfo[chatRoomIndex]}
            myAvatar={userProfileData?.avatar || defaultAvatar}
          />
        )}
        {path === "/profile" && <UserProfile data={userProfileData} />}
      </section>
      <aside className="app-right-aside"></aside>
      {addFriendProfile}
    </div>
  );
}

export default App;
