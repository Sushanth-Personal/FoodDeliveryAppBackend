import styles from "./restaurantbanner.module.css";
import useImage from "../../../../customHook/useImage";
import { displayImage } from "../../../../utility/ImageProcess";
import useScreenSize from "../../../../customHook/useScreenSize";
const RestaurantBanner = () => {
  
  const imageURLs = useImage("page", "restaurantbanner");
  const isScreenTarget = useScreenSize(1300);
  return (
    <section className={styles.restaurantBanner}>
      <div className={styles.backgroundLayer}>
        <img
          id="restaurantbanner-backgroundlayer-mcdonaldsbackground-1"
          src={displayImage(
            imageURLs,
            "restaurantbanner-backgroundlayer-mcdonaldsbackground-1"
          )}
          alt="mcdonaldsbackground"
        />
      </div>

      <div className={styles.topLayer}>
        <div className={styles.upperContent}>
         {!isScreenTarget &&(
          <div className={styles.content}>
            <div className={styles.description}>
              <h4>I'm lovin' it!</h4>
              <h1>McDonald’s East London</h1>
              <div className={styles.line3}>
                <div className={styles.button}>
                  <img
                    id="restaurantbanner-button-ordercompleted-1"
                    src={displayImage(
                      imageURLs,
                      "restaurantbanner-button-ordercompleted-1"
                    )}
                    alt="ordercompleted"
                  />
                  <p>Minimum Order: 12 GBP</p>
                </div>
                <div className={styles.button}>
                  <img
                    id="restaurantbanner-button-motocross-1"
                    src={displayImage(
                      imageURLs,
                      "restaurantbanner-button-motocross-1"
                    )}
                    alt="motocross"
                  />
                  <p>Delivery in 20-25 Minutes</p>
                </div>
                <div></div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <img
                id="restaurantbanner-rightcontent-mcdonaldsbanner-1"
                className={styles.banner}
                src={displayImage(
                  imageURLs,
                  "restaurantbanner-rightcontent-mcdonaldsbanner-1"
                )}
                alt="mcdonaldsBanner"
              />
              <img
                id="restaurantbanner-rightcontent-rating-1"
                className={styles.rating}
                src={displayImage(
                  imageURLs,
                  "restaurantbanner-rightcontent-rating-1"
                )}
                alt="rating"
              />
            </div>
          </div>)} 
          {isScreenTarget &&(
          <div className={styles.content}>
            <div className={styles.rightContent}>
              <img
                id="restaurantbanner-rightcontent-mcdonaldsbanner-1"
                className={styles.banner}
                src={displayImage(
                  imageURLs,
                  "restaurantbanner-rightcontent-mcdonaldsbanner-1"
                )}
                alt="mcdonaldsBanner"
              />
              <img
                id="restaurantbanner-rightcontent-rating-1"
                className={styles.rating}
                src={displayImage(
                  imageURLs,
                  "restaurantbanner-rightcontent-rating-1"
                )}
                alt="rating"
              />
            </div>
            <div className={styles.description}>
              <h4>I'm lovin' it!</h4>
              <h1>McDonald’s East London</h1>
              <div className={styles.line3}>
                <div className={styles.button}>
                  <img
                    id="restaurantbanner-button-ordercompleted-1"
                    src={displayImage(
                      imageURLs,
                      "restaurantbanner-button-ordercompleted-1"
                    )}
                    alt="ordercompleted"
                  />
                  <p>Minimum Order: 12 GBP</p>
                </div>
                <div className={styles.button}>
                  <img
                    id="restaurantbanner-button-motocross-1"
                    src={displayImage(
                      imageURLs,
                      "restaurantbanner-button-motocross-1"
                    )}
                    alt="motocross"
                  />
                  <p>Delivery in 20-25 Minutes</p>
                </div>
                <div></div>
              </div>
            </div>
            
          </div>)} 
        </div>
        <div className={styles.timing}>
          <img
            id="restaurantbanner-timing-clock-1"
            src={displayImage(
              imageURLs,
              "restaurantbanner-timing-clock-1"
            )}
            alt="Clock"
          />
          <p>Open until 3:00 AM</p>
        </div>
      </div>
    </section>
  );
};

export default RestaurantBanner;
