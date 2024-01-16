import React from "react";
import { instance } from "../axios/axios";

// default
import { defaultAvatar } from "../defaults/default";

// css
import "../css/addFriendProfile.css";

// type
type Props = {
  data: {
    fname: string;
    lname: string;
    id: string;
    phone: string;
    avatar: string;
  };
  zIndex?: number;
  closeCallBackF: (off: true | false) => void;
};

//
const AddFriendProfile: React.FC<Props> = ({ data, closeCallBackF }) => {
  const onAddFriendClick = async () => {
    try {
      instance.post(
        "/addFriend",
        {
          token: window.sessionStorage.getItem("token"),
          friendId: data.id,
          dateRequest: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error(`[error] ${err}`);
    }
  };

  return (
    <div
      className="add-friend-profile-layer"
      onClick={(event) => {
        const target = event.target as Element;
        closeCallBackF(target?.className === "add-friend-profile-layer");
      }}
    >
      <div className="add-friend-profile-container">
        <img
          src="https://e0.pxfuel.com/wallpapers/907/577/desktop-wallpaper-anime-vibe.jpg"
          alt="background"
          className="user-background"
        />
        <img src={data?.avatar || defaultAvatar} alt="avatar" />
        <p className="user-name">{`${data.fname} ${data.lname}`}</p>
        <p className="introduce">this is introduce...</p>
        <div className="btn-box">
          <button>Texting</button>
          <button onClick={onAddFriendClick}>Add Friend</button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendProfile;
