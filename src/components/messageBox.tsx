import React from "react";

// css
import "../css/userMessageBox.css";

//
import { MoreRow } from "./svgComponent";

//
type UserMessageBoxProps = {
  userAvatar: string;
  message: string;
  time?: string;
  owner?: true | false;
};

// message box
const OtherMessageBox: React.FC<UserMessageBoxProps> = ({
  userAvatar,
  owner,
  message,
}) => (
  <>
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
        12:32am
      </p>
      <MoreRow
        className={`hw-18 more-row-message-box ${
          owner ? "my-more-row-message-box" : ""
        }`}
      />
    </div>
  </>
);

//
const UserMessageBox: React.FC<UserMessageBoxProps> = ({ owner, message }) => {
  return (
    <>
      <OtherMessageBox
        userAvatar="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
        owner={owner}
        message={message}
      />
    </>
  );
};

export default UserMessageBox;
