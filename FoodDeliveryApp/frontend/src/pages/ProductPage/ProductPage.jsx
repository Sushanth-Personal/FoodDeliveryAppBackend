import styles from "./productpage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMobile from "../../components/NavBarMobile/NavBarMobile";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import useScreenType from "../../customHook/useScreenType";
import RestaurantBanner from "./components/RestaurantBanner/RestaurantBanner";
import { useSearchParams } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";
import Information from "./components/Information/Information";
import { useUserContext } from "../../Contexts/UserContext";
import Map from "./components/MapComponent/Map";
import CustomerReviews from "./components/CustomerReviews/CustomerReviews";
import SimilarRestaurants from "./components/SimilarRestaurants/SimilarRestaurants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHook/useAuth";
const ProductPage = () => {
  useAuth();
  const navigate = useNavigate();
  const screenType = useScreenType();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("id");
  const restaurantName = searchParams.get("restaurantName");
  const { setLastRoute} = useUserContext();

  useEffect(() => {
    setLastRoute("/product");
    if (!restaurantId) {
      navigate("/error");
    }
  }, []);

  return (
    <>
      <section className={styles.productPage}>
        <div className={styles.content}>
          <div className={styles.headerDesktopContainer}>
            {(screenType === "desktop" ||
              screenType === "tablet") && <HeaderDesktop />}
          </div>

          <div className={styles.navBarContainer}>
            {screenType === "desktop" && <NavBar />}
            {(screenType === "tablet" || screenType === "mobile") && (
              <NavBarMobile />
            )}
          </div>

          <div className={styles.restaurantBannerContainer}>
            <RestaurantBanner restaurantId={restaurantId} />
          </div>

          <div className={styles.productDisplayContainer}>
            <ProductDisplay
              restaurantId={restaurantId}
              restaurantName={restaurantName}
            />
          </div>

          <div className={styles.informationContainer}>
            <Information />
          </div>
         
         
        <div className = {styles.mapContainer}><Map/></div>
        
        <div className = {styles.reviewContainer}><CustomerReviews/></div>
        <div className = {styles.similarRestaurantsContainer}><SimilarRestaurants/></div>
        <footer>
          <FooterComponent />
        </footer>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
