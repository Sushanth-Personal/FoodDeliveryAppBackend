import styles from "./navbar.module.css";
import useImage from "../../customHook/useImage";

const NavBar = () => {
  const logoURL = useImage("id", "login-loginForm-logo-1");

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={logoURL.imageURL}
          className={styles.logoURL}
          alt=""
          id="login-loginForm-logo-1"
        />
      </div>
      <div className={styles.navTray}>
        <div>
            <button className = {styles.homeButton}>Home</button>
        </div>
        <div>
            <button>Browse Menu</button>
        </div>
        <div>
            <button>Special Offers</button>
        </div>
        <div>
            <button>Restaurants</button>
        </div>
        <div>
            <button>Track Order</button>
        </div>
        <div className={styles.loginSign}>
        <button>
            <img src="./Male User.png" alt="maleuser" id="navbar-loginSign-maleuser-1" />
            Login/Signup</button>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
