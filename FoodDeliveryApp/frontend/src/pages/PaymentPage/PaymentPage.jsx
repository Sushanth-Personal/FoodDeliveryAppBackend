import styles from "./paymentpage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import Payment from "./Payment/Payment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "../../api/api";
import { useUserContext } from "../../Contexts/UserContext";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
import Cart from "../../components/Cart/Cart";
const PaymentPage = () => {
  const navigate = useNavigate();
  const { setUserId, isCartClicked, setIsCartClicked } = useUserContext();
  const imageURLs = useImage("page", "navbar");
  const closeCart = () => setIsCartClicked(false);
  const cartImage = useImage("id","cart-overlay-cancelbutton-1");
  useEffect(() => {
    checkAuthentication().then((response) => {
      if (!response) {
        navigate("/login");
      } else {
        setUserId(localStorage.getItem("userId"));
      }
    });
  }, []);

  return (
    <section className={styles.paymentPage}>
      <div className={styles.headerDesktopContainer}>
        <HeaderDesktop />
      </div>
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img
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
      <div className={styles.navBarContainer}>
       <NavBar />
      </div>

      <div className={styles.paymentContainer}>
        <Payment />
      </div>

      <footer>
        <FooterComponent />
      </footer>
      {isCartClicked && (
        <div className={styles.overlay} >
          <Cart />
          <img 
                id="cart-overlay-cancelbutton-1"
                onClick = {closeCart}
                className = {styles.cancelButton}
                src={cartImage.imageURL}
                alt="cancelbutton" />
        </div>
      )}
    </section>
  );
};

export default PaymentPage;
