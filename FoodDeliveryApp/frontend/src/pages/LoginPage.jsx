import styles from "./styles/loginpage.module.css";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { useState } from "react";
import useImage from "../customHook/useImage";
import { displayImage } from "../utility/imageProcess";
import { useNavigate } from "react-router-dom";
import {  validateEmail, validatePassword } from "../errorHandler/inputError";
const LoginPage = () => {
  //hooks
  const [userData, setUserData] = useState({
       email: "",
    password: "",
  });

  // Use the custom hook to fetch image URLs
  const imageURLs = useImage("page", "login");

  const navigate = useNavigate(); // useNavigate hook

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordBlur= (e) => {
    const { value } = e.target;
    const { value: updatedPassword, error } = validatePassword(value);
  
    setUserData({
      ...userData,
      password: updatedPassword,
    });
  
    setErrors({
      ...errors,
      password: error,
    });
  };
  // Handle email validation on blur (focus out)
  const handleEmailBlur = () => {
    const { value, error } = validateEmail(userData.email);
    
    setUserData({
      ...userData,
      email: value,
    });
    
    setErrors({
      ...errors,
      email: error,
    });
  };

  return (
    <section className={styles.login}>
      <div className={styles.upperSection}>
        <div className={styles.loginContent}>
          <div className={styles.loginSection}>
            <div className={styles.loginForm}>
              <img
                id="login-loginForm-logo-1"
                src={displayImage(
                  imageURLs,
                  "login-loginForm-logo-1"
                )}
                alt="logo"
              />
              <h1>Welcome Back 👋</h1>
              <h2>
                Today is a new day. It's your day. You shape it. Sign
                in to start ordering.
              </h2>
              <div className={styles.formGroup}>
                <div className={styles.emailGroup}>
                  <label htmlFor="email"> Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Example@email.com"
                    value={userData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                  />
                  {errors.email && (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                </div>

                <div className={styles.passwordGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={userData.password}
                    id="password"
                    placeholder="At least 8 characters"
                    onChange={handleChange}
                    onBlur={handlePasswordBlur}
                  />
                  {errors.password && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                </div>
                <h4>Forgot Password?</h4>
                <button>Sign in</button>
                <h3>
                  Don't you have an account?
                  <a href="#" onClick={() => navigate("/register")}> Sign up</a>
                </h3>
              </div>
            </div>
          </div>
          <div className={styles.loginImage}>
            <img
              src={displayImage(
                imageURLs,
                "login-loginImage-loginImage-1"
              )}
              alt="loginImage"
              id="login-loginImage-loginImage-1"
            />
          </div>
        </div>
      </div>
      <footer>
        <FooterComponent />
      </footer>
    </section>
  );
};

export default LoginPage;
