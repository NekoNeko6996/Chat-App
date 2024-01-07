import React from "react";

// css
import "../css/userMessageBox.css";

//
import { MoreRow } from "./svgComponent";

//
type UserMessageBoxProps = {
  userAvatar: string;
  message: string;
  time: { hour: number; minutes: number; second: number };
  owner?: true | false;
};

// message box
const UserMessageBox: React.FC<UserMessageBoxProps> = ({
  userAvatar,
  owner,
  message,
  time,
}) => {
  return (
    <div className="user-message-container .my-message-container">
      <p className={`show-message-p ${owner ? "my-message-box" : ""}`}>
        {message}
      </p>
      <br />
      <img
        src={userAvatar}
        alt="user avatar"
        className={`${owner ? "my-avatar" : ""}`}
      />
      <p className={`time-message ${owner ? "my-message-time" : ""}`}>
        {`${time.hour}:${time.minutes}`}
      </p>
      <MoreRow
        className={`hw-18 more-row-message-box ${
          owner ? "my-more-row-message-box" : ""
        }`}
      />
    </div>
  );
};

export default UserMessageBox;
