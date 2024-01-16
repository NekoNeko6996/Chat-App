import React from "react";

// default
import { defaultAvatar } from "../defaults/default";

// css
import "../css/contactCard.css";

//
interface ContactCardProps {
  name: string;
  messageUnreadAmount: number;
  key?: number | string;
  time: { hour: number; minutes: number };
  path?: string;
  onclickCallback: () => void;
  select: true | false;
  avatar: string;
}

//
const into2Char = (number: number) => number.toString().padStart(2, "0");

//
const ContactCard: React.FC<ContactCardProps> = ({
  name,
  messageUnreadAmount,
  time,
  onclickCallback,
  select,
  avatar
}) => {
  return (
    <div className={`contact-card-container flex-center ${select? "contactSelect" : ""}`} onClick={onclickCallback}>
      <img
        src={avatar || defaultAvatar}
        alt="avatar"
      />
      <div className="content-container flex-space-between-column">
        <span className="flex-space-between-row">
          <p className="text-overflow-ellipsis name">{name}</p>
          <p className="time nowrap">{`${into2Char(time.hour)}:${into2Char(
            time.minutes
          )} ${time.hour > 12 ? "pm" : "am"}`}</p>
        </span>
        <span className="flex-space-between-row">
          <p className="message text-overflow-ellipsis">
            Yes, what you should present first, second and third…
          </p>
          {messageUnreadAmount === 0 ? null : (
            <p className="never-read-message flex-center">
              {messageUnreadAmount > 99 ? "99+" : messageUnreadAmount}
            </p>
          )}
        </span>
      </div>
    </div>
  );
};

export default ContactCard;
