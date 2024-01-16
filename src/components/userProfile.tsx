import React, { useEffect } from "react";
import { instance } from "../axios/axios";

// css
import "../css/userProfile.css";

// type
type userProfileProps = {
  data:
    | {
        fname: string;
        lname: string;
        phone: string;
        email: string;
        address: string;
        birthDate: string;
        website: string;
        avatar: string;
      }
    | undefined;
};

// token
const userToken = window.sessionStorage.getItem("token");

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
    formData.append("userToken", userToken as string);
    formData.append("dateChange", JSON.stringify(new Date()));

    instance.post("/changeProfile", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const sendChangePassword = () => {
    const passwordFormData = new FormData(
      document.querySelector("#change-password-form") as HTMLFormElement
    );

    if (
      passwordFormData.get("newPassword") !==
        passwordFormData.get("repeatPassword") ||
      !passwordFormData.get("oldPassword")
    ) {
      console.log(false);
      return;
    }

    passwordFormData.append("email", data?.email ? data.email : "");
    passwordFormData.append("userToken", userToken as string);
    passwordFormData.append("dateChange", JSON.stringify(new Date()));

    instance.post("/changePassword", passwordFormData, {
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
      <div className="show-setting-change-container">
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
                    required
                  />
                </div>
                <div className="input-info-box">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={data?.lname}
                    required
                  />
                </div>
                <div className="input-info-box">
                  <p>Phone Number</p>
                  <input
                    type="tell"
                    name="phone"
                    defaultValue={data?.phone}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="input-info-box">
                  <p>Birth Date</p>
                  <input
                    type="text"
                    name="birthDate"
                    placeholder="dd/mm/yyyy"
                    defaultValue={data?.birthDate}
                  />
                </div>
                <div className="input-info-box">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    defaultValue={data?.email}
                    required
                  />
                </div>
                <div className="input-info-box">
                  <p>Website</p>
                  <input
                    type="text"
                    name="website"
                    defaultValue={data?.website}
                  />
                </div>
              </div>
            </div>
            <div className="input-info-box">
              <p>Address</p>
              <input type="text" name="address" defaultValue={data?.address} />
            </div>
            <div className="input-info-box">
              <p>Avatar Link</p>
              <input type="text" name="avatar" defaultValue={data?.avatar} />
            </div>
          </form>
          <div className="user-account-footer flex-r-center">
            <button
              onClick={() =>
                document
                  .querySelector<HTMLFormElement>("#user-info-form")
                  ?.reset()
              }
            >
              Reset
            </button>
            <button className="blue-btn" onClick={sendChangeProfile}>
              Save Change
            </button>
          </div>
        </div>
        <div className="account-setting-container flex-c-center">
          <div className="user-setting-title">
            <h4>Password</h4>
            <p>Update password</p>
          </div>
          <form action="" id="change-password-form">
            <div className="flex-r-center">
              <div>
                <div className="input-info-box">
                  <p>Old Password</p>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Enter old password..."
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <div className="input-info-box">
                  <p>New Password</p>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password..."
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="input-info-box">
                  <p>Repeat New Password</p>
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Enter repeat new password..."
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="user-account-footer flex-r-center">
            <button>Reset</button>
            <button className="blue-btn" onClick={sendChangePassword}>
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
