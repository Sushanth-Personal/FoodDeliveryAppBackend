import styles from "./styles/loginpage.module.css";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { useState } from "react";
import useImage from "../customHook/useImage";
import { displayImage } from "../utility/imageProcess";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../errorHandler/inputError";
import { loginUser } from "../api/api"; // Assuming you have a fetchUserData API method
import { useUserContext } from "../Contexts/UserContext";

const LoginPage = () => {

  // context
  const { setUserData } = useUserContext();

  // hooks
  const [userData, setUserDataState] = useState({
    email: "",
    password: "",
  });

  const imageURLs = useImage("page", "login");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataState({
      ...userData,
      [name]: value, 
    });
  };

  const handleEmailBlur = () => {
    const { error } = validateEmail(userData.email);
    setErrors({
      ...errors,
      email: error,
    });
  };

  const handlePasswordBlur = () => {
    const { error } = validatePassword(userData.password);
    setErrors({
      ...errors,
      password: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userData.email, userData.password);

      if (response.message === "Success") {
        // After login success, fetch user data from backend
        const userId = response.user._id; // Assuming userId is returned from the login response
        

       
          const completeUserData = {
            ...response.user, 
            userId:userId, // Add userId to the user data
          };

          // Set complete user data in context
          setUserData(completeUserData);

          // Optionally store user data in localStorage or sessionStorage if needed
          localStorage.setItem("userId", userId);
          localStorage.setItem("userData", JSON.stringify(completeUserData));

          // Navigate to the previous route if available, otherwise navigate to home
          const lastRoute = sessionStorage.getItem("lastRoute");
          if (lastRoute) {
            navigate(lastRoute);
          } else {
            navigate("/");
          }
        }
      else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.upperSection}>
        <div className={styles.loginContent}>
          <div className={styles.loginSection}>
            <div className={styles.loginForm}>
              <img
                id="login-loginForm-logo-1"
                src={displayImage(imageURLs, "login-loginForm-logo-1")}
                alt="logo"
              />
              <h1>Welcome Back 👋</h1>
              <h2>
                Today is a new day. It's your day. You shape it. Sign in to start ordering.
              </h2>
              <div className={styles.formGroup}>
                <div className={styles.emailGroup}>
                  <label htmlFor="email"> Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Example@email.com"
                    value={userData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                  />
                  {errors.email && <div className={styles.error}>{errors.email}</div>}
                </div>

                <div className={styles.passwordGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    id="password"
                    placeholder="At least 8 characters"
                    onChange={handleChange}
                    onBlur={handlePasswordBlur}
                  />
                  {errors.password && <div className={styles.error}>{errors.password}</div>}
                </div>
                <h4>Forgot Password?</h4>
                <button onClick={handleSubmit}>Sign in</button>
                <h3>
                  Don't you have an account?
                  <a href="#" onClick={() => navigate("/register")}> Sign up</a>
                </h3>
              </div>
            </div>
          </div>
          <div className={styles.loginImage}>
            <img
              src={displayImage(imageURLs, "login-loginImage-loginImage-1")}
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
