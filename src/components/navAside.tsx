import React, { ReactNode, useRef } from "react";
import { instance } from "../axios/axios";
import { useLocation } from "react-router-dom";

// css
import "../css/leftAside.css";

// svg
import { Bell, More, Search, Logout, Setting } from "./svgComponent";

// type
type props = {
  contactCard?: ReactNode;
  userData?: { fname: string; lname: string; phone: string; email: string };
};

const LeftNavShowBox: React.FC<props> = ({ contactCard, userData }) => {
  const inputSearchFriend = useRef<HTMLInputElement>(null);
  const path = useLocation().pathname;

  const addFriend = async () => {
    try {
      instance.post(
        "/addFriend",
        {
          search: inputSearchFriend.current?.value,
          token: window.sessionStorage.getItem("token"),
          date: new Date(),
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

  const padStartF = (value: number | string) =>
    value.toString().padStart(2, "0");

  return (
    <>
      {path === "/chat" && (
        <>
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
        </>
      )}
      {path === "/profile" && (
        <div className="user-profile-aside flex-c-center ">
          <div className="aside-user-profile-avatar flex-c-center flex-ju-center">
            <img
              src="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
              alt="user profile"
            />
            <h3 className="">{`${userData?.fname} ${userData?.lname}`}</h3>
            <span className="flex-r-center">
              <button className="flex-r-center">
                <Logout className="hw-18" /> Logout
              </button>
              <button className="flex-r-center">
                <Setting className="hw-18" /> Setting
              </button>
            </span>
          </div>
          <div className="aside-user-info flex-c-center">
            <span>
              <span>
                <p>Local Time</p>
                <p>{`${padStartF(new Date().getHours())}:${padStartF(
                  new Date().getMinutes()
                )}`}</p>
              </span>
              <span>icon</span>
            </span>
            <span>
              <span>
                <p>Birth Date</p>
                <p>dd/mm/yyyy</p>
              </span>
              <span>icon</span>
            </span>
            <span>
              <span>
                <p>Phone</p>
                <p>{userData?.phone}</p>
              </span>
              <span>icon</span>
            </span>
            <span>
              <span>
                <p>Email</p>
                <p>{userData?.email}</p>
              </span>
              <span>icon</span>
            </span>
            <span>
              <span>
                <p>Address</p>
                <p>your address...</p>
              </span>
              <span>icon</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNavShowBox;
