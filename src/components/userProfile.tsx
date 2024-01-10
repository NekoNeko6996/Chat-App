import React, { useEffect } from "react";
import { instance } from "../axios/axios";

// css
import "../css/userProfile.css";

// type
type userProfileProps = {
  data:
    | { fname: string; lname: string; phone: string; email: string }
    | undefined;
};

//
const UserProfile: React.FC<userProfileProps> = ({ data }) => {
  useEffect(() => {
    if (!window.sessionStorage.getItem) {
      window.location.href = "/login";
      return;
    }
  });

  const sendChangeProfile = () => {
    const formData = new FormData(
      document.querySelector("#user-info-form") as HTMLFormElement
    );
    const userToken = window.sessionStorage.getItem("token");

    formData.append("userToken", userToken as string);
    formData.append("dateChange", JSON.stringify(new Date()));

    instance.post("/changeProfile", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="user-profile-container flex-c-center">
      <nav className="user-profile-nav">
        <h3>Setting</h3>
        <p>Update Personal Information & Settings</p>
      </nav>
      <div className="account-setting-container flex-c-center">
        <div className="user-setting-title">
          <h4>Account</h4>
          <p>Update personal & contact information</p>
        </div>
        <form action="" id="user-info-form">
          <div className="flex-r-center">
            <div>
              <div className="input-info-box">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={data?.fname}
                />
              </div>
              <div className="input-info-box">
                <p>Last Name</p>
                <input type="text" name="lastName" defaultValue={data?.lname} />
              </div>
              <div className="input-info-box">
                <p>Phone Number</p>
                <input type="tell" name="phone" defaultValue={data?.phone} />
              </div>
            </div>
            <div>
              <div className="input-info-box">
                <p>Birth Date</p>
                <input type="text" name="birthDate" placeholder="dd/mm/yyyy" />
              </div>
              <div className="input-info-box">
                <p>Email</p>
                <input type="email" name="email" defaultValue={data?.email} />
              </div>
              <div className="input-info-box">
                <p>Website</p>
                <input type="text" name="website" />
              </div>
            </div>
          </div>
          <div className="input-info-box">
            <p>Address</p>
            <input type="text" name="address" />
          </div>
        </form>
        <div className="user-account-footer flex-r-center">
          <button>Reset</button>
          <button className="blue-btn" onClick={sendChangeProfile}>
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
