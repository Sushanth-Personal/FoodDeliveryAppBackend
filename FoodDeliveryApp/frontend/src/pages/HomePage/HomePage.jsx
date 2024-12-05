// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./homepage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMobile from "../../components/NavBarMobile/NavBarMobile";
import useScreenType from "../../customHook/useScreenType";
import SearchPostCode from "./components/SearchPostcode/SearchPostcode";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import ExclusiveDeals from "./components/ExclusiveDeals/ExclusiveDeals";
import PopularCategory from "./components/PopularCategory/PopularCategory";
import DownloadApp from "./components/DownloadApp/DownloadApp";
import PopularRestaurant from "../../components/PopularRestaurants/PopularRestaurants";
import Advertisement from "./components/Advertisement/Advertisement";
import { useUserContext } from "../../Contexts/UserContext";
import KnowAboutUs from "./components/KnowAboutUs/KnowAboutUs";
import Statistics from "./components/Statistics/Statistics";
import Cart from "../../components/Cart/Cart";
import useImage from "../../customHook/useImage";
const HomePage = () => {
  const { setLastRoute, isCartClicked, setIsCartClicked } = useUserContext();
  const screenType = useScreenType();
  useEffect(() => {
    setLastRoute("/");
  }, []);

  const closeCart = () => setIsCartClicked(false);
  const cartImage = useImage("id","cart-overlay-cancelbutton-1");
  return (
    <section className={styles.homePage}>
      <div className={styles.content}>
        <div className={styles.headerDesktopContainer}>
          {(screenType === "desktop" || screenType === "tablet") && (
            <HeaderDesktop />
          )}
        </div>

        <nav>
          {screenType === "desktop" && <NavBar />}
          {(screenType === "tablet" || screenType === "mobile") && (
            <NavBarMobile />
          )}
        </nav>
        <div className={styles.searchContainer}>
          <SearchPostCode />
        </div>
        <div className={styles.exclusiveDealsContainer}>
          <ExclusiveDeals />
        </div>
        <div className={styles.categoryContainer}>
          <PopularCategory />
        </div>
        <div className={styles.popularRestaurants}>
          <PopularRestaurant />
        </div>
        <div className={styles.downloadApp}>
          <DownloadApp />
        </div>
        <div className={styles.advertisementContainer}>
          <Advertisement />
        </div>

        <div className={styles.knowAboutUsContainer}>
          <KnowAboutUs />
        </div>
        <div className={styles.statisticsContainer}>
          <Statistics />
        </div>
        <footer>
          <FooterComponent />
        </footer>
      </div>
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

export default HomePage;
