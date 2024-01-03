import { Link } from "react-router-dom";

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

// router
// function Router () {

// }

//
function App() {
  return (
    <div className="app">
      <aside className="app-left-aside">
        <nav className="flex-column-center">
          <Link to={"/"} className="flex-center home-icon">
            <img src={messageIcon} alt="mess icon" className="message-icon" />
          </Link>
          <Link to={"/message"} className="flex-center nav-icon">
            <Message className="hw-35"/>
          </Link>
          <Link to={"/call"} className="flex-center nav-icon">
            <Call className="hw-35"/>
          </Link>
          <Link to={"/friend"} className="flex-center nav-icon">
            <Friends className="hw-35"/>
          </Link>
          <Link to={"/user"} className="flex-center nav-icon">
            <User className="hw-35"/>
          </Link>
        </nav>
        <div className="left-aside-section">
          <nav>
            <div className="title-container">
              <p className="title">Chats</p>
              <span>
                <Bell className="hw-25 bell-icon"/>
                <More className="hw-25" />
              </span>
            </div>
            <div className="title-option flex-center">
              <select defaultValue={"friend"}>
                <option value="all-chats">All Chats</option>
                <option value="friend">
                  Friends
                </option>
                <option value="groups">Groups</option>
              </select>
              <div>
                <input type="text" placeholder="Search..." />
                <Search className="hw-25"/>
              </div>
            </div>
          </nav>
          <section>
            <ContactCard
              name="Joey"
              messageUnreadAmount={0}
              time={{ hour: 2, minutes: 26 }}
              path="/"
            />
            <ContactCard
              name="Join"
              messageUnreadAmount={23}
              time={{ hour: 12, minutes: 42 }}
              path="/"
            />
            <ContactCard
              name="Diana"
              messageUnreadAmount={100}
              time={{ hour: 13, minutes: 2 }}
              path="/"
            />
          </section>
        </div>
      </aside>
      <section className="app-section">
        <ChatZone />
      </section>
      <aside className="app-right-aside"></aside>
    </div>
  );
}

export default App;
