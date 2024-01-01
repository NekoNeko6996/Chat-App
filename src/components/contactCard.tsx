// css
import "../css/contactCard.css";

//
function ContactCard() {
  return (
    <a href="/" className="contact-card-container flex-center">
      <img
        src="https://profilepicture7.com/img/img_dongman/1/528431439.jpg"
        alt="avatar"
      />
      <div className="content-container flex-space-between-column">
        <span className="flex-space-between-row">
          <p className="text-overflow-ellipsis">John</p>
          <p className="time nowrap">12:42 pm</p>
        </span>
        <span className="flex-space-between-row">
          <p className="message text-overflow-ellipsis">
            Yes, what you should present first, second and third…
          </p>
          <p className="never-read-message flex-center">99+</p>
        </span>
      </div>
    </a>
  );
}

export default ContactCard;
