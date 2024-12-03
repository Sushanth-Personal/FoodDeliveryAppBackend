import styles from "./navbar.module.css";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Contexts/UserContext";

const NavBar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, userData } = useUserContext();
  const imageURLs = useImage("page", "navbar");

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          role="button"
          onClick={() => navigate("/")}
          src={displayImage(imageURLs, "navbar-logo-logo-1")}
          className={styles.logoURL}
          alt="logo"
          id="navbar-logo-logo-1"
        />
      </div>
      <div className={styles.navTray}>
        <div>
          <button
            onClick={() => navigate("/")}
            className={styles.homeButton}
          >
            Home
          </button>
        </div>
        <div>
          <button className = {styles.navTrayButton}>Browse Menu</button>
        </div>
        <div>
          <button className = {styles.navTrayButton}>Special Offers</button>
        </div>
        <div>
          <button className = {styles.navTrayButton}>Restaurants</button>
        </div>
        <div>
          <button className = {styles.navTrayButton}>Track Order</button>
        </div>
        <div className={styles.loginSign}>
          {!isLoggedIn && (
            <button onClick={() => navigate("/login")}>
              <img
                src={displayImage(
                  imageURLs,
                  "navbar-loginSign-maleuser-1"
                )}
                alt="maleuser"
                id="navbar-loginSign-maleuser-1"
              />
              Login/Signup
            </button>
          )}

          {isLoggedIn && (
            <button
              className={styles.loggedInButton}
              onClick={() => navigate("/profile")}
            >
              <img
                src={displayImage(
                  imageURLs,
                  "navbar-loginSign-maleuser-1"
                )}
                alt="maleuser"
                id="navbar-loginSign-maleuser-1"
              />
              {userData.userName}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
