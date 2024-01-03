// css
import "../css/loginPage.css";

//
const LoginPage = () => {

  

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <h1>Login</h1>
          <input type="text" name="email" placeholder="email..."/>
          <input type="password" name="password" placeholder="password..."/>
          <input type="button" name="login-btn" value={"Login"} />
        </form>
        <div className="login-info"></div>
      </div>
    </div>
  );
};

export default LoginPage;
