// components
import ContactCard from "./components/contactCard.tsx";

// css
import "./css/App.css";

// icons
import searchIcon from "./assets/icons/search.png";
import messageIcon from "./assets/icons/message.png";
import messageSmallIcon from "./assets/icons/message_small.png";
import callIcon from "./assets/icons/telephone.png";
import friendIcon from "./assets/icons/friends.png";
import userIcon from "./assets/icons/user.png";

//
function App() {
  return (
    <div className="app">
      <aside className="app-left-aside">
        <nav className="flex-column-center">
          <a href="/" className="flex-center home-icon">
            <img src={messageIcon} alt="mess icon" className="message-icon" />
          </a>
          <a href="/" className="flex-center nav-icon">
            <img src={messageSmallIcon} alt="mess icon" className="nav-icon-img" />
          </a>
          <a href="/" className="flex-center nav-icon">
            <img src={callIcon} alt="mess icon" className="nav-icon-img" />
          </a>
          <a href="/" className="flex-center nav-icon">
            <img src={friendIcon} alt="mess icon" className="nav-icon-img" />
          </a>
          <a href="/" className="flex-center nav-icon">
            <img src={userIcon} alt="mess icon" className="nav-icon-img" />
          </a>
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
                <img src={searchIcon} alt="search-icon" />
              </div>
            </div>
          </nav>
          <section>
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
          </section>
        </div>
      </aside>
      <section className="app-section"></section>
      <aside className="app-right-aside"></aside>
    </div>
  );
}

export default App;
