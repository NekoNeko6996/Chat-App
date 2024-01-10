import { instance } from "../axios/axios";

// css
import "../css/loginPage.css";

//
const LoginPage = () => {
  const onLogin = () => {
    instance
      .post("/login", document.querySelector(".login-form"), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.data.status) {
          console.log(resp.data);
          window.sessionStorage.setItem("token", resp.data.token);
          window.location.href = "/chat";
        } else {
          console.log(resp.data.message);
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <h1>LOGIN</h1>
          <input type="text" name="email" placeholder="email..." />
          <input type="password" name="password" placeholder="password..." />
          <input
            type="submit"
            name="login-btn"
            value={"LOGIN"}
            onClick={(event) => {
              event.preventDefault();
              onLogin();
            }}
            className="login-submit-btn"
          />
        </form>
        <div className="login-info"></div>
      </div>
    </div>
  );
};

export default LoginPage;
