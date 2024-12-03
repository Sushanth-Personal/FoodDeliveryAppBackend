import styles from "./similarrestaurants.module.css";
import {useNavigate} from 'react-router-dom';
import useImage from "../../../../customHook/useImage";
import {displayImage} from "../../../../utility/imageProcess";

const SimilarRestaurants = () => {
  const navigate = useNavigate();
  const imageURLs = useImage("page", "popularrestaurants");



 

  return (
    <section className={styles.popularRestaurants}>
      <div className={styles.heading}>Similar Restaurants</div>
      <div className={styles.content}>
        <ul>
          <li
          role="button"
          onClick={() => navigate('/product/?id=6746f6c5f215ba9397391196&restaurantName=mcdonalds')}
          >
            <img
              id="popularrestaurants-content-mcdonalds-1"
              src={displayImage(imageURLs,"popularrestaurants-content-mcdonalds-1")}
              alt="mcdonalds"
            />
            <div className={styles.lowerTileContent}>
              <div className={styles.text}>McDonald’s London</div>
            </div>
          </li>
          <li>
            <img
              id="popularrestaurants-content-kfc-1"
              src={displayImage(imageURLs,"popularrestaurants-content-kfc-1")}
              alt="kfc"
            />
            <div className={styles.lowerTileContent}>
              <div className={styles.text}>KFC West London</div>
            </div>
          </li>
          <li>
            <img
              id="popularrestaurants-content-texas-1"
              src={displayImage(imageURLs,"popularrestaurants-content-texas-1")}
              alt="texas"
            />
            <div className={styles.lowerTileContent}>
              <div className={styles.text}>Texas Chicken</div>
            </div>
          </li>
          <li>
            <img
              id="popularrestaurants-content-burgerking-1"
              src={displayImage(imageURLs,"popularrestaurants-content-burgerking-1")}
              alt="burgerking"
            />
            <div className={styles.lowerTileContent}>
              <div className={styles.text}>Burger King</div>
            </div>
          </li>
          <li>
            <img
              id="popularrestaurants-content-shaurma-1"
              src={displayImage(imageURLs,"popularrestaurants-content-shaurma-1")}
              alt="shaurma"
            />
            <div className={styles.lowerTileContent}><div className = {styles.text}>Shaurma 1</div></div>
          </li>
          <li>
            <img
              id="popularrestaurants-content-papajohns-1"
              src={displayImage(imageURLs,"popularrestaurants-content-papajohns-1")}
              alt="papajohns"
            />
            <div className={styles.lowerTileContent}><div className = {styles.text}>Papa Johns</div></div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SimilarRestaurants;
