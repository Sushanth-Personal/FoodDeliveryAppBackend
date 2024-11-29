import { useRef } from "react";
import styles from "./customerreviews.module.css";

const CustomerReviews = () => {
  const cardsViewPortRef = useRef(null);

  const scrollLeft = () => {
    if (cardsViewPortRef.current) {
      cardsViewPortRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (cardsViewPortRef.current) {
      cardsViewPortRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.customerReviews}>
      <img className = {styles.ratingImage} src="/rating.png" alt="" />
      <div className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1>Customer Reviews</h1>
            <div>
              <img
                className={styles.pagingButton}
                src="/leftbutton.png"
                alt="Scroll Left"
                onClick={scrollLeft}
              />
              <img
                className={styles.pagingButton}
                src="/rightbutton.png"
                alt="Scroll Right"
                onClick={scrollRight}
              />
            </div>
          </div>
          <div className={styles.cardsViewPort} ref={cardsViewPortRef}>
            <ul>
              {[
                {
                  name: "Emma Johnson",
                  location: "New York, USA",
                  date: "10th November, 2023",
                  review:
                    "Fantastic experience! The ambiance was cozy, and the service was impeccable. Will visit again.",
                },
                {
                  name: "Michael Lee",
                  location: "London, UK",
                  date: "5th November, 2023",
                  review:
                    "The desserts were heavenly! Highly recommend the chocolate lava cake.",
                },
                {
                  name: "Sophia Brown",
                  location: "Sydney, Australia",
                  date: "3rd November, 2023",
                  review:
                    "The staff was so friendly, and the quality of food was top-notch. Will definitely be back!",
                },
                {
                  name: "Liam Wilson",
                  location: "Toronto, Canada",
                  date: "1st November, 2023",
                  review:
                    "Exceptional service and delicious food. A must-visit spot for dessert lovers!",
                },
                {
                  name: "Noah Davis",
                  location: "Berlin, Germany",
                  date: "28th October, 2023",
                  review:
                    "Absolutely loved the ambiance and the desserts. Highly recommended!",
                },
                {
                  name: "Olivia Martinez",
                  location: "Madrid, Spain",
                  date: "25th October, 2023",
                  review:
                    "Incredible place! The desserts were out of this world. Will bring friends next time.",
                },
              ].map((customer, index) => (
                <li key={index}>
                  <div className={styles.content}>
                    <div className={styles.header}>
                      <div className={styles.userDetails}>
                        <img src={`/user.png`} alt="User" />
                        <div className={styles.userInfo}>
                          <h2>{customer.name}</h2>
                          <p>{customer.location}</p>
                        </div>
                      </div>
                      <div className={styles.rating}>
                        <img
                          className={styles.stars}
                          src="/stars.png"
                          alt="Rating Stars"
                        />
                        <div className={styles.timeDetails}>
                          <img src="/timespan.png" alt="Time" />
                          <p>{customer.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.review}>{customer.review}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
