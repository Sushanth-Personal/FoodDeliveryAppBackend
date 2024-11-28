import styles from "./productpage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMobile from "../../components/NavBarMobile/NavBarMobile";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import useScreenType from "../../customHook/useScreenType";
import RestaurantBanner from "./components/RestaurantBanner/RestaurantBanner";
import { useSearchParams } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";  
const ProductPage = () => {
  const screenType = useScreenType();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("id");
  const restaurantName = searchParams.get("restaurantName");

  // const restaurantName = searchParams.get("restaurantName");
  return (
    <section className={styles.productPage}>
      <div className={styles.content}>
        <header>
          {(screenType === "desktop" || screenType === "tablet") && (
            <HeaderDesktop />
          )}
        </header>
        <nav>
          {screenType === "desktop" && <NavBar />}
          {(screenType === "tablet" || screenType === "mobile") && (
            <NavBarMobile />
          )}
        </nav>
        <div className={styles.restaurantBannerContainer}>
          <RestaurantBanner restaurantId={restaurantId} />
        </div>
        <div className={styles.productDisplayContainer}>
          <ProductDisplay 
          restaurantId={restaurantId}
          restaurantName={restaurantName} />
        </div>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </section>
  );
};

export default ProductPage;
