import { Link } from "react-router-dom";

// components
import ContactCard from "./components/contactCard.tsx";
import ChatZone from "./components/chatZone.tsx";

// css
import "./css/App.css";

// icons
import messageIcon from "./assets/icons/message.png";

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
            <svg
              className="hw-35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              ></path>
            </svg>
          </Link>
          <Link to={"/call"} className="flex-center nav-icon">
            <svg
              className="hw-35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </Link>
          <Link to={"/friend"} className="flex-center nav-icon">
            <svg
              className="hw-35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </Link>
          <Link to={"/user"} className="flex-center nav-icon">
            <svg
              className="hw-35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </Link>
        </nav>
        <div className="left-aside-section">
          <nav>
            <div className="title-container">
              <p className="title">Chats</p>
              <span>
                <div className="icons"></div>
                <div className="icons"></div>
              </span>
            </div>
            <div className="title-option flex-center">
              <select>
                <option value="all-chats">All Chats</option>
                <option value="friend" selected={true}>
                  Friends
                </option>
                <option value="groups">Groups</option>
              </select>
              <div>
                <input type="text" placeholder="Search..." />
                <svg
                  className="hw-25"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
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
