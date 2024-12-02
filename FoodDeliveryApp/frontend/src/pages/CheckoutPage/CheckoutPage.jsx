import styles from "./checkout.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import SimilarRestaurants from "../ProductPage/components/SimilarRestaurants/SimilarRestaurants";
import OrderSummary from "./components/OrderSummary";
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage"; // Import the ErrorPage component
import { useUserContext } from "../../Contexts/UserContext";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
const CheckoutPage = () => {
  const imageURLs = useImage("page", "navbar");
  const { userId } = useParams();
  const { setUserId } = useUserContext();
  // If userId is not present, redirect to ErrorPage
  if (!userId) {
    return <ErrorPage />;
  } else {
    setUserId(userId);
  }
  return (
    <section className={styles.checkoutPage}>
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
      <div className={styles.headerDesktopContainer}>
        <HeaderDesktop />
      </div>
      <div className={styles.navBarContainer}>
        <NavBar />
      </div>
      <div className={styles.orderSummaryContainer}>
        <OrderSummary />
      </div>
      <div className={styles.popularRestaurantsContainer}>
        <SimilarRestaurants />
      </div>
      <footer className={styles.footerContainer}>
        <FooterComponent />
      </footer>
    </section>
  );
};
export default CheckoutPage;
