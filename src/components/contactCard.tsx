import React from "react";
import { Link } from "react-router-dom";

// css
import "../css/contactCard.css";

//
interface ContactCardProps {
  name: string;
  messageUnreadAmount: number;
  key?: number | string;
  time: { hour: number; minutes: number };
  path: string;
  onclickCallback: () => void;
}

//
const into2Char = (number: number) => number.toString().padStart(2, "0");

//
const ContactCard: React.FC<ContactCardProps> = ({
  name,
  messageUnreadAmount,
  time,
  path,
  onclickCallback
  
}) => {
  return (
    <Link to={path} className="contact-card-container flex-center" onClick={onclickCallback}>
      <img
        src="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
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
    </Link>
  );
};

export default ContactCard;
