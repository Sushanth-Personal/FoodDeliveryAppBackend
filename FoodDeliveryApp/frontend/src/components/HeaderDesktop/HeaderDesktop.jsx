import styles from "./headerdesktop.module.css";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
import {useUserContext} from "../../Contexts/UserContext";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
const HeaderDesktop = () => {
  const navigate = useNavigate();
  const imageURLs = useImage("page", "headerdesktop");
  const {isCartClicked,setIsCartClicked} = useUserContext();

  const handleCartClick = useCallback(() => {
    setIsCartClicked(!isCartClicked);
    navigate("/product");
  }, [isCartClicked, setIsCartClicked]); // Added setIsCartClicked as a dependency for better practice


  return (
    <div className={styles.header}>
      <div className={styles.promo}>
        <p>🌟</p>
        Get 5% Off your first order,
        <a href=""> Promo: ORDER5</a>
      </div>

      <div className={styles.location}>
        <img
          src={displayImage(imageURLs, "headerdesktop-location-location-1")}
          alt="location"
          id="headerdesktop-location-location-1"
        />
        <h3>Regent Street, <span>A4</span>, A4201, London</h3>
        <a>Change Location</a>
      </div>
      <div className={styles.cart}>
        <button
        onClick={handleCartClick}
        >
          <div className={styles.leftSide}>
            <img
              src={displayImage(imageURLs, "headerdesktop-cart-cart-1")}
              alt="cart"
              id="headerdesktop-cart-cart-1"
            />
            <h3>My Cart</h3>
          </div>
          
          <div className={styles.rightSide}>

            <div></div>
            <div className = {styles.forwardButton}>
              <img
              src={displayImage(imageURLs, "headerdesktop-cartForwardButton-forwardButton-1")}
              alt="forwardButton"
              id="headerdesktop-cartForwardButton-forwardButton-1"
            />
            </div>
            
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderDesktop;
