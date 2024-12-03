import styles from "./navbarmobile.module.css";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Contexts/UserContext";
import { useCallback } from "react";
import useAuth from "../../customHook/useAuth";
const NavBarMobile = () => {
  useAuth();
  const navigate = useNavigate();
  const imageURLs = useImage("page", "navbar");
  const profileURL = useImage("id","profilepage-userphoto-userphoto-1")
  const { isLoggedIn, userData, isCartClicked, setIsCartClicked } = useUserContext();

  const handleCartClick = useCallback(() => {
    setIsCartClicked(!isCartClicked);
    // navigate("/product");
  }, [isCartClicked, setIsCartClicked, navigate]);

  return (
    <div className={styles.navbar}>
      {/* First Row: Logo and Menu */}
      <div className={styles.firstRow}>
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
        <div className={styles.menu}>
          <button>
            <img
              src={displayImage(imageURLs, "navbar-menu-menu-1")}
              alt="menu"
              id="navbar-menu-menu-1"
            />
          </button>
        </div>
      </div>

      {/* Second Row: Login/Signup and Cart */}
      <div className={styles.secondRow}>
        <div className={styles.loginSign}>
          {!isLoggedIn && (
            <button 
            className = {styles.loginButton}
            onClick={() => navigate("/login")}>
              <img
                src={displayImage(imageURLs, "navbar-loginSign-maleuser-1")}
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
                src={profileURL.imageURL}
                alt="maleuser"
                id="navbar-loginSign-maleuser-1"
              />
              Hey {userData.userName}
            </button>
          )}
        </div>

        <div className={styles.cart}>
          <button onClick={handleCartClick}>
            <img
              src={displayImage(imageURLs, "navbar-cart-cart-1")}
              alt="cart"
              id="navbar-cart-cart-1"
            />
            <h3>My Cart</h3>
          </button>
        </div>
      </div>

      {/* Third Row: Location */}
      <div className={styles.thirdRow}>
        <div className={styles.location}>
          <img
            src={displayImage(imageURLs, "navbar-location-location-1")}
            alt="location"
            id="navbar-location-location-1"
          />
          <h3>
            Regent Street, <span>A4</span>, A4201, London
          </h3>
          <a>Change Location</a>
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
