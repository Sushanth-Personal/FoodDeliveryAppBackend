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
import {useUserContext} from "../../Contexts/UserContext";
const ProductPage = () => {
  const screenType = useScreenType();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("id");
  const restaurantName = searchParams.get("restaurantName");
  const {userId,setUserId} = useUserContext();

  if(!userId){
    setUserId(localStorage.getItem("userId"));
  }

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
        <div className = {styles.informationContainer}>
          <Information/>
        </div>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </section>
  );
};

export default ProductPage;
