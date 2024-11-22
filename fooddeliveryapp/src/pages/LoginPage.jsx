import styles from "./styles/LoginPage.module.css";
import FooterComponent from "../components/FooterComponent";
import { useState} from "react";
import  useImage from "../customHook/useImage";
import { displayImage } from "../utility/imageProcess";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Use the custom hook to fetch image URLs
  const imageURLs = useImage("page", "login");

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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className={styles.passwordGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={password}
                    id="password"
                    placeholder="At least 8 characters"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <h4>Forgot Password?</h4>
                <button>Sign in</button>
                <h3>
                  Don't you have an account?
                  <a> Sign up</a>
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
