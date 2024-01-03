// axios
import { instance } from "../axios/axios";

// css
import "../css/loginPage.css";

//
const SignUpPage = () => {

    const onSignUp = () => {
        instance.post("/signup", document.querySelector(".login-form"), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => {
            console.log(resp.data);
        })
    }

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <h1>Sign Up</h1>
          <input type="text" name="firstName" placeholder="first name..."/>
          <input type="text" name="lastName" placeholder="last name..."/>
          <input type="text" name="email" placeholder="email..."/>
          <input type="tell" name="tell" placeholder="phone number..."/>
          <input type="password" name="password" placeholder="password..."/>
          <input type="password" name="password" placeholder="repeat password..."/>
          <input type="button" name="login-btn" value={"Sign Up"} onClick={onSignUp}/>
        </form>
        <div className="login-info"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
