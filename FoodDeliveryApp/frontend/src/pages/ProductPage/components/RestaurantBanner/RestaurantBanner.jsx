import styles from "./restaurantbanner.module.css";

const RestaurantBanner = () => {
  return (
    <section className={styles.restaurantBanner}>
      <div className={styles.backgroundLayer}>
        <img 
        id="restaurantbanner-backgroundlayer-mcdonaldsbanner-1"
        src="/mcdonaldsBackground.png" alt="mcdonaldsbanner" />
      </div>

      <div className={styles.topLayer}>
        <div className={styles.upperContent}>
          <div className={styles.content}>
            <div className={styles.description}>
              <h4>I'm lovin' it!</h4>
              <h1>McDonald’s East London</h1>
              <div className={styles.line3}>
                <div className={styles.button}>
                  <img src="/ordercompleted.png" alt="" />
                  <p>Minimum Order: 12 GBP</p>
                </div>
                <div className={styles.button}>
                  <img src="/motocross.png" alt="" />
                  <p>Delivery in 20-25 Minutes</p>
                </div>
                <div></div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <img
                className={styles.banner}
                src="/mcdonaldsBanner.png"
                alt=""
              />
              <img
                className={styles.rating}
                src="/rating.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.timing}>
          <img src="/Clock.png" alt="" />
          <p>Open until 3:00 AM</p>
        </div>
      </div>
    </section>
  );
};

export default RestaurantBanner;
